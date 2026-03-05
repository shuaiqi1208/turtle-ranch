// collection_data.js - 扩展图鉴数据
// 动物、植物、家具分类数据

const COLLECTION_DATA = {
    // 动物图鉴 - 5类，每类10种
    animals: {
        dogs: {
            name: '犬类',
            icon: '🐕',
            items: [
                { id: 'dog_01', name: '柴犬', emoji: '🐕', price: 500, unlocked: true },
                { id: 'dog_02', name: '柯基', emoji: '🐕', price: 600, unlocked: false },
                { id: 'dog_03', name: '哈士奇', emoji: '🐕', price: 800, unlocked: false },
                { id: 'dog_04', name: '金毛', emoji: '🐕', price: 700, unlocked: false },
                { id: 'dog_05', name: '边牧', emoji: '🐕', price: 900, unlocked: false },
                { id: 'dog_06', name: '萨摩耶', emoji: '🐕', price: 850, unlocked: false },
                { id: 'dog_07', name: '泰迪', emoji: '🐕', price: 550, unlocked: false },
                { id: 'dog_08', name: '博美', emoji: '🐕', price: 600, unlocked: false },
                { id: 'dog_09', name: '杜宾', emoji: '🐕', price: 1000, unlocked: false },
                { id: 'dog_10', name: '秋田', emoji: '🐕', price: 950, unlocked: false }
            ]
        },
        cats: {
            name: '猫类',
            icon: '🐈',
            items: [
                { id: 'cat_01', name: '橘猫', emoji: '🐈', price: 500, unlocked: true },
                { id: 'cat_02', name: '英短', emoji: '🐈', price: 600, unlocked: false },
                { id: 'cat_03', name: '美短', emoji: '🐈', price: 650, unlocked: false },
                { id: 'cat_04', name: '布偶', emoji: '🐈', price: 1200, unlocked: false },
                { id: 'cat_05', name: '暹罗', emoji: '🐈', price: 800, unlocked: false },
                { id: 'cat_06', name: '缅因', emoji: '🐈', price: 1500, unlocked: false },
                { id: 'cat_07', name: '波斯', emoji: '🐈', price: 1100, unlocked: false },
                { id: 'cat_08', name: '斯芬克斯', emoji: '🐈', price: 1300, unlocked: false },
                { id: 'cat_09', name: '折耳', emoji: '🐈', price: 700, unlocked: false },
                { id: 'cat_10', name: '狸花', emoji: '🐈', price: 450, unlocked: false }
            ]
        },
        birds: {
            name: '鸟类',
            icon: '🐦',
            items: [
                { id: 'bird_01', name: '鹦鹉', emoji: '🦜', price: 800, unlocked: false },
                { id: 'bird_02', name: '鸽子', emoji: '🕊️', price: 400, unlocked: false },
                { id: 'bird_03', name: '猫头鹰', emoji: '🦉', price: 1000, unlocked: false },
                { id: 'bird_04', name: '孔雀', emoji: '🦚', price: 2000, unlocked: false },
                { id: 'bird_05', name: '天鹅', emoji: '🦢', price: 1500, unlocked: false },
                { id: 'bird_06', name: '火烈鸟', emoji: '🦩', price: 1800, unlocked: false },
                { id: 'bird_07', name: '企鹅', emoji: '🐧', price: 1200, unlocked: false },
                { id: 'bird_08', name: '老鹰', emoji: '🦅', price: 1600, unlocked: false },
                { id: 'bird_09', name: '蜂鸟', emoji: '🐦', price: 900, unlocked: false },
                { id: 'bird_10', name: '鸵鸟', emoji: '🐦', price: 1100, unlocked: false }
            ]
        },
        reptiles: {
            name: '爬行类',
            icon: '🦎',
            items: [
                { id: 'reptile_01', name: '陆龟', emoji: '🐢', price: 600, unlocked: true },
                { id: 'reptile_02', name: '蜥蜴', emoji: '🦎', price: 700, unlocked: false },
                { id: 'reptile_03', name: '蛇', emoji: '🐍', price: 800, unlocked: false },
                { id: 'reptile_04', name: '鳄鱼', emoji: '🐊', price: 2000, unlocked: false },
                { id: 'reptile_05', name: '变色龙', emoji: '🦎', price: 1200, unlocked: false },
                { id: 'reptile_06', name: '壁虎', emoji: '🦎', price: 500, unlocked: false },
                { id: 'reptile_07', name: '蟾蜍', emoji: '🐸', price: 450, unlocked: false },
                { id: 'reptile_08', name: '蝾螈', emoji: '🦎', price: 900, unlocked: false },
                { id: 'reptile_09', name: '蜘蛛', emoji: '🕷️', price: 600, unlocked: false },
                { id: 'reptile_10', name: '蝎子', emoji: '🦂', price: 1100, unlocked: false }
            ]
        },
        rodents: {
            name: '啮齿类',
            icon: '🐹',
            items: [
                { id: 'rodent_01', name: '仓鼠', emoji: '🐹', price: 400, unlocked: false },
                { id: 'rodent_02', name: '兔子', emoji: '🐰', price: 500, unlocked: false },
                { id: 'rodent_03', name: '龙猫', emoji: '🐹', price: 800, unlocked: false },
                { id: 'rodent_04', name: '豚鼠', emoji: '🐹', price: 450, unlocked: false },
                { id: 'rodent_05', name: '松鼠', emoji: '🐿️', price: 600, unlocked: false },
                { id: 'rodent_06', name: '花栗鼠', emoji: '🐿️', price: 550, unlocked: false },
                { id: 'rodent_07', name: '刺猬', emoji: '🦔', price: 700, unlocked: false },
                { id: 'rodent_08', name: '蜜袋鼯', emoji: '🐹', price: 1000, unlocked: false },
                { id: 'rodent_09', name: '土拨鼠', emoji: '🐹', price: 750, unlocked: false },
                { id: 'rodent_10', name: '雪貂', emoji: '🐹', price: 900, unlocked: false }
            ]
        }
    },
    
    // 植物图鉴 - 4类，每类10种
    plants: {
        vegetables: {
            name: '蔬菜',
            icon: '🥕',
            items: [
                { id: 'veg_01', name: '胡萝卜', emoji: '🥕', price: 10, growthTime: 30 },
                { id: 'veg_02', name: '南瓜', emoji: '🎃', price: 20, growthTime: 60 },
                { id: 'veg_03', name: '玉米', emoji: '🌽', price: 15, growthTime: 45 },
                { id: 'veg_04', name: '番茄', emoji: '🍅', price: 12, growthTime: 35 },
                { id: 'veg_05', name: '生菜', emoji: '🥬', price: 8, growthTime: 25 },
                { id: 'veg_06', name: '茄子', emoji: '🍆', price: 18, growthTime: 50 },
                { id: 'veg_07', name: '黄瓜', emoji: '🥒', price: 14, growthTime: 40 },
                { id: 'veg_08', name: '土豆', emoji: '🥔', price: 16, growthTime: 55 },
                { id: 'veg_09', name: '辣椒', emoji: '🌶️', price: 22, growthTime: 65 },
                { id: 'veg_10', name: '洋葱', emoji: '🧅', price: 11, growthTime: 38 }
            ]
        },
        fruits: {
            name: '水果',
            icon: '🍎',
            items: [
                { id: 'fruit_01', name: '苹果', emoji: '🍎', price: 25, growthTime: 120 },
                { id: 'fruit_02', name: '香蕉', emoji: '🍌', price: 20, growthTime: 100 },
                { id: 'fruit_03', name: '西瓜', emoji: '🍉', price: 40, growthTime: 180 },
                { id: 'fruit_04', name: '草莓', emoji: '🍓', price: 35, growthTime: 90 },
                { id: 'fruit_05', name: '葡萄', emoji: '🍇', price: 45, growthTime: 150 },
                { id: 'fruit_06', name: '橙子', emoji: '🍊', price: 28, growthTime: 110 },
                { id: 'fruit_07', name: '桃子', emoji: '🍑', price: 32, growthTime: 130 },
                { id: 'fruit_08', name: '樱桃', emoji: '🍒', price: 50, growthTime: 200 },
                { id: 'fruit_09', name: '柠檬', emoji: '🍋', price: 22, growthTime: 105 },
                { id: 'fruit_10', name: '蓝莓', emoji: '🫐', price: 38, growthTime: 140 }
            ]
        },
        flowers: {
            name: '花卉',
            icon: '🌸',
            items: [
                { id: 'flower_01', name: '玫瑰', emoji: '🌹', price: 30, growthTime: 80 },
                { id: 'flower_02', name: '向日葵', emoji: '🌻', price: 25, growthTime: 70 },
                { id: 'flower_03', name: '郁金香', emoji: '🌷', price: 35, growthTime: 85 },
                { id: 'flower_04', name: '樱花', emoji: '🌸', price: 40, growthTime: 95 },
                { id: 'flower_05', name: '百合', emoji: '🌺', price: 45, growthTime: 100 },
                { id: 'flower_06', name: '薰衣草', emoji: '🪻', price: 28, growthTime: 75 },
                { id: 'flower_07', name: '牡丹', emoji: '🏵️', price: 55, growthTime: 120 },
                { id: 'flower_08', name: '菊花', emoji: '🌼', price: 22, growthTime: 65 },
                { id: 'flower_09', name: '梅花', emoji: '🌸', price: 48, growthTime: 110 },
                { id: 'flower_10', name: '荷花', emoji: '🪷', price: 42, growthTime: 105 }
            ]
        },
        herbs: {
            name: '草药',
            icon: '🌿',
            items: [
                { id: 'herb_01', name: '薄荷', emoji: '🌿', price: 15, growthTime: 40 },
                { id: 'herb_02', name: '芦荟', emoji: '🌵', price: 25, growthTime: 60 },
                { id: 'herb_03', name: '人参', emoji: '🌿', price: 100, growthTime: 300 },
                { id: 'herb_04', name: '灵芝', emoji: '🍄', price: 80, growthTime: 240 },
                { id: 'herb_05', name: '甘草', emoji: '🌿', price: 35, growthTime: 90 },
                { id: 'herb_06', name: '当归', emoji: '🌿', price: 45, growthTime: 120 },
                { id: 'herb_07', name: '金银花', emoji: '🌼', price: 30, growthTime: 70 },
                { id: 'herb_08', name: '艾草', emoji: '🌿', price: 20, growthTime: 55 },
                { id: 'herb_09', name: '薰衣草', emoji: '🪻', price: 28, growthTime: 75 },
                { id: 'herb_10', name: '迷迭香', emoji: '🌿', price: 32, growthTime: 85 }
            ]
        }
    },
    
    // 家具图鉴 - 3类，每类10种
    furniture: {
        seats: {
            name: '座椅',
            icon: '🪑',
            items: [
                { id: 'seat_01', name: '木椅', emoji: '🪑', price: 100 },
                { id: 'seat_02', name: '摇椅', emoji: '🪑', price: 200 },
                { id: 'seat_03', name: '沙发', emoji: '🛋️', price: 500 },
                { id: 'seat_04', name: '石凳', emoji: '🪨', price: 150 },
                { id: 'seat_05', name: '藤椅', emoji: '🪑', price: 180 },
                { id: 'seat_06', name: '躺椅', emoji: '🛏️', price: 350 },
                { id: 'seat_07', name: '秋千', emoji: '🎪', price: 400 },
                { id: 'seat_08', name: '长椅', emoji: '🪑', price: 250 },
                { id: 'seat_09', name: '懒人沙发', emoji: '🛋️', price: 450 },
                { id: 'seat_10', name: '榻榻米', emoji: '🛏️', price: 300 }
            ]
        },
        decorations: {
            name: '装饰',
            icon: '🌳',
            items: [
                { id: 'deco_01', name: '盆栽', emoji: '🪴', price: 80 },
                { id: 'deco_02', name: '花圃', emoji: '🌷', price: 120 },
                { id: 'deco_03', name: '雕塑', emoji: '🗿', price: 600 },
                { id: 'deco_04', name: '喷泉', emoji: '⛲', price: 800 },
                { id: 'deco_05', name: '灯笼', emoji: '🏮', price: 150 },
                { id: 'deco_06', name: '风车', emoji: '🎡', price: 350 },
                { id: 'deco_07', name: '假山', emoji: '🪨', price: 400 },
                { id: 'deco_08', name: '小桥', emoji: '🌉', price: 500 },
                { id: 'deco_09', name: '篱笆', emoji: '🥅', price: 200 },
                { id: 'deco_10', name: '拱门', emoji: '🏛️', price: 450 }
            ]
        },
        themes: {
            name: '主题',
            icon: '🏮',
            items: [
                { id: 'theme_01', name: '樱花树', emoji: '🌸', price: 300 },
                { id: 'theme_02', name: '竹子', emoji: '🎋', price: 180 },
                { id: 'theme_03', name: '枯山水', emoji: '🪨', price: 600 },
                { id: 'theme_04', name: '沙滩伞', emoji: '🏖️', price: 250 },
                { id: 'theme_05', name: '贝壳', emoji: '🐚', price: 120 },
                { id: 'theme_06', name: '南瓜灯', emoji: '🎃', price: 200 },
                { id: 'theme_07', name: '雪人', emoji: '☃️', price: 280 },
                { id: 'theme_08', name: '圣诞树', emoji: '🎄', price: 350 },
                { id: 'theme_09', name: '灯笼', emoji: '🏮', price: 150 },
                { id: 'theme_10', name: '彩旗', emoji: '🎏', price: 100 }
            ]
        }
    }
};

// 导出
window.COLLECTION_DATA = COLLECTION_DATA;
