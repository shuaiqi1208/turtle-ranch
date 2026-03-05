// v5.0 完整版 - 龟兔赛跑系统
// 比赛、押注、排名

class RaceSystem {
    constructor() {
        this.raceTrack = 100; // 赛道长度
        this.currentRace = null;
        this.raceHistory = [];
        this.bets = []; // 押注记录
        this.leaderboard = []; // 排行榜
    }

    // 创建比赛
    createRace(entrants) {
        const race = {
            id: Date.now().toString(),
            startTime: Date.now(),
            entrants: entrants.map(e => ({
                ...e,
                position: 0,
                speed: this.calculateSpeed(e),
                finished: false,
                finishTime: null
            })),
            status: 'waiting', // waiting, running, finished
            bets: []
        };
        
        this.currentRace = race;
        return race;
    }

    // 计算速度
    calculateSpeed(entrant) {
        // 基础速度
        let baseSpeed = {
            '慢': 5,
            '普通': 10,
            '快': 15
        }[entrant.speed] || 10;
        
        // 运气加成
        baseSpeed += entrant.luck || 0;
        
        // 心情加成
        if (entrant.mood > 80) baseSpeed += 5;
        
        // 随机波动
        baseSpeed += Math.floor(Math.random() * 5) - 2;
        
        return Math.max(1, baseSpeed);
    }

    // 开始比赛
    startRace() {
        if (!this.currentRace) return;
        
        this.currentRace.status = 'running';
        console.log('🏁 比赛开始！');
        
        // 比赛动画循环
        this.raceInterval = setInterval(() => this.updateRace(), 1000);
    }

    // 更新比赛进度
    updateRace() {
        const race = this.currentRace;
        if (!race || race.status !== 'running') return;
        
        let allFinished = true;
        
        race.entrants.forEach(entrant => {
            if (entrant.finished) return;
            
            // 移动
            entrant.position += entrant.speed;
            
            // 随机事件
            if (Math.random() < 0.1) {
                // 10%概率加速
                entrant.position += 5;
                console.log(`⚡ ${entrant.name} 突然加速！`);
            }
            
            // 检查到达终点
            if (entrant.position >= this.raceTrack) {
                entrant.finished = true;
                entrant.finishTime = Date.now();
                console.log(`🎉 ${entrant.name} 到达终点！`);
            } else {
                allFinished = false;
            }
        });
        
        // 检查是否全部完成
        if (allFinished) {
            this.finishRace();
        }
    }

    // 结束比赛
    finishRace() {
        clearInterval(this.raceInterval);
        
        const race = this.currentRace;
        race.status = 'finished';
        
        // 排序
        race.entrants.sort((a, b) => {
            if (a.finished && !b.finished) return -1;
            if (!a.finished && b.finished) return 1;
            return b.position - a.position;
        });
        
        // 分配名次
        race.entrants.forEach((entrant, index) => {
            entrant.rank = index + 1;
        });
        
        // 冠军
        const winner = race.entrants[0];
        console.log(`🏆 冠军是 ${winner.name}！`);
        
        // 结算押注
        this.settleBets(winner);
        
        // 记录历史
        this.raceHistory.push({
            ...race,
            timestamp: Date.now()
        });
        
        // 更新排行榜
        this.updateLeaderboard(winner);
        
        this.save();
    }

    // 押注
    placeBet(entrantId, amount) {
        if (!this.currentRace || this.currentRace.status !== 'waiting') {
            return { success: false, reason: '比赛已开始或不存在' };
        }
        
        if (!currency.spendCoins(amount)) {
            return { success: false, reason: '龟币不足' };
        }
        
        const bet = {
            id: Date.now().toString(),
            entrantId,
            amount,
            odds: 2.0 // 赔率
        };
        
        this.currentRace.bets.push(bet);
        this.bets.push(bet);
        
        console.log(`💰 押注 ${amount} 龟币在 ${entrantId}`);
        
        return { success: true, bet };
    }

    // 结算押注
    settleBets(winner) {
        this.currentRace.bets.forEach(bet => {
            if (bet.entrantId === winner.id) {
                // 赢了
                const winAmount = bet.amount * bet.odds;
                currency.addCoins(winAmount);
                
                // 发送邮件通知
                mailSystem.addMail({
                    title: '🏆 押注获胜！',
                    content: `恭喜你！你押注的 ${winner.name} 获胜！\n\n获得：${winAmount} 龟币`,
                    attachments: [{ type: 'coins', amount: winAmount }]
                });
            }
        });
    }

    // 更新排行榜
    updateLeaderboard(winner) {
        const entry = this.leaderboard.find(e => e.id === winner.id);
        if (entry) {
            entry.wins++;
        } else {
            this.leaderboard.push({
                id: winner.id,
                name: winner.name,
                wins: 1
            });
        }
        
        // 排序
        this.leaderboard.sort((a, b) => b.wins - a.wins);
    }

    // 保存
    async save() {
        const state = await GameData.loadGameState();
        state.raceSystem = {
            raceHistory: this.raceHistory,
            bets: this.bets,
            leaderboard: this.leaderboard
        };
        await GameData.saveGameState(state);
    }
}

const raceSystem = new RaceSystem();
window.RaceSystem = RaceSystem;
window.raceSystem = raceSystem;
