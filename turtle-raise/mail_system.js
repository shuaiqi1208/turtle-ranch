// 邮箱系统 - 系统通知和邮件功能

class MailSystem {
    constructor() {
        this.mails = [];
        this.unreadCount = 0;
    }

    // 初始化
    async init() {
        const saved = await GameData.loadGameState();
        this.mails = saved.mails || this.getDefaultMails();
        this.updateUnreadCount();
        this.updateUI();
    }

    // 默认邮件
    getDefaultMails() {
        return [
            {
                id: 'welcome',
                title: '欢迎来到龟神牧场！',
                content: '恭喜您成为牧场主！快来养成您的第一只龟神吧！🐢',
                attachments: [{ type: 'coins', amount: 100 }],
                read: false,
                date: new Date().toISOString()
            },
            {
                id: 'guide',
                title: '新手指引',
                content: '1. 点击动物互动获得龟币\n2. 农场种植作物\n3. 解锁更多动物\n4. 装饰您的牧场',
                attachments: [],
                read: false,
                date: new Date().toISOString()
            }
        ];
    }

    // 添加邮件
    addMail(mail) {
        this.mails.unshift({
            id: Date.now().toString(),
            ...mail,
            read: false,
            date: new Date().toISOString()
        });
        this.updateUnreadCount();
        this.updateUI();
        this.save();
    }

    // 读取邮件
    readMail(id) {
        const mail = this.mails.find(m => m.id === id);
        if (mail && !mail.read) {
            mail.read = true;
            // 领取附件
            if (mail.attachments) {
                mail.attachments.forEach(att => {
                    if (att.type === 'coins') {
                        currency.addCoins(att.amount);
                    }
                });
            }
            this.updateUnreadCount();
            this.updateUI();
            this.save();
        }
        return mail;
    }

    // 更新未读数
    updateUnreadCount() {
        this.unreadCount = this.mails.filter(m => !m.read).length;
    }

    // 更新UI
    updateUI() {
        const badge = document.getElementById('mail-badge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }

    // 保存
    async save() {
        const state = await GameData.loadGameState();
        state.mails = this.mails;
        await GameData.saveGameState(state);
    }

    // 渲染邮件列表
    renderMailList() {
        const container = document.getElementById('mail-list');
        if (!container) return;
        
        container.innerHTML = this.mails.map(mail => `
            <div class="mail-item ${mail.read ? 'read' : 'unread'}" onclick="mailSystem.readMail('${mail.id}')">
                <div class="mail-title">${mail.read ? '📧' : '📩'} ${mail.title}</div>
                <div class="mail-preview">${mail.content.substring(0, 30)}...</div>
                <div class="mail-date">${new Date(mail.date).toLocaleDateString()}</div>
                ${mail.attachments?.length ? '<span class="mail-attachment">🎁</span>' : ''}
            </div>
        `).join('');
    }
}

const mailSystem = new MailSystem();
window.MailSystem = MailSystem;
window.mailSystem = mailSystem;
