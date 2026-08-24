# Kế Hoạch Triển Khai: Game "Bốc Y Thăng Trầm" (World Map Liên Hoàn & Engine Viewport 60FPS)

Xây dựng nền tảng game thế giới mở thu nhỏ liền mạch (Seamless/Connected World Map) bao gồm: **Vùng Ven Điền Trang $\rightarrow$ Phố Chợ Giao Thương $\rightarrow$ Kinh Đô Quyền Lực**, vận hành trên cơ chế **Virtual Viewport Camera** (không giật lag) cùng hệ thống State & Event Bus chuyên nghiệp.

---

## 1. Thiết Kế Bản Đồ Thế Giới Mở Rộng (Connected World Map)

Bản đồ sẽ được thiết kế liền mạch theo trục Tây-Nam $\rightarrow$ Đông-Bắc:

```
┌────────────────────────────────────────────────────────────────────────┐
│ [KHU BẮC: HOÀNG THÀNH & QUAN LỘ]                                       │
│ 🏯 Cấm Cung (Khóa)  🏛️ Phủ Huyện Lệnh   📜 Văn Miếu / Trường Thi         │
├────────────────────────────────────────────────────────────────────────┤
│ [KHU TRUNG TÂM: PHỐ CHỢ & DÂN CƯ]                                     │
│ 🏮 Chợ Lớn       🍵 Trà Quán / Tửu Lầu   🏪 Tiêu Cục (Vận Tiêu)       │
│ 🧱 Cổng Thành    💂 Lính Gác             📖 Học Quán Sĩ Tử            │
├────────────────────────────────────────────────────────────────────────┤
│ [KHU NAM & TÂY: VÙNG VEN & THÔN TRANG]                                │
│ 🛖 Nhà Tranh     🌱 Ruộng Canh Nông      🪣 Giếng Nước                │
│ 🌲 Rừng Rậm      🪵 Bãi Đốn Củi / Hái Thuốc                           │
└────────────────────────────────────────────────────────────────────────┘
```

* **Vùng Ven (Thôn Trang):** Nơi khởi đầu cuộc đời áo vải, tập trung cày cuốc, tưới nước, thu hoạch, nhặt củi tích lũy vốn đầu tiên.
* **Phố Chợ (Trung Tâm):** Nơi giao thương sầm uất, bán nông sản, đầu cơ hàng hóa theo thời giá, nghe ngóng tin tức ở tửu lầu, kết giao nhân mạch.
* **Kinh Thành (Phía Bắc):** Nơi thi cử tiến thân, nhận án lệnh tại Nha môn, thâm nhập chốn quan trường và tiến cung.

---

## 2. Kiến Trúc Kỹ Thuật (Virtual Viewport & Modular System)

### A. Engine Không Lag (Viewport Virtualization)
* Dữ liệu bản đồ có thể lên đến hàng trăm nghìn ô ($100 \times 100$ hoặc lớn hơn), nhưng màn hình **chỉ render đúng số ô nhìn thấy trong Camera (ví dụ $17 \times 11$ tiles)**.
* Khi người chơi bước đi:
  - Camera dịch chuyển tọa độ trung tâm.
  - Bộ renderer chỉ cập nhật lại emoji/icon trên các ô DOM cố định.
  - Đảm bảo **chạy 60 FPS mượt mà**, tiêu thụ cực ít RAM/CPU trên cả PC và Mobile.

### B. Điều Khiển Đa Nền Tảng (Hybrid Controls)
* **PC:** Phím `W`, `A`, `S`, `D` hoặc 4 phím Mũi Tên.
* **Mobile / Cảm ứng:** 
  - **Tap-to-Move**: Chạm trực tiếp vào bất kỳ ô nào trên bản đồ để nhân vật tự động tìm đường ngắn nhất (A* / BFS Pathfinding) bước tới.
  - Cụm D-Pad ảo nổi (Floating D-Pad) hỗ trợ chạm nhanh.

---

## 3. Danh Sách File Dự Kiến Triển Khai (Phase 1)

### Giao Diện & Thẩm Mỹ (Aesthetics)
- [NEW] [index.html](file:///d:/HoangLong/Dev/boc-y-thang-tram/index.html) - Khung giao diện cổ trang hoàng triều (Top bar, Map Viewport, Event Log & Action Panel, Status Panel).
- [NEW] [css/main.css](file:///d:/HoangLong/Dev/boc-y-thang-tram/css/main.css) - Biến màu (Vàng đồng, Đỏ sơn son, Nền mực tối), hiệu ứng đổ bóng, typography, animations.
- [NEW] [css/map.css](file:///d:/HoangLong/Dev/boc-y-thang-tram/css/map.css) - Khung camera viewport, animation di chuyển nhân vật, style các loại địa hình.
- [NEW] [css/ui.css](file:///d:/HoangLong/Dev/boc-y-thang-tram/css/ui.css) - Bảng tin nhắn cốt truyện, nút bấm, modal thoại NPC và kho đồ.

### Lõi Hệ Thống (Core Engine & Data)
- [NEW] [js/core/EventBus.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/core/EventBus.js) - Hệ thống Pub/Sub điều phối sự kiện giữa các module.
- [NEW] [js/core/GameState.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/core/GameState.js) - Quản lý trạng thái toàn cục (World, Player, Stats, Inventory, AP, Relationships).
- [NEW] [js/data/worldMap.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/data/worldMap.js) - Ma trận bản đồ lớn (Thôn trang $\leftrightarrow$ Phố chợ $\leftrightarrow$ Kinh thành) kèm metadata tương tác.
- [NEW] [js/data/items.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/data/items.js) - Danh mục vật phẩm (Hạt giống, Củ cải, Bạc, Sách văn tự, Rìu, Thuốc).
- [NEW] [js/data/npcs.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/data/npcs.js) - Danh sách NPC (Vũ Thương Nhân, Lý Thư Sinh, Nha Dịch, Lão Nông).

### Engine Di Chuyển & Gameplay
- [NEW] [js/engine/Camera.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/engine/Camera.js) - Tính toán phạm vi viewport bám theo nhân vật.
- [NEW] [js/engine/VirtualMapRenderer.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/engine/VirtualMapRenderer.js) - Render ô tile tối ưu DOM siêu nhẹ.
- [NEW] [js/engine/InputController.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/engine/InputController.js) - Bắt sự kiện phím + Tap-to-move / Pathfinding.
- [NEW] [js/systems/FarmingSystem.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/systems/FarmingSystem.js) - Logic cuốc đất, gieo hạt, tưới nước, thu hoạch củ cải.
- [NEW] [js/systems/InteractionSystem.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/systems/InteractionSystem.js) - Tương tác NPC (Mua/Bán, Đọc sách, Ngủ qua ngày).
- [NEW] [js/app.js](file:///d:/HoangLong/Dev/boc-y-thang-tram/js/app.js) - Khởi tạo toàn bộ game loop và liên kết hệ thống.

---

## 4. Kế Hoạch Kiểm Thử (Verification Plan)

### Kiểm thử hiệu năng & Khung nhìn
1. Chạy trên trình duyệt, kiểm tra số lượng phần tử DOM của Map luôn duy trì ở mức tối thiểu (~150-200 nodes).
2. Di chuyển nhân vật đi khắp các vùng: Vùng Ven $\rightarrow$ Phố Chợ $\rightarrow$ Kinh Thành xem camera bám đuôi mượt mà.
3. Thử nghiệm trên cả kích thước màn hình Desktop và Mobile (Responsive Viewport).

### Kiểm thử Gameplay Loop
1. **Canh nông:** Cuốc đất $\rightarrow$ Tưới nước $\rightarrow$ Thu hoạch củ cải $\rightarrow$ Tích lũy vào Balo.
2. **Giao thương:** Đi bộ sang Phố Chợ $\rightarrow$ Gặp Thương Nhân $\rightarrow$ Mở bảng giao dịch bán củ cải lấy Bạc.
3. **Thời gian & Hồi phục:** Về nhà tranh ngủ qua ngày $\rightarrow$ AP hồi phục đầy, số ngày `day` tăng lên.
