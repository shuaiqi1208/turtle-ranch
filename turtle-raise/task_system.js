// 任务系统 - 引导和奖励功能

class TaskSystem {
    constructor() {
        this.tasks = [];
        this.dailyTasks = [];
    }

    // 初始化
    async init() {
        const saved = await GameData.loadGameState();
        this.tasks = saved.tasks || this.getDefaultTasks();
        this.dailyTasks = this.getDailyTasks();
        this.updateUI();
    }

    // 默认任务
    getDefaultTasks() {
        return [
            {
                id: 'tutorial_1',
                type: 'main',
                title: '首次互动',
                description: '点击牧场中的动物进行互动',
                target: { type: 'interact', count: 1 },
                progress: 0,
                completed: false,
                reward: { coins: 50 }
            },
            {
                id: 'tutorial_2',
                type: 'main',
                title: '农场种植',
                description: '在农场种植第一颗作物',
                target: { type: 'plant', count: 1 },
                progress: 0,
                completed: false,
                reward: { coins: 50 }
            },
            {
                id: 'tutorial_3',
                type: 'main',
                title: '解锁新动物',
                description: '在商店购买一只新动物',
                target: { type: 'buy_animal', count: 1 },
                progress: 0,
                completed: false,
                reward: { coins: 100 }
            }
        ];
    }

    // 每日任务
    getDailyTasks() {
        return [
            {
                id: 'daily_signin',
                type: 'daily',
                title: '每日签到',
                description: '登录游戏完成签到',
                completed: false,
                reward: { coins: 20 }
            },
            {
                id: 'daily_interact',
                type: 'daily',
                title: '互动达人',
                description: '与动物互动5次',
                target: { type: 'interact', count: 5 },
                progress: 0,
                completed: false,
                reward: { coins: 30 }
            },
            {
                id: 'daily_harvest',
                type: 'daily',
                title: '丰收时刻',
                description: '收获3个作物',
                target: { type: 'harvest', count: 3 },
                progress: 0,
                completed: false,
                reward: { coins: 40 }
            }
        ];
    }

    // 更新任务进度
    updateProgress(type, count = 1) {
        [...this.tasks, ...this.dailyTasks].forEach(task => {
            if (!task.completed && task.target?.type === type) {
                task.progress = (task.progress || 0) + count;
                if (task.progress >= task.target.count) {
                    this.completeTask(task);
                }
                this.updateUI();
                this.save();
            }
        });
    }

    // 完成任务
    completeTask(task) {
        task.completed = true;
        // 发放奖励
        if (task.reward) {
            if (task.reward.coins) {
                currency.addCoins(task.reward.coins);
            }
        }
        // 发送邮件通知
        mailSystem.addMail({
            title: `任务完成：${task.title}`,
            content: `恭喜您完成任务！获得奖励：🐢 ${task.reward?.coins || 0} 龟币`,
            attachments: []
        });
        this.updateUI();
    }

    // 领取任务奖励
    claimReward(taskId) {
        const task = this.tasks.find(t => t.id === taskId) || this.dailyTasks.find(t => t.id === taskId);
        if (task && task.completed && !task.claimed) {
            task.claimed = true;
            if (task.reward) {
                if (task.reward.coins) {
                    currency.addCoins(task.reward.coins);
                }
            }
            this.updateUI();
            this.save();
        }
    }

    // 更新UI
    updateUI() {
        const activeTasks = [...this.tasks, ...this.dailyTasks].filter(t => !t.claimed);
        const badge = document.getElementById('task-badge');
        if (badge) {
            const completedCount = activeTasks.filter(t => t.completed).length;
            badge.textContent = completedCount;
            badge.style.display = completedCount > 0 ? 'block' : 'none';
        }
    }

    // 保存
    async save() {
        const state = await GameData.loadGameState();
        state.tasks = this.tasks;
        state.dailyTasks = this.dailyTasks;
        await GameData.saveGameState(state);
    }

    // 渲染任务列表
    renderTaskList() {
        const container = document.getElementById('task-list');
        if (!container) return;
        
        const allTasks = [...this.tasks, ...this.dailyTasks];
        
        container.innerHTML = allTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <div class="task-info">
                    <div class="task-title">${task.type === 'daily' ? '📅' : '🎯'} ${task.title}</div>
                    <div class="task-desc">${task.description}</div>
                    ${task.target ? `
                        <div class="task-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${(task.progress / task.target.count * 100)}%"></div>
                            </div>
                            <span>${task.progress || 0}/${task.target.count}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="task-reward">
                    <span class="reward-coins">🐢 ${task.reward?.coins || 0}</span>
                    ${task.completed 
                        ? (task.claimed 
                            ? '<span class="claimed">✓ 已领取</span>' 
                            : `<button onclick="taskSystem.claimReward('${task.id}')">领取</button>`)
                        : '<span class="uncompleted">进行中</span>'
                    }
                </div>
            </div>
        `).join('');
    }
}

const taskSystem = new TaskSystem();
window.TaskSystem = TaskSystem;
window.taskSystem = taskSystem;
