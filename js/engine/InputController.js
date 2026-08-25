import { EventBus } from '../core/EventBus.js';
import { PathFinding } from './PathFinding.js';

export class InputController {
  constructor(gameState, worldMap, renderer) {
    this.gameState = gameState;
    this.worldMap = worldMap;
    this.renderer = renderer;

    this.isMoving = false;
    this.moveQueue = [];
    this.pathTimer = null;

    this.initKeyboard();
    this.initMouseTap();
  }

  // Khởi tạo phím W, A, S, D và 4 Mũi tên
  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Nếu đang mở modal hoặc đang gõ phím thì bỏ qua
      if (document.querySelector('.modal-active') || e.target.tagName === 'INPUT') return;

      let dr = 0;
      let dc = 0;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          dr = -1;
          break;
        case 's':
        case 'arrowdown':
          dr = 1;
          break;
        case 'a':
        case 'arrowleft':
          dc = -1;
          break;
        case 'd':
        case 'arrowright':
          dc = 1;
          break;
        case ' ':
        case 'enter':
          // Phím tương tác nhanh tại chỗ
          this.triggerTileInteraction(this.gameState.player.pos.r, this.gameState.player.pos.c);
          return;
        default:
          return;
      }

      e.preventDefault();
      this.cancelAutoMove();
      this.attemptMove(dr, dc);
    });
  }

  // Chạm/Click trực tiếp lên ô bất kỳ để tự tìm đường bước tới (Tap-to-Move)
  initMouseTap() {
    this.renderer.container.addEventListener('click', (e) => {
      const tileEl = e.target.closest('.map-tile');
      if (!tileEl) return;

      const targetR = parseInt(tileEl.dataset.mapR, 10);
      const targetC = parseInt(tileEl.dataset.mapC, 10);

      if (isNaN(targetR) || isNaN(targetC)) return;

      // Nếu click vào chính ô nhân vật đang đứng -> Kích hoạt tương tác
      const pPos = this.gameState.player.pos;
      if (pPos.r === targetR && pPos.c === targetC) {
        this.triggerTileInteraction(targetR, targetC);
        return;
      }

      // Tìm đường đi BFS
      this.cancelAutoMove();
      const path = PathFinding.findPath(pPos, { r: targetR, c: targetC }, this.worldMap);

      if (path.length > 0) {
        this.moveAlongPath(path, { r: targetR, c: targetC });
      } else {
        // Nếu ô đó là vật cản nhưng có tương tác (ví dụ NPC đứng trên ô solid), thử tìm đường đến ô liền kề
        const neighbors = [
          { r: targetR - 1, c: targetC },
          { r: targetR + 1, c: targetC },
          { r: targetR, c: targetC - 1 },
          { r: targetR, c: targetC + 1 }
        ];
        for (const n of neighbors) {
          if (n.r >= 0 && n.r < this.worldMap.length && n.c >= 0 && n.c < this.worldMap[0].length) {
            const altPath = PathFinding.findPath(pPos, n, this.worldMap);
            if (altPath.length > 0) {
              this.moveAlongPath(altPath, { r: targetR, c: targetC });
              return;
            }
          }
        }
      }
    });
  }

  // Tự động bước từng bước theo danh sách tọa độ
  moveAlongPath(path, destination) {
    if (!path || path.length === 0) return;
    this.isMoving = true;
    this.moveQueue = [...path];

    const step = () => {
      if (this.moveQueue.length === 0) {
        this.isMoving = false;
        this.triggerTileInteraction(destination.r, destination.c);
        return;
      }

      const nextPos = this.moveQueue.shift();
      this.gameState.player.pos = nextPos;
      this.checkZoneChange(nextPos);
      this.renderer.render();
      EventBus.emit('PLAYER_MOVED', nextPos);

      this.pathTimer = setTimeout(step, 110); // Tốc độ bước chân 110ms mượt mà
    };

    step();
  }

  cancelAutoMove() {
    if (this.pathTimer) {
      clearTimeout(this.pathTimer);
      this.pathTimer = null;
    }
    this.isMoving = false;
    this.moveQueue = [];
  }

  // Bước 1 ô thủ công theo hướng
  attemptMove(dr, dc) {
    const current = this.gameState.player.pos;
    const nr = current.r + dr;
    const nc = current.c + dc;

    if (
      nr < 0 || nr >= this.worldMap.length ||
      nc < 0 || nc >= this.worldMap[0].length
    ) {
      return;
    }

    const tile = this.worldMap[nr][nc];
    if (tile.solid) {
      // Nếu đâm vào vật cản có tương tác (ví dụ cổng cung, cây đốn củi), kích hoạt tương tác
      if (tile.interact) {
        this.triggerTileInteraction(nr, nc);
      }
      return;
    }

    // Di chuyển hợp lệ
    this.gameState.player.pos = { r: nr, c: nc };
    this.checkZoneChange({ r: nr, c: nc });
    this.renderer.render();
    EventBus.emit('PLAYER_MOVED', { r: nr, c: nc });

    // Kích hoạt tương tác nếu ô bước vào có sự kiện
    if (tile.interact) {
      this.triggerTileInteraction(nr, nc);
    }
  }

  checkZoneChange(pos) {
    const tile = this.worldMap[pos.r][pos.c];
    let zoneName = 'Vùng Ven Điền Trang';
    if (tile.zone === 'PALACE') zoneName = 'Tử Cấm Thành Hoàng Cung';
    else if (tile.zone === 'YAMEN') zoneName = 'Phủ Huyện Đường & Văn Miếu';
    else if (tile.zone === 'MARKET') zoneName = 'Phố Chợ Giao Thương';
    else if (tile.zone === 'SUBURB') zoneName = 'Vùng Ven Điền Trang';

    if (this.gameState.world.currentZone !== zoneName) {
      this.gameState.world.currentZone = zoneName;
      this.gameState.addLog(`📍 Bạn đã đặt chân tới [${zoneName}].`, 'info');
      EventBus.emit('ZONE_CHANGED', zoneName);
    }
  }

  triggerTileInteraction(r, c) {
    const tile = this.worldMap[r][c];
    if (tile.interact) {
      EventBus.emit('INTERACT_TRIGGERED', { tile, r, c });
    }
  }
}
