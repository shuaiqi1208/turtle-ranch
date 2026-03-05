// storage.js - 修复存储Bug，使用IndexedDB
// 迅猛龙 - 技术实验室

const DB_NAME = 'TurtleRanchDB';
const DB_VERSION = 1;
const STORE_NAME = 'gameData';

class GameStorage {
    constructor() {
        this.db = null;
        this.init();
    }

    // 初始化数据库
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
        });
    }

    // 保存数据
    async save(key, data) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(data, key);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // 读取数据
    async load(key, defaultValue = null) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(key);
            
            request.onsuccess = () => {
                resolve(request.result !== undefined ? request.result : defaultValue);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // 删除数据
    async remove(key) {
        if (!this.db) await this.init();
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(key);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// 全局存储实例
const gameStorage = new GameStorage();

// 游戏数据管理
const GameData = {
    // 保存游戏状态
    async saveGameState(state) {
        await gameStorage.save('gameState', state);
        console.log('✅ 游戏状态已保存');
    },

    // 加载游戏状态
    async loadGameState() {
        const defaultState = {
            coins: 0,  // 龟币数量
            animals: [],
            farmPlots: Array(9).fill(null),
            unlockedAnimals: ['turtle'],
            lastLogin: Date.now()
        };
        return await gameStorage.load('gameState', defaultState);
    },

    // 保存用户设置
    async saveSettings(settings) {
        await gameStorage.save('settings', settings);
    },

    // 加载用户设置
    async loadSettings() {
        const defaultSettings = {
            musicEnabled: true,
            soundEnabled: true,
            language: 'zh-CN'
        };
        return await gameStorage.load('settings', defaultSettings);
    },

    // 保存动物数据
    async saveAnimals(animals) {
        await gameStorage.save('animals', animals);
    },

    // 加载动物数据
    async loadAnimals() {
        return await gameStorage.load('animals', []);
    },

    // 保存农场数据
    async saveFarm(farmPlots) {
        await gameStorage.save('farmPlots', farmPlots);
    },

    // 加载农场数据
    async loadFarm() {
        return await gameStorage.load('farmPlots', Array(9).fill(null));
    }
};

// 导出
window.GameStorage = GameStorage;
window.GameData = GameData;
