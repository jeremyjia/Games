// melodyGenerator.js

// 设置基础音频参数
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']; // 可以选择不同的音符
const duration = 0.5; // 每个音符的持续时间，单位为秒

// 初始化Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 生成随机音符
function getRandomNote() {
    const randomIndex = Math.floor(Math.random() * notes.length);
    return notes[randomIndex];
}

// 播放音符
function playNote(note) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // 波形类型，可以是 'sine', 'square', 'sawtooth', 'triangle'

    // 将频率转换为音符
    const frequency = noteToFrequency(note);
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 设置振荡器的频率
    oscillator.connect(audioContext.destination); // 连接到音频输出

    // 开始和停止振荡器以播放音符
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// 将音符转换为频率（这是一个基本的示例，仅适用于标准A4=440Hz的调音）
function noteToFrequency(note) {
    const noteNames = "C D E F G A B".split(' ');
    const noteIndex = noteNames.indexOf(note[0]);
    const octave = parseInt(note[1], 10);
    return 440 * Math.pow(2, (noteIndex + (octave - 4) * 7) / 12);
}

// 生成并播放旋律
function generateMelody() {
    const melodyLength = 8; // 旋律中的音符数量
    for (let i = 0; i < melodyLength; i++) {
        const note = getRandomNote();
        playNote(note);
        // 为了使音符不重叠，我们可以在这里添加一个小的延迟
        // 这可以通过简单地等待一段时间或使用setTimeout实现
        // 但更精确的方法是使用Web Audio API的定时功能
    }
}