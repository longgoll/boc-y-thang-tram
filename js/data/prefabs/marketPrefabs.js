// =========================================================
// PREFABS: PHỐ CHỢ, TỬU LÂU, TIỀN TRANG, DƯỢC ĐIẾM & SẠP BUÔN
// =========================================================

// --- 1. THÁI BẠCH TỬU LÂU ĐẠI VIỆN ---
// Tường và mái ngói là vật cản kiên cố (CCCC - solid: true).
// Chỉ có 1 quầy rượu duy nhất (t) và Chưởng Quỹ (v) để tương tác.
export const PREFAB_TAVERN_DISTRICT = [
  "CCCCCCCCCCCC",
  "CCCCCCCCCCCC",
  "CC........CC",
  "CC...v....CC",
  "CC...t....CC",
  "CCCC....CCCC"
];

// --- 2. ĐẠI SÁCH LAN THƯƠNG NGHIỆP (TIỀN TRANG + DƯỢC ĐIẾM + TƠ LỤA + LÒ RÈN) ---
// Thân nhà và mái ngói (RRRR) kiên cố (solid: true, không bị tương tác nhầm vào tường).
// Mỗi cửa hàng có 1 quầy giao dịch / NPC duy nhất đối diện đường đi.
export const PREFAB_COMMERCE_ROW = [
  "RRRR....RRRR",
  "RRRR....RRRR",
  "R..n....m..R",
  "............",
  "R..s....f..R",
  "RRRR....RRRR",
  "RRRR....RRRR"
];

// --- 3. LƯU LY XƯỞNG (PHỐ SĨ TỬ, TRÀ QUÁN PHONG NGUYỆT & THƯ HỌA) ---
export const PREFAB_SCHOLAR_STREET = [
  "RRRR....RRRR",
  "R..3....2..R",
  "............",
  "S.S.S..S.S.S"
];

// --- 4. DÃY SẠP HÀNG CHỢ LỚN TIỀN MÔN (HÀNG TRĂM MÓN, LỒNG ĐÈN ĐỎ) ---
export const PREFAB_MARKET_ROW = [
  "S.S.S.1.S.S.S.S.S.S",
  "...................",
  "S.S.S.S.S.V.S.S.S.S"
];

// --- 5. ĐIỀN TRANG TIÊU DIỆP & RUỘNG CỦ CẢI NGOẠI Ô ---
export const PREFAB_FARM_HOMESTEAD = [
  "H..4.O...........",
  ".................",
  "########.########",
  "########.########"
];
