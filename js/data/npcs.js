// =========================================================
// DỮ LIỆU NPC, LÍNH GÁC & NHÂN VẬT ĐẠI KINH THÀNH BẮC KINH (96x96)
// =========================================================

export const NPCS = {
  // --- 1. THƯƠNG NGHIỆP & PHỐ CHỢ NGOẠI THÀNH ---
  merchant_vu: {
    id: 'merchant_vu',
    name: 'Vũ Thương Nhân',
    title: 'Chủ Sạp Chợ Lớn Tiền Môn',
    icon: '🏮',
    avatar: '👨‍💼',
    zone: 'OUTER_CITY',
    location: { r: 64, c: 44 },
    greeting: 'Chào tiểu huynh đệ! Tiền Môn Đại Nhai sầm uất vạn món, từ nông sản, hạt giống đến xe thồ hàng ta đều có!',
    services: ['shop', 'talk', 'trade_tip']
  },
  scholar_ly: {
    id: 'scholar_ly',
    name: 'Lý Thư Sinh',
    title: 'Hàn Nho Lưu Ly Xưởng',
    icon: '📖',
    avatar: '🧑‍🎓',
    zone: 'OUTER_CITY',
    location: { r: 65, c: 27 },
    greeting: 'Thánh hiền từng dạy: "Vạn ban giai hạ phẩm, duy hữu độc thư cao". Dùi mài kinh sử mới mong vào được Trường Thi Quốc Tử Giám!',
    services: ['study', 'talk', 'buy_book']
  },
  tea_master_hoa: {
    id: 'tea_master_hoa',
    name: 'Hoa Chưởng Quỹ',
    title: 'Chủ Trà Quán Phong Nguyệt',
    icon: '🍵',
    avatar: '👩‍🦰',
    zone: 'OUTER_CITY',
    location: { r: 65, c: 24 },
    greeting: 'Mời quý khách vào xơi chén trà Long Tỉnh! Nghe kể chuyện kinh kỳ từ quan gia quyền quý đến bí văn giang hồ.',
    services: ['buy_tea', 'rumors', 'rest']
  },
  tavern_keeper: {
    id: 'tavern_keeper',
    name: 'Thôi Chưởng Quỹ',
    title: 'Chủ Thái Bạch Tửu Lâu',
    icon: '🍷',
    avatar: '🍶',
    zone: 'OUTER_CITY',
    location: { r: 58, c: 31 },
    greeting: 'Rượu Thiệu Hưng nữ nhi hồng thượng hạng, uống vào một vò xua tan mệt mỏi, phục hồi 5 điểm Thể Lực ngay tức khắc!',
    services: ['drink_wine', 'feast', 'talk']
  },
  doctor_dong: {
    id: 'doctor_dong',
    name: 'Đồng Chưởng Quỹ',
    title: 'Đại Phu Đồng Nhân Đường',
    icon: '💊',
    avatar: '🧙‍♂️',
    zone: 'OUTER_CITY',
    location: { r: 57, c: 69 },
    greeting: 'Đồng Nhân Dược Điếm y thuật gia truyền, chuyên bốc thuốc bổ khí huyết, thu mua thảo dược tươi của bá tánh.',
    services: ['buy_medicine', 'sell_herb', 'heal']
  },
  banker_khang: {
    id: 'banker_khang',
    name: 'Khang Triệu Tài',
    title: 'Chủ Ngân Hiệu Tiền Trang',
    icon: '🏦',
    avatar: '🪙',
    zone: 'OUTER_CITY',
    location: { r: 57, c: 61 },
    greeting: 'Bạc nén vàng thỏi gửi vào Khang Ký Tiền Trang sinh lời mỗi mùa, an tâm tuyệt đối không sợ trộm đạo!',
    services: ['deposit', 'withdraw', 'exchange']
  },

  // --- 2. NGOẠI Ô ĐIỀN TRANG ---
  farmer_ba: {
    id: 'farmer_ba',
    name: 'Lão Nông Ba',
    title: 'Lão Bộc Thôn Ngoại',
    icon: '🌾',
    avatar: '👴',
    zone: 'SUBURB',
    location: { r: 85, c: 33 },
    greeting: 'Ruộng củ cải ngoài bãi đất phù sa tốt lắm, chăm tưới nước mỗi ngày thì vụ thu hoạch này sẽ bội thu đó cháu!',
    services: ['farming_tip', 'talk']
  },

  // --- 3. HỆ THỐNG LÍNH GÁC THÀNH & NHA DỊCH ---
  gate_guard: {
    id: 'gate_guard',
    name: 'Lính Canh Cổng Thành',
    title: 'Thủ Môn Binh Sĩ',
    icon: '💂‍♂️',
    avatar: '💂',
    zone: 'OUTER_CITY',
    location: { r: 77, c: 38 },
    greeting: 'Đứng lại! Cửa thành kiểm soát nghiêm ngặt, cấm mang vũ khí cấm vào kinh đô! Muốn vào Nội Thành phải có giấy thông hành!',
    services: ['gate_pass', 'talk']
  },
  guard_truong: {
    id: 'guard_truong',
    name: 'Trương Nha Dịch',
    title: 'Nha Môn Trị An Đầu Mục',
    icon: '👮‍♂️',
    avatar: '👮',
    zone: 'INNER_CITY',
    location: { r: 45, c: 29 },
    greeting: 'Phía trước là Huyện Đường Thuận Thiên Phủ và Khảo Thí Viện. Nghiêm cấm gây rối trật tự công đường!',
    services: ['bribe', 'exam_info', 'talk']
  },
  palace_guard: {
    id: 'palace_guard',
    name: 'Cấm Vệ Quân Thị Vệ',
    title: 'Ngự Tiền Cấm Quân',
    icon: '🛡️',
    avatar: '⚔️',
    zone: 'PALACE',
    location: { r: 19, c: 38 },
    greeting: 'Cấm Cung Hoàng Thành tôn nghiêm! Kẻ không phận sự bước qua ranh giới Ngọ Môn lập tức xử trảm theo luật triều đình!',
    services: ['palace_entry', 'talk']
  },

  // --- 4. QUAN LẠI TRIỀU ĐÌNH & GIA TỘC QUÝ TỘC ---
  magistrate_quan: {
    id: 'magistrate_quan',
    name: 'Quan Huyện Triệu',
    title: 'Tri Huyện Thuận Thiên Phủ (Chính Ngũ Phẩm)',
    icon: '🏛️',
    avatar: '👑',
    zone: 'INNER_CITY',
    location: { r: 41, c: 28 },
    greeting: 'Thăng đường! Ngươi có oan khuất muốn đánh trống Đăng Văn hay muốn trình sớ khảo sát điền địa?',
    services: ['take_exam', 'report', 'talk']
  },
  lord_co: {
    id: 'lord_co',
    name: 'Cố Thân Vương',
    title: 'Thân Vương Gia Chủ (Tây Thành Quý Tộc)',
    icon: '🏯',
    avatar: '🤴',
    zone: 'INNER_CITY',
    location: { r: 34, c: 17 },
    greeting: 'Cố Gia ta thế phiệt vọng tộc ba đời phụ chính triều đình. Nếu ngươi có tài cán, ta sẽ tiến cử trước Hoàng Thượng!',
    services: ['clan_quest', 'recommend', 'talk']
  },
  minister_vuong: {
    id: 'minister_vuong',
    name: 'Vương Thượng Thư',
    title: 'Lại Bộ Thượng Thư (Chánh Nhị Phẩm)',
    icon: '📜',
    avatar: '👴',
    zone: 'INNER_CITY',
    location: { r: 34, c: 80 },
    greeting: 'Triều đình đang cầu hiền tài giúp rập giang sơn. Người đỗ Tú Tài, Cử Nhân đều phải qua Lại Bộ sát hạch phẩm hạnh!',
    services: ['official_rank', 'talk']
  }
};
