import { EventBus } from './EventBus.js';

const STORAGE_KEY = 'BOC_Y_THANG_TRAM_SAVE_V3_BEIJING_96';

export class GameState {
  constructor() {
    this.initDefaultState();
  }

  initDefaultState() {
    this.world = {
      day: 1,
      season: 'Xuân', // Xuân, Hạ, Thu, Đông
      timeOfDay: 'Sáng', // Sáng, Chiều, Tối
      weather: 'Nắng ấm',
      currentZone: 'Vùng Ven Điền Trang'
    };

    this.player = {
      name: 'Tiêu Diệp',
      title: 'Nông Phu Áo Vải',
      pos: { r: 86, c: 31 }, // Vị trí xuất phát cạnh nhà tranh ngoại thành
      ap: 10,
      maxAp: 10,
      health: 100,
      silver: 10, // Khởi đầu với 10 đồng bạc lận lưng

      stats: {
        strength: 10,     // Thể lực (Đốn củi, gánh vác)
        intelligence: 5,  // Trí lực (Đọc sách, thi cử)
        charm: 5,         // Khẩu tài (Thuyết phục, mặc cả)
        reputation: 0     // Uy danh (Tiếp kiến quan lại)
      }
    };

    this.inventory = {
      turnip: 2,           // 2 củ cải chín sẵn
      turnip_seed: 6,      // 6 hạt giống củ cải
      wood: 0,
      herb: 0,
      book_classics: 0,
      tea_pot: 0
    };

    // Quản lý trạng thái từng ô ruộng: { farm_r_c: { state: 'empty'|'planted'|'watered'|'ready', crop: 'turnip', dayPlanted: 1 } }
    this.farms = {
      'farm_87_30': { state: 'ready', crop: 'turnip', dayPlanted: 0 },
      'farm_87_31': { state: 'ready', crop: 'turnip', dayPlanted: 0 },
      'farm_87_32': { state: 'watered', crop: 'turnip', dayPlanted: 0 },
      'farm_87_33': { state: 'planted', crop: 'turnip', dayPlanted: 0 },
      'farm_87_34': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_87_35': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_87_36': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_87_37': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_30': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_31': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_32': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_33': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_34': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_35': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_36': { state: 'empty', crop: null, dayPlanted: 0 },
      'farm_88_37': { state: 'empty', crop: null, dayPlanted: 0 },
    };

    this.relationships = {
      merchant_vu: 0,
      scholar_ly: 0,
      tea_master_hoa: 0,
      farmer_ba: 10,
      guard_truong: 0,
      magistrate_quan: 0,
      tavern_keeper: 0,
      doctor_dong: 0,
      banker_khang: 0,
      lord_co: 0,
      minister_vuong: 0
    };

    this.logs = [
      { text: '📜 [Hành Trình Bắt Đầu] Tiêu Diệp thức dậy trong căn nhà tranh ven đô. Kinh Thành Bắc Kinh nguy nga tráng lệ đang mở ra trước mắt!', type: 'story' }
    ];
  }

  // Tiêu hao AP
  consumeAP(amount) {
    if (this.player.ap >= amount) {
      this.player.ap -= amount;
      EventBus.emit('STATE_CHANGED', this);
      return true;
    }
    this.addLog('⚠️ Bạn không đủ Thể Lực (AP) để thực hiện hành động này. Hãy về nhà ngủ qua ngày!', 'warn');
    return false;
  }

  // Thêm / bớt vật phẩm vào kho đồ
  addItem(itemId, count = 1) {
    this.inventory[itemId] = (this.inventory[itemId] || 0) + count;
    EventBus.emit('INVENTORY_CHANGED', { itemId, count, total: this.inventory[itemId] });
    EventBus.emit('STATE_CHANGED', this);
  }

  removeItem(itemId, count = 1) {
    if ((this.inventory[itemId] || 0) >= count) {
      this.inventory[itemId] -= count;
      EventBus.emit('INVENTORY_CHANGED', { itemId, count: -count, total: this.inventory[itemId] });
      EventBus.emit('STATE_CHANGED', this);
      return true;
    }
    return false;
  }

  // Thêm bạc
  addSilver(amount) {
    this.player.silver += amount;
    EventBus.emit('STATE_CHANGED', this);
  }

  // Ghi nhật ký sự kiện
  addLog(text, type = 'info') {
    this.logs.unshift({ text, type, time: `Ngày ${this.world.day} (${this.world.timeOfDay})` });
    if (this.logs.length > 50) this.logs.pop(); // Giới hạn 50 dòng log
    EventBus.emit('LOG_ADDED', this.logs[0]);
  }

  // Qua ngày mới (Nghỉ ngơi)
  sleepNextDay() {
    this.world.day += 1;
    this.player.ap = this.player.maxAp;
    this.world.timeOfDay = 'Sáng';

    // Cập nhật chu kỳ mùa (Mỗi 30 ngày đổi mùa)
    const seasons = ['Xuân', 'Hạ', 'Thu', 'Đông'];
    const seasonIndex = Math.floor((this.world.day - 1) / 30) % 4;
    this.world.season = seasons[seasonIndex];

    // Phát triển cây trồng qua đêm
    Object.keys(this.farms).forEach(farmId => {
      const farm = this.farms[farmId];
      if (farm.state === 'watered') {
        farm.state = 'ready'; // Cây đã tưới hôm trước sẽ chín vào sáng hôm sau
      } else if (farm.state === 'planted') {
        // Nếu chưa tưới thì vẫn là cây non
      }
    });

    this.addLog(`☀️ [Bình Minh Ngày ${this.world.day}] Trời đã sáng. Thể lực khôi phục ${this.player.maxAp} AP!`, 'success');
    this.saveGame();
    EventBus.emit('DAY_PASSED', this.world);
    EventBus.emit('STATE_CHANGED', this);
  }

  // Lưu và tải game
  saveGame() {
    try {
      const data = JSON.stringify({
        world: this.world,
        player: this.player,
        inventory: this.inventory,
        farms: this.farms,
        relationships: this.relationships
      });
      localStorage.setItem(STORAGE_KEY, data);
    } catch (e) {
      console.warn('Không thể lưu vào localStorage:', e);
    }
  }

  loadGame() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.world = { ...this.world, ...parsed.world };
        this.player = { ...this.player, ...parsed.player };
        this.inventory = { ...this.inventory, ...parsed.inventory };
        this.farms = { ...this.farms, ...parsed.farms };
        this.relationships = { ...this.relationships, ...parsed.relationships };

        // Đảm bảo nếu tọa độ cũ từ bản đồ trước thì tự động đưa về Điền Trang Nhà Tranh ngoại thành
        if (!this.player.pos || (this.player.pos.r < 80 && this.player.title === 'Nông Phu Áo Vải')) {
          this.player.pos = { r: 86, c: 31 };
        }

        this.addLog('💾 Đã khôi phục tiến trình chơi.', 'info');
        EventBus.emit('STATE_CHANGED', this);
        return true;
      }
    } catch (e) {
      console.warn('Lỗi khi tải save game:', e);
    }
    return false;
  }

  resetGame() {
    localStorage.removeItem(STORAGE_KEY);
    this.initDefaultState();
    EventBus.emit('STATE_CHANGED', this);
  }
}
