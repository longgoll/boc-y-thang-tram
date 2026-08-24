import { GameState } from './core/GameState.js';
import { createWorldMapData, MAP_CONFIG } from './data/worldMap.js';
import { Camera } from './engine/Camera.js';
import { VirtualMapRenderer } from './engine/VirtualMapRenderer.js';
import { InputController } from './engine/InputController.js';
import { FarmingSystem } from './systems/FarmingSystem.js';
import { InteractionSystem } from './systems/InteractionSystem.js';
import { UIManager } from './ui/UIManager.js';
import { soundEngine } from './audio/SoundEffects.js';

// Khởi chạy ứng dụng game
window.addEventListener('DOMContentLoaded', () => {
  console.log('🏯 Khởi tạo Game "Bốc Y Thăng Trầm"...');

  // 1. Dữ liệu bản đồ & GameState
  const worldMap = createWorldMapData();
  const gameState = new GameState();
  gameState.loadGame(); // Tải lại tiến trình cũ nếu có

  // 2. Camera & Virtual Viewport (Màn hình hiển thị 15 cột x 11 hàng)
  const mapContainer = document.getElementById('map-grid-container');
  const camera = new Camera(15, 11, MAP_CONFIG.COLS, MAP_CONFIG.ROWS);

  // 3. Renderer tối ưu hiệu năng 60 FPS
  const renderer = new VirtualMapRenderer(mapContainer, worldMap, camera, gameState);

  // 4. Bộ điều khiển phím, chuột và tap-to-move
  const inputController = new InputController(gameState, worldMap, renderer);

  // 5. Hệ thống gameplay
  const farmingSystem = new FarmingSystem(gameState, renderer);
  const interactionSystem = new InteractionSystem(gameState, renderer);

  // 6. Giao diện & Âm thanh
  const uiManager = new UIManager(gameState, inputController);

  // 7. Render khung hình đầu tiên
  renderer.render();

  console.log('✅ Game đã sẵn sàng! Chúc bạn trải nghiệm thuận buồm xuôi gió.');
});
