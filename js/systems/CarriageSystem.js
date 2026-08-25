// =========================================================
// HỆ THỐNG XE NGỰA DỊCH TRẠM THỜI GIAN THỰC (REAL-TIME CARRIAGE TRAVEL)
// Nhân vật lên xe ngựa 🛺, xe phi nhanh qua các con phố thời gian thực
// =========================================================

import { EventBus } from '../core/EventBus.js';

export const CARRIAGE_STATIONS = [
  {
    id: 'carriage_suburb',
    name: '🌾 Dịch Trạm Điền Trang',
    desc: 'Vùng ngoại ô ven sông Lạc Thủy, gần nhà tranh & ruộng củ cải',
    pos: { r: 449, c: 257 },
    cost: 1
  },
  {
    id: 'carriage_vinh_dinh',
    name: '⛩️ Dịch Trạm Vĩnh Định Môn',
    desc: 'Cửa ngõ phía Nam Ngoại Thành, lính canh thủ môn',
    pos: { r: 405, c: 257 },
    cost: 1
  },
  {
    id: 'carriage_tien_mon',
    name: '🏮 Dịch Trạm Tiền Môn Đại Nhai',
    desc: 'Trung tâm phố chợ thương nghiệp sầm uất, Khách Điếm & Tửu Lâu',
    pos: { r: 279, c: 257 },
    cost: 1
  },
  {
    id: 'carriage_west_market',
    name: '🎭 Dịch Trạm Tây Thị',
    desc: 'Khu vui chơi Lý Viên Hí Viện & Lưu Ly Xưởng phố sĩ tử',
    pos: { r: 346, c: 171 },
    cost: 1
  },
  {
    id: 'carriage_east_market',
    name: '💰 Dịch Trạm Đông Thị',
    desc: 'Khu Tiền Trang, Dược Điếm, Cẩm Tú Trang tơ lụa & Lò Rèn',
    pos: { r: 346, c: 321 },
    cost: 1
  },
  {
    id: 'carriage_chinh_duong',
    name: '⚖️ Dịch Trạm Chính Dương Môn',
    desc: 'Cửa ngõ Nội Thành, Lục Bộ Nha Môn & Huyện Đường',
    pos: { r: 263, c: 257 },
    cost: 1
  },
  {
    id: 'carriage_clans',
    name: '🏯 Dịch Trạm Tứ Đại Gia Tộc',
    desc: 'Khu biệt phủ Cố Vương Phủ, Mộ Dung Tướng Phủ, Gia Cát Thị, Thẩm Gia',
    pos: { r: 186, c: 257 },
    cost: 2
  },
  {
    id: 'carriage_palace',
    name: '👑 Dịch Trạm Ngọ Môn Hoàng Cung',
    desc: 'Lối vào Tử Cấm Thành, Điện Thái Hòa & Cung Điện Chí Tôn',
    pos: { r: 97, c: 257 },
    cost: 2
  }
];

export class CarriageSystem {
  constructor(gameState, renderer) {
    this.gameState = gameState;
    this.renderer = renderer;
    this.isDriving = false;

    EventBus.on('OPEN_CARRIAGE_MENU', () => this.openCarriageMenu());
  }

  openCarriageMenu() {
    if (this.isDriving) return;

    const currentPos = this.gameState.player.pos;
    const availableStations = CARRIAGE_STATIONS.filter(st => {
      const dist = Math.abs(st.pos.r - currentPos.r) + Math.abs(st.pos.c - currentPos.c);
      return dist > 5; // Chỉ hiện các trạm ở xa
    });

    let stationsHtml = `
      <div style="margin-bottom:12px; font-size:13px; color:#cbd5e1;">
        🏇 <b>Xa Phu:</b> "Khách quan muốn đi đâu? Ngựa tốt cương vững, chỉ trong chớp mắt sẽ đưa quý khách xuyên phố đến tận nơi!"
      </div>
      <div class="carriage-station-list" style="display:flex; flex-direction:column; gap:8px; max-height:280px; overflow-y:auto;">
    `;

    availableStations.forEach(st => {
      stationsHtml += `
        <button class="btn-carriage-dest" data-station-id="${st.id}" style="
          display:flex; justify-content:space-between; align-items:center;
          background:#1e293b; border:1px solid #d97706; border-radius:8px;
          padding:10px 14px; color:#f8fafc; font-family:inherit; text-align:left; cursor:pointer;
        ">
          <div>
            <div style="font-weight:700; color:#fde047; font-size:14px;">${st.name}</div>
            <div style="font-size:11px; color:#94a3b8;">${st.desc}</div>
          </div>
          <div style="font-weight:700; color:#fbbf24; background:#451a03; padding:4px 8px; border-radius:4px; border:1px solid #b45309;">
            ${st.cost} 💰
          </div>
        </button>
      `;
    });

    stationsHtml += `</div>`;

    EventBus.emit('OPEN_MODAL_CUSTOM', {
      title: '🛺 Dịch Trạm Xa Phu (Xe Ngựa Kinh Đô)',
      bodyHtml: stationsHtml,
      onInit: (modalEl) => {
        const btns = modalEl.querySelectorAll('.btn-carriage-dest');
        btns.forEach(btn => {
          btn.addEventListener('click', () => {
            const stationId = btn.dataset.stationId;
            const targetStation = CARRIAGE_STATIONS.find(s => s.id === stationId);
            if (targetStation) {
              EventBus.emit('CLOSE_MODAL');
              this.startCarriageRide(targetStation);
            }
          });
        });
      }
    });
  }

  startCarriageRide(targetStation) {
    if (this.gameState.player.silver < targetStation.cost) {
      this.gameState.addLog(`⚠️ Bạn không đủ ${targetStation.cost} Bạc để trả tiền xe ngựa!`, 'warn');
      return;
    }

    this.gameState.addSilver(-targetStation.cost);
    this.isDriving = true;
    this.gameState.player.isRidingCarriage = true;

    this.gameState.addLog(`🛺 [Lên Xe Ngựa] Bánh xe lộc cộc lăn bánh, xe ngựa phóng nhanh hướng về [${targetStation.name}]!`, 'story');

    const startPos = { ...this.gameState.player.pos };
    const goalPos = targetStation.pos;

    // Sinh lộ trình đường thẳng chạy nhanh
    const steps = [];
    const distR = goalPos.r - startPos.r;
    const distC = goalPos.c - startPos.c;
    const totalSteps = Math.max(Math.abs(distR), Math.abs(distC));

    for (let i = 1; i <= totalSteps; i++) {
      const progress = i / totalSteps;
      const curR = Math.round(startPos.r + distR * progress);
      const curC = Math.round(startPos.c + distC * progress);
      steps.push({ r: curR, c: curC });
    }

    let stepIndex = 0;
    const stepInterval = Math.max(20, Math.min(45, Math.floor(1500 / steps.length))); // Chạy trong khoảng 1.5 giây

    const driveTimer = setInterval(() => {
      if (stepIndex < steps.length) {
        this.gameState.player.pos = steps[stepIndex];
        this.renderer.render();
        stepIndex++;
      } else {
        clearInterval(driveTimer);
        this.isDriving = false;
        this.gameState.player.isRidingCarriage = false;
        this.gameState.player.pos = { ...goalPos };
        this.renderer.render();
        this.gameState.addLog(`🏁 [Đến Nơi] Xe ngựa dừng bánh an toàn tại [${targetStation.name}]!`, 'success');
      }
    }, stepInterval);
  }
}
