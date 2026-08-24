import { EventBus } from '../core/EventBus.js';

export class FarmingSystem {
  constructor(gameState, renderer) {
    this.gameState = gameState;
    this.renderer = renderer;

    EventBus.on('INTERACT_FARM', (data) => this.handleFarmInteract(data));
  }

  handleFarmInteract({ farmId }) {
    if (!this.gameState.farms[farmId]) {
      this.gameState.farms[farmId] = { state: 'empty', crop: null, dayPlanted: 0 };
    }

    const farm = this.gameState.farms[farmId];

    // TRƯỜNG HỢP 1: CỦ CẢI ĐÃ CHÍN -> THU HOẠCH
    if (farm.state === 'ready') {
      if (!this.gameState.consumeAP(1)) return;
      farm.state = 'empty';
      farm.crop = null;
      this.gameState.addItem('turnip', 2);
      this.gameState.addLog('🌾 [Thu Hoạch Thành Công] Bạn nhổ được 2 Củ Cải Trắng tươi rói (+2 Củ cải)!', 'success');
      this.renderer.render();
      EventBus.emit('SFX_HARVEST');
      return;
    }

    // TRƯỜNG HỢP 2: ĐÃ GIEO HẠT NHƯNG CHƯA TƯỚI -> TƯỚI NƯỚC
    if (farm.state === 'planted') {
      if (!this.gameState.consumeAP(1)) return;
      farm.state = 'watered';
      this.gameState.addLog('💧 [Tưới Nước] Bạn múc nước tưới đẫm thửa ruộng. Cây củ cải sẽ nhanh chóng lớn vào sáng mai!', 'info');
      this.renderer.render();
      EventBus.emit('SFX_WATER');
      return;
    }

    // TRƯỜNG HỢP 3: ĐANG TƯỚI RỒI (CHỜ SÁNG HÔM SAU)
    if (farm.state === 'watered') {
      this.gameState.addLog('🌱 Cây củ cải đang hút nước tươi tốt. Hãy về nhà ngủ qua đêm để chờ thu hoạch!', 'info');
      return;
    }

    // TRƯỜNG HỢP 4: ĐẤT TRỐNG -> GIEO HẠT
    if (farm.state === 'empty') {
      if ((this.gameState.inventory.turnip_seed || 0) <= 0) {
        this.gameState.addLog('⚠️ Bạn không còn Hạt Giống Củ Cải. Hãy đến Sạp Vũ Thương Nhân ở Phố Chợ để mua thêm!', 'warn');
        return;
      }

      if (!this.gameState.consumeAP(1)) return;
      this.gameState.removeItem('turnip_seed', 1);
      farm.state = 'planted';
      farm.crop = 'turnip';
      farm.dayPlanted = this.gameState.world.day;
      this.gameState.addLog('🌱 [Gieo Hạt] Bạn đã gieo hạt giống củ cải xuống luống đất. Hãy tiếp tục tưới nước!', 'success');
      this.renderer.render();
      EventBus.emit('SFX_PLANT');
    }
  }
}
