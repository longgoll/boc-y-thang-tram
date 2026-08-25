// =========================================================
// ĐẠI BẢN ĐỒ THẾ GIỚI MỞ LIỀN MẠCH (SEAMLESS MEGA MAP 64x64)
// TẬP HỢP TỪ CÁC ASCII CHUNKS & PREFABS TÁI SỬ DỤNG
// =========================================================

import {
  TILE_LEGEND,
  PREFAB_THAI_HOA_PALACE,
  PREFAB_YAMEN_COMPLEX,
  PREFAB_EXAM_ACADEMY,
  PREFAB_RESIDENTIAL_A,
  PREFAB_MARKET_ROW,
  PREFAB_FARM_HOMESTEAD,
  stampPrefab,
  fillAreaChar
} from './prefabs.js';

export const MAP_CONFIG = {
  ROWS: 64,
  COLS: 64,
  TILE_SIZE: 52,
};

export { TILE_LEGEND };

export function createWorldMapData() {
  const R = MAP_CONFIG.ROWS;
  const C = MAP_CONFIG.COLS;

  // 1. Khởi tạo ma trận trống mặc định toàn bộ là đồng cỏ hoa dại
  const grid = [];
  for (let r = 0; r < R; r++) {
    const row = [];
    for (let c = 0; c < C; c++) {
      row.push({
        r,
        c,
        type: 'grass',
        icon: '',
        name: 'Đồng Cỏ Hoa Dại',
        solid: false,
        css: 'tile-grass',
        interact: null,
        zone: r < 19 ? 'PALACE' : r < 33 ? 'YAMEN' : r < 49 ? 'MARKET' : 'SUBURB'
      });
    }
    grid.push(row);
  }

  // 2. DÃY NÚI BAO BỌC TỨ PHÍA BẢN ĐỒ
  fillAreaChar(grid, 0, 0, 0, C - 1, '^');
  fillAreaChar(grid, R - 1, 0, R - 1, C - 1, '^');
  fillAreaChar(grid, 0, 0, R - 1, 0, '^');
  fillAreaChar(grid, 0, C - 1, R - 1, C - 1, '^');

  // 3. TRỤC ĐƯỜNG THẦN ĐẠO XUYÊN SUỐT NAM - BẮC (Cột 31, 32)
  fillAreaChar(grid, 1, 31, 18, 32, 'M', 'PALACE'); // Cẩm thạch hoàng cung
  fillAreaChar(grid, 19, 31, 48, 32, '.', 'MARKET'); // Đường đá kinh kỳ
  fillAreaChar(grid, 49, 31, 62, 32, ',', 'SUBURB'); // Đường đất có vệt xe

  // =========================================================================
  // PHÂN KHU 4: QUẦN THỂ TỬ CẤM THÀNH HOÀNG CUNG (Rows 1..18)
  // =========================================================================
  // Tường cấm cung đỏ sơn son
  fillAreaChar(grid, 1, 8, 1, 55, 'P', 'PALACE');
  fillAreaChar(grid, 18, 8, 18, 55, 'P', 'PALACE');
  fillAreaChar(grid, 1, 8, 18, 8, 'P', 'PALACE');
  fillAreaChar(grid, 1, 55, 18, 55, 'P', 'PALACE');

  // Cổng Ngọ Môn cấm vệ (Lầu Ngũ Phụng)
  fillAreaChar(grid, 18, 31, 18, 32, 'N', 'PALACE');

  // Ngự Hoa Viên & Kỳ hoa cổ thụ nở hoa hồng phấn
  for (let r = 2; r <= 5; r++) {
    for (let c = 12; c <= 51; c++) {
      if ((r + c) % 4 === 0 && !(c >= 28 && c <= 35)) {
        fillAreaChar(grid, r, c, r, c, 'Y', 'PALACE');
      }
    }
  }
  // 2 Hồ Sen Ngọc Hậu Cung
  fillAreaChar(grid, 3, 16, 4, 22, 'L', 'PALACE');
  fillAreaChar(grid, 3, 41, 4, 47, 'L', 'PALACE');

  // Điện Thái Hòa & Ngai Vàng Chín Rồng (Prefab)
  stampPrefab(grid, 6, 24, PREFAB_THAI_HOA_PALACE, 'PALACE');

  // Đại Quảng Trường Triều Nghi Lát Cẩm Thạch
  fillAreaChar(grid, 11, 16, 15, 47, 'Z', 'PALACE');
  fillAreaChar(grid, 11, 31, 15, 32, 'M', 'PALACE');

  // Các hàng Bia Phẩm Trật Quan Viên đứng chầu (Tả ban văn thần & Hữu ban võ tướng)
  fillAreaChar(grid, 12, 27, 14, 27, 'Q', 'PALACE');
  fillAreaChar(grid, 12, 29, 14, 29, 'Q', 'PALACE');
  fillAreaChar(grid, 12, 34, 14, 34, 'Q', 'PALACE');
  fillAreaChar(grid, 12, 36, 14, 36, 'Q', 'PALACE');

  // Sông Kim Thủy nhân tạo
  fillAreaChar(grid, 16, 12, 16, 51, '~', 'PALACE');

  // 5 Cây Cầu Đá Kim Thủy lan can chạm rồng
  [20, 26, 31, 32, 37, 43].forEach(col => {
    fillAreaChar(grid, 16, col, 16, col, '=', 'PALACE');
  });

  // Phủ đệ Nội các đại thần viền hai bên
  fillAreaChar(grid, 10, 9, 15, 14, 'C', 'PALACE');
  fillAreaChar(grid, 10, 49, 15, 54, 'C', 'PALACE');


  // =========================================================================
  // PHÂN KHU 3: KHU PHỦ HUYỆN ĐƯỜNG & VĂN MIẾU (Rows 19..32)
  // =========================================================================
  // Tường thành ngăn cách & Cổng nội phủ
  fillAreaChar(grid, 32, 8, 32, 55, 'W', 'YAMEN');
  fillAreaChar(grid, 32, 31, 32, 32, 'G', 'YAMEN');

  // Nha Môn Huyện Đường (Prefab)
  stampPrefab(grid, 22, 12, PREFAB_YAMEN_COMPLEX, 'YAMEN');

  // Trường Thi & Văn Miếu (Prefab)
  stampPrefab(grid, 22, 36, PREFAB_EXAM_ACADEMY, 'YAMEN');


  // =========================================================================
  // PHÂN KHU 2: PHỐ CHỢ GIAO THƯƠNG & DÂN CƯ ĐÔ THÀNH (Rows 33..48)
  // =========================================================================
  // Tường Thành Nam Đô & Cổng Chu Tước
  fillAreaChar(grid, 48, 4, 48, 59, 'W', 'MARKET');
  fillAreaChar(grid, 48, 31, 48, 32, 'G', 'MARKET');

  // Đại Lộ Chợ Đông Tây
  fillAreaChar(grid, 40, 8, 41, 55, '.', 'MARKET');

  // Dãy Sạp Buôn Chợ Lớn (Prefab)
  stampPrefab(grid, 39, 20, PREFAB_MARKET_ROW, 'MARKET');

  // Long Môn Tiêu Cục
  fillAreaChar(grid, 37, 18, 37, 18, 'V', 'MARKET');

  // Học Quán Sĩ Tử (Lý Thư Sinh)
  fillAreaChar(grid, 36, 45, 36, 45, '2', 'MARKET');

  // Trà Quán Phong Nguyệt (Hoa Chưởng Quỹ)
  fillAreaChar(grid, 39, 47, 39, 47, '3', 'MARKET');

  // Khu Dân Cư Phố Phường (Tái sử dụng PREFAB_RESIDENTIAL_A 4 lần ở 4 góc)
  stampPrefab(grid, 34, 9, PREFAB_RESIDENTIAL_A, 'MARKET');
  stampPrefab(grid, 43, 9, PREFAB_RESIDENTIAL_A, 'MARKET');
  stampPrefab(grid, 34, 48, PREFAB_RESIDENTIAL_A, 'MARKET');
  stampPrefab(grid, 43, 48, PREFAB_RESIDENTIAL_A, 'MARKET');


  // =========================================================================
  // PHÂN KHU 1: NGOẠI THÀNH & THÔN TRANG ĐIỀN VIÊN (Rows 49..63)
  // =========================================================================
  // Dòng Sông Lạc Thủy & Cầu Thiên Lý
  fillAreaChar(grid, 52, 1, 52, 62, '~', 'SUBURB');
  fillAreaChar(grid, 52, 31, 52, 32, '-', 'SUBURB');

  // Lối Nhỏ Điền Trang
  fillAreaChar(grid, 57, 16, 57, 31, ',', 'SUBURB');

  // Cụm Nhà Tranh Tiêu Diệp, Lão Nông Ba & 16 Ô Ruộng Củ Cải (Prefab)
  stampPrefab(grid, 56, 18, PREFAB_FARM_HOMESTEAD, 'SUBURB');

  // Rừng Thông Cổ Thụ & Bãi Củi Khô Tây Nam
  for (let r = 54; r <= 62; r++) {
    for (let c = 2; c <= 12; c++) {
      if ((r + c) % 2 === 0) {
        fillAreaChar(grid, r, c, r, c, 'T', 'SUBURB');
      } else {
        fillAreaChar(grid, r, c, r, c, 'X', 'SUBURB');
      }
    }
  }

  // Bãi Thảo Dược Đông Nam
  for (let r = 54; r <= 61; r++) {
    for (let c = 42; c <= 61; c++) {
      if ((r * 3 + c * 7) % 5 === 0) {
        fillAreaChar(grid, r, c, r, c, 'F', 'SUBURB');
      }
    }
  }

  return grid;
}
