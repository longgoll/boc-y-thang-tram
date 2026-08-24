import { EventBus } from '../core/EventBus.js';
import { NPCS } from '../data/npcs.js';

export class VirtualMapRenderer {
  constructor(containerElement, worldMap, camera, gameState) {
    this.container = containerElement;
    this.worldMap = worldMap;
    this.camera = camera;
    this.gameState = gameState;

    this.domCells = []; // Ma trận phần tử DOM cố định [r][c]
    this.createDomGrid();
  }

  // Khởi tạo lưới DOM cố định một lần duy nhất theo kích thước Camera
  createDomGrid() {
    this.container.innerHTML = '';
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(${this.camera.viewportCols}, var(--tile-size, 48px))`;
    this.container.style.gridTemplateRows = `repeat(${this.camera.viewportRows}, var(--tile-size, 48px))`;

    this.domCells = [];

    for (let vr = 0; vr < this.camera.viewportRows; vr++) {
      const row = [];
      for (let vc = 0; vc < this.camera.viewportCols; vc++) {
        const cell = document.createElement('div');
        cell.className = 'map-tile';
        cell.dataset.vr = vr;
        cell.dataset.vc = vc;

        // Nội dung bên trong ô
        const iconSpan = document.createElement('span');
        iconSpan.className = 'tile-icon';
        cell.appendChild(iconSpan);

        // Lớp hiển thị nhân vật / NPC đè lên
        const entitySpan = document.createElement('span');
        entitySpan.className = 'tile-entity';
        cell.appendChild(entitySpan);

        this.container.appendChild(cell);
        row.push({ element: cell, iconSpan, entitySpan });
      }
      this.domCells.push(row);
    }
  }

  // Cập nhật lại khung nhìn siêu tốc (O(viewport), chỉ tốn ~160 phép gán text/class)
  render() {
    const cam = this.camera.update(this.gameState.player.pos);
    const pPos = this.gameState.player.pos;

    for (let vr = 0; vr < this.camera.viewportRows; vr++) {
      for (let vc = 0; vc < this.camera.viewportCols; vc++) {
        const mapR = cam.startRow + vr;
        const mapC = cam.startCol + vc;

        const cellData = this.domCells[vr][vc];
        const tile = this.worldMap[mapR][mapC];

        // Gán tọa độ thực tế trên bản đồ để bắt sự kiện click
        cellData.element.dataset.mapR = mapR;
        cellData.element.dataset.mapC = mapC;

        // 1. Reset class & Áp dụng CSS địa hình
        cellData.element.className = `map-tile ${tile.css || 'tile-grass'}`;
        if (tile.solid) {
          cellData.element.classList.add('is-solid');
        }

        // 2. Icon địa hình hoặc trạng thái nông trại
        let baseIcon = tile.icon || '';
        
        // Xử lý động nếu đây là ô ruộng canh tác
        if (tile.farmId && this.gameState.farms[tile.farmId]) {
          const farm = this.gameState.farms[tile.farmId];
          if (farm.state === 'ready') {
            baseIcon = '🥕'; // Củ cải đã chín
            cellData.element.classList.add('farm-ready');
          } else if (farm.state === 'watered') {
            baseIcon = '💧🌱'; // Đang tưới nước lớn dần
            cellData.element.classList.add('farm-watered');
          } else if (farm.state === 'planted') {
            baseIcon = '🌱'; // Mới gieo hạt
            cellData.element.classList.add('farm-planted');
          } else {
            baseIcon = '🟫'; // Đất trống
            cellData.element.classList.add('farm-empty');
          }
        }

        cellData.iconSpan.textContent = baseIcon;

        // 3. Hiển thị Entity (Người chơi hoặc NPC)
        let entityIcon = '';
        let isPlayer = (mapR === pPos.r && mapC === pPos.c);

        if (isPlayer) {
          entityIcon = '🧙‍♂️';
          cellData.element.classList.add('has-player');
        } else {
          cellData.element.classList.remove('has-player');
          // Kiểm tra xem có NPC nào đang đứng ở ô này không
          if (tile.interact && tile.interact.type === 'npc') {
            const npc = NPCS[tile.interact.npcId];
            if (npc) {
              entityIcon = npc.avatar || '👤';
              cellData.element.classList.add('has-npc');
            }
          }
        }

        cellData.entitySpan.textContent = entityIcon;
      }
    }
  }
}
