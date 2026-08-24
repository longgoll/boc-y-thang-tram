// Danh mục tất cả vật phẩm trong game
export const ITEMS = {
  turnip: {
    id: 'turnip',
    name: 'Củ Cải Trắng',
    icon: '🥕',
    category: 'crop',
    basePrice: 2,
    sellPrice: 3,
    description: 'Củ cải tươi giòn vừa thu hoạch từ điền trang.'
  },
  turnip_seed: {
    id: 'turnip_seed',
    name: 'Hạt Giống Củ Cải',
    icon: '🌱',
    category: 'seed',
    basePrice: 1,
    buyPrice: 1,
    growthDays: 1, // 1 ngày chín sau khi tưới
    yields: 'turnip',
    yieldAmount: 2,
    description: 'Hạt giống loại tốt, nảy mầm nhanh sau khi được tưới đẫm nước.'
  },
  wood: {
    id: 'wood',
    name: 'Gỗ Khô',
    icon: '🪵',
    category: 'material',
    basePrice: 2,
    sellPrice: 2,
    description: 'Bó củi đốn từ rừng hoang vùng ven, dùng làm củi đốt hoặc xây cất.'
  },
  herb: {
    id: 'herb',
    name: 'Thảo Dược Hoang',
    icon: '🌿',
    category: 'medicine',
    basePrice: 4,
    sellPrice: 5,
    description: 'Lá thuốc hái ven suối rừng, có thể dùng bồi bổ hoặc bán cho y quán.'
  },
  book_classics: {
    id: 'book_classics',
    name: 'Tứ Thư Ngũ Kinh',
    icon: '📜',
    category: 'book',
    basePrice: 15,
    buyPrice: 15,
    intelGain: 5,
    description: 'Sách kinh điển thánh hiền, đọc giúp nâng cao Trí Lực để chuẩn bị cử nghiệp.'
  },
  tea_pot: {
    id: 'tea_pot',
    name: 'Bình Trà Ngon',
    icon: '🍵',
    category: 'consumable',
    basePrice: 8,
    buyPrice: 8,
    apRestore: 4,
    description: 'Trà sen hảo hạng mua tại Trà Lầu, uống vào lấy lại tinh thần và AP.'
  },
  pass_permit: {
    id: 'pass_permit',
    name: 'Công Hàm Thông Quan',
    icon: '🧧',
    category: 'special',
    basePrice: 50,
    description: 'Giấy thông hành quan phủ cấp, cho phép ra vào các khu vực trọng yếu.'
  }
};
