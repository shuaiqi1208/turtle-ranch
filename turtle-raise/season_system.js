// v5.0 完整版 - 季节系统
// 四季更替、季节限定、天气效果

class SeasonSystem {
    constructor() {
        this.currentSeason = 'spring'; // spring, summer, autumn, winter
        this.seasonDuration = 7 * 24 * 60 * 60 * 1000; // 7天（毫秒）
        this.seasonStartTime = Date.now();
        
        this.seasons = {
            spring: {
                name: '春季',
                icon: '🌸',
                theme: '樱花',
                cropBonus: 1.2, // 作物生长速度+20%
                specialCrop: '樱花树',
                event: '春之祭',
                weather: ['晴朗', '小雨', '微风'],
                bgImage: 'bg_spring.png'
            },
            summer: {
                name: '夏季',
                icon: '☀️',
                theme: '海滩',
                cropBonus: 1.5, // 作物生长速度+50%（夏天快）
                specialCrop: '西瓜',
                event: '海滩派对',
                weather: ['炎热', '雷阵雨', '台风'],
                bgImage: 'bg_summer.png'
            },
            autumn: {
                name: '秋季',
                icon: '🍁',
                theme: '收获',
                cropBonus: 1.0,
                harvestBonus: 2.0, // 收获双倍
                specialCrop: '南瓜',
                event: '丰收节',
                weather: ['凉爽', '大风', '霜降'],
                bgImage: 'bg_autumn.png'
            },
            winter: {
                name: '冬季',
                icon: '❄️',
                theme: '温泉',
                cropBonus: 0.5, // 作物生长速度-50%（冬天慢）
                specialCrop: '冬梅',
                event: '温泉祭',
                weather: ['寒冷', '下雪', '冰冻'],
                bgImage: 'bg_winter.png',
                hibernate: true // 冬眠机制
            }
        };
    }

    // 初始化
    async init() {
        const saved = await GameData.loadGameState();
        if (saved.season) {
            this.currentSeason = saved.season.current;
            this.seasonStartTime = saved.season.startTime;
        }
        
        // 检查是否需要切换季节
        this.checkSeasonChange();
        
        // 每日检查
        setInterval(() => this.checkSeasonChange(), 24 * 60 * 60 * 1000);
    }

    // 检查季节切换
    checkSeasonChange() {
        const elapsed = Date.now() - this.seasonStartTime;
        
        if (elapsed >= this.seasonDuration) {
            this.changeSeason();
        }
    }

    // 切换季节
    changeSeason() {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentIndex = seasons.indexOf(this.currentSeason);
        const nextIndex = (currentIndex + 1) % 4;
        
        this.currentSeason = seasons[nextIndex];
        this.seasonStartTime = Date.now();
        
        const season = this.seasons[this.currentSeason];
        
        console.log(`🌟 季节变换！现在是${season.name} ${season.icon}`);
        
        // 发送季节变更邮件
        mailSystem.addMail({
            title: `🌟 季节变换！${season.name}到了`,
            content: `新的季节开始了！\n\n${season.name}特色：\n• ${season.specialCrop} 生长速度加成\n• 限定活动：${season.event}\n• 天气变化：${season.weather.join('、')}\n\n快来体验新的季节吧！`,
            attachments: []
        });
        
        // 应用季节效果
        this.applySeasonEffects();
        
        this.save();
    }

    // 应用季节效果
    applySeasonEffects() {
        const season = this.seasons[this.currentSeason];
        
        // 更新全局作物生长速度
        window.seasonCropBonus = season.cropBonus;
        
        // 更新背景
        document.body.style.background = this.getSeasonGradient();
        
        // 特殊效果
        if (season.hibernate) {
            console.log('💤 冬眠季节开始，动物需要更多休息');
        }
    }

    // 获取季节渐变背景
    getSeasonGradient() {
        const gradients = {
            spring: 'linear-gradient(180deg, #FFB6C1 0%, #98FB98 100%)', // 粉→绿
            summer: 'linear-gradient(180deg, #87CEEB 0%, #FFD700 100%)', // 蓝→金
            autumn: 'linear-gradient(180deg, #FFA500 0%, #8B4513 100%)', // 橙→棕
            winter: 'linear-gradient(180deg, #B0E0E6 0%, #F0F8FF 100%)' // 浅蓝→白
        };
        return gradients[this.currentSeason];
    }

    // 获取当前季节信息
    getCurrentSeason() {
        return {
            ...this.seasons[this.currentSeason],
            id: this.currentSeason,
            remainingTime: this.seasonDuration - (Date.now() - this.seasonStartTime)
        };
    }

    // 获取季节倒计时
    getSeasonCountdown() {
        const remaining = this.seasonDuration - (Date.now() - this.seasonStartTime);
        const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        
        return { days, hours };
    }

    // 检查是否为限定物品
    isSeasonalItem(itemId) {
        const season = this.seasons[this.currentSeason];
        return itemId.includes(season.specialCrop);
    }

    // 保存
    async save() {
        const state = await GameData.loadGameState();
        state.season = {
            current: this.currentSeason,
            startTime: this.seasonStartTime
        };
        await GameData.saveGameState(state);
    }
}

const seasonSystem = new SeasonSystem();
window.SeasonSystem = SeasonSystem;
window.seasonSystem = seasonSystem;
