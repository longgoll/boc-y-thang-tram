// Định nghĩa bản đồ thế giới mở rộng lớn (36 x 36 ô)
// Kết nối liền mạch: Vùng Ven (Thôn Trang) <-> Phố Chợ Sầm Uất <-> Kinh Thành Quyền Lực

export const MAP_CONFIG = {
  ROWS: 36,
  COLS: 36,
  TILE_SIZE: 48, // Kích thước mỗi ô (px)
};

// Loại địa hình cơ bản
export const TILE_TYPES = {
  GRASS: { id: 'grass', icon: '', name: 'Bãi Cỏ', solid: false, css: 'tile-grass' },
  ROAD_DIRT: { id: 'road_dirt', icon: '', name: 'Đường Đất Thôn Quê', solid: false, css: 'tile-road-dirt' },
  ROAD_STONE: { id: 'road_stone', icon: '', name: 'Đường Lát Đá Kinh Thành', solid: false, css: 'tile-road-stone' },
  WATER: { id: 'water', icon: '🌊', name: 'Dòng Sông / Hào Nước', solid: true, css: 'tile-water' },
  BRIDGE: { id: 'bridge', icon: '🪵', name: 'Cầu Đá Qua Sông', solid: false, css: 'tile-bridge' },
  WALL_STONE: { id: 'wall_stone', icon: '🧱', name: 'Tường Thành Đá', solid: true, css: 'tile-wall' },
  WALL_WOOD: { id: 'wall_wood', icon: '🪵', name: 'Hàng Rào Gỗ', solid: true, css: 'tile-fence' },
  TREE: { id: 'tree', icon: '🌲', name: 'Rừng Cây Rậm', solid: true, css: 'tile-tree' },
  MOUNTAIN: { id: 'mountain', icon: '⛰️', name: 'Dãy Núi Đá', solid: true, css: 'tile-mountain' },
};

// Hàm khởi tạo ma trận bản đồ thế giới
export function createWorldMapData() {
  const R = MAP_CONFIG.ROWS;
  const C = MAP_CONFIG.COLS;
  const grid = [];

  for (let r = 0; r < R; r++) {
    const row = [];
    for (let c = 0; c < C; c++) {
      // Mặc định ban đầu theo vùng
      let tile = {
        r,
        c,
        type: 'grass',
        icon: '',
        name: 'Đồng Cỏ',
        solid: false,
        css: 'tile-grass',
        interact: null,
        zone: r < 11 ? 'CITY' : r < 23 ? 'MARKET' : 'SUBURB'
      };

      // 1. DÃY NÚI BAO BỌC VIỀN BẢN ĐỒ
      if (r === 0 || r === R - 1 || c === 0 || c === C - 1) {
        tile.type = 'mountain';
        tile.icon = '⛰️';
        tile.solid = true;
        tile.css = 'tile-mountain';
      }
      
      // 2. DÒNG SÔNG PHÂN CÁCH VÙNG VEN VÀ PHỐ CHỢ (Row 22)
      else if (r === 22) {
        if (c === 17 || c === 18) {
          // Cầu đá qua sông
          tile.type = 'bridge';
          tile.icon = '🌉';
          tile.solid = false;
          tile.css = 'tile-bridge';
          tile.name = 'Cầu Thiên Lý';
        } else {
          tile.type = 'water';
          tile.icon = '🌊';
          tile.solid = true;
          tile.css = 'tile-water';
        }
      }

      // 3. TƯỜNG THÀNH NGĂN CÁCH PHỐ CHỢ VÀ KINH THÀNH (Row 10)
      else if (r === 10) {
        if (c === 17 || c === 18) {
          // Cổng thành lớn
          tile.type = 'road_stone';
          tile.icon = '🚪';
          tile.solid = false;
          tile.css = 'tile-gate';
          tile.name = 'Cổng Thành Chu Tước';
        } else {
          tile.type = 'wall_stone';
          tile.icon = '🧱';
          tile.solid = true;
          tile.css = 'tile-wall';
        }
      }

      // 4. TRỤC ĐƯỜNG CHÍNH (Đường lát đá từ Nam lên Bắc: Cột 17, 18)
      else if (c === 17 || c === 18) {
        if (r > 22) {
          tile.type = 'road_dirt';
          tile.css = 'tile-road-dirt';
          tile.name = 'Đường Thôn Ngoại Thành';
        } else {
          tile.type = 'road_stone';
          tile.css = 'tile-road-stone';
          tile.name = 'Trục Lộ Kinh Kỳ';
        }
      }

      // 5. CÁC ĐƯỜNG NHÁNH NGANG (Phố xá)
      else if (r === 16 && c >= 8 && c <= 28) {
        tile.type = 'road_stone';
        tile.css = 'tile-road-stone';
        tile.name = 'Đại Lộ Chợ Đông Tây';
      }
      else if (r === 30 && c >= 6 && c <= 20) {
        tile.type = 'road_dirt';
        tile.css = 'tile-road-dirt';
        tile.name = 'Lối Nhỏ Vào Điền Trang';
      }

      // ==========================================
      // CHI TIẾT VÙNG 1: VÙNG VEN & ĐIỀN TRANG (Rows 23 - 34)
      // ==========================================
      if (r >= 23 && r < R - 1) {
        // Nhà tranh người chơi
        if (r === 29 && c === 8) {
          tile.icon = '🛖';
          tile.name = 'Nhà Tranh Tiêu Diệp';
          tile.solid = false;
          tile.css = 'tile-house';
          tile.interact = { type: 'rest', prompt: '🛏️ Vào nhà nghỉ ngơi (Qua ngày mới, hồi 10 AP)' };
        }
        // Giếng nước thôn quê
        else if (r === 29 && c === 12) {
          tile.icon = '🪣';
          tile.name = 'Giếng Nước Thôn Đông';
          tile.solid = false;
          tile.css = 'tile-well';
          tile.interact = { type: 'well', prompt: '🚰 Múc nước ngọt dự trữ' };
        }
        // Cụm ruộng cày cấy (4 ô ruộng mẫu ban đầu)
        else if ((r === 31 || r === 32) && (c >= 8 && c <= 11)) {
          tile.icon = '🟫'; // Đất tơi xốp
          tile.name = 'Thửa Ruộng Củ Cải';
          tile.solid = false;
          tile.css = 'tile-farmland';
          tile.farmId = `farm_${r}_${c}`;
          tile.interact = { type: 'farm', farmId: `farm_${r}_${c}` };
        }
        // Khu Rừng rậm đốn củi phía Tây Nam (c từ 2 đến 5)
        else if (c >= 2 && c <= 5 && r >= 26 && r <= 33) {
          if ((r + c) % 2 === 0) {
            tile.icon = '🌲';
            tile.name = 'Rừng Thông Cổ Thụ';
            tile.solid = true;
            tile.css = 'tile-tree';
          } else {
            tile.icon = '🪵';
            tile.name = 'Bãi Củi Khô';
            tile.solid = false;
            tile.css = 'tile-wood-node';
            tile.interact = { type: 'gather_wood', prompt: '🪓 Đốn củi (Tốn 1 AP, nhận 2 Gỗ)' };
          }
        }
        // Bãi Thảo Dược ven sông phía Đông Nam
        else if (c >= 24 && c <= 32 && r >= 24 && r <= 27) {
          if ((r * c) % 3 === 0) {
            tile.icon = '🌿';
            tile.name = 'Bụi Thảo Dược Rừng';
            tile.solid = false;
            tile.css = 'tile-herb-node';
            tile.interact = { type: 'gather_herb', prompt: '🌿 Hái thảo dược (Tốn 1 AP, nhận 1 Thảo Dược)' };
          }
        }
      }

      // ==========================================
      // CHI TIẾT VÙNG 2: PHỐ CHỢ GIAO THƯƠNG (Rows 11 - 21)
      // ==========================================
      else if (r >= 11 && r <= 21) {
        // Quầy Thương Nhân Vũ (Chợ Lớn)
        if (r === 16 && c === 16) {
          tile.icon = '🏮';
          tile.name = 'Sạp Buôn Vũ Thương Nhân';
          tile.solid = false;
          tile.css = 'tile-npc-spot';
          tile.interact = { type: 'npc', npcId: 'merchant_vu' };
        }
        // Trà Quán Phong Nguyệt (Hoa Chưởng Quỹ)
        else if (r === 17 && c === 24) {
          tile.icon = '🍵';
          tile.name = 'Trà Quán Phong Nguyệt';
          tile.solid = false;
          tile.css = 'tile-npc-spot';
          tile.interact = { type: 'npc', npcId: 'tea_master_hoa' };
        }
        // Học Quán Lý Thư Sinh
        else if (r === 14 && c === 24) {
          tile.icon = '📖';
          tile.name = 'Học Quán Sĩ Tử';
          tile.solid = false;
          tile.css = 'tile-npc-spot';
          tile.interact = { type: 'npc', npcId: 'scholar_ly' };
        }
        // Tiêu Cục Long Môn (Vận tải hàng)
        else if (r === 15 && c === 10) {
          tile.icon = '🏪';
          tile.name = 'Long Môn Tiêu Cục';
          tile.solid = false;
          tile.css = 'tile-building';
          tile.interact = { type: 'building', buildingId: 'caravan', prompt: '🐎 Mua xe thồ & Mở đường buôn' };
        }
        // Các dãy nhà dân / phố xá trang trí
        else if ((r === 13 || r === 18) && ((c >= 10 && c <= 15) || (c >= 20 && c <= 23))) {
          tile.icon = '🏘️';
          tile.name = 'Khu Phố Dân Cư';
          tile.solid = true;
          tile.css = 'tile-houses';
        }
      }

      // ==========================================
      // CHI TIẾT VÙNG 3: KINH THÀNH & QUAN LỘ (Rows 1 - 9)
      // ==========================================
      else if (r >= 1 && r <= 9) {
        // Cung Điện Cấm Cung (Khóa giai đoạn đầu)
        if (r === 2 && (c === 17 || c === 18)) {
          tile.icon = '🏯';
          tile.name = 'Cổng Cấm Cung Sơn Son Dát Vàng';
          tile.solid = false;
          tile.css = 'tile-palace-gate';
          tile.interact = { type: 'palace', prompt: '👑 Tiếp kiến Hoàng Đế (Cần Uy Danh ≥ 80, Phẩm trật Nhị Phẩm)' };
        }
        // Phủ Huyện Lệnh (Tri Huyện)
        else if (r === 5 && c === 14) {
          tile.icon = '🏛️';
          tile.name = 'Nha Môn Huyện Đường';
          tile.solid = false;
          tile.css = 'tile-npc-spot';
          tile.interact = { type: 'npc', npcId: 'magistrate_quan' };
        }
        // Văn Miếu / Trường Thi Kinh Thành
        else if (r === 5 && c === 21) {
          tile.icon = '📜';
          tile.name = 'Văn Miếu & Trường Thi Quốc Tử';
          tile.solid = false;
          tile.css = 'tile-building';
          tile.interact = { type: 'exam_hall', prompt: '🎓 Đăng ký tham dự Khảo thí Hương Cử (Trí Lực ≥ 20)' };
        }
        // Lính gác cổng nha môn
        else if (r === 8 && c === 17) {
          tile.icon = '💂';
          tile.name = 'Trương Nha Dịch Đang Tuần Tra';
          tile.solid = false;
          tile.css = 'tile-npc-spot';
          tile.interact = { type: 'npc', npcId: 'guard_truong' };
        }
        // Phủ đệ các quan đại thần viền hai bên
        else if ((r === 3 || r === 4) && (c <= 12 || c >= 23)) {
          tile.icon = '🏯';
          tile.name = 'Vương Phủ Quan Gia';
          tile.solid = true;
          tile.css = 'tile-mansion';
        }
      }

      row.push(tile);
    }
    grid.push(row);
  }

  return grid;
}
