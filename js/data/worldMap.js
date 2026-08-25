// =========================================================
// ĐẠI BẢN ĐỒ KINH THÀNH BẮC KINH CỔ (SEAMLESS MEGA MAP 96x96)
// TÁI HIỆN BỐ CỤC: THÀNH NGOÀI -> THÀNH TRONG -> HOÀNG THÀNH -> TỬ CẤM THÀNH
// =========================================================

import {
  TILE_LEGEND,
  PREFAB_THAI_HOA_PALACE,
  PREFAB_CAN_THANH_PALACE,
  PREFAB_NGO_MON_GATE,
  PREFAB_THAI_MIEU,
  PREFAB_XA_TAC_DAN,
  PREFAB_YAMEN_COMPLEX,
  PREFAB_SIX_MINISTRIES_WEST,
  PREFAB_SIX_MINISTRIES_EAST,
  PREFAB_EXAM_ACADEMY,
  PREFAB_HAN_LIN_ACADEMY,
  PREFAB_ROYAL_MANSION,
  PREFAB_GENERAL_MANSION,
  PREFAB_MINISTER_MANSION,
  PREFAB_SIHEYUAN_A,
  PREFAB_SIHEYUAN_B,
  PREFAB_RESIDENTIAL_BLOCK,
  PREFAB_TAVERN_DISTRICT,
  PREFAB_COMMERCE_ROW,
  PREFAB_SCHOLAR_STREET,
  PREFAB_MARKET_ROW,
  PREFAB_FARM_HOMESTEAD,
  PREFAB_INNER_GATE_COMPLEX,
  PREFAB_OUTER_GATE_COMPLEX,
  stampPrefab,
  fillAreaChar
} from './prefabs.js';

export const MAP_CONFIG = {
  ROWS: 96,
  COLS: 96,
  TILE_SIZE: 52,
};

export { TILE_LEGEND };

export function createWorldMapData() {
  const R = MAP_CONFIG.ROWS;
  const C = MAP_CONFIG.COLS;

  // 1. Khởi tạo ma trận toàn bộ bản đồ với đồng cỏ tự nhiên
  const grid = [];
  for (let r = 0; r < R; r++) {
    const row = [];
    for (let c = 0; c < C; c++) {
      let zone = 'SUBURB';
      if (r < 22) zone = 'PALACE';
      else if (r < 28) zone = 'IMPERIAL_CITY';
      else if (r < 54) zone = 'INNER_CITY';
      else if (r < 80) zone = 'OUTER_CITY';

      row.push({
        r,
        c,
        type: 'grass',
        icon: '',
        name: 'Đồng Cỏ Tự Nhiên',
        solid: false,
        css: 'tile-grass',
        interact: null,
        zone
      });
    }
    grid.push(row);
  }

  // 2. DÃY NÚI CẢNH SƠN & THẬP VẠN ĐẠI SƠN BAO BỌC TỨ PHÍA
  fillAreaChar(grid, 0, 0, 0, C - 1, '^');
  fillAreaChar(grid, R - 1, 0, R - 1, C - 1, '^');
  fillAreaChar(grid, 0, 0, R - 1, 0, '^');
  fillAreaChar(grid, 0, C - 1, R - 1, C - 1, '^');

  // Đỉnh Cảnh Sơn trấn yểm phía Bắc Tử Cấm Thành (Hàng 1..2)
  for (let c = 20; c <= 75; c++) {
    if (c % 2 === 0 && !(c >= 45 && c <= 50)) {
      fillAreaChar(grid, 1, c, 1, c, '^', 'PALACE');
    }
  }

  // =========================================================================
  // TẦNG 1: TỬ CẤM THÀNH HOÀNG CUNG HOÀNG GIA (Rows 2..21, Cols 14..81)
  // =========================================================================
  // Tường Thành Cấm Cung Sơn Son Dát Vàng
  fillAreaChar(grid, 2, 14, 2, 81, 'P', 'PALACE');
  fillAreaChar(grid, 21, 14, 21, 81, 'P', 'PALACE');
  fillAreaChar(grid, 2, 14, 21, 14, 'P', 'PALACE');
  fillAreaChar(grid, 2, 81, 21, 81, 'P', 'PALACE');

  // Cổng Hậu Cung Phía Bắc (Row 2, Cols 46..49)
  fillAreaChar(grid, 2, 46, 2, 49, 'M', 'PALACE');

  // Hậu Cung & Càn Thanh Cung (Hàng 3..8, Cột 38)
  stampPrefab(grid, 3, 38, PREFAB_CAN_THANH_PALACE, 'PALACE');

  // Ngự Hoa Viên & 2 Hồ Sen Ngọc Bích
  fillAreaChar(grid, 4, 18, 6, 30, 'L', 'PALACE');
  fillAreaChar(grid, 4, 65, 6, 77, 'L', 'PALACE');
  for (let r = 3; r <= 8; r++) {
    for (let c = 16; c <= 34; c++) {
      if ((r + c) % 3 === 0 && grid[r][c].type !== 'water_lotus') {
        fillAreaChar(grid, r, c, r, c, 'Y', 'PALACE');
      }
    }
    for (let c = 61; c <= 79; c++) {
      if ((r + c) % 3 === 0 && grid[r][c].type !== 'water_lotus') {
        fillAreaChar(grid, r, c, r, c, 'Y', 'PALACE');
      }
    }
  }

  // Điện Thái Hòa & Ngai Vàng Cửu Long (Hàng 8, Cột 36)
  stampPrefab(grid, 8, 36, PREFAB_THAI_HOA_PALACE, 'PALACE');

  // Đại Quảng Trường Triều Nghi Cẩm Thạch & Hàng Bia Phẩm Trật Quan Viên
  fillAreaChar(grid, 13, 20, 16, 75, 'Z', 'PALACE');
  fillAreaChar(grid, 13, 46, 16, 49, 'M', 'PALACE');
  // Bia phẩm trật Tả Ban Văn Thần (Đông) & Hữu Ban Võ Tướng (Tây)
  fillAreaChar(grid, 14, 43, 15, 43, 'Q', 'PALACE');
  fillAreaChar(grid, 14, 45, 15, 45, 'Q', 'PALACE');
  fillAreaChar(grid, 14, 50, 15, 50, 'Q', 'PALACE');
  fillAreaChar(grid, 14, 52, 15, 52, 'Q', 'PALACE');

  // Sông Kim Thủy nhân tạo & 5 Cây Cầu Đá Cẩm Thạch Chạm Rồng
  fillAreaChar(grid, 17, 16, 17, 79, '~', 'PALACE');
  [28, 38, 46, 47, 48, 49, 57, 67].forEach(col => {
    fillAreaChar(grid, 17, col, 17, col, '=', 'PALACE');
  });

  // Phủ Đệ Nội Các Đại Thần 2 bên Cấm Cung
  fillAreaChar(grid, 10, 16, 15, 24, 'C', 'PALACE');
  fillAreaChar(grid, 10, 71, 15, 79, 'C', 'PALACE');

  // Cổng Ngọ Môn (Lầu Ngũ Phụng & Cấm Vệ - Hàng 18..21)
  stampPrefab(grid, 18, 36, PREFAB_NGO_MON_GATE, 'PALACE');


  // =========================================================================
  // TẦNG 2: HOÀNG THÀNH VÙNG ĐỆM (Rows 22..27)
  // Tả Tổ Hữu Xã (Thái Miếu - Đông, Xã Tắc Đàn - Tây) & Cổng Thiên An Môn
  // =========================================================================
  fillAreaChar(grid, 27, 8, 27, 87, 'P', 'IMPERIAL_CITY');
  fillAreaChar(grid, 22, 8, 27, 8, 'P', 'IMPERIAL_CITY');
  fillAreaChar(grid, 22, 87, 27, 87, 'P', 'IMPERIAL_CITY');
  // Cổng Thiên An Môn
  fillAreaChar(grid, 27, 46, 27, 49, 'G', 'IMPERIAL_CITY');

  // Thái Miếu (Tả - Phía Đông: Cột 60)
  stampPrefab(grid, 22, 60, PREFAB_THAI_MIEU, 'IMPERIAL_CITY');
  // Xã Tắc Đàn (Hữu - Phía Tây: Cột 24)
  stampPrefab(grid, 22, 24, PREFAB_XA_TAC_DAN, 'IMPERIAL_CITY');


  // =========================================================================
  // TẦNG 3: NỘI THÀNH (ĐÔNG PHÚ - TÂY QUÝ & LỤC BỘ NHA MÔN) (Rows 28..53)
  // =========================================================================
  // Đại Tường Thành Đá Xám Nội Thành & Hào Hộ Thành
  fillAreaChar(grid, 53, 6, 53, 89, 'W', 'INNER_CITY');
  fillAreaChar(grid, 28, 6, 53, 6, 'W', 'INNER_CITY');
  fillAreaChar(grid, 28, 89, 53, 89, 'W', 'INNER_CITY');

  // Hào Hộ Thành Nội Thành
  fillAreaChar(grid, 52, 8, 52, 87, '~', 'INNER_CITY');
  // Cầu đá qua hào hộ thành
  fillAreaChar(grid, 52, 46, 52, 49, '=', 'INNER_CITY');

  // 1. TRỤC ĐẠI QUẦN THỂ LỤC BỘ NHA MÔN TRIỀU ĐÌNH (Rows 30..37)
  // Tây: Lại Bộ & Binh Bộ (Cột 24)
  stampPrefab(grid, 30, 24, PREFAB_SIX_MINISTRIES_WEST, 'INNER_CITY');
  // Đông: Hộ Bộ & Hình Bộ (Cột 52)
  stampPrefab(grid, 30, 52, PREFAB_SIX_MINISTRIES_EAST, 'INNER_CITY');

  // 2. "TÂY QUÝ": CỐ THÂN VƯƠNG PHỦ & TƯỚNG QUÂN PHỦ (Phía Tây Nội Thành)
  stampPrefab(grid, 30, 8, PREFAB_ROYAL_MANSION, 'INNER_CITY');
  stampPrefab(grid, 40, 24, PREFAB_GENERAL_MANSION, 'INNER_CITY');
  stampPrefab(grid, 40, 8, PREFAB_YAMEN_COMPLEX, 'INNER_CITY');

  // 3. "ĐÔNG PHÚ": THƯỢNG THƯ PHỦ, HÀN LÂM VIỆN & KHẢO THÍ VIỆN (Phía Đông Nội Thành)
  stampPrefab(grid, 30, 72, PREFAB_MINISTER_MANSION, 'INNER_CITY');
  stampPrefab(grid, 40, 56, PREFAB_HAN_LIN_ACADEMY, 'INNER_CITY');
  stampPrefab(grid, 40, 72, PREFAB_EXAM_ACADEMY, 'INNER_CITY');

  // Cổng Chính Dương Môn (Tiền Môn) đồ sộ với lính gác (Hàng 50..53)
  stampPrefab(grid, 50, 36, PREFAB_INNER_GATE_COMPLEX, 'INNER_CITY');


  // =========================================================================
  // TẦNG 4: NGOẠI THÀNH (THƯƠNG NGHIỆP SẦM UẤT & TỨ HỢP VIỆN BẠT NGÀN) (Rows 54..79)
  // =========================================================================
  // Tường Thành Ngoại & Cổng Vĩnh Định Môn (Phía Nam)
  fillAreaChar(grid, 79, 4, 79, 91, 'W', 'OUTER_CITY');
  fillAreaChar(grid, 54, 4, 79, 4, 'W', 'OUTER_CITY');
  fillAreaChar(grid, 54, 91, 79, 91, 'W', 'OUTER_CITY');

  // 1. THÁI BẠCH TỬU LÂU ĐẠI VIỆN (Lầu rượu hoành tráng - Row 54, Col 26)
  stampPrefab(grid, 54, 26, PREFAB_TAVERN_DISTRICT, 'OUTER_CITY');

  // 2. ĐẠI SÁCH LAN THƯƠNG NGHIỆP (Tiền Trang, Dược Điếm, Tơ Lụa, Lò Rèn - Row 54, Col 58)
  stampPrefab(grid, 54, 58, PREFAB_COMMERCE_ROW, 'OUTER_CITY');

  // Các đại lộ ngang kết nối phố phường ngoại thành (thông suốt không bị nhà che)
  fillAreaChar(grid, 62, 6, 63, 89, '.', 'OUTER_CITY');
  fillAreaChar(grid, 71, 6, 72, 89, '.', 'OUTER_CITY');

  // 3. TIỀN MÔN ĐẠI NHAI: DÃY SẠP BUÔN CHỢ LỚN TRĂM MÓN (Row 65, Col 38)
  stampPrefab(grid, 65, 38, PREFAB_MARKET_ROW, 'OUTER_CITY');

  // 4. LƯU LY XƯỞNG (Phố Sĩ Tử & Trà Quán Phong Nguyệt - Row 65, Col 22)
  stampPrefab(grid, 65, 22, PREFAB_SCHOLAR_STREET, 'OUTER_CITY');

  // 5. BẠT NGÀN CÁC DÃY TỨ HỢP VIỆN SIHEYUAN & HỒ ĐỒNG DÂN CƯ TRIỆU DÂN
  // Phía Tây Ngoại Thành:
  stampPrefab(grid, 54, 10, PREFAB_SIHEYUAN_A, 'OUTER_CITY');
  stampPrefab(grid, 64, 10, PREFAB_SIHEYUAN_B, 'OUTER_CITY');
  stampPrefab(grid, 73, 8, PREFAB_RESIDENTIAL_BLOCK, 'OUTER_CITY');
  stampPrefab(grid, 73, 23, PREFAB_SIHEYUAN_A, 'OUTER_CITY');

  // Phía Đông Ngoại Thành:
  stampPrefab(grid, 54, 74, PREFAB_SIHEYUAN_A, 'OUTER_CITY');
  stampPrefab(grid, 64, 74, PREFAB_SIHEYUAN_B, 'OUTER_CITY');
  stampPrefab(grid, 73, 60, PREFAB_SIHEYUAN_B, 'OUTER_CITY');
  stampPrefab(grid, 73, 75, PREFAB_RESIDENTIAL_BLOCK, 'OUTER_CITY');

  // Cổng Vĩnh Định Môn (Phía Nam Ngoại Thành - Hàng 76..79)
  stampPrefab(grid, 76, 36, PREFAB_OUTER_GATE_COMPLEX, 'OUTER_CITY');


  // =========================================================================
  // TẦNG 5: VÙNG NGOẠI Ô & ĐIỀN TRANG ĐỒNG QUÊ (Rows 80..95)
  // =========================================================================
  // Dòng Sông Lạc Thủy & Cầu Gỗ Thiên Lý
  fillAreaChar(grid, 82, 1, 82, 94, '~', 'SUBURB');
  fillAreaChar(grid, 82, 46, 82, 49, '-', 'SUBURB');

  // Lối Đi Đất Nối Điền Trang
  fillAreaChar(grid, 86, 30, 86, 47, ',', 'SUBURB');

  // Điền Trang Tiêu Diệp, Lão Nông Ba & 32 Ô Ruộng Củ Cải
  stampPrefab(grid, 85, 30, PREFAB_FARM_HOMESTEAD, 'SUBURB');

  // Rừng Thông Cổ Thụ & Bãi Củi Khô Tây Nam (Ngoại Ô)
  for (let r = 84; r <= 94; r++) {
    for (let c = 2; c <= 25; c++) {
      if ((r + c) % 2 === 0) {
        fillAreaChar(grid, r, c, r, c, 'T', 'SUBURB');
      } else if ((r * c) % 5 === 0) {
        fillAreaChar(grid, r, c, r, c, 'X', 'SUBURB');
      }
    }
  }

  // Bãi Thảo Dược & Hoa Dại Đông Nam (Ngoại Ô)
  for (let r = 84; r <= 94; r++) {
    for (let c = 68; c <= 93; c++) {
      if ((r * 3 + c * 7) % 4 === 0) {
        fillAreaChar(grid, r, c, r, c, 'F', 'SUBURB');
      }
    }
  }

  // =========================================================================
  // TRỤC ĐẠI LỘ THẦN ĐẠO XUYÊN SUỐT BẮC - NAM (BẢO ĐẢM 100% THÔNG SUỐT)
  // =========================================================================
  fillAreaChar(grid, 2, 47, 21, 48, 'M', 'PALACE');       // Cẩm thạch Hoàng Cung
  fillAreaChar(grid, 22, 47, 27, 48, 'M', 'IMPERIAL_CITY'); // Cẩm thạch Hoàng Thành
  fillAreaChar(grid, 28, 47, 53, 48, '.', 'INNER_CITY');  // Đá phiến Nội Thành
  fillAreaChar(grid, 54, 47, 79, 48, '.', 'OUTER_CITY');  // Tiền Môn Đại Nhai Ngoại Thành
  fillAreaChar(grid, 80, 47, 94, 48, ',', 'SUBURB');      // Đường đất Ngoại Ô

  // Đảm bảo tất cả các cửa thành trên trục thần đạo là Cổng mở (không solid)
  fillAreaChar(grid, 18, 47, 18, 48, 'N', 'PALACE'); // Cổng Ngọ Môn
  fillAreaChar(grid, 21, 47, 21, 48, 'N', 'PALACE'); // Cổng Ngọ Môn Nam
  fillAreaChar(grid, 27, 47, 27, 48, 'G', 'IMPERIAL_CITY'); // Cổng Thiên An Môn
  fillAreaChar(grid, 50, 47, 50, 48, 'G', 'INNER_CITY'); // Cổng Chính Dương Môn Bắc
  fillAreaChar(grid, 53, 47, 53, 48, 'G', 'INNER_CITY'); // Cổng Chính Dương Môn Nam
  fillAreaChar(grid, 76, 47, 76, 48, 'G', 'OUTER_CITY'); // Cổng Vĩnh Định Môn Bắc
  fillAreaChar(grid, 79, 47, 79, 48, 'G', 'OUTER_CITY'); // Cổng Vĩnh Định Môn Nam

  return grid;
}
