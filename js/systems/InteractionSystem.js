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

    // 8. Cung điện Cấm Cung / Cổng Ngọ Môn
    if (action.type === 'palace' || action.type === 'palace_gate') {
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
      return;
    }

    // 10. Trống kêu oan Đăng Văn Cổ
    if (action.type === 'justice_drum') {
      this.handleJusticeDrum();
      return;
    }

    // 11. Bàn công án Tri Huyện
    if (action.type === 'court_desk') {
      this.gameState.addLog('📜 [Bàn Công Án] Trên bàn đầy ắp sổ bộ điền trạch và hồ sơ án tích do Quan Huyện thụ lý.', 'info');
      return;
    }

    // 12. Ngục giam
    if (action.type === 'prison_cell') {
      this.gameState.addLog('⛓️ [Đại Lao Huyện Nha] Không khí u tối, tiếng xích sắt vang vọng. Nơi giam giữ những phạm nhân trọng tội.', 'warn');
      return;
    }

    // 13. Ngai vàng chín rồng
    if (action.type === 'imperial_throne') {
      if (this.gameState.player.stats.reputation >= 80) {
        this.gameState.addLog('👑 [Ngai Vàng Cửu Long] Bạn đứng trước bảo tọa chín rồng uy nghi, thâu tóm quyền lực thiên hạ trong tay!', 'story');
      } else {
        this.gameState.addLog('⚠️ Bạn ngước nhìn Ngai Vàng Chín Rồng lộng lẫy từ xa. Hãy rèn luyện để một ngày bước lên đỉnh cao triều đình!', 'info');
      }
      return;
    }

    // 14. Hồ sen Ngọc Hậu Cung
    if (action.type === 'lotus_pond') {
      this.gameState.addLog('🪷 [Hồ Sen Ngọc] Hoa sen nở rộ thơm ngát trong làn gió nhẹ. Cảnh sắc thần tiên thoát tục.', 'info');
      return;
    }

    // 15. Cầu đá Kim Thủy
    if (action.type === 'bridge_info') {
      this.gameState.addLog(action.prompt || '🌉 Cầu đá cẩm thạch nguy nga tráng lệ bắc qua sông Kim Thủy.', 'info');
      return;
    }

    // 16. Sạp hàng chợ
    if (action.type === 'market_stall_info') {
      this.gameState.addLog(action.prompt || '🏮 Khách mua hàng tấp nập, tiếng rao hàng vang rộn khắp con phố.', 'info');
      return;
    }

    // 17. Thái Bạch Tửu Lâu
    if (action.type === 'tavern') {
      EventBus.emit('OPEN_MODAL_CONFIRM', {
        title: '🍷 Thái Bạch Tửu Lâu',
        message: 'Bạn có muốn gọi một vò Nữ Nhi Hồng Thượng Hạng (Giá: 5 Bạc) để phục hồi ngay +5 Thể Lực (AP)?',
        onConfirm: () => {
          if (this.gameState.player.silver < 5) {
            this.gameState.addLog('⚠️ Bạn không đủ 5 Bạc để thanh toán tiền rượu!', 'warn');
            return;
          }
          this.gameState.addSilver(-5);
          this.gameState.player.ap = Math.min(this.gameState.player.maxAp, this.gameState.player.ap + 5);
          this.gameState.addLog('🍶 [Mỹ Tửu] Rượu ngon ngấm vào kinh mạch! Thể lực hồi phục +5 AP!', 'success');
          EventBus.emit('STATE_CHANGED', this.gameState);
        }
      });
      return;
    }

    // 18. Đồng Nhân Dược Điếm
    if (action.type === 'pharmacy') {
      EventBus.emit('OPEN_MODAL_INFO', {
        title: '💊 Đồng Nhân Dược Điếm',
        message: 'Hiệu thuốc danh tiếng ngàn năm. Có thể bán thảo dược thu gom được từ đồng quê để lấy Bạc.',
        actionBtnText: 'Bán 1 Bụi Thảo Dược (+5 Bạc)',
        actionDisabled: (this.gameState.inventory.herb || 0) < 1,
        onAction: () => {
          if (this.gameState.removeItem('herb', 1)) {
            this.gameState.addSilver(5);
            this.gameState.addLog('🌿 [Bán Thuốc] Đồng Chưởng Quỹ thu mua 1 Thảo Dược của bạn với giá 5 Bạc!', 'success');
            EventBus.emit('STATE_CHANGED', this.gameState);
          }
        }
      });
      return;
    }

    // 19. Khang Ký Tiền Trang
    if (action.type === 'bank') {
      this.gameState.addLog('🏦 [Khang Ký Tiền Trang] Ngân phiếu, vàng bạc chất đầy kho. Nơi tụ hội của các cự phú thiên hạ.', 'info');
      return;
    }

    // 20. Cẩm Tú Trang & Lò Rèn
    if (action.type === 'silk_shop') {
      this.gameState.addLog('👘 [Cẩm Tú Trang] Gấm vóc tơ lụa Tô Châu sặc sỡ, chỉ dành riêng cho quan gia và quý tộc kinh kỳ.', 'info');
      return;
    }
    if (action.type === 'forge') {
      this.gameState.addLog('⚒️ [Thiết Tượng Phô] Tiếng búa đập chan chát rèn giũa binh khí cho cấm quân triều đình.', 'info');
      return;
    }

    // 21. Sư tử đá & Cổng thành & Lục bộ
    if (action.type === 'stone_lion_info') {
      this.gameState.addLog('🦁 Cặp sư tử đá cẩm thạch oai phong trấn thủ trước cửa vương phủ quyền quý.', 'info');
      return;
    }
    if (action.type === 'gate_info') {
      this.gameState.addLog(`🚪 [${action.name || 'Cổng Thành'}] Cửa thành cao vút, tường thành kiên cố vững chãi ngàn năm.`, 'info');
      return;
    }
    if (action.type === 'ministry') {
      this.gameState.addLog(`📜 [${action.name || 'Nha Môn'}] Cơ quan trọng yếu của triều đình, cấm kẻ không phận sự dòm ngó.`, 'info');
      return;
    }
    if (action.type === 'academy_info') {
      this.gameState.addLog('🏛️ [Hàn Lâm Viện] Nơi lưu giữ hàng vạn pho sách cổ và văn bản quốc gia.', 'info');
      return;
    }
  }

  handleJusticeDrum() {
    EventBus.emit('OPEN_MODAL_CONFIRM', {
      title: '🥁 Đánh Trống Kêu Oan (Đăng Văn Cổ)',
      message: 'Bạn có muốn dùng dùi gõ vang hồi trống kêu oan thấu trời xanh? Hành động này tiêu hao 1 Thể Lực (AP) và thu hút sự chú ý của quan nha.',
      onConfirm: () => {
        if (!this.gameState.consumeAP(1)) return;
        this.gameState.player.stats.charm += 1;
        this.gameState.addLog('🥁 "Thùng! Thùng! Thùng!" Tiếng trống Đăng Văn vang dội khắp huyện đường! Uy đức và danh tiếng của bạn được bá tánh chú ý (+1 Khẩu Tài)!', 'story');
        EventBus.emit('STATE_CHANGED', this.gameState);
      }
    });
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
