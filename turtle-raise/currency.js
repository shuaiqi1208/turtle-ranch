// currency.js - 龟币系统（简化版）
// 迅猛龙 - 技术实验室
// 货币：只有龟币 🐢

class CurrencySystem {
    constructor() {
        this.coins = 0;  // 龟币数量
    }

    // 初始化
    async init() {
        const saved = await GameData.loadGameState();
        this.coins = saved.coins || 0;
        this.updateUI();
    }

    // 获得龟币
    addCoins(amount) {
        this.coins += amount;
        this.save();
        this.updateUI();
        this.showEarnEffect(amount);
        console.log(`💰 获得 ${amount} 龟币`);
    }

    // 花费龟币
    spendCoins(amount) {
        if (this.coins >= amount) {
            this.coins -= amount;
            this.save();
            this.updateUI();
            console.log(`💸 花费 ${amount} 龟币`);
            return true;
        } else {
            console.log('❌ 龟币不足！');
            this.showInsufficientCoins();
            return false;
        }
    }

    // 保存到存储
    async save() {
        const state = await GameData.loadGameState();
        state.coins = this.coins;
        await GameData.saveGameState(state);
    }

    // 更新UI显示
    updateUI() {
        // 更新龟币显示
        const coinElements = document.querySelectorAll('.coin-count, .gold-count, .money-count');
        coinElements.forEach(el => {
            el.textContent = this.coins;
            el.setAttribute('data-currency', '龟币');
        });

        // 更新龟币图标
        const coinIcons = document.querySelectorAll('.coin-icon, .gold-icon');
        coinIcons.forEach(el => {
            el.textContent = '🐢';
            el.title = '龟币';
        });
    }

    // 显示获得效果
    showEarnEffect(amount) {
        const effect = document.createElement('div');
        effect.className = 'coin-effect';
        effect.textContent = `+${amount} 🐢`;
        effect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            color: #FFD700;
            font-weight: bold;
            pointer-events: none;
            z-index: 9999;
            animation: coinFloat 1s ease-out forwards;
        `;
        document.body.appendChild(effect);
        
        setTimeout(() => effect.remove(), 1000);
    }

    // 显示龟币不足
    showInsufficientCoins() {
        alert('龟币不足！快去农场收获作物吧！🐢');
    }

    // 获取当前龟币数
    getCoins() {
        return this.coins;
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes coinFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(-50px);
        }
    }
    
    .currency-display {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: bold;
    }
    
    .currency-display .icon {
        font-size: 20px;
    }
`;
document.head.appendChild(style);

// 全局货币实例
const currency = new CurrencySystem();

// 导出
window.CurrencySystem = CurrencySystem;
window.currency = currency;
