// 创建Web Audio API上下文
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 假设我们有一个函数generateChord，它返回一个包含和弦音符的频率数组
function generateChord() {
    // 这是一个简单的C大调三和弦（C, E, G）的频率
    return [261.63, 329.63, 392.00]; // Hz
}

// 生成并保存和弦音频文件
function generateAndSaveChord() {
    const chord = generateChord();
    const duration = 2; // 音符持续时间，以秒为单位
    const sampleRate = 44100; // 采样率

    // 创建一个OfflineAudioContext以进行渲染
    const offlineContext = new OfflineAudioContext(1, sampleRate * duration, sampleRate);

    // 创建振荡器来播放和弦的每个音符
    chord.forEach(frequency => {
        const oscillator = offlineContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, offlineContext.currentTime);

        // 将振荡器连接到离线上下文的输出
        oscillator.connect(offlineContext.destination);

        // 开始和停止振荡器以播放音符
        oscillator.start();
        oscillator.stop(offlineContext.currentTime + duration / chord.length); // 让每个音符持续一段时间
    });

    // 渲染音频到缓冲区
    offlineContext.oncomplete = function(event) {
        const audioBuffer = event.renderedBuffer;
        const channelData = audioBuffer.getChannelData(0); // 获取单声道数据

        // 将音频缓冲区转换为Blob对象，并添加WAV文件头
        const blob = new Blob([createWAVBlob(channelData, sampleRate)], { type: 'audio/wav' });

        // 使用FileSaver.js保存文件
        saveAs(blob, 'chord.wav');

        // 可选：将生成的音频URL设置到audio元素以供播放
        const audioUrl = URL.createObjectURL(blob);
        document.getElementById('audio-player').src = audioUrl;
    };

    // 开始渲染
    offlineContext.startRendering();
}

// 辅助函数：将Float32Array音频数据和采样率转换为带有WAV文件头的Blob对象
function createWAVBlob(data, sampleRate) {
    const buffer = new ArrayBuffer(44 + data.length * 2); // 44字节头 + 数据
    const view = new DataView(buffer);

    /* RIFF chunk descriptor */
    writeString(view, 0, 'RIFF'); // ChunkID
    view.setUint32(4, 36 + data.length * 2, true); // ChunkSize
    writeString(view, 8, 'WAVE'); // Format
    /* fmt sub-chunk */
    writeString(view, 12, 'fmt '); // Subchunk1ID
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, 1, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    /* data sub-chunk */
    writeString(view, 36, 'data'); // Subchunk2ID
    view.setUint32(40, data.length * 2, true); // Subchunk2Size

    // 写入音频数据
    for (let i = 0; i < data.length; i++) {
        view.setInt16(44 + i * 2, data[i] * 32767, true); // 转换到16位PCM
    }

    return buffer;
}

// 辅助函数：将字符串写入DataView
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// 添加按钮点击事件监听器
document.getElementById('generate-and-play').addEventListener('click', generateAndSaveChord); 