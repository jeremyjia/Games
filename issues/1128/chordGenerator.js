// chordGenerator.js

// 设置基础音频参数
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']; // 音符列表
const durations = [1, 2,3]; // 每个和弦音的持续时间，可以调整

// 初始化Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 将音符转换为频率
function noteToFrequency(note) {
    const noteNames = "C D E F G A B".split(' ');
    let noteIndex = noteNames.indexOf(note[0]);
    if (noteIndex < 0) { // 处理降音（如Cb -> B3）或升音（如C# -> Db）
        noteIndex = noteNames.indexOf(note[0].toLowerCase().replace('#', 's').replace('b', '')); // 假设s代表升音，但这里我们简化为直接找替代音
    }
    const octave = parseInt(note[1], 10);
    const a4Frequency = 440; // A4音的标准频率
    return a4Frequency * Math.pow(2, (noteIndex + 12 * (octave - 4) + (note.includes('#') ? 0.0833 : note.includes('b') ? -0.0833 : 0)) / 12);
}

// 播放音符
function playNote(note, duration) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(noteToFrequency(note), audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
}

// 生成随机和弦（这里以三和弦为例）
function generateChord() {
    const rootNoteIndex = 0;//Math.floor(Math.random() * notes.length);
    const rootNote = notes[rootNoteIndex];
    
    // 计算第三音和第五音（基于大三和弦的间隔：根音-第三音=4半音，根音-第五音=7半音）
    const thirdNoteIndex = (rootNoteIndex + 4) % notes.length; // 大三和弦的第三音
    const fifthNoteIndex = (rootNoteIndex + 7) % notes.length; // 大三和弦的第五音（纯五度）
    
    return [notes[rootNoteIndex], notes[thirdNoteIndex], notes[fifthNoteIndex]];
}

// 播放和弦
function playChord() {
    const chord = generateChord();
    chord.forEach((note, index) => {
        playNote(note, durations[index]); // 这里可以调整每个音的持续时间来创造不同的节奏
        // 如果想要和弦音同时开始和结束，可以使用相同的duration，并且不需要在playNote里加上index相关的延迟
    });
}


// 播放和弦
function playXD() {
    const v = document.getElementById("v");
    var s = ""; 
    for( i in notes){ 
        var b = blo0.blBtn(v,notes[i],notes[i],"gray");
		b.style.float = "left";
		b.style.color = "white";
        b.onclick = function(_n,_i){
            return function(){
                playNote(_n[_i],1);

            }
        }(notes,i);
    } 
}