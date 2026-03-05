// audio.js - 背景音乐和音效系统
// 翼龙 - 内容创作中心

class AudioSystem {
    constructor() {
        this.bgm = null;
        this.sounds = {};
        this.enabled = true;
        this.bgmVolume = 0.5;
        this.sfxVolume = 0.7;
    }

    // 初始化
    init() {
        // 加载用户设置
        const settings = localStorage.getItem('audioSettings');
        if (settings) {
            const parsed = JSON.parse(settings);
            this.enabled = parsed.enabled !== false;
            this.bgmVolume = parsed.bgmVolume || 0.5;
            this.sfxVolume = parsed.sfxVolume || 0.7;
        }
    }

    // 加载背景音乐
    loadBGM(url, loop = true) {
        this.bgm = new Audio(url);
        this.bgm.loop = loop;
        this.bgm.volume = this.bgmVolume;
    }

    // 播放背景音乐
    playBGM() {
        if (!this.enabled || !this.bgm) return;
        
        this.bgm.play().catch(e => {
            console.log('BGM播放失败（需要用户交互）:', e);
        });
    }

    // 暂停背景音乐
    pauseBGM() {
        if (this.bgm) {
            this.bgm.pause();
        }
    }

    // 切换背景音乐
    switchBGM(url) {
        this.pauseBGM();
        this.loadBGM(url);
        this.playBGM();
    }

    // 加载音效
    loadSound(name, url) {
        this.sounds[name] = new Audio(url);
        this.sounds[name].volume = this.sfxVolume;
    }

    // 播放音效
    playSound(name) {
        if (!this.enabled || !this.sounds[name]) return;
        
        // 克隆音频以支持快速连续播放
        const sound = this.sounds[name].cloneNode();
        sound.volume = this.sfxVolume;
        sound.play().catch(e => {
            console.log('音效播放失败:', e);
        });
    }

    // 预加载所有音频
    preloadSounds(soundMap) {
        Object.entries(soundMap).forEach(([name, url]) => {
            this.loadSound(name, url);
        });
    }

    // 启用/禁用音频
    setEnabled(enabled) {
        this.enabled = enabled;
        if (!enabled) {
            this.pauseBGM();
        } else {
            this.playBGM();
        }
        this.saveSettings();
    }

    // 设置背景音乐音量
    setBGMVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
        if (this.bgm) {
            this.bgm.volume = this.bgmVolume;
        }
        this.saveSettings();
    }

    // 设置音效音量
    setSFXVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.sfxVolume;
        });
        this.saveSettings();
    }

    // 保存设置
    saveSettings() {
        localStorage.setItem('audioSettings', JSON.stringify({
            enabled: this.enabled,
            bgmVolume: this.bgmVolume,
            sfxVolume: this.sfxVolume
        }));
    }
}

// 音效列表
const SoundEffects = {
    CLICK: 'click',           // 点击
    COLLECT: 'collect',       // 收获
    BUY: 'buy',              // 购买
    LEVEL_UP: 'levelup',     // 升级
    SUCCESS: 'success',      // 成功
    ERROR: 'error'           // 错误
};

// 背景音乐列表
const BGMTracks = {
    RANCH: 'assets/audio/bgm_ranch.mp3',    // 牧场背景音乐
    FARM: 'assets/audio/bgm_farm.mp3'       // 农场背景音乐
};

// 音频文件映射（使用免费素材或生成）
const AudioAssets = {
    // 音效（使用Web Audio API生成简单音效）
    [SoundEffects.CLICK]: null,     // 用代码生成
    [SoundEffects.COLLECT]: null,   // 用代码生成
    [SoundEffects.BUY]: null,       // 用代码生成
    [SoundEffects.LEVEL_UP]: null,  // 用代码生成
    
    // BGM（使用免费素材或占位）
    [BGMTracks.RANCH]: 'https://example.com/bgm_ranch.mp3',
    [BGMTracks.FARM]: 'https://example.com/bgm_farm.mp3'
};

// 使用Web Audio API生成简单音效
class SoundGenerator {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 生成点击音效
    playClick() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // 生成收获音效
    playCollect() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.05);
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // 生成成功音效
    playSuccess() {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C大调琶音
        
        notes.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.1);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + index * 0.1 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.1 + 0.3);
            
            oscillator.start(this.audioContext.currentTime + index * 0.1);
            oscillator.stop(this.audioContext.currentTime + index * 0.1 + 0.3);
        });
    }
}

// 全局实例
const audioSystem = new AudioSystem();
const soundGenerator = new SoundGenerator();

// 导出
window.AudioSystem = AudioSystem;
window.audioSystem = audioSystem;
window.SoundEffects = SoundEffects;
window.BGMTracks = BGMTracks;
window.SoundGenerator = SoundGenerator;
window.soundGenerator = soundGenerator;
