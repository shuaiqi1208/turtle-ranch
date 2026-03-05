// v5.0 完整版 - 联姻系统
// 遗传基因、配对、培育后代

class MarriageSystem {
    constructor() {
        this.turtles = []; // 可配对的乌龟
        this.couples = []; // 配对记录
        this.children = []; // 后代记录
        this.genePool = { // 基因库
            shell: ['深棕色', '浅棕色', '金色', '花纹'],
            personality: ['活泼', '温和', '懒惰', '聪明'],
            speed: ['慢', '普通', '快'],
            luck: [1, 2, 3, 4, 5]
        };
    }

    // 添加可配对乌龟
    addTurtle(turtle) {
        if (turtle.level >= 5 && turtle.adult) {
            this.turtles.push({
                id: turtle.id,
                name: turtle.name,
                genes: turtle.genes,
                level: turtle.level,
                married: false
            });
        }
    }

    // 检查配对条件
    canMarry(turtle1, turtle2) {
        if (turtle1.married || turtle2.married) return false;
        if (turtle1.id === turtle2.id) return false;
        
        // 亲密度要求
        const intimacy = this.calculateIntimacy(turtle1, turtle2);
        return intimacy >= 50;
    }

    // 计算亲密度
    calculateIntimacy(t1, t2) {
        let intimacy = 0;
        
        // 同种+20
        if (t1.species === t2.species) intimacy += 20;
        
        // 同性格+15
        if (t1.personality === t2.personality) intimacy += 15;
        
        // 等级差<3 +10
        if (Math.abs(t1.level - t2.level) < 3) intimacy += 10;
        
        // 基础+30
        intimacy += 30;
        
        return Math.min(100, intimacy);
    }

    // 配对
    marry(turtle1Id, turtle2Id) {
        const t1 = this.turtles.find(t => t.id === turtle1Id);
        const t2 = this.turtles.find(t => t.id === turtle2Id);
        
        if (!this.canMarry(t1, t2)) {
            return { success: false, reason: '配对条件不满足' };
        }
        
        // 标记为已婚
        t1.married = true;
        t2.married = true;
        
        const couple = {
            id: Date.now().toString(),
            parents: [t1, t2],
            marryDate: new Date().toISOString(),
            children: []
        };
        
        this.couples.push(couple);
        
        // 消耗龟币
        currency.spendCoins(500);
        
        console.log(`💕 ${t1.name} 和 ${t2.name} 喜结连理！`);
        
        this.save();
        
        return { success: true, couple };
    }

    // 培育后代
    breedChild(coupleId) {
        const couple = this.couples.find(c => c.id === coupleId);
        if (!couple) return { success: false, reason: '找不到配对记录' };
        
        const [parent1, parent2] = couple.parents;
        
        // 遗传算法
        const child = this.inheritGenes(parent1, parent2);
        
        // 记录后代
        couple.children.push(child);
        this.children.push(child);
        
        console.log(`🐣 新生命诞生！${child.name} 出生了！`);
        
        this.save();
        
        return { success: true, child };
    }

    // 基因遗传
    inheritGenes(parent1, parent2) {
        const child = {
            id: 'child_' + Date.now(),
            name: this.generateChildName(parent1, parent2),
            generation: 2,
            genes: {},
            stats: {}
        };
        
        // 壳色遗传（50%父母各半，10%变异）
        const shellGene = Math.random() < 0.1 
            ? this.getRandomGene('shell') // 变异
            : (Math.random() < 0.5 ? parent1.genes.shell : parent2.genes.shell);
        child.genes.shell = shellGene;
        
        // 性格遗传（60%遗传，40%随机）
        child.genes.personality = Math.random() < 0.6
            ? (Math.random() < 0.5 ? parent1.genes.personality : parent2.genes.personality)
            : this.getRandomGene('personality');
        
        // 速度（平均值±随机）
        const speedIndex1 = this.genePool.speed.indexOf(parent1.genes.speed);
        const speedIndex2 = this.genePool.speed.indexOf(parent2.genes.speed);
        const avgSpeed = Math.floor((speedIndex1 + speedIndex2) / 2);
        child.genes.speed = this.genePool.speed[avgSpeed] || '普通';
        
        // 运气（遗传+变异）
        const baseLuck = Math.floor((parent1.genes.luck + parent2.genes.luck) / 2);
        child.genes.luck = Math.min(5, baseLuck + Math.floor(Math.random() * 2));
        
        // 成长加成
        child.stats.growthBonus = parent1.level + parent2.level;
        
        return child;
    }

    // 生成后代名字
    generateChildName(p1, p2) {
        const prefixes = ['小', '新', '萌'];
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        return prefix + (Math.random() < 0.5 ? p1.name[0] : p2.name[0]);
    }

    // 随机基因
    getRandomGene(type) {
        const pool = this.genePool[type];
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // 保存
    async save() {
        const state = await GameData.loadGameState();
        state.marriageSystem = {
            turtles: this.turtles,
            couples: this.couples,
            children: this.children
        };
        await GameData.saveGameState(state);
    }

    // 加载
    async load() {
        const state = await GameData.loadGameState();
        if (state.marriageSystem) {
            Object.assign(this, state.marriageSystem);
        }
    }
}

const marriageSystem = new MarriageSystem();
window.MarriageSystem = MarriageSystem;
window.marriageSystem = marriageSystem;
