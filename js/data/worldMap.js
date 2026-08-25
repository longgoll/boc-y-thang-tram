// =========================================================
// SIÊU ĐẠI BẢN ĐỒ KINH THÀNH BẮC KINH CỔ (SEAMLESS MEGA MAP 500x500)
// QUY MÔ: 250.000 Ô GẠCH - ĐẦY ĐỦ 5 TẦNG THÀNH, DỊCH TRẠM & TỨ ĐẠI GIA TỘC
// =========================================================

import {
  TILE_LEGEND,
  PREFAB_THAI_HOA_PALACE,
  PREFAB_TRUNG_HOA_PALACE,
  PREFAB_CAN_THANH_PALACE,
  PREFAB_NGO_MON_GATE,
  PREFAB_THAI_MIEU,
  PREFAB_XA_TAC_DAN,
  PREFAB_YAMEN_COMPLEX,
  PREFAB_SIX_MINISTRIES_WEST,
  PREFAB_SIX_MINISTRIES_EAST,
  PREFAB_EXAM_ACADEMY,
  PREFAB_HAN_LIN_ACADEMY,
  PREFAB_CO_ROYAL_MANSION,
  PREFAB_MO_DUNG_GENERAL_MANSION,
  PREFAB_GIA_CAT_SCHOLAR_MANSION,
  PREFAB_THAM_TYCOON_MANSION,
  PREFAB_SIHEYUAN_A,
  PREFAB_SIHEYUAN_B,
  PREFAB_RESIDENTIAL_BLOCK,
  PREFAB_CARRIAGE_STATION,
  PREFAB_TAVERN_DISTRICT,
  PREFAB_DUYET_LAI_INN,
  PREFAB_LY_VIEN_THEATER,
  PREFAB_PAWNSHOP_TEMPLE,
  PREFAB_COMMERCE_ROW,
  PREFAB_SCHOLAR_STREET,
  PREFAB_MARKET_ROW,
  PREFAB_DOCK_PORT,
  PREFAB_FARM_HOMESTEAD,
  PREFAB_INNER_GATE_COMPLEX,
  PREFAB_OUTER_GATE_COMPLEX,
  stampPrefab,
  fillAreaChar
} from './prefabs.js';

export const MAP_CONFIG = {
  ROWS: 500,
  COLS: 500,
  TILE_SIZE: 52,
};

export { TILE_LEGEND };

export function createWorldMapData() {
  const R = MAP_CONFIG.ROWS;
  const C = MAP_CONFIG.COLS;

  // 1. Khởi tạo ma trận toàn bộ bản đồ 500x500
  const grid = [];
  for (let r = 0; r < R; r++) {
    const row = [];
    for (let c = 0; c < C; c++) {
      let zone = 'SUBURB';
      if (r < 100) zone = 'PALACE';
      else if (r < 140) zone = 'IMPERIAL_CITY';
      else if (r < 270) zone = 'INNER_CITY';
      else if (r < 410) zone = 'OUTER_CITY';

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

  // 2. DÃY NÚI CẢNH SƠN & THẬP VẠN ĐẠI SƠN BAO BỌC TỨ PHÍA BẢN ĐỒ
  fillAreaChar(grid, 0, 0, 0, C - 1, '^');
  fillAreaChar(grid, R - 1, 0, R - 1, C - 1, '^');
  fillAreaChar(grid, 0, 0, R - 1, 0, '^');
  fillAreaChar(grid, 0, C - 1, R - 1, C - 1, '^');

  // Đỉnh Cảnh Sơn trấn yểm phía Bắc Tử Cấm Thành (Hàng 1..5)
  for (let r = 1; r <= 5; r++) {
    for (let c = 120; c <= 380; c++) {
      if ((r + c) % 2 === 0 && !(c >= 246 && c <= 253)) {
        fillAreaChar(grid, r, c, r, c, '^', 'PALACE');
      }
    }
  }

  // =========================================================================
  // TẦNG 1: TỬ CẤM THÀNH HOÀNG CUNG HOÀNG GIA (Rows 6..95, Cols 140..360)
  // =========================================================================
  // Tường Thành Cung Cấm Sơn Son Dát Vàng
  fillAreaChar(grid, 6, 140, 6, 360, 'P', 'PALACE');
  fillAreaChar(grid, 95, 140, 95, 360, 'P', 'PALACE');
  fillAreaChar(grid, 6, 140, 95, 140, 'P', 'PALACE');
  fillAreaChar(grid, 6, 360, 95, 360, 'P', 'PALACE');

  // Cổng Hậu Cung Phía Bắc
  fillAreaChar(grid, 6, 248, 6, 251, 'M', 'PALACE');

  // Cung Càn Thanh & Khôn Ninh Cung (Hàng 15, Cột 240)
  stampPrefab(grid, 15, 240, PREFAB_CAN_THANH_PALACE, 'PALACE');

  // Ngự Hoa Viên Bát Ngát & 2 Hồ Sen Ngọc Bích
  fillAreaChar(grid, 16, 160, 24, 210, 'L', 'PALACE');
  fillAreaChar(grid, 16, 290, 24, 340, 'L', 'PALACE');
  for (let r = 10; r <= 28; r++) {
    for (let c = 150; c <= 220; c++) {
      if ((r + c) % 3 === 0 && grid[r][c].type !== 'water_lotus') {
        fillAreaChar(grid, r, c, r, c, 'Y', 'PALACE');
      }
    }
    for (let c = 280; c <= 350; c++) {
      if ((r + c) % 3 === 0 && grid[r][c].type !== 'water_lotus') {
        fillAreaChar(grid, r, c, r, c, 'Y', 'PALACE');
      }
    }
  }

  // Điện Trung Hòa & Điện Bảo Hòa (Hàng 32, Cột 240)
  stampPrefab(grid, 32, 240, PREFAB_TRUNG_HOA_PALACE, 'PALACE');

  // Đại Điện Thái Hòa & Bệ Ngai Vàng Cửu Long (Hàng 48, Cột 238)
  stampPrefab(grid, 48, 238, PREFAB_THAI_HOA_PALACE, 'PALACE');

  // Đại Quảng Trường Triều Nghi Cẩm Thạch & Hàng Bia Phẩm Trật Quan Viên
  fillAreaChar(grid, 60, 160, 78, 340, 'Z', 'PALACE');
  fillAreaChar(grid, 60, 248, 78, 251, 'M', 'PALACE');
  // Bia phẩm trật Cửu Phẩm Triều Ban
  fillAreaChar(grid, 64, 244, 72, 244, 'Q', 'PALACE');
  fillAreaChar(grid, 64, 246, 72, 246, 'Q', 'PALACE');
  fillAreaChar(grid, 64, 253, 72, 253, 'Q', 'PALACE');
  fillAreaChar(grid, 64, 255, 72, 255, 'Q', 'PALACE');

  // Sông Kim Thủy nhân tạo & 5 Cây Cầu Đá Cẩm Thạch Chạm Rồng (Row 80)
  fillAreaChar(grid, 80, 150, 80, 350, '~', 'PALACE');
  [180, 210, 248, 249, 250, 251, 290, 320].forEach(col => {
    fillAreaChar(grid, 80, col, 80, col, '=', 'PALACE');
  });

  // Phủ Đệ Nội Các Đại Thần 2 Bên Cung Cấm
  fillAreaChar(grid, 50, 150, 70, 190, 'C', 'PALACE');
  fillAreaChar(grid, 50, 310, 70, 350, 'C', 'PALACE');

  // Cổng Ngọ Môn Lầu Ngũ Phụng (Hàng 88..95, Cột 238)
  stampPrefab(grid, 88, 238, PREFAB_NGO_MON_GATE, 'PALACE');

  // Dịch Trạm Xe Ngựa Cung Cấm (Hàng 96, Cột 256)
  stampPrefab(grid, 96, 256, PREFAB_CARRIAGE_STATION, 'PALACE');


  // =========================================================================
  // TẦNG 2: HOÀNG THÀNH VÙNG ĐỆM (Rows 101..140, Cols 80..420)
  // =========================================================================
  fillAreaChar(grid, 140, 80, 140, 420, 'P', 'IMPERIAL_CITY');
  fillAreaChar(grid, 101, 80, 140, 80, 'P', 'IMPERIAL_CITY');
  fillAreaChar(grid, 101, 420, 140, 420, 'P', 'IMPERIAL_CITY');

  // Cổng Thiên An Môn
  fillAreaChar(grid, 140, 248, 140, 251, 'G', 'IMPERIAL_CITY');

  // Thái Miếu (Tả - Đông: Cột 310)
  stampPrefab(grid, 110, 310, PREFAB_THAI_MIEU, 'IMPERIAL_CITY');
  // Xã Tắc Đàn (Hữu - Tây: Cột 170)
  stampPrefab(grid, 110, 170, PREFAB_XA_TAC_DAN, 'IMPERIAL_CITY');


  // =========================================================================
  // TẦNG 3: NỘI THÀNH (LỤC BỘ QUAN PHỦ & 4 ĐẠI GIA TỘC) (Rows 141..270)
  // =========================================================================
  // Đại Tường Thành Đá Xám Nội Thành & Hào Hộ Thành
  fillAreaChar(grid, 270, 50, 270, 450, 'W', 'INNER_CITY');
  fillAreaChar(grid, 141, 50, 270, 50, 'W', 'INNER_CITY');
  fillAreaChar(grid, 141, 450, 270, 450, 'W', 'INNER_CITY');

  // Hào Hộ Thành Nội Thành
  fillAreaChar(grid, 267, 60, 267, 440, '~', 'INNER_CITY');
  fillAreaChar(grid, 267, 248, 267, 251, '=', 'INNER_CITY');

  // Cổng Chính Dương Môn (Tiền Môn) (Hàng 264..267, Cột 238)
  stampPrefab(grid, 264, 238, PREFAB_INNER_GATE_COMPLEX, 'INNER_CITY');

  // Dịch Trạm Xe Ngựa Chính Dương Môn (Hàng 262, Cột 256)
  stampPrefab(grid, 262, 256, PREFAB_CARRIAGE_STATION, 'INNER_CITY');

  // 1. LỤC BỘ NHA MÔN TRIỀU ĐÌNH (Rows 160..175)
  // Tây: Lại Bộ & Binh Bộ (Cột 210)
  stampPrefab(grid, 160, 210, PREFAB_SIX_MINISTRIES_WEST, 'INNER_CITY');
  // Đông: Hộ Bộ & Hình Bộ (Cột 270)
  stampPrefab(grid, 160, 270, PREFAB_SIX_MINISTRIES_EAST, 'INNER_CITY');

  // 2. THUẬN THIÊN PHỦ HUYỆN ĐƯỜNG & ĐẠI LAO (Row 195, Col 160)
  stampPrefab(grid, 195, 160, PREFAB_YAMEN_COMPLEX, 'INNER_CITY');

  // 3. QUỐC TỬ GIÁM & HÀN LÂM VIỆN (Row 195, Col 310)
  stampPrefab(grid, 195, 310, PREFAB_EXAM_ACADEMY, 'INNER_CITY');
  stampPrefab(grid, 195, 340, PREFAB_HAN_LIN_ACADEMY, 'INNER_CITY');

  // 4. TỨ ĐẠI THẾ GIA QUÝ TỘC:
  // [Tây Quý] Cố Vương Phủ (Hoàng thân - Row 160, Col 100)
  stampPrefab(grid, 160, 100, PREFAB_CO_ROYAL_MANSION, 'INNER_CITY');
  // [Tây Quý] Mộ Dung Tướng Phủ (Võ bị - Row 210, Col 100)
  stampPrefab(grid, 210, 100, PREFAB_MO_DUNG_GENERAL_MANSION, 'INNER_CITY');
  // [Đông Phú] Gia Cát Thị Phủ (Đại học sĩ - Row 160, Col 370)
  stampPrefab(grid, 160, 370, PREFAB_GIA_CAT_SCHOLAR_MANSION, 'INNER_CITY');
  // [Đông Phú] Thẩm Gia Trang Viên (Cự phú giang nam - Row 210, Col 370)
  stampPrefab(grid, 210, 370, PREFAB_THAM_TYCOON_MANSION, 'INNER_CITY');

  // Dịch Trạm Tứ Đại Gia Tộc (Row 185, Col 256)
  stampPrefab(grid, 185, 256, PREFAB_CARRIAGE_STATION, 'INNER_CITY');

  // Các dãy Tứ Hợp Viện & Biệt Phủ quan viên Nội Thành
  for (let r = 230; r <= 250; r += 10) {
    stampPrefab(grid, r, 90, PREFAB_SIHEYUAN_A, 'INNER_CITY');
    stampPrefab(grid, r, 160, PREFAB_SIHEYUAN_B, 'INNER_CITY');
    stampPrefab(grid, r, 300, PREFAB_SIHEYUAN_B, 'INNER_CITY');
    stampPrefab(grid, r, 370, PREFAB_SIHEYUAN_A, 'INNER_CITY');
  }


  // =========================================================================
  // TẦNG 4: NGOẠI THÀNH (PHỐ CHỢ ĐA DẠNG & TỨ HỢP VIỆN TRIỆU DÂN) (Rows 271..410)
  // =========================================================================
  // Tường Thành Ngoại & Cổng Vĩnh Định Môn (Phía Nam)
  fillAreaChar(grid, 410, 30, 410, 470, 'W', 'OUTER_CITY');
  fillAreaChar(grid, 271, 30, 410, 30, 'W', 'OUTER_CITY');
  fillAreaChar(grid, 271, 470, 410, 470, 'W', 'OUTER_CITY');

  // Các đại lộ ngang kết nối phố phường ngoại thành
  fillAreaChar(grid, 300, 35, 301, 465, '.', 'OUTER_CITY');
  fillAreaChar(grid, 335, 35, 336, 465, '.', 'OUTER_CITY');
  fillAreaChar(grid, 370, 35, 371, 465, '.', 'OUTER_CITY');

  // 1. DỊCH TRẠM XE NGỰA TIỀN MÔN (Row 278, Col 256)
  stampPrefab(grid, 278, 256, PREFAB_CARRIAGE_STATION, 'OUTER_CITY');

  // 2. THÁI BẠCH TỬU LÂU ĐẠI VIỆN (Lầu Rượu 3 Tầng - Row 280, Col 210)
  stampPrefab(grid, 280, 210, PREFAB_TAVERN_DISTRICT, 'OUTER_CITY');

  // 3. DUYỆT LAI KHÁCH ĐIẾM (Quán Trọ Dừng Chân - Row 280, Col 275)
  stampPrefab(grid, 280, 275, PREFAB_DUYET_LAI_INN, 'OUTER_CITY');

  // 4. LÝ VIÊN HÍ VIỆN (Sân Khấu Tuồng Kinh Kịch - Row 310, Col 210)
  stampPrefab(grid, 310, 210, PREFAB_LY_VIEN_THEATER, 'OUTER_CITY');

  // 5. VẠN AN ĐƯƠNG ĐIẾM (Cầm Đồ) & THẦN TÀI MIẾU (Row 310, Col 275)
  stampPrefab(grid, 310, 275, PREFAB_PAWNSHOP_TEMPLE, 'OUTER_CITY');

  // 6. ĐẠI SÁCH LAN THƯƠNG NGHIỆP (Tiền Trang, Dược Điếm, Tơ Lụa, Lò Rèn - Row 345, Col 275)
  stampPrefab(grid, 345, 275, PREFAB_COMMERCE_ROW, 'OUTER_CITY');

  // 7. LƯU LY XƯỞNG (Phố Sĩ Tử & Trà Quán - Row 345, Col 210)
  stampPrefab(grid, 345, 210, PREFAB_SCHOLAR_STREET, 'OUTER_CITY');

  // 8. TIỀN MÔN ĐẠI NHAI: DÃY SẠP BUÔN CHỢ LỚN (Row 378, Col 238)
  stampPrefab(grid, 378, 238, PREFAB_MARKET_ROW, 'OUTER_CITY');

  // 9. DỊCH TRẠM ĐÔNG THỊ & TÂY THỊ
  stampPrefab(grid, 345, 170, PREFAB_CARRIAGE_STATION, 'OUTER_CITY');
  stampPrefab(grid, 345, 320, PREFAB_CARRIAGE_STATION, 'OUTER_CITY');

  // 10. BẠT NGÀN CÁC DÃY TỨ HỢP VIỆN DÂN CƯ TRIỆU DÂN & CÁC KHU ĐẤT TRỐNG
  // Phía Tây Ngoại Thành:
  for (let r = 280; r <= 390; r += 20) {
    stampPrefab(grid, r, 50, PREFAB_SIHEYUAN_A, 'OUTER_CITY');
    stampPrefab(grid, r, 120, PREFAB_SIHEYUAN_B, 'OUTER_CITY');
    stampPrefab(grid, r, 150, PREFAB_RESIDENTIAL_BLOCK, 'OUTER_CITY');
  }
  // Phía Đông Ngoại Thành:
  for (let r = 280; r <= 390; r += 20) {
    stampPrefab(grid, r, 340, PREFAB_SIHEYUAN_A, 'OUTER_CITY');
    stampPrefab(grid, r, 380, PREFAB_SIHEYUAN_B, 'OUTER_CITY');
    stampPrefab(grid, r, 420, PREFAB_RESIDENTIAL_BLOCK, 'OUTER_CITY');
  }

  // Cổng Vĩnh Định Môn (Phía Nam Ngoại Thành - Hàng 406..409, Cột 238)
  stampPrefab(grid, 406, 238, PREFAB_OUTER_GATE_COMPLEX, 'OUTER_CITY');

  // Dịch Trạm Vĩnh Định Môn (Hàng 404, Cột 256)
  stampPrefab(grid, 404, 256, PREFAB_CARRIAGE_STATION, 'OUTER_CITY');


  // =========================================================================
  // TẦNG 5: VÙNG NGOẠI Ô & ĐIỀN TRANG ĐỒNG QUÊ (Rows 411..500)
  // =========================================================================
  // Dòng Sông Lạc Thủy Mênh Mông (Row 440)
  fillAreaChar(grid, 440, 1, 440, 498, '~', 'SUBURB');
  fillAreaChar(grid, 440, 248, 440, 251, '-', 'SUBURB');

  // Bến Thuyền Giao Thương Lạc Thủy
  stampPrefab(grid, 439, 256, PREFAB_DOCK_PORT, 'SUBURB');

  // Dịch Trạm Thôn Quê Điền Trang
  stampPrefab(grid, 448, 256, PREFAB_CARRIAGE_STATION, 'SUBURB');

  // Lối Đi Đất Nối Điền Trang Tiêu Diệp
  fillAreaChar(grid, 455, 200, 455, 248, ',', 'SUBURB');

  // Điền Trang Tiêu Diệp, Lão Nông Ba & 32 Ô Ruộng Củ Cải
  stampPrefab(grid, 454, 200, PREFAB_FARM_HOMESTEAD, 'SUBURB');

  // Rừng Thông Cổ Thụ & Bãi Củi Khô Tây Nam
  for (let r = 445; r <= 495; r++) {
    for (let c = 10; c <= 180; c++) {
      if ((r + c) % 2 === 0) {
        fillAreaChar(grid, r, c, r, c, 'T', 'SUBURB');
      } else if ((r * c) % 7 === 0) {
        fillAreaChar(grid, r, c, r, c, 'X', 'SUBURB');
      }
    }
  }

  // Đồi Thảo Dược Đông Nam
  for (let r = 445; r <= 495; r++) {
    for (let c = 320; c <= 490; c++) {
      if ((r * 3 + c * 7) % 5 === 0) {
        fillAreaChar(grid, r, c, r, c, 'F', 'SUBURB');
      }
    }
  }

  // =========================================================================
  // TRỤC ĐẠI LỘ THẦN ĐẠO XUYÊN SUỐT BẮC - NAM (BẢO ĐẢM 100% THÔNG SUỐT)
  // =========================================================================
  fillAreaChar(grid, 6, 248, 100, 251, 'M', 'PALACE');       // Cẩm thạch Hoàng Cung
  fillAreaChar(grid, 101, 248, 140, 251, 'M', 'IMPERIAL_CITY'); // Cẩm thạch Hoàng Thành
  fillAreaChar(grid, 141, 248, 270, 251, '.', 'INNER_CITY');  // Đá phiến Nội Thành
  fillAreaChar(grid, 271, 248, 410, 251, '.', 'OUTER_CITY');  // Tiền Môn Đại Nhai Ngoại Thành
  fillAreaChar(grid, 411, 248, 495, 251, ',', 'SUBURB');      // Đường đất Ngoại Ô

  // Đảm bảo tất cả các cửa thành trên trục thần đạo là Cổng mở (không solid)
  fillAreaChar(grid, 88, 248, 88, 251, 'N', 'PALACE'); // Cổng Ngọ Môn Bắc
  fillAreaChar(grid, 95, 248, 95, 251, 'N', 'PALACE'); // Cổng Ngọ Môn Nam
  fillAreaChar(grid, 140, 248, 140, 251, 'G', 'IMPERIAL_CITY'); // Cổng Thiên An Môn
  fillAreaChar(grid, 264, 248, 264, 251, 'G', 'INNER_CITY'); // Cổng Chính Dương Môn Bắc
  fillAreaChar(grid, 267, 248, 267, 251, 'G', 'INNER_CITY'); // Cổng Chính Dương Môn Nam
  fillAreaChar(grid, 406, 248, 406, 251, 'G', 'OUTER_CITY'); // Cổng Vĩnh Định Môn Bắc
  fillAreaChar(grid, 409, 248, 409, 251, 'G', 'OUTER_CITY'); // Cổng Vĩnh Định Môn Nam

  return grid;
}
