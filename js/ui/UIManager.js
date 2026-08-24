import { EventBus } from '../core/EventBus.js';
import { ITEMS } from '../data/items.js';

export class UIManager {
  constructor(gameState, inputController) {
    this.gameState = gameState;
    this.inputController = inputController;

    this.cacheDOMElements();
    this.bindEvents();
    this.initVirtualDPad();
    this.renderAll();
  }

  cacheDOMElements() {
    // Header
    this.elDay = document.getElementById('val-day');
    this.elSeason = document.getElementById('val-season');
    this.elZone = document.getElementById('val-zone');
    this.elSilver = document.getElementById('val-silver');
    this.elApText = document.getElementById('val-ap-text');
    this.elApBar = document.getElementById('val-ap-bar');

    // Sidebar Left (Stats & Inventory)
    this.elPlayerName = document.getElementById('val-player-name');
    this.elPlayerTitle = document.getElementById('val-player-title');
    this.elStatStr = document.getElementById('stat-str');
    this.elStatInt = document.getElementById('stat-int');
    this.elStatCha = document.getElementById('stat-cha');
    this.elStatRep = document.getElementById('stat-rep');
    this.elInventoryList = document.getElementById('inventory-list');

    // Sidebar Right (Logs & Actions)
    this.elLogContainer = document.getElementById('log-container');
    this.btnSleep = document.getElementById('btn-action-sleep');
    this.btnReset = document.getElementById('btn-action-reset');

    // Modals
    this.modalNpc = document.getElementById('modal-npc');
    this.modalGeneric = document.getElementById('modal-generic');
  }

  bindEvents() {
    EventBus.on('STATE_CHANGED', () => this.renderAll());
    EventBus.on('LOG_ADDED', (log) => this.appendLog(log));
    EventBus.on('OPEN_NPC_DIALOG', (data) => this.showNpcDialog(data.npc));
    EventBus.on('OPEN_MODAL_CONFIRM', (data) => this.showModalConfirm(data));
    EventBus.on('OPEN_MODAL_INFO', (data) => this.showModalInfo(data));

    // Nút ngủ qua ngày
    if (this.btnSleep) {
      this.btnSleep.addEventListener('click', () => {
        this.gameState.sleepNextDay();
      });
    }

    // Nút chơi lại từ đầu
    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn xóa dữ liệu và bắt đầu lại cuộc đời mới?')) {
          this.gameState.resetGame();
          location.reload();
        }
      });
    }
  }

  renderAll() {
    this.renderTopBar();
    this.renderStats();
    this.renderInventory();
  }

  renderTopBar() {
    if (this.elDay) this.elDay.textContent = `Ngày ${this.gameState.world.day}`;
    if (this.elSeason) this.elSeason.textContent = `Mùa ${this.gameState.world.season}`;
    if (this.elZone) this.elZone.textContent = this.gameState.world.currentZone;
    if (this.elSilver) this.elSilver.textContent = `${this.gameState.player.silver} 💰`;
    
    if (this.elApText) {
      this.elApText.textContent = `${this.gameState.player.ap} / ${this.gameState.player.maxAp} AP`;
    }
    if (this.elApBar) {
      const pct = (this.gameState.player.ap / this.gameState.player.maxAp) * 100;
      this.elApBar.style.width = `${pct}%`;
    }
  }

  renderStats() {
    if (this.elPlayerName) this.elPlayerName.textContent = this.gameState.player.name;
    if (this.elPlayerTitle) this.elPlayerTitle.textContent = this.gameState.player.title;

    if (this.elStatStr) this.elStatStr.textContent = this.gameState.player.stats.strength;
    if (this.elStatInt) this.elStatInt.textContent = this.gameState.player.stats.intelligence;
    if (this.elStatCha) this.elStatCha.textContent = this.gameState.player.stats.charm;
    if (this.elStatRep) this.elStatRep.textContent = this.gameState.player.stats.reputation;
  }

  renderInventory() {
    if (!this.elInventoryList) return;
    this.elInventoryList.innerHTML = '';

    const inv = this.gameState.inventory;
    let hasItems = false;

    Object.keys(inv).forEach(itemId => {
      const count = inv[itemId];
      if (count > 0) {
        hasItems = true;
        const itemDef = ITEMS[itemId] || { name: itemId, icon: '📦', description: '' };
        
        const card = document.createElement('div');
        card.className = 'inv-item-card';
        card.innerHTML = `
          <div class="inv-item-icon">${itemDef.icon}</div>
          <div class="inv-item-info">
            <div class="inv-item-name">${itemDef.name} <span class="inv-item-badge">x${count}</span></div>
            <div class="inv-item-desc">${itemDef.description || ''}</div>
          </div>
        `;

        // Nếu là sách hoặc trà thì có nút Dùng nhanh
        if (itemId === 'book_classics') {
          const btnUse = document.createElement('button');
          btnUse.className = 'btn-small-action';
          btnUse.textContent = 'Đọc 📖';
          btnUse.onclick = (e) => {
            e.stopPropagation();
            if (this.gameState.consumeAP(2)) {
              this.gameState.player.stats.intelligence += itemDef.intelGain || 5;
              this.gameState.removeItem('book_classics', 1);
              this.gameState.addLog(`📖 Bạn chăm chú đọc sách thánh hiền, Trí Lực tăng +${itemDef.intelGain || 5}!`, 'success');
              EventBus.emit('STATE_CHANGED', this.gameState);
            }
          };
          card.appendChild(btnUse);
        } else if (itemId === 'tea_pot') {
          const btnUse = document.createElement('button');
          btnUse.className = 'btn-small-action';
          btnUse.textContent = 'Uống 🍵';
          btnUse.onclick = (e) => {
            e.stopPropagation();
            this.gameState.player.ap = Math.min(this.gameState.player.maxAp, this.gameState.player.ap + 4);
            this.gameState.removeItem('tea_pot', 1);
            this.gameState.addLog('🍵 Bạn thưởng thức chén trà sen thơm lừng, hồi phục 4 AP!', 'success');
            EventBus.emit('STATE_CHANGED', this.gameState);
          };
          card.appendChild(btnUse);
        }

        this.elInventoryList.appendChild(card);
      }
    });

    if (!hasItems) {
      this.elInventoryList.innerHTML = '<div class="inv-empty-hint">Balo hiện đang trống rỗng. Hãy cuốc đất, đốn củi hoặc hái thuốc!</div>';
    }
  }

  appendLog(log) {
    if (!this.elLogContainer) return;
    const logItem = document.createElement('div');
    logItem.className = `log-entry log-${log.type || 'info'}`;
    logItem.innerHTML = `
      <div class="log-time">${log.time}</div>
      <div class="log-text">${log.text}</div>
    `;
    this.elLogContainer.prepend(logItem);
  }

  // Khung hội thoại NPC & Giao Thương
  showNpcDialog(npc) {
    if (!this.modalNpc) return;

    const modalBody = this.modalNpc.querySelector('.modal-body');
    const modalTitle = this.modalNpc.querySelector('.modal-title');
    const modalAvatar = this.modalNpc.querySelector('.modal-npc-avatar');

    modalTitle.textContent = `${npc.name} (${npc.title})`;
    modalAvatar.textContent = npc.avatar;

    let contentHtml = `
      <div class="npc-dialog-bubble">"${npc.greeting}"</div>
      <div class="npc-action-buttons">
    `;

    // 1. NPC Vũ Thương Nhân (Mua bán)
    if (npc.id === 'merchant_vu') {
      const turnipCount = this.gameState.inventory.turnip || 0;
      const woodCount = this.gameState.inventory.wood || 0;
      const herbCount = this.gameState.inventory.herb || 0;

      contentHtml += `
        <div class="trade-section">
          <h4>💰 Mua Bán Nông Sản & Hàng Hóa</h4>
          <div class="trade-row">
            <span>🥕 Bán Củ Cải (Có: ${turnipCount})</span>
            <button class="btn-trade" id="btn-sell-turnip" ${turnipCount <= 0 ? 'disabled' : ''}>Bán 1 Củ (+3 Bạc)</button>
            <button class="btn-trade" id="btn-sell-all-turnip" ${turnipCount <= 0 ? 'disabled' : ''}>Bán Tất Cả</button>
          </div>
          <div class="trade-row">
            <span>🪵 Bán Củi Khô (Có: ${woodCount})</span>
            <button class="btn-trade" id="btn-sell-wood" ${woodCount <= 0 ? 'disabled' : ''}>Bán 1 Gỗ (+2 Bạc)</button>
          </div>
          <div class="trade-row">
            <span>🌿 Bán Thảo Dược (Có: ${herbCount})</span>
            <button class="btn-trade" id="btn-sell-herb" ${herbCount <= 0 ? 'disabled' : ''}>Bán 1 Thảo Dược (+5 Bạc)</button>
          </div>
          <div class="trade-row">
            <span>🌱 Mua Hạt Giống Củ Cải</span>
            <button class="btn-trade" id="btn-buy-seed" ${this.gameState.player.silver < 1 ? 'disabled' : ''}>Mua 1 Hạt (-1 Bạc)</button>
            <button class="btn-trade" id="btn-buy-5-seed" ${this.gameState.player.silver < 5 ? 'disabled' : ''}>Mua 5 Hạt (-5 Bạc)</button>
          </div>
        </div>
      `;
    }

    // 2. NPC Lý Thư Sinh (Học tập & Mua sách)
    else if (npc.id === 'scholar_ly') {
      contentHtml += `
        <div class="trade-section">
          <h4>📜 Cử Nghiệp & Học Đạo</h4>
          <div class="trade-row">
            <span>📖 Mua Sách "Tứ Thư Ngũ Kinh"</span>
            <button class="btn-trade" id="btn-buy-book" ${this.gameState.player.silver < 15 ? 'disabled' : ''}>Mua (-15 Bạc)</button>
          </div>
          <div class="trade-row">
            <span>🗣️ Thỉnh Giáo Luận Đạo (Tốn 1 AP, +2 Khẩu Tài, +1 Trí Lực)</span>
            <button class="btn-trade" id="btn-study-talk">Đàm Đạo</button>
          </div>
        </div>
      `;
    }

    // 3. NPC Hoa Chưởng Quỹ (Trà Quán)
    else if (npc.id === 'tea_master_hoa') {
      contentHtml += `
        <div class="trade-section">
          <h4>🍵 Trà Quán Phong Nguyệt</h4>
          <div class="trade-row">
            <span>🍵 Mua Bình Trà Ngon (Hồi 4 AP khi uống)</span>
            <button class="btn-trade" id="btn-buy-tea" ${this.gameState.player.silver < 8 ? 'disabled' : ''}>Mua (-8 Bạc)</button>
          </div>
          <div class="trade-row">
            <span>👂 Nghe Ngóng Tin Tức Bí Mật (Tốn 2 Bạc)</span>
            <button class="btn-trade" id="btn-listen-rumor" ${this.gameState.player.silver < 2 ? 'disabled' : ''}>Nghe Tin Đồn</button>
          </div>
        </div>
      `;
    }

    // 4. Các NPC khác (Hội thoại)
    else {
      contentHtml += `
        <button class="btn-dialog-choice" id="btn-generic-talk">🗣️ Trò chuyện kết giao</button>
      `;
    }

    contentHtml += `
        <button class="btn-dialog-close" id="btn-dialog-close">Đóng Cửa Sổ</button>
      </div>
    `;

    modalBody.innerHTML = contentHtml;
    this.modalNpc.classList.add('modal-active');

    // Bắt sự kiện trong Modal
    this.bindNpcDialogActions(npc);
  }

  bindNpcDialogActions(npc) {
    const closeBtn = document.getElementById('btn-dialog-close');
    if (closeBtn) closeBtn.onclick = () => this.modalNpc.classList.remove('modal-active');

    // Xử lý Vũ Thương Nhân
    const btnSellTurnip = document.getElementById('btn-sell-turnip');
    if (btnSellTurnip) {
      btnSellTurnip.onclick = () => {
        if (this.gameState.removeItem('turnip', 1)) {
          this.gameState.addSilver(3);
          this.gameState.addLog('💰 Bạn đã bán 1 Củ Cải Trắng được 3 Bạc.', 'success');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnSellAllTurnip = document.getElementById('btn-sell-all-turnip');
    if (btnSellAllTurnip) {
      btnSellAllTurnip.onclick = () => {
        const count = this.gameState.inventory.turnip || 0;
        if (count > 0 && this.gameState.removeItem('turnip', count)) {
          const totalSilver = count * 3;
          this.gameState.addSilver(totalSilver);
          this.gameState.addLog(`💰 Bạn đã bán toàn bộ ${count} Củ Cải Trắng được ${totalSilver} Bạc!`, 'success');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnSellWood = document.getElementById('btn-sell-wood');
    if (btnSellWood) {
      btnSellWood.onclick = () => {
        if (this.gameState.removeItem('wood', 1)) {
          this.gameState.addSilver(2);
          this.gameState.addLog('💰 Bạn đã bán 1 Bó Củi Khô được 2 Bạc.', 'success');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnSellHerb = document.getElementById('btn-sell-herb');
    if (btnSellHerb) {
      btnSellHerb.onclick = () => {
        if (this.gameState.removeItem('herb', 1)) {
          this.gameState.addSilver(5);
          this.gameState.addLog('💰 Bạn đã bán 1 Thảo Dược được 5 Bạc.', 'success');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnBuySeed = document.getElementById('btn-buy-seed');
    if (btnBuySeed) {
      btnBuySeed.onclick = () => {
        if (this.gameState.player.silver >= 1) {
          this.gameState.addSilver(-1);
          this.gameState.addItem('turnip_seed', 1);
          this.gameState.addLog('🌱 Bạn mua 1 Hạt Giống Củ Cải (-1 Bạc).', 'info');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnBuy5Seed = document.getElementById('btn-buy-5-seed');
    if (btnBuy5Seed) {
      btnBuy5Seed.onclick = () => {
        if (this.gameState.player.silver >= 5) {
          this.gameState.addSilver(-5);
          this.gameState.addItem('turnip_seed', 5);
          this.gameState.addLog('🌱 Bạn mua 5 Hạt Giống Củ Cải (-5 Bạc).', 'info');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    // Xử lý Lý Thư Sinh
    const btnBuyBook = document.getElementById('btn-buy-book');
    if (btnBuyBook) {
      btnBuyBook.onclick = () => {
        if (this.gameState.player.silver >= 15) {
          this.gameState.addSilver(-15);
          this.gameState.addItem('book_classics', 1);
          this.gameState.addLog('📜 Bạn mua được cuốn "Tứ Thư Ngũ Kinh" (-15 Bạc). Hãy mở balo để đọc!', 'success');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnStudyTalk = document.getElementById('btn-study-talk');
    if (btnStudyTalk) {
      btnStudyTalk.onclick = () => {
        if (this.gameState.consumeAP(1)) {
          this.gameState.player.stats.charm += 2;
          this.gameState.player.stats.intelligence += 1;
          this.gameState.addLog('🗣️ Bạn cùng Lý Thư Sinh bàn luận thế sự (+2 Khẩu Tài, +1 Trí Lực)!', 'success');
          this.showNpcDialog(npc);
        }
      };
    }

    // Xử lý Hoa Chưởng Quỹ
    const btnBuyTea = document.getElementById('btn-buy-tea');
    if (btnBuyTea) {
      btnBuyTea.onclick = () => {
        if (this.gameState.player.silver >= 8) {
          this.gameState.addSilver(-8);
          this.gameState.addItem('tea_pot', 1);
          this.gameState.addLog('🍵 Bạn mua được 1 Bình Trà Ngon (-8 Bạc).', 'info');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    const btnListenRumor = document.getElementById('btn-listen-rumor');
    if (btnListenRumor) {
      btnListenRumor.onclick = () => {
        if (this.gameState.player.silver >= 2) {
          this.gameState.addSilver(-2);
          const rumors = [
            'Hoa Chưởng Quỹ thì thầm: "Nghe đồn năm nay Quan Huyện mở thêm suất khảo thí cho nông dân đỗ Tú Tài đấy!"',
            'Hoa Chưởng Quỹ: "Mùa Đông sắp tới giá củi và than sẽ tăng gấp đôi, ai găm hàng sẽ phát tài to!"',
            'Hoa Chưởng Quỹ: "Phía Cấm Cung dạo này canh phòng cẩn mật, chỉ có bậc đại quan mới được vào bệ kiến."'
          ];
          const rumor = rumors[Math.floor(Math.random() * rumors.length)];
          this.gameState.addLog(`👂 [Tin Đồn] ${rumor}`, 'story');
          EventBus.emit('SFX_COIN');
          this.showNpcDialog(npc);
        }
      };
    }

    // NPC chung
    const btnGenericTalk = document.getElementById('btn-generic-talk');
    if (btnGenericTalk) {
      btnGenericTalk.onclick = () => {
        this.gameState.player.stats.charm += 1;
        this.gameState.addLog(`🗣️ Bạn trò chuyện thân mật cùng ${npc.name} (+1 Khẩu Tài)!`, 'success');
        this.modalNpc.classList.remove('modal-active');
      };
    }
  }

  showModalConfirm({ title, message, onConfirm }) {
    if (!this.modalGeneric) return;
    const mTitle = this.modalGeneric.querySelector('.modal-title');
    const mBody = this.modalGeneric.querySelector('.modal-body');

    mTitle.textContent = title;
    mBody.innerHTML = `
      <p class="modal-text">${message.replace(/\n/g, '<br>')}</p>
      <div class="modal-actions-row">
        <button class="btn-confirm" id="btn-modal-yes">Đồng Ý</button>
        <button class="btn-cancel" id="btn-modal-no">Hủy Bỏ</button>
      </div>
    `;

    this.modalGeneric.classList.add('modal-active');

    document.getElementById('btn-modal-yes').onclick = () => {
      this.modalGeneric.classList.remove('modal-active');
      if (onConfirm) onConfirm();
    };
    document.getElementById('btn-modal-no').onclick = () => {
      this.modalGeneric.classList.remove('modal-active');
    };
  }

  showModalInfo({ title, message, actionBtnText, actionDisabled, onAction }) {
    if (!this.modalGeneric) return;
    const mTitle = this.modalGeneric.querySelector('.modal-title');
    const mBody = this.modalGeneric.querySelector('.modal-body');

    mTitle.textContent = title;
    mBody.innerHTML = `
      <p class="modal-text">${message.replace(/\n/g, '<br>')}</p>
      <div class="modal-actions-row">
        <button class="btn-confirm" id="btn-modal-action" ${actionDisabled ? 'disabled' : ''}>${actionBtnText}</button>
        <button class="btn-cancel" id="btn-modal-close">Đóng</button>
      </div>
    `;

    this.modalGeneric.classList.add('modal-active');

    const btnAction = document.getElementById('btn-modal-action');
    if (btnAction) {
      btnAction.onclick = () => {
        this.modalGeneric.classList.remove('modal-active');
        if (onAction) onAction();
      };
    }
    document.getElementById('btn-modal-close').onclick = () => {
      this.modalGeneric.classList.remove('modal-active');
    };
  }

  // Khởi tạo D-Pad ảo trên mobile
  initVirtualDPad() {
    const btnUp = document.getElementById('dpad-up');
    const btnDown = document.getElementById('dpad-down');
    const btnLeft = document.getElementById('dpad-left');
    const btnRight = document.getElementById('dpad-right');
    const btnCenter = document.getElementById('dpad-center');

    if (btnUp) btnUp.onclick = () => this.inputController.attemptMove(-1, 0);
    if (btnDown) btnDown.onclick = () => this.inputController.attemptMove(1, 0);
    if (btnLeft) btnLeft.onclick = () => this.inputController.attemptMove(0, -1);
    if (btnRight) btnRight.onclick = () => this.inputController.attemptMove(0, 1);
    if (btnCenter) btnCenter.onclick = () => {
      const pos = this.gameState.player.pos;
      this.inputController.triggerTileInteraction(pos.r, pos.c);
    };
  }
}
