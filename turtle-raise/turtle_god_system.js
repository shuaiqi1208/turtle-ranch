// v5.0 完整版 - 龟神系统
// 包含：云游、联姻、赛跑、季节

class TurtleGodSystem {
    constructor() {
        this.status = 'home'; // home, traveling, returning
        this.travelProgress = 0;
        this.travelDestinations = [
            { name: '樱花谷', season: 'spring', reward: '樱花种子', risk: 0.1 },
            { name: '海滩岛', season: 'summer', reward: '贝壳装饰', risk: 0.2 },
            { name: '枫叶林', season: 'autumn', reward: '枫叶家具', risk: 0.1 },
            { name: '雪山顶', season: 'winter', reward: '冰晶道具', risk: 0.3 }
        ];
        this.inventory = []; // 行囊
        this.gifts = []; // 带回的礼物
        this.journal = []; // 云游日记
    }

    // 准备行囊
    prepareInventory(items) {
        this.inventory = items;
        console.log('🎒 行囊已准备:', items);
    }

    // 开始云游
    startTravel(destination) {
        this.status = 'traveling';
        this.currentDestination = destination;
        this.travelProgress = 0;
        
        // 云游时间：1-4小时随机
        this.travelDuration = Math.floor(Math.random() * 3 + 1) * 3600000; // 毫秒
        this.travelStartTime = Date.now();
        
        console.log(`🐢 龟神出发前往${destination.name}！预计${this.travelDuration / 3600000}小时后归来`);
        
        // 保存状态
        this.save();
        
        // 设置定时器检查归来
        setTimeout(() => this.returnHome(), this.travelDuration);
    }

    // 检查云游进度
    checkProgress() {
        if (this.status !== 'traveling') return 0;
        
        const elapsed = Date.now() - this.travelStartTime;
        this.travelProgress = Math.min(100, (elapsed / this.travelDuration) * 100);
        
        return this.travelProgress;
    }

    // 归来
    returnHome() {
        this.status = 'home';
        
        // 生成礼物
        const gifts = this.generateGifts();
        this.gifts = gifts;
        
        // 生成日记
        const journalEntry = this.generateJournal();
        this.journal.push(journalEntry);
        
        // 发送邮件通知
        mailSystem.addMail({
            title: '🐢 龟神归来！',
            content: `龟神从${this.currentDestination.name}回来了！\n\n带回了：\n${gifts.map(g => `• ${g.name}`).join('\n')}\n\n点击查看详情`,
            attachments: gifts
        });
        
        console.log('🎉 龟神归来！带回了', gifts.length, '个礼物');
        
        this.save();
    }

    // 生成礼物
    generateGifts() {
        const gifts = [];
        const risk = this.currentDestination.risk;
        
        // 必得奖励
        gifts.push({
            name: this.currentDestination.reward,
            type: 'item',
            rarity: 'rare'
        });
        
        // 随机额外奖励
        if (Math.random() > risk) {
            gifts.push({
                name: '龟币红包',
                type: 'coins',
                amount: Math.floor(Math.random() * 100 + 50)
            });
        }
        
        // 稀有奖励（低概率）
        if (Math.random() > 0.8) {
            gifts.push({
                name: '传说种子',
                type: 'seed',
                rarity: 'legendary'
            });
        }
        
        return gifts;
    }

    // 生成日记
    generateJournal() {
        const templates = [
            `今天去了${this.currentDestination.name}，风景真美！`,
            `在${this.currentDestination.name}遇到了有趣的事情...`,
            `${this.currentDestination.name}的特产真不错！`,
            `这次旅行收获满满！`
        ];
        
        return {
            date: new Date().toISOString(),
            destination: this.currentDestination.name,
            content: templates[Math.floor(Math.random() * templates.length)],
            photo: `photo_${this.currentDestination.season}.jpg`
        };
    }

    // 保存到存储
    async save() {
        const state = await GameData.loadGameState();
        state.turtleGod = {
            status: this.status,
            inventory: this.inventory,
            gifts: this.gifts,
            journal: this.journal,
            currentDestination: this.currentDestination,
            travelProgress: this.travelProgress
        };
        await GameData.saveGameState(state);
    }

    // 加载
    async load() {
        const state = await GameData.loadGameState();
        if (state.turtleGod) {
            Object.assign(this, state.turtleGod);
        }
    }
}

// 全局实例
const turtleGodSystem = new TurtleGodSystem();
window.TurtleGodSystem = TurtleGodSystem;
window.turtleGodSystem = turtleGodSystem;
