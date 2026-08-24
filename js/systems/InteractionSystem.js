import { EventBus } from '../core/EventBus.js';
import { NPCS } from '../data/npcs.js';
import { ITEMS } from '../data/items.js';

export class InteractionSystem {
  constructor(gameState, renderer) {
    this.gameState = gameState;
    this.renderer = renderer;

    EventBus.on('INTERACT_TRIGGERED', (data) => this.handleInteraction(data));
  }

  handleInteraction({ tile, r, c }) {
    if (!tile.interact) return;

    const action = tile.interact;

    // 1. Ruộng canh tác
    if (action.type === 'farm') {
      EventBus.emit('INTERACT_FARM', { farmId: action.farmId });
      return;
    }

    // 2. Nhà tranh nghỉ ngơi
    if (action.type === 'rest') {
      EventBus.emit('OPEN_MODAL_CONFIRM', {
        title: '🛖 Nhà Tranh Tiêu Diệp',
        message: 'Bạn có muốn ngả lưng nghỉ ngơi để qua ngày mới? Thể lực (AP) sẽ được khôi phục tối đa.',
        onConfirm: () => {
          this.gameState.sleepNextDay();
          this.renderer.render();
        }
      });
      return;
    }

    // 3. Đốn củi ở bãi củi rừng
    if (action.type === 'gather_wood') {
      if (!this.gameState.consumeAP(1)) return;
      this.gameState.addItem('wood', 2);
      this.gameState.player.stats.strength = Math.min(100, this.gameState.player.stats.strength + 1);
      this.gameState.addLog('🪓 [Đốn Củi] Bạn vung rìu chặt được 2 Bó Củi Khô (+2 Gỗ, +1 Thể Lực)!', 'success');
      EventBus.emit('SFX_WOOD');
      return;
    }

    // 4. Hái thảo dược ven suối
    if (action.type === 'gather_herb') {
      if (!this.gameState.consumeAP(1)) return;
      this.gameState.addItem('herb', 1);
      this.gameState.addLog('🌿 [Hái Thuốc] Bạn tìm được 1 Nhành Thảo Dược tươi (+1 Thảo Dược)!', 'success');
      EventBus.emit('SFX_HERB');
      return;
    }

    // 5. Giếng nước
    if (action.type === 'well') {
      this.gameState.addLog('🪣 Giếng nước mát lành. Nước giếng dồi dào sẵn sàng để tưới ruộng!', 'info');
      return;
    }

    // 6. Gặp gỡ NPC
    if (action.type === 'npc') {
      const npc = NPCS[action.npcId];
      if (npc) {
        EventBus.emit('OPEN_NPC_DIALOG', { npc });
      }
      return;
    }

    // 7. Văn miếu / Trường thi
    if (action.type === 'exam_hall') {
      this.handleExamHall();
      return;
    }

    // 8. Cung điện Cấm Cung
    if (action.type === 'palace') {
      if (this.gameState.player.stats.reputation < 80) {
        this.gameState.addLog('🏯 Cấm Vệ Quân: "Ngươi chỉ là dân thường áo vải, chưa có công trạng với triều đình, không được phép diện kiến Hoàng Đế!"', 'warn');
      } else {
        this.gameState.addLog('👑 [Cấm Cung] Hoàng Đế triệu kiến! Bạn đã bước lên đỉnh cao danh vọng!', 'success');
      }
      return;
    }

    // 9. Long Môn Tiêu Cục
    if (action.type === 'building' && action.buildingId === 'caravan') {
      this.handleCaravan();
    }
  }

  handleExamHall() {
    const intel = this.gameState.player.stats.intelligence;
    EventBus.emit('OPEN_MODAL_INFO', {
      title: '📜 Trường Thi Hương Kinh Thành',
      message: `Khảo thí cử nghiệp đòi hỏi Trí Lực uyên bác.\n\n• Trí Lực hiện tại của bạn: ${intel}\n• Yêu cầu đỗ Tú Tài: Trí Lực ≥ 20\n\n(Gợi ý: Hãy mua sách 'Tứ Thư Ngũ Kinh' từ Lý Thư Sinh để dùi mài kinh sử!)`,
      actionBtnText: intel >= 20 ? '🎓 Điểm Danh Vào Thi' : 'Chưa Đủ Điều Kiện',
      actionDisabled: intel < 20,
      onAction: () => {
        if (this.gameState.player.title === 'Nông Phu Áo Vải') {
          this.gameState.player.title = 'Tú Tài Khoa Cử';
          this.gameState.player.stats.reputation += 25;
          this.gameState.addLog('🎉 [Vinh Quy] Bạn đã thi đỗ Tú Tài! Danh hiệu thăng cấp thành [Tú Tài Khoa Cử], Uy danh +25!', 'success');
          EventBus.emit('STATE_CHANGED', this.gameState);
        } else {
          this.gameState.addLog('📜 Bạn đã đỗ Tú Tài từ trước rồi. Hãy chuẩn bị cho kỳ Thi Hội tiếp theo!', 'info');
        }
      }
    });
  }

  handleCaravan() {
    EventBus.emit('OPEN_MODAL_INFO', {
      title: '🏪 Long Môn Tiêu Cục',
      message: 'Nơi nhận vận chuyển nông sản số lượng lớn sang các quận huyện lân cận để kiếm chênh lệch giá.\n\n• Yêu cầu: 1 Xe Đẩy Nhỏ (Giá: 30 Bạc) hoặc Thể Lực ≥ 25.',
      actionBtnText: 'Mua Xe Đẩy (30 Bạc)',
      actionDisabled: this.gameState.player.silver < 30,
      onAction: () => {
        if (this.gameState.player.silver >= 30) {
          this.gameState.addSilver(-30);
          this.gameState.player.title = 'Thương Đạo Hàng Rong';
          this.gameState.addLog('🐎 [Mở Rộng Giao Thương] Bạn đã sắm được xe thồ hàng, chính thức bước vào con đường Phú Thương!', 'success');
          EventBus.emit('STATE_CHANGED', this.gameState);
        }
      }
    });
  }
}
