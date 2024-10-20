

const fnTest = function(m){
    console.log(Date());
        // 初始化 Tone.js
    Tone.start().then(() => {

        console.log(1);

        // 创建音频源
        const synth = new Tone.Synth().toDestination();
        
        // 创建低频滤波器
        const filter = new Tone.Filter({
            frequency: 440,
            type: 'lowpass'
        }).connect(synth.output);

        // 获取频率控制输入
        const freqInput = document.getElementById('freq');

        // 更新滤波器频率
        freqInput.addEventListener('input', (e) => {
            filter.frequency.value = parseFloat(e.target.value);
        });

        // 初始化画布和绘图上下文
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // 绘制波形
        function drawWave(frequency) {
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 设置线条样式
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;

            // 绘制波形
            const width = canvas.width;
            const height = canvas.height / 2;
            for (let x = 0; x < width; x++) {
                const y = height + height * Math.sin((x / width) * frequency * 2 * Math.PI / Tone.context.sampleRate);
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        // 实时更新波形
        function animate() {
            const frequency = filter.frequency.value;
            drawWave(frequency);
            requestAnimationFrame(animate);
        }

        // 开始动画
        animate();

        // 播放合成器以产生声音
        synth.triggerAttackRelease("C4", "41");
    });
}