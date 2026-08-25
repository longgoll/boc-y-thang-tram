// =========================================================
// THƯ VIỆN PREFAB & ASCII CHUNK BLUEPRINT SYSTEM
// Cho phép thiết kế và tái sử dụng công trình cực kỳ trực quan
// =========================================================

// 1. BẢNG ĐỐI CHIẾU KÝ TỰ (TILE LEGEND DICTIONARY)
export const TILE_LEGEND = {
  // --- Địa hình cơ bản (100% Pure CSS Textures - Không dùng Icon rác) ---
  ' ': { type: 'grass', icon: '', name: 'Bãi Cỏ', solid: false, css: 'tile-grass' },
  ',': { type: 'road_dirt', icon: '', name: 'Đường Đất Thôn Quê', solid: false, css: 'tile-road-dirt' },
  '.': { type: 'road_stone', icon: '', name: 'Đường Lát Đá Đô Thành', solid: false, css: 'tile-road-stone' },
  'M': { type: 'road_marble', icon: '', name: 'Đại Lộ Cẩm Thạch Hoàng Cung', solid: false, css: 'tile-marble' },
  'Z': { type: 'plaza_stone', icon: '', name: 'Đại Quảng Trường Triều Nghi', solid: false, css: 'tile-plaza' },
  '~': { type: 'water', icon: '', name: 'Dòng Sông / Hào Nước', solid: true, css: 'tile-water' },
  'L': { type: 'water_lotus', icon: '🪷', name: 'Hồ Sen Ngọc Hậu Cung', solid: true, css: 'tile-lotus', interact: { type: 'lotus_pond' } },
  '=': { type: 'bridge_stone', icon: '', name: 'Cầu Đá Cẩm Thạch', solid: false, css: 'tile-bridge-stone', interact: { type: 'bridge_info' } },
  '-': { type: 'bridge_wood', icon: '', name: 'Cầu Thiên Lý', solid: false, css: 'tile-bridge', interact: { type: 'bridge_info' } },
  '^': { type: 'mountain', icon: '', name: 'Dãy Núi Thập Vạn', solid: true, css: 'tile-mountain' },
  'T': { type: 'tree', icon: '', name: 'Rừng Thông Cổ Thụ', solid: true, css: 'tile-tree' },
  'Y': { type: 'tree_garden', icon: '', name: 'Kỳ Hoa Cổ Thụ Ngự Viên', solid: true, css: 'tile-tree-garden' },

  // --- Tường & Cổng ---
  'W': { type: 'wall_stone', icon: '', name: 'Tường Thành Đá Xám', solid: true, css: 'tile-wall' },
  'P': { type: 'wall_palace', icon: '', name: 'Tường Thành Cấm Cung Sơn Son', solid: true, css: 'tile-wall-palace' },
  'G': { type: 'gate', icon: '🚪', name: 'Cổng Thành', solid: false, css: 'tile-gate' },
  'N': { type: 'palace_gate', icon: '⛩️', name: 'Cổng Ngọ Môn Hoàng Cung', solid: false, css: 'tile-palace-gate', interact: { type: 'palace_gate' } },

  // --- Công trình kiến trúc & Nhà cửa (Mái ngói Pure CSS) ---
  'R': { type: 'residence', icon: '', name: 'Khu Nhà Dân Cư', solid: true, css: 'tile-houses' },
  'C': { type: 'mansion', icon: '', name: 'Phủ Đệ Quan Gia', solid: true, css: 'tile-mansion' },
  'A': { type: 'throne_dais', icon: '', name: 'Bệ Đá Tam Cấp Điện Thái Hòa', solid: false, css: 'tile-throne-dais' },
  '#': { type: 'farmland', icon: '', name: 'Thửa Ruộng Củ Cải', solid: false, css: 'tile-farmland', isFarm: true },

  // --- Đồ vật tương tác sinh động ---
  'K': { type: 'throne', icon: '👑', name: 'Ngai Vàng Chín Rồng', solid: false, css: 'tile-throne', interact: { type: 'imperial_throne' } },
  'B': { type: 'drum', icon: '🥁', name: 'Trống Kêu Oan Đăng Văn Cổ', solid: false, css: 'tile-drum', interact: { type: 'justice_drum' } },
  'D': { type: 'court_desk', icon: '📜', name: 'Bàn Công Án Huyện Đường', solid: false, css: 'tile-court', interact: { type: 'court_desk' } },
  'J': { type: 'prison', icon: '⛓️', name: 'Cửa Ngục Giam Đại Lao', solid: false, css: 'tile-prison', interact: { type: 'prison_cell' } },
  'E': { type: 'exam_hall', icon: '📜', name: 'Văn Miếu Khảo Thí Viện', solid: false, css: 'tile-building', interact: { type: 'exam_hall' } },
  'V': { type: 'caravan', icon: '🏪', name: 'Long Môn Tiêu Cục', solid: false, css: 'tile-building', interact: { type: 'building', buildingId: 'caravan' } },
  'H': { type: 'house', icon: '🛖', name: 'Nhà Tranh Tiêu Diệp', solid: false, css: 'tile-house', interact: { type: 'rest' } },
  'O': { type: 'well', icon: '🪣', name: 'Giếng Nước', solid: false, css: 'tile-well', interact: { type: 'well' } },
  'S': { type: 'market_stall', icon: '🏮', name: 'Sạp Hàng Chợ Lớn', solid: false, css: 'tile-market-stall', interact: { type: 'market_stall_info' } },
  'X': { type: 'wood_node', icon: '🪵', name: 'Bãi Củi Khô', solid: false, css: 'tile-wood-node', interact: { type: 'gather_wood' } },
  'F': { type: 'herb_node', icon: '🌿', name: 'Bụi Thảo Dược', solid: false, css: 'tile-herb-node', interact: { type: 'gather_herb' } },

  // --- Vị trí NPC Thực thể ---
  '1': { type: 'npc_spot', icon: '👨‍💼', name: 'Sạp Vũ Thương Nhân', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'merchant_vu' } },
  '2': { type: 'npc_spot', icon: '🧑‍🎓', name: 'Học Quán Sĩ Tử', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'scholar_ly' } },
  '3': { type: 'npc_spot', icon: '👩‍🦰', name: 'Trà Quán Phong Nguyệt', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'tea_master_hoa' } },
  '4': { type: 'npc_spot', icon: '🌾', name: 'Lão Nông Ba', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'farmer_ba' } },
  '5': { type: 'npc_spot', icon: '💂', name: 'Trương Nha Dịch', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'guard_truong' } },
  '6': { type: 'npc_spot', icon: '👑', name: 'Quan Huyện Triệu', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'magistrate_quan' } },
};

// =========================================================
// 2. CÁC KHUÔN MẪU CÔNG TRÌNH TÁI SỬ DỤNG (REUSABLE PREFABS)
// =========================================================

// --- A. ĐIỆN THÁI HÒA & NGAI VÀNG HOÀNG CUNG ---
export const PREFAB_THAI_HOA_PALACE = [
  "PPPPPPPPPPPPPPPP",
  "PAAAAAAAAAAAAAAP",
  "PAAAAAAKKKAAAAAP",
  "PAAAAAAAAAAAAAAP",
  "PPPPPPPMMGPPPPPP"
];

// --- B. KHU PHỦ HUYỆN ĐƯỜNG NHA MÔN ---
export const PREFAB_YAMEN_COMPLEX = [
  "WWWWWWWWWWWWWWWW",
  "W..............W",
  "W..WWW...6.....W",
  "W..W.W...D.....W",
  "W..WJW.........W",
  "W..............W",
  "W...B..........W",
  "W.........5....W",
  "WWWWWWWGGWWWWWWW"
];

// --- C. TRƯỜNG THI & VĂN MIẾU ---
export const PREFAB_EXAM_ACADEMY = [
  "WWWWWWWWWWWWWWWW",
  "W..............W",
  "W......EE......W",
  "W..............W",
  "W..............W",
  "W..............W",
  "W..............W",
  "WWWWWWWGGWWWWWWW"
];

// --- D. KHU PHỐ DÂN CƯ A (4 Cụm nhà + ngõ nhỏ + giếng) ---
export const PREFAB_RESIDENTIAL_A = [
  "RRR..RRR",
  "RRR..RRR",
  "....O...",
  "RRR..RRR",
  "RRR..RRR"
];

// --- E. KHU PHỐ DÂN CƯ B (Nhà phố dài) ---
export const PREFAB_RESIDENTIAL_B = [
  "RRRRRRR",
  ".......",
  "RRRRRRR"
];

// --- F. KHU SẠP BUÔN CHỢ LỚN ---
export const PREFAB_MARKET_ROW = [
  "S.S.S.1.S.S",
  "...........",
  "S.S.S.S.S.S"
];

// --- G. ĐIỀN TRANG TIÊU DIỆP & RUỘNG CỦ CẢI ---
export const PREFAB_FARM_HOMESTEAD = [
  "H..4.O...",
  ".........",
  "########.",
  "########."
];

// =========================================================
// 3. ENGINE HÀM "DÁN" PREFAB & HELPER
// =========================================================

export function stampPrefab(grid, startR, startC, prefabArray, zone = null) {
  for (let r = 0; r < prefabArray.length; r++) {
    const rowStr = prefabArray[r];
    for (let c = 0; c < rowStr.length; c++) {
      const char = rowStr[c];
      const template = TILE_LEGEND[char] || TILE_LEGEND[' '];

      const targetR = startR + r;
      const targetC = startC + c;

      if (grid[targetR] && grid[targetR][targetC]) {
        const currentTile = grid[targetR][targetC];
        grid[targetR][targetC] = {
          ...currentTile,
          type: template.type,
          icon: template.icon,
          name: template.name,
          solid: template.solid,
          css: template.css,
          interact: template.interact ? { ...template.interact } : null,
          zone: zone || currentTile.zone
        };

        // Gán farmId tự động cho các ô ruộng
        if (template.isFarm) {
          const farmId = `farm_${targetR}_${targetC}`;
          grid[targetR][targetC].farmId = farmId;
          grid[targetR][targetC].interact = { type: 'farm', farmId };
        }
      }
    }
  }
}

export function fillAreaChar(grid, r1, c1, r2, c2, char, zone = null) {
  const template = TILE_LEGEND[char] || TILE_LEGEND[' '];
  for (let r = Math.max(0, r1); r <= Math.min(grid.length - 1, r2); r++) {
    for (let c = Math.max(0, c1); c <= Math.min(grid[0].length - 1, c2); c++) {
      const currentTile = grid[r][c];
      grid[r][c] = {
        ...currentTile,
        type: template.type,
        icon: template.icon,
        name: template.name,
        solid: template.solid,
        css: template.css,
        interact: template.interact ? { ...template.interact } : null,
        zone: zone || currentTile.zone
      };
    }
  }
}
