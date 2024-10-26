const testClick = function(){ 
    Tone.Transport.start();  // 开始传输以播放序列
}

// 创建 Tone.js 的主合成器
const synth = new Tone.Synth().toDestination();

// 创建一个序列器来安排音符
const sequencer = new Tone.Sequence(
    function(time, note) {
        // 使用合成器播放音符
        synth.triggerAttackRelease(note.name, note.duration, time);
    },
    [
        { time: 0, note: { name: 'C4', duration: '4n' } },
        { time: '1n', note: { name: 'D4', duration: '4n' } },
        { time: '2n', note: { name: 'E4', duration: '4n' } },
        { time: '3n', note: { name: 'F4', duration: '4n' } }
    ],
    "4n"
).start(0);