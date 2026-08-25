import { EventBus } from '../core/EventBus.js';
import { ITEMS } from '../data/items.js';

export class UIManager {
  constructor(gameState, inputController) {
    this.gameState = gameState;
    this.inputController = inputController;
    this.selectedItemId = null;
    this.currentChatFilter = 'all';

    this.cacheDOMElements();
    this.bindEvents();
    this.initVirtualDPad();
    this.renderAll();
  }

  cacheDOMElements() {
    // Header HUD
    this.elDay = document.getElementById('val-day');
    this.elSeason = document.getElementById('val-season');
    this.elZone = document.getElementById('val-zone');
    this.elSilver = document.getElementById('val-silver');
    this.elApText = document.getElementById('val-ap-text');
    this.elApBar = document.getElementById('val-ap-bar');
    this.elPlayerName = document.getElementById('val-player-name');
    this.elPlayerTitle = document.getElementById('val-player-title');

    // Chatbox
    this.elLogContainer = document.getElementById('log-container');
    this.wuxiaChatbox = document.getElementById('wuxia-chatbox');

    // Modals
    this.modalInv = document.getElementById('modal-inventory-full');
    this.modalChar = document.getElementById('modal-character-sheet');
    this.modalNpc = document.getElementById('modal-npc');
    this.modalGeneric = document.getElementById('modal-generic');
  }

  bindEvents() {
    EventBus.on('STATE_CHANGED', () => this.renderAll());
    EventBus.on('LOG_ADDED', (log) => this.appendLog(log));
    EventBus.on('OPEN_NPC_DIALOG', (data) => this.showNpcDialog(data.npc));
    EventBus.on('OPEN_MODAL_CONFIRM', (data) => this.showModalConfirm(data));
    EventBus.on('OPEN_MODAL_INFO', (data) => this.showModalInfo(data));
    EventBus.on('OPEN_MODAL_CUSTOM', (data) => this.showModalCustom(data));
    EventBus.on('CLOSE_MODAL', () => this.closeAllModals());

    // Nút mở Balo [I]
    const btnHudInv = document.getElementById('hud-btn-inv');
    if (btnHudInv) {
      btnHudInv.addEventListener('click', () => this.openInventoryDialog());
    }

    // Nút mở Thân Phận [C]
    const btnHudChar = document.getElementById('hud-btn-char');
    const hudProfile = document.getElementById('hud-open-char-profile');
    if (btnHudChar) btnHudChar.addEventListener('click', () => this.openCharacterDialog());
    if (hudProfile) hudProfile.addEventListener('click', () => this.openCharacterDialog());

    // Nút Dịch Trạm [M]
    const btnHudCarriage = document.getElementById('hud-btn-carriage');
    if (btnHudCarriage) {
      btnHudCarriage.addEventListener('click', () => EventBus.emit('OPEN_CARRIAGE_MENU'));
    }

    // Nút Đi Ngủ
    const btnHudSleep = document.getElementById('hud-btn-sleep');
    if (btnHudSleep) {
      btnHudSleep.addEventListener('click', () => this.gameState.sleepNextDay());
    }

    // Nút đóng các Dialog
    document.getElementById('btn-close-inv-full')?.addEventListener('click', () => this.closeAllModals());
    document.getElementById('btn-close-char-sheet')?.addEventListener('click', () => this.closeAllModals());
    document.getElementById('btn-close-npc')?.addEventListener('click', () => this.closeAllModals());
    document.getElementById('btn-close-generic')?.addEventListener('click', () => this.closeAllModals());

    // Chatbox Tabs & Toggle
    const tabs = document.querySelectorAll('.chat-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentChatFilter = tab.dataset.channel;
        this.renderLogs();
      });
    });

    const btnToggleChat = document.getElementById('btn-toggle-chat');
    if (btnToggleChat && this.wuxiaChatbox) {
      btnToggleChat.addEventListener('click', () => {
        this.wuxiaChatbox.classList.toggle('collapsed');
        btnToggleChat.textContent = this.wuxiaChatbox.classList.contains('collapsed') ? '▴' : '▾';
      });
    }

    // Phím Escape để đóng nhanh tất cả dialog
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  renderAll() {
    this.renderTopBar();
    this.renderLogs();
  }

  renderTopBar() {
    if (this.elDay) this.elDay.textContent = `Ngày ${this.gameState.world.day}`;
    if (this.elSeason) this.elSeason.textContent = `Mùa ${this.gameState.world.season}`;
    if (this.elZone) this.elZone.textContent = this.gameState.world.currentZone;
    if (this.elSilver) this.elSilver.textContent = `${this.gameState.player.silver} 💰`;
    if (this.elPlayerName) this.elPlayerName.textContent = this.gameState.player.name;
    if (this.elPlayerTitle) this.elPlayerTitle.textContent = this.gameState.player.title;
    
    if (this.elApText) {
      this.elApText.textContent = `${this.gameState.player.ap} / ${this.gameState.player.maxAp} AP`;
    }
    if (this.elApBar) {
      const pct = (this.gameState.player.ap / this.gameState.player.maxAp) * 100;
      this.elApBar.style.width = `${pct}%`;
    }
  }

  // --- 1. HỆ THỐNG DIALOG BALO TÚI ĐỒ (WUXIA INVENTORY) ---
  openInventoryDialog() {
    if (!this.modalInv) return;
    this.selectedItemId = null;
    this.renderInventorySlots();
    this.renderItemDetail(null);
    this.modalInv.classList.add('modal-active');
  }

  renderInventorySlots() {
    const grid = document.getElementById('inventory-slots-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const inv = this.gameState.inventory;
    const activeItems = Object.keys(inv).filter(id => inv[id] > 0);
    const TOTAL_SLOTS = 20; // 5x4 Grid

    for (let i = 0; i < TOTAL_SLOTS; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';

      if (i < activeItems.length) {
        const itemId = activeItems[i];
        const count = inv[itemId];
        const itemDef = ITEMS[itemId] || { name: itemId, icon: '📦' };

        if (this.selectedItemId === itemId) {
          slotEl.classList.add('selected');
        }

        slotEl.innerHTML = `
          <span class="slot-icon">${itemDef.icon}</span>
          <span class="slot-count">${count > 1 ? count : ''}</span>
        `;

        slotEl.addEventListener('click', () => {
          this.selectedItemId = itemId;
          this.renderInventorySlots();
          this.renderItemDetail(itemId);
        });
      } else {
        // Ô trống
        slotEl.innerHTML = ``;
      }

      grid.appendChild(slotEl);
    }
  }

  renderItemDetail(itemId) {
    const panel = document.getElementById('item-detail-panel');
    if (!panel) return;

    if (!itemId || !this.gameState.inventory[itemId]) {
      panel.innerHTML = `
        <div class="item-detail-placeholder">
          <div style="font-size: 32px; opacity: 0.5;">📦</div>
          <div>Chọn một vật phẩm trong túi để xem thông tin và sử dụng</div>
        </div>
      `;
      return;
    }

    const itemDef = ITEMS[itemId] || { name: itemId, icon: '📦', description: 'Vật phẩm kinh thành' };
    const count = this.gameState.inventory[itemId];

    let actionBtnHtml = '';
    if (itemId === 'book_classics') {
      actionBtnHtml = `<button class="btn-use-item" id="btn-use-item">📖 Đọc Sách Nghiên Cứu (+Trí Lực)</button>`;
    } else if (itemId === 'tea_pot') {
      actionBtnHtml = `<button class="btn-use-item" id="btn-use-item">🍵 Thưởng Thức Trà (+Hồi AP)</button>`;
    } else if (itemId === 'turnip') {
      actionBtnHtml = `<div style="font-size:11px; color:#a7f3d0; text-align:center;">🥕 Có thể bán tại Sạp Chợ Tiền Môn lấy Bạc!</div>`;
    }

    panel.innerHTML = `
      <div class="item-detail-content">
        <div class="detail-header">
          <div class="detail-icon">${itemDef.icon}</div>
          <div>
            <div class="detail-name">${itemDef.name}</div>
            <div class="detail-count">Số lượng: <b style="color:#fde047;">${count}</b></div>
          </div>
        </div>
        <div class="detail-desc">${itemDef.description || 'Vật phẩm quý giá trong kinh thành.'}</div>
      </div>
      <div class="detail-actions">
        ${actionBtnHtml}
      </div>
    `;

    const btnUse = document.getElementById('btn-use-item');
    if (btnUse) {
      btnUse.addEventListener('click', () => {
        if (itemId === 'book_classics') {
          if (this.gameState.consumeAP(2)) {
            this.gameState.player.stats.intelligence += itemDef.intelGain || 5;
            this.gameState.removeItem('book_classics', 1);
            this.gameState.addLog(`📖 Bạn chăm chú đọc sách thánh hiền, Trí Lực tăng +${itemDef.intelGain || 5}!`, 'success');
            EventBus.emit('STATE_CHANGED', this.gameState);
            this.renderInventorySlots();
            this.renderItemDetail(this.gameState.inventory[itemId] > 0 ? itemId : null);
          }
        } else if (itemId === 'tea_pot') {
          this.gameState.player.ap = Math.min(this.gameState.player.maxAp, this.gameState.player.ap + 4);
          this.gameState.removeItem('tea_pot', 1);
          this.gameState.addLog('🍵 Bạn thưởng thức chén trà sen thơm lừng, hồi phục +4 AP!', 'success');
          EventBus.emit('STATE_CHANGED', this.gameState);
          this.renderInventorySlots();
          this.renderItemDetail(this.gameState.inventory[itemId] > 0 ? itemId : null);
        }
      });
    }
  }

  // --- 2. HỆ THỐNG DIALOG THÂN PHẬN NHÂN VẬT ---
  openCharacterDialog() {
    if (!this.modalChar) return;
    const body = document.getElementById('character-dialog-body');
    const p = this.gameState.player;

    body.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:16px; background:#181d2a; padding:14px; border-radius:8px; border:1px solid #d97706;">
        <div style="font-size:42px; background:#0f131c; border-radius:50%; width:64px; height:64px; display:flex; align-items:center; justify-content:center; border:1px solid #e5c07b;">🧙‍♂️</div>
        <div>
          <div style="font-size:18px; font-weight:700; color:#fde047;">${p.name}</div>
          <div style="font-size:13px; color:#cbd5e1; margin-top:2px;">Thân Phận: <b style="color:#38bdf8;">${p.title}</b></div>
          <div style="font-size:12px; color:#94a3b8; margin-top:2px;">Bạc Lận Lưng: <b style="color:#fbbf24;">${p.silver} 💰</b></div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div style="background:#0f131c; padding:12px; border-radius:6px; border:1px solid rgba(229,192,123,0.2);">
          <div style="color:#94a3b8; font-size:11px;">💪 Thể Lực (AP / Sức Lao Động)</div>
          <div style="font-size:18px; font-weight:700; color:#34d399; margin-top:4px;">${p.stats.strength}</div>
        </div>
        <div style="background:#0f131c; padding:12px; border-radius:6px; border:1px solid rgba(229,192,123,0.2);">
          <div style="color:#94a3b8; font-size:11px;">🧠 Trí Lực (Thi Cử / Đọc Sách)</div>
          <div style="font-size:18px; font-weight:700; color:#60a5fa; margin-top:4px;">${p.stats.intelligence}</div>
        </div>
        <div style="background:#0f131c; padding:12px; border-radius:6px; border:1px solid rgba(229,192,123,0.2);">
          <div style="color:#94a3b8; font-size:11px;">🗣️ Khẩu Tài (Thuyết Phục / Mặc Cả)</div>
          <div style="font-size:18px; font-weight:700; color:#f472b6; margin-top:4px;">${p.stats.charm}</div>
        </div>
        <div style="background:#0f131c; padding:12px; border-radius:6px; border:1px solid rgba(229,192,123,0.2);">
          <div style="color:#94a3b8; font-size:11px;">📜 Uy Danh (Quan Phủ / Triều Đình)</div>
          <div style="font-size:18px; font-weight:700; color:#facc15; margin-top:4px;">${p.stats.reputation}</div>
        </div>
      </div>
      <div style="margin-top:16px; display:flex; justify-content:flex-end;">
        <button class="btn-cancel" id="btn-char-reset-game" style="background:#450a0a; border-color:#ef4444; color:#fca5a5;">🔄 Bắt Đầu Lại Cuộc Đời</button>
      </div>
    `;

    document.getElementById('btn-char-reset-game')?.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn xóa tiến trình và bắt đầu lại cuộc đời mới?')) {
        this.gameState.resetGame();
        location.reload();
      }
    });

    this.modalChar.classList.add('modal-active');
  }

  // --- 3. KHUNG CHAT KIẾM HIỆP ---
  appendLog(log) {
    this.renderLogs();
  }

  renderLogs() {
    if (!this.elLogContainer) return;
    this.elLogContainer.innerHTML = '';

    const logs = this.gameState.logs;
    const filtered = logs.filter(log => {
      if (this.currentChatFilter === 'all') return true;
      if (this.currentChatFilter === 'story') return log.type === 'story' || log.type === 'chat';
      if (this.currentChatFilter === 'system') return log.type === 'info' || log.type === 'warn' || log.type === 'success';
      return true;
    });

    filtered.forEach(log => {
      const entry = document.createElement('div');
      entry.className = `log-entry log-${log.type || 'info'}`;
      entry.textContent = log.text;
      this.elLogContainer.appendChild(entry);
    });

    this.elLogContainer.scrollTop = this.elLogContainer.scrollHeight;
  }

  // --- 4. HỘI THOẠI & MODAL CHUNG ---
  showNpcDialog(npc) {
    if (!this.modalNpc || !npc) return;
    const mTitle = this.modalNpc.querySelector('.modal-title');
    const mAvatar = this.modalNpc.querySelector('.modal-npc-avatar');
    const mBody = this.modalNpc.querySelector('.modal-body');

    mTitle.textContent = `${npc.name} (${npc.title || 'Kinh Kỳ Cư Dân'})`;
    if (mAvatar) mAvatar.textContent = npc.avatar || '👤';

    let servicesHtml = '<div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">';
    if (npc.services && npc.services.includes('shop')) {
      servicesHtml += `
        <button class="btn-confirm" id="btn-npc-sell-turnip" ${this.gameState.inventory.turnip > 0 ? '' : 'disabled'}>
          🥕 Bán Củ Cải (+3 Bạc/củ) (Hiện có: ${this.gameState.inventory.turnip})
        </button>
        <button class="btn-confirm" id="btn-npc-buy-seed" ${this.gameState.player.silver >= 1 ? '' : 'disabled'}>
          🌱 Mua Hạt Giống Củ Cải (Giá: 1 Bạc)
        </button>
      `;
    }
    if (npc.services && npc.services.includes('buy_book')) {
      servicesHtml += `
        <button class="btn-confirm" id="btn-npc-buy-book" ${this.gameState.player.silver >= 5 ? '' : 'disabled'}>
          📖 Mua Tứ Thư Ngũ Kinh (Giá: 5 Bạc)
        </button>
      `;
    }
    if (npc.services && npc.services.includes('buy_tea')) {
      servicesHtml += `
        <button class="btn-confirm" id="btn-npc-buy-tea" ${this.gameState.player.silver >= 2 ? '' : 'disabled'}>
          🍵 Mua Ấm Trà Long Tỉnh (Giá: 2 Bạc)
        </button>
      `;
    }
    servicesHtml += `<button class="btn-cancel" id="btn-npc-talk">🗣️ Trò Chuyện Xã Giao (+1 Khẩu Tài)</button></div>`;

    mBody.innerHTML = `
      <div style="font-size:13px; color:#fde047; margin-bottom:10px; font-style:italic;">"${npc.greeting || 'Chào khách quan!'}"</div>
      ${servicesHtml}
    `;

    this.modalNpc.classList.add('modal-active');

    // Bind event
    document.getElementById('btn-npc-sell-turnip')?.addEventListener('click', () => {
      if (this.gameState.removeItem('turnip', 1)) {
        this.gameState.addSilver(3);
        this.gameState.addLog(`🥕 Bạn đã bán 1 củ cải cho ${npc.name} nhận 3 Bạc!`, 'success');
        EventBus.emit('STATE_CHANGED', this.gameState);
        this.showNpcDialog(npc);
      }
    });
    document.getElementById('btn-npc-buy-seed')?.addEventListener('click', () => {
      if (this.gameState.player.silver >= 1) {
        this.gameState.addSilver(-1);
        this.gameState.addItem('turnip_seed', 1);
        this.gameState.addLog(`🌱 Bạn mua 1 hạt giống củ cải từ ${npc.name}!`, 'success');
        EventBus.emit('STATE_CHANGED', this.gameState);
        this.showNpcDialog(npc);
      }
    });
    document.getElementById('btn-npc-buy-book')?.addEventListener('click', () => {
      if (this.gameState.player.silver >= 5) {
        this.gameState.addSilver(-5);
        this.gameState.addItem('book_classics', 1);
        this.gameState.addLog(`📖 Bạn mua được 1 cuốn Tứ Thư Ngũ Kinh từ ${npc.name}!`, 'success');
        EventBus.emit('STATE_CHANGED', this.gameState);
        this.showNpcDialog(npc);
      }
    });
    document.getElementById('btn-npc-buy-tea')?.addEventListener('click', () => {
      if (this.gameState.player.silver >= 2) {
        this.gameState.addSilver(-2);
        this.gameState.addItem('tea_pot', 1);
        this.gameState.addLog(`🍵 Bạn mua được 1 ấm trà Long Tỉnh từ ${npc.name}!`, 'success');
        EventBus.emit('STATE_CHANGED', this.gameState);
        this.showNpcDialog(npc);
      }
    });
    document.getElementById('btn-npc-talk')?.addEventListener('click', () => {
      this.gameState.player.stats.charm += 1;
      this.gameState.addLog(`🗣️ Bạn trò chuyện tâm đắc cùng ${npc.name} (+1 Khẩu Tài)!`, 'success');
      EventBus.emit('STATE_CHANGED', this.gameState);
      this.closeAllModals();
    });
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
      this.closeAllModals();
      if (onConfirm) onConfirm();
    };
    document.getElementById('btn-modal-no').onclick = () => {
      this.closeAllModals();
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
        this.closeAllModals();
        if (onAction) onAction();
      };
    }
    document.getElementById('btn-modal-close').onclick = () => {
      this.closeAllModals();
    };
  }

  showModalCustom({ title, bodyHtml, onInit }) {
    if (!this.modalGeneric) return;
    const mTitle = this.modalGeneric.querySelector('.modal-title');
    const mBody = this.modalGeneric.querySelector('.modal-body');

    mTitle.textContent = title;
    mBody.innerHTML = `
      <div>${bodyHtml}</div>
      <div class="modal-actions-row" style="margin-top:14px;">
        <button class="btn-cancel" id="btn-modal-custom-close">Đóng Lại</button>
      </div>
    `;

    this.modalGeneric.classList.add('modal-active');

    document.getElementById('btn-modal-custom-close').onclick = () => {
      this.closeAllModals();
    };

    if (onInit) {
      onInit(this.modalGeneric);
    }
  }

  closeAllModals() {
    if (this.modalInv) this.modalInv.classList.remove('modal-active');
    if (this.modalChar) this.modalChar.classList.remove('modal-active');
    if (this.modalGeneric) this.modalGeneric.classList.remove('modal-active');
    if (this.modalNpc) this.modalNpc.classList.remove('modal-active');
  }

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
