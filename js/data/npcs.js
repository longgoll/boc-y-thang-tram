// =========================================================
// DỮ LIỆU NPC, LÍNH GÁC & TỨ ĐẠI GIA TỘC (SIÊU KINH THÀNH 500x500)
// Hỗ trợ câu thoại nổi Ambient Speech Bubble thời gian thực
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
    ambient: 'Nông sản, hạt giống, xe thồ hàng giá tốt đây!',
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
    ambient: 'Bao giờ mới đến kỳ thi Hương đây...',
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
    ambient: 'Mời xơi chén trà thơm nghe chuyện kinh kỳ!',
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
    ambient: 'Mỹ tửu Thiệu Hưng bồi bổ thể lực!',
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
    ambient: 'Thu mua thảo dược tươi giá cao!',
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
    ambient: 'Khang Ký Tiền Trang sinh lời mỗi mùa!',
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
    ambient: 'Củ cải năm nay được mùa to lắm!',
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
    ambient: 'Cửa thành nghiêm ngặt, giữ gìn trật tự!',
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
    ambient: 'Công đường uy nghiêm, nghiêm cấm gây rối!',
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
    ambient: 'Thiên tử dưới chân, lén lút xử trảm!',
    greeting: 'Cấm Cung Hoàng Thành tôn nghiêm! Kẻ không phận sự bước qua ranh giới Ngọ Môn lập tức xử trảm theo luật triều đình!',
    services: ['palace_entry', 'talk']
  },

  // --- 4. QUAN LẠI TRIỀU ĐÌNH & TỨ ĐẠI THẾ GIA QUÝ TỘC ---
  magistrate_quan: {
    id: 'magistrate_quan',
    name: 'Quan Huyện Triệu',
    title: 'Tri Huyện Thuận Thiên Phủ (Chính Ngũ Phẩm)',
    icon: '🏛️',
    avatar: '👑',
    zone: 'INNER_CITY',
    ambient: 'Thăng đường xử án chí công vô tư!',
    greeting: 'Thăng đường! Ngươi có oan khuất muốn đánh trống Đăng Văn hay muốn trình sớ khảo sát điền địa?',
    services: ['take_exam', 'report', 'talk']
  },
  lord_co: {
    id: 'lord_co',
    name: 'Cố Thân Vương',
    title: 'Thân Vương Gia Chủ (Cố Vương Phủ)',
    icon: '🏯',
    avatar: '🤴',
    zone: 'INNER_CITY',
    ambient: 'Cố Gia ta ba đời phụ chính triều đình.',
    greeting: 'Cố Gia ta thế phiệt vọng tộc ba đời phụ chính triều đình. Nếu ngươi có tài cán, ta sẽ tiến cử trước Hoàng Thượng!',
    services: ['clan_quest', 'recommend', 'talk']
  },
  general_modung: {
    id: 'general_modung',
    name: 'Mộ Dung Tướng Quân',
    title: 'Đại Tướng Quân (Mộ Dung Phủ)',
    icon: '⚔️',
    avatar: '🪖',
    zone: 'INNER_CITY',
    ambient: 'Binh quý ở thần tốc, rèn giũa binh đao!',
    greeting: 'Mộ Dung Gia thống lĩnh tam quân, trấn thủ biên cương. Muốn lập công danh võ nghiệp thì hãy vào phủ bái kiến!',
    services: ['military_quest', 'train', 'talk']
  },
  scholar_giacat: {
    id: 'scholar_giacat',
    name: 'Gia Cát Đại Học Sĩ',
    title: 'Thủ Các Đại Thần (Gia Cát Phủ)',
    icon: '📜',
    avatar: '👴',
    zone: 'INNER_CITY',
    ambient: 'Trí mưu an thiên hạ, sách sử soi muôn đời.',
    greeting: 'Gia Cát Thị ta dòng dõi thi thư danh giá. Muốn đỗ Trạng Nguyên ắt phải đọc thấu kinh luân vạn quyển!',
    services: ['scholar_tip', 'study', 'talk']
  },
  tycoon_tham: {
    id: 'tycoon_tham',
    name: 'Thẩm Vạn Tam',
    title: 'Thiên Hạ Đệ Nhất Phú Thương (Thẩm Gia)',
    icon: '💰',
    avatar: '🪙',
    zone: 'INNER_CITY',
    ambient: 'Tiền đẻ ra tiền, buôn bán liên thành!',
    greeting: 'Tiền bạc trong kho Thẩm Gia ta sánh ngang quốc khố! Ngươi muốn hùn hạp làm ăn hay xin bảo lãnh mở thương hiệu?',
    services: ['invest', 'business_pass', 'talk']
  }
};
