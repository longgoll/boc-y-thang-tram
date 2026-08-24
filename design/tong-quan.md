TÀI LIỆU THIẾT KẾ KỸ THUẬT: DỰ ÁN "BỐC Y THĂNG TRẦM"(Từ Nông Dân Áo Vải Đến Đỉnh Cao Danh Vọng - Web Game 2D Pure CSS/Emoji)1. TỔNG QUAN HỆ THỐNG & TECH STACKMôi trường: Web Browser (Chạy mượt trên cả PC và Mobile, không cần cài đặt).Tech Stack: HTML5, CSS3 (CSS Grid + Flexbox), Javascript ES6 thuần (hoặc Vue/React).Đồ họa: 100% Thuần Code (CSS Pattern, Gradients viền hoàng gia/cổ trang, kết hợp Unicode Emoji làm Icon/NPC/Vật phẩm).Phong cách Gameplay: Sandbox RPG mô phỏng cuộc đời thế giới mở, điều khiển nhân vật di chuyển 2D trên lưới ma trận kết hợp hệ thống tương tác Text/Choice.2. KIẾN TRÚC DỮ LIỆU CỐT LÕI (CORE STATE DATA)JavaScriptconst gameState = {
  // Thời gian & Lượt chơi
  world: {
    day: 1,
    season: 'XUAN', // XUAN, HA, THU, DONG
    timeOfDay: 'SANG', // SANG, CHIEU, TOI
    currentMap: 'FARM' // 'FARM' (Ngoại thành), 'CITY' (Kinh thành)
  },

  // Chỉ số nhân vật chính
  player: {
    name: 'Tiêu Diệp',
    pos: { r: 5, c: 2 }, // Tọa độ trên lưới
    ap: 10,              // Action Points (Hồi phục mỗi sáng)
    maxAp: 10,
    health: 100,
    silver: 0,           // 💰 Ngân lượng (đồng/bạc)
    
    // Thuộc tính năng lực (0 - 100)
    stats: {
      strength: 10,      // 💪 Thể lực (Khai hoang, gánh nặng, bảo vệ bản thân)
      intelligence: 5,   // 🧠 Trí lực (Đọc sách, thi cử, tính toán)
      charm: 5,          // 🗣️ Khẩu tài (Mặc cả giá, thuyết phục NPC)
      reputation: 0      // 📜 Uy danh (Mở khóa tiếp kiến quan lại/hoàng đế)
    },
    
    title: 'Nông Phu Áo Vải' // Thân phận tiến hóa
  },

  // Kho đồ cá nhân
  inventory: {
    turnip: 0,           // 🥕 Củ cải tươi
    turnip_pickled: 0,   // 🏺 Củ cải muối
    seed_turnip: 5,      // 🌱 Hạt giống củ cải
    book_classics: 0     // 📖 Sách thánh hiền
  },

  // Quan hệ mạng lưới (NPC Affection: -100 đến 100)
  relationships: {
    merchant_vu: 0,      // Vũ Thương Nhân (Chợ Lớn)
    scholar_ly: 0,       // Lý Thư Sinh
    official_truong: 0   // Huyện Thừa Trương
  }
};
3. THIẾT KẾ BẢN ĐỒ & MA TRẬN 2 LỚP (MAP MATRIX)Bản đồ hiển thị bằng CSS Grid với kích thước cố định hoặc cuộn camera. Mỗi ô (Tile) là 1 object có thuộc tính: solid (vật cản), icon, cssClass, và actionId.A. Map Thôn Trang & Nông Trại (FARM)Kích thước: $8 \times 10$ ô.Cấu trúc:Nhà tranh của người chơi (🛖): Nơi nghỉ ngơi qua ngày (hồi phục AP).Ruộng củ cải (🌱 / 🥕): Gồm 4-6 ô đất có thể cày xới, gieo hạt, tưới nước và thu hoạch.Giếng nước (🪣): Lấy nước tưới ruộng.Cổng thôn / Lối đi (➡️): Chuyển map sang Kinh Thành (Tiêu tốn 2 AP di chuyển).B. Map Kinh Thành (CITY)Kích thước: $12 \times 14$ ô.Cấu trúc:Cổng thành đá (🧱) & Lính gác (💂): Kiểm tra thân phận hoặc thu thuế vào cổng.Trục đường lát đá (tile-road): Đường chính giao thương.Chợ Lớn (🏮 / 🧮): Nơi gặp Thương Nhân để bán củ cải, mua hạt giống, mua xe đẩy.Thư Viện / Trà Quán (📜 / 🍵): Nơi gặp Sĩ Tử, mua sách để luyện Trí lực.Phủ Huyện Lệnh (🏛️): Cửa quan nhận đăng ký thi Hương hoặc nhận việc nha dịch (Cần Uy danh $\ge 15$).Cấm Cung (🏯 / 👑): Cổng sơn son dát vàng dẫn vào Hoàng Cung (Khóa ở giai đoạn đầu).4. VÒNG LẶP GAMEPLAY BƯỚC NGOẶT (EARLY GAME FLOW)[Bắt đầu: Ngày 1]
       │
       ▼
Thu hoạch Củ Cải chín tại ruộng (Tốn 2 AP, nhận 10 Củ Cải)
       │
       ▼
Di chuyển ra Cổng Thôn sang Map Kinh Thành (Tốn 2 AP)
       │
       ▼
Gặp Thương Nhân tại Chợ Lớn:
  - Lựa chọn 1: Bán thô giá rẻ (Nhận 10 Bạc)
  - Lựa chọn 2: Dùng Khẩu tài thuyết phục bán giá cao (Nhận 15 Bạc nếu Charm > 5)
       │
       ▼
[NGÃ RẼ TỰ DO - DÙNG SỐ TIỀN ĐẦU TIÊN ĐỂ CHỌN HƯỚNG ĐI]
       ├─────────────────┬──────────────────┬─────────────────┐
       ▼                 ▼                  ▼                 ▼
 [ĐIỀN TRANG]       [THƯƠNG ĐẠO]       [CỬ NGHIỆP]      [MẠNG LƯỚI]
Mua hạt giống xịn   Mua xe đẩy nhỏ     Mua sách văn tự   Đãi rượu nha dịch
Mở rộng thêm đất    Chở hàng buôn sỉ   Vào quán đọc thi  Lấy tin tức cơ mật
5. CƠ CHẾ 4 NHÁNH PHÁT TRIỂN CHI TIẾTNhánh 1: Canh Nông $\rightarrow$ Đại Điền ChủLogic: Ruộng có 4 trạng thái: Đất khô $\rightarrow$ Đất ẩm $\rightarrow$ Cây non $\rightarrow$ Thu hoạch.Phát triển: Thuê nông hộ cày cấy tự động $\rightarrow$ Mua thêm đất $\rightarrow$ Xây kho chứa thóc $\rightarrow$ Thao túng nguồn lương thực cứu trợ triều đình khi có thiên tai.Nhánh 2: Thương Đạo $\rightarrow$ Đại Phú ThươngLogic: Hệ thống bảng giá biến động theo ngày/mùa (Ví dụ: Mùa đông giá than củi x2, mùa lũ giá gạo x3).Phát triển: Mua sạp hàng $\rightarrow$ Mua xe ngựa vận tiêu $\rightarrow$ Mở chi nhánh tại các trấn lân cận $\rightarrow$ Lập Thương Hội, cho triều đình vay ngân lượng.Nhánh 3: Đọc Sách $\rightarrow$ Thừa Tướng / Đại Học SĩLogic: Tiêu tốn AP tại Thư quán để tăng điểm intelligence.Cơ chế Thi cử (Định kỳ hàng năm):Thi Hương: Yêu cầu intelligence >= 25 $\rightarrow$ Đỗ Tú Tài, nhận chân Thư ký huyện đường.Thi Hội & Thi Đình: Yêu cầu intelligence >= 70, reputation >= 40 $\rightarrow$ Nhập triều làm Quan Lục Phẩm.Xử án & Tấu sớ: Đưa ra các quyết định chọn phương án chính trị giúp tăng/giảm Uy danh, Ngân khố quốc gia hoặc Lòng dân.Nhánh 4: Thế Lực Ngầm $\rightarrow$ Nhiếp Chính VươngLogic: Tặng quà, kết giao nâng cao chỉ số relationships.Phát triển: Chiêu mộ võ sĩ làm gia binh $\rightarrow$ Thâu tóm bảo an các bến tàu $\rightarrow$ Mua chuộc đại thần $\rightarrow$ Phát động chính biến hoặc phò tá tân vương.6. QUY CHUẨN XÂY DỰNG GIAO DIỆN (UI/CSS SPECS)Layout 3 Cột (Flexbox/Grid):Cột Trái (250px): Avatar chữ/emoji, Danh hiệu, Bảng chỉ số (AP, Bạc, Uy danh, Thể lực, Trí lực), Kho đồ.Cột Giữa (Khung chính): Map CSS Grid chứa nhân vật 🧙‍♂️ và các Tile địa hình tương tác.Cột Phải (300px): Hộp thoại cốt truyện (Event Log), Danh sách lựa chọn hành động (Text Choices), Nút "Kết Thúc Ngày / Đi Ngủ".Bảng màu gợi ý:Background chính: Nền tối #18181b.Viền khung, chữ tiêu đề: Vàng đồng #d4af37, Vàng cam #b45309.Khung Map: Viền gỗ #713f12, nền ô đất #2e5318, đường đá #52525b, hoàng cung #991b1b.7. CHECKLIST NHIỆM VỤ CHO AI CODE (PHASE 1 - MVP)Khởi tạo Engine di chuyển:[ ] Tạo ma trận 2D và render lưới ô bằng CSS Grid.[ ] Bắt sự kiện phím W/A/S/D hoặc nút bấm để di chuyển nhân vật 🧙‍♂️.[ ] Xử lý chặn đi qua ô có thuộc tính solid: true.Hệ thống Canh Nông & Thu Hoạch:[ ] Cho phép tương tác với ô Ruộng để nhổ củ cải, trừ AP và cộng vào Kho đồ.Cơ chế Chuyển Vùng & Giao Thương:[ ] Bước vào ô Cổng Thôn để chuyển màn hình sang map Chợ Kinh Thành.[ ] Bấm vào NPC Thương Nhân để mở bảng Modal bán củ cải lấy Bạc.Hệ thống Vòng lặp Ngày/Đêm:[ ] Nút "Về nhà đi ngủ" để reset lại điểm AP, tăng biến day += 1 và cập nhật lại trạng thái nông trại.