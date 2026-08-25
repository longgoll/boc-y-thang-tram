// =========================================================
// BẢNG ĐỐI CHIẾU KÝ TỰ TILE LEGEND (SIÊU ĐẠI KINH THÀNH BẮC KINH 500x500)
// Pure CSS Textures, Biển Hiệu Cổ Truyền, Dịch Trạm Xe Ngựa
// =========================================================

export const TILE_LEGEND = {
  // --- 1. ĐỊA HÌNH & MẶT ĐƯỜNG ---
  ' ': { type: 'grass', icon: '', name: 'Đồng Cỏ Tự Nhiên', solid: false, css: 'tile-grass' },
  ',': { type: 'road_dirt', icon: '', name: 'Đường Đất Vệt Xe Thồ', solid: false, css: 'tile-road-dirt' },
  '.': { type: 'road_stone', icon: '', name: 'Đường Lát Đá Phố Xá', solid: false, css: 'tile-road-stone' },
  'M': { type: 'road_marble', icon: '', name: 'Đại Lộ Thần Đạo Cẩm Thạch', solid: false, css: 'tile-marble' },
  'Z': { type: 'plaza_stone', icon: '', name: 'Đại Quảng Trường Triều Nghi', solid: false, css: 'tile-plaza' },
  'Q': { type: 'court_rank', icon: '', name: 'Bia Phẩm Trật Quan Viên', solid: false, css: 'tile-court-rank', interact: { type: 'court_rank_info' } },
  '~': { type: 'water', icon: '', name: 'Hào Hộ Thành / Sông Nước', solid: true, css: 'tile-water' },
  'L': { type: 'water_lotus', icon: '', name: 'Hồ Sen Ngọc Cấm Cung', solid: true, css: 'tile-lotus', interact: { type: 'lotus_pond' } },
  '=': { type: 'bridge_stone', icon: '', name: 'Cầu Đá Cẩm Thạch Lan Can Rồng', solid: false, css: 'tile-bridge-stone', interact: { type: 'bridge_info' } },
  '-': { type: 'bridge_wood', icon: '', name: 'Cầu Gỗ Phố Thị', solid: false, css: 'tile-bridge', interact: { type: 'bridge_info' } },
  '^': { type: 'mountain', icon: '', name: 'Dãy Cảnh Sơn Trấn Bắc', solid: true, css: 'tile-mountain' },
  'T': { type: 'tree', icon: '', name: 'Rừng Thông Cổ Thụ', solid: true, css: 'tile-tree' },
  'Y': { type: 'tree_garden', icon: '', name: 'Kỳ Hoa Dị Thảo Ngự Viên', solid: true, css: 'tile-tree-garden' },

  // --- 2. TƯỜNG THÀNH, CỔNG THÀNH & PHÒNG THỦ ---
  'W': { type: 'wall_stone', icon: '', name: 'Tường Thành Đá Xám', solid: true, css: 'tile-wall' },
  'P': { type: 'wall_palace', icon: '', name: 'Tường Thành Cung Cấm Sơn Son', solid: true, css: 'tile-wall-palace' },
  'G': { type: 'gate', icon: '', name: 'Cổng Thành Nam Đô', solid: false, css: 'tile-gate', interact: { type: 'gate_info', name: 'Cổng Thành' } },
  'N': { type: 'palace_gate', icon: '', name: 'Cổng Ngọ Môn (Lầu Ngũ Phụng)', solid: false, css: 'tile-palace-gate', interact: { type: 'palace_gate' } },
  'A': { type: 'throne_dais', icon: '', name: 'Bệ Đá Cửu Trùng Điện Thái Hòa', solid: false, css: 'tile-throne-dais' },
  'U': { type: 'stone_lion', icon: '🦁', name: 'Sư Tử Đá Trấn Trạch', solid: true, css: 'tile-stone-lion', interact: { type: 'stone_lion_info' } },
  'k': { type: 'flag_banner', icon: '🚩', name: 'Đại Kỳ Hiệu Lệnh Triều Đình', solid: false, css: 'tile-flag-banner' },

  // --- 3. BIỂN HIỆU CÔNG TRÌNH CỔ TRUYỀN (HANGING PLAQUES) ---
  '[': { type: 'sign_board', icon: '📜', name: 'Biển Hiệu Thư Pháp Mạ Vàng', solid: false, css: 'tile-sign-board', interact: { type: 'sign_info' } },

  // --- 4. DÂN CƯ, VƯƠNG PHỦ & NHÀ CỬA (PURE CSS MÁI NGÓI) ---
  'R': { type: 'residence', icon: '', name: 'Tứ Hợp Viện Nhà Dân', solid: true, css: 'tile-houses' },
  'C': { type: 'mansion', icon: '', name: 'Phủ Đệ / Nha Môn Hoàng Gia', solid: true, css: 'tile-mansion' },
  'H': { type: 'house', icon: '', name: 'Nhà Tranh Tiêu Diệp', solid: false, css: 'tile-house', interact: { type: 'rest' } },
  '#': { type: 'farmland', icon: '', name: 'Thửa Ruộng Củ Cải', solid: false, css: 'tile-farmland', isFarm: true },

  // --- 5. THƯƠNG NGHIỆP, DỊCH TRẠM, TỬU LÂU, KHÁCH ĐIẾM, HÍ VIỆN, CẦM ĐỒ ---
  'x': { type: 'carriage_station', icon: '🛺', name: 'Dịch Trạm Xa Phu (Xe Ngựa Đi Nhanh)', solid: false, css: 'tile-carriage-station', interact: { type: 'carriage' } },
  't': { type: 'tavern', icon: '🍷', name: 'Thái Bạch Tửu Lâu (Quầy Rượu)', solid: false, css: 'tile-tavern', interact: { type: 'tavern' } },
  'm': { type: 'pharmacy', icon: '💊', name: 'Đồng Nhân Dược Điếm (Quầy Thuốc)', solid: false, css: 'tile-pharmacy', interact: { type: 'pharmacy' } },
  'b': { type: 'bank', icon: '🏦', name: 'Khang Ký Tiền Trang (Quầy Ngân Lượng)', solid: false, css: 'tile-bank', interact: { type: 'bank' } },
  's': { type: 'silk_shop', icon: '👘', name: 'Cẩm Tú Trang (Quầy Tơ Lụa)', solid: false, css: 'tile-silk', interact: { type: 'silk_shop' } },
  'f': { type: 'forge', icon: '⚒️', name: 'Thiết Tượng Phô (Lò Rèn)', solid: false, css: 'tile-forge', interact: { type: 'forge' } },
  'i': { type: 'inn', icon: '🏨', name: 'Duyệt Lai Khách Điếm (Quầy Thuê Phòng)', solid: false, css: 'tile-building', interact: { type: 'inn' } },
  'h': { type: 'theater', icon: '🎭', name: 'Lý Viên Hí Viện (Sân Khấu Tuồng)', solid: false, css: 'tile-building', interact: { type: 'theater' } },
  'p': { type: 'pawnshop', icon: '🏷️', name: 'Vạn An Đương Điếm (Hiệu Cầm Đồ)', solid: false, css: 'tile-building', interact: { type: 'pawnshop' } },
  'y': { type: 'temple', icon: '🛕', name: 'Miếu Thần Tài & Văn Xương Các', solid: false, css: 'tile-building', interact: { type: 'temple' } },
  'V': { type: 'caravan', icon: '🏪', name: 'Long Môn Tiêu Cục', solid: false, css: 'tile-building', interact: { type: 'building', buildingId: 'caravan' } },
  'o': { type: 'dock', icon: '⛵', name: 'Bến Thuyền Giao Thương Lạc Thủy', solid: false, css: 'tile-building', interact: { type: 'dock' } },
  'S': { type: 'market_stall', icon: '', name: 'Sạp Buôn Chợ Lớn', solid: false, css: 'tile-market-stall', interact: { type: 'market_stall_info' } },
  'O': { type: 'well', icon: '', name: 'Giếng Nước Cổ', solid: false, css: 'tile-well', interact: { type: 'well' } },

  // --- 6. CƠ QUAN QUAN PHỦ, TRIỀU ĐÌNH & THI CỬ ---
  'K': { type: 'throne', icon: '', name: 'Ngai Vàng Chín Rồng', solid: false, css: 'tile-throne', interact: { type: 'imperial_throne' } },
  'B': { type: 'drum', icon: '', name: 'Trống Kêu Oan Đăng Văn Cổ', solid: false, css: 'tile-drum', interact: { type: 'justice_drum' } },
  'D': { type: 'court_desk', icon: '', name: 'Bàn Công Án Huyện Đường', solid: false, css: 'tile-court', interact: { type: 'court_desk' } },
  'J': { type: 'prison', icon: '', name: 'Cửa Ngục Giam Đại Lao', solid: false, css: 'tile-prison', interact: { type: 'prison_cell' } },
  'E': { type: 'exam_hall', icon: '📜', name: 'Quốc Tử Giám Khảo Thí Viện', solid: false, css: 'tile-building', interact: { type: 'exam_hall' } },
  'a': { type: 'academy', icon: '🏛️', name: 'Hàn Lâm Viện Tụ Khuê Các', solid: false, css: 'tile-building', interact: { type: 'academy_info' } },
  '6': { type: 'ministry_lai', icon: '📜', name: 'Lại Bộ Nha Môn (Tuyển bổ quan lại)', solid: false, css: 'tile-building', interact: { type: 'ministry', name: 'Lại Bộ' } },
  '7': { type: 'ministry_ho', icon: '💰', name: 'Hộ Bộ Nha Môn (Thuế khóa điền trạch)', solid: false, css: 'tile-building', interact: { type: 'ministry', name: 'Hộ Bộ' } },
  '8': { type: 'ministry_binh', icon: '⚔️', name: 'Binh Bộ Nha Môn (Vũ trang binh mã)', solid: false, css: 'tile-building', interact: { type: 'ministry', name: 'Binh Bộ' } },
  '9': { type: 'ministry_hinh', icon: '⚖️', name: 'Hình Bộ & Đại Lý Tự (Hình pháp trị an)', solid: false, css: 'tile-building', interact: { type: 'ministry', name: 'Hình Bộ' } },

  // --- 7. TÀI NGUYÊN THÔN NGOẠI ---
  'X': { type: 'wood_node', icon: '🪵', name: 'Bãi Củi Khô', solid: false, css: 'tile-wood-node', interact: { type: 'gather_wood' } },
  'F': { type: 'herb_node', icon: '🌿', name: 'Bụi Thảo Dược', solid: false, css: 'tile-herb-node', interact: { type: 'gather_herb' } },

  // --- 8. VỊ TRÍ NPC & LỰC LƯỢNG LÍNH GÁC (ENTITY SPOTS) ---
  '1': { type: 'npc_spot', icon: '🏮', name: 'Vũ Thương Nhân', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'merchant_vu' } },
  '2': { type: 'npc_spot', icon: '📖', name: 'Lý Thư Sinh', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'scholar_ly' } },
  '3': { type: 'npc_spot', icon: '🍵', name: 'Hoa Chưởng Quỹ', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'tea_master_hoa' } },
  '4': { type: 'npc_spot', icon: '🌾', name: 'Lão Nông Ba', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'farmer_ba' } },
  '5': { type: 'npc_spot', icon: '👮‍♂️', name: 'Trương Nha Dịch', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'guard_truong' } },
  'c': { type: 'npc_spot', icon: '👑', name: 'Quan Huyện Triệu', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'magistrate_quan' } },

  'g': { type: 'npc_spot', icon: '💂‍♂️', name: 'Lính Canh Cổng Thành', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'gate_guard' } },
  'w': { type: 'npc_spot', icon: '🛡️', name: 'Cấm Vệ Quân Hoàng Thành', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'palace_guard' } },
  'v': { type: 'npc_spot', icon: '🍷', name: 'Thôi Chưởng Quỹ (Tửu Lâu)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'tavern_keeper' } },
  'd': { type: 'npc_spot', icon: '💊', name: 'Đồng Chưởng Quỹ (Thầy Thuốc)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'doctor_dong' } },
  'n': { type: 'npc_spot', icon: '🏦', name: 'Khang Triệu Tài (Chủ Tiền Trang)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'banker_khang' } },
  'l': { type: 'npc_spot', icon: '🏯', name: 'Cố Thân Vương (Hoàng Thân)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'lord_co' } },
  'j': { type: 'npc_spot', icon: '⚔️', name: 'Mộ Dung Đại Tướng Quân (Võ Bị)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'general_modung' } },
  'e': { type: 'npc_spot', icon: '📜', name: 'Gia Cát Học Sĩ (Văn Học)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'scholar_giacat' } },
  'u': { type: 'npc_spot', icon: '💰', name: 'Thẩm Vạn Tam (Cự Phú Giang Nam)', solid: false, css: 'tile-npc-spot', interact: { type: 'npc', npcId: 'tycoon_tham' } }
};
