// Dữ liệu NPC, tính cách, lời thoại và dịch vụ cung cấp trên Đại Bản Đồ 64x64
export const NPCS = {
  merchant_vu: {
    id: 'merchant_vu',
    name: 'Vũ Thương Nhân',
    title: 'Chủ Sạp Chợ Lớn',
    icon: '🏮',
    avatar: '👨‍💼',
    zone: 'MARKET',
    location: { r: 39, c: 26 },
    greeting: 'Chào tiểu huynh đệ! Muốn trao đổi nông sản, mua hạt giống hay cần xe thồ hàng?',
    services: ['shop', 'talk', 'trade_tip']
  },
  scholar_ly: {
    id: 'scholar_ly',
    name: 'Lý Thư Sinh',
    title: 'Hàn Nho Tri Thức',
    icon: '📖',
    avatar: '🧑‍🎓',
    zone: 'MARKET',
    location: { r: 36, c: 45 },
    greeting: 'Thánh hiền từng dạy: "Vạn ban giai hạ phẩm, duy hữu độc thư cao". Ngươi cũng có chí hướng cử nghiệp chăng?',
    services: ['study', 'talk', 'buy_book']
  },
  tea_master_hoa: {
    id: 'tea_master_hoa',
    name: 'Hoa Chưởng Quỹ',
    title: 'Chủ Trà Quán Phong Nguyệt',
    icon: '🍵',
    avatar: '👩‍🦰',
    zone: 'MARKET',
    location: { r: 39, c: 47 },
    greeting: 'Mời khách quan vào xơi chén trà thơm! Nơi đây tin tức thiên hạ từ quan gia đến giang hồ đều có cả.',
    services: ['buy_tea', 'rumors', 'rest']
  },
  farmer_ba: {
    id: 'farmer_ba',
    name: 'Lão Nông Ba',
    title: 'Lão Bộc Thôn Ngoại',
    icon: '🌾',
    avatar: '👴',
    zone: 'SUBURB',
    location: { r: 56, c: 21 },
    greeting: 'Ruộng đồng phải chăm tưới tắm mỗi ngày thì củ cải mới nhanh lớn cháu à!',
    services: ['farming_tip', 'talk']
  },
  guard_truong: {
    id: 'guard_truong',
    name: 'Trương Nha Dịch',
    title: 'Nha Môn Thủ Vệ',
    icon: '💂',
    avatar: '💂‍♂️',
    zone: 'YAMEN',
    location: { r: 29, c: 22 },
    greeting: 'Phía trước là Phủ Huyện Đường và Trường Thi Kinh Thành. Kẻ không phận sự chớ có lảng vảng!',
    services: ['bribe', 'exam_info', 'talk']
  },
  magistrate_quan: {
    id: 'magistrate_quan',
    name: 'Quan Huyện Triệu',
    title: 'Tri Huyện Chính Ngũ Phẩm',
    icon: '🏛️',
    avatar: '👑',
    zone: 'YAMEN',
    location: { r: 24, c: 21 },
    greeting: 'Ngươi muốn xin nhập tịch sĩ tử hay tấu sớ việc công? Trị an bá tính phải đặt chữ Công lên đầu.',
    services: ['take_exam', 'report', 'talk']
  }
};
