document.addEventListener('DOMContentLoaded', function() {    
    document.title+="~jsv0.45";
    const oui = function(){
        let o = {};
        o.stepUI = function(pd,id,innerHTML,x,y,w,h,c){
            let d = document.createElement("div");
            d.id = id;
            d.innerHTML = innerHTML;
              
            d.style.left		= x+"px";
            d.style.top			= y+"px";
            d.style.width		= w+"px";
            d.style.height		= h+"px";
    
            if(pd!=null)pd.appendChild(d);
            return d;
        };
        o.mkUI = function(){            
            let d = null;
            for(var i = 1; i<=4;i++){
                d = this.stepUI(document.getElementById('id4sequencer'),"step-"+i,i,i*50,111,50,50);
                d.classList.add("step");
            }
        };
        return o;
    }();    
    oui.mkUI();

    const steps = document.querySelectorAll('.step');
    const playButton = document.getElementById('play-button');
    const btnTest = document.getElementById('test');
    
    const btnTest2 = document.getElementById('test2');

    const a1 = document.getElementById('audio1');
    const status = document.getElementById('status');

    let isPlaying = false;
    let currentStep = 0;
    let turns = 0;
    let beatTime = 1111;
    
    a1.addEventListener('error',function(e){
        status.textContent = "error:" + e.message;
    })    
    a1.addEventListener('loadedmetadata',function(){
        status.textContent = "loadedmetadata: duration=" + a1.duration;
    })
    a1.addEventListener('play',function(){
        status.textContent = "playing";
    })
    
    btnTest.onclick = function(){ 
        //blo0.blMDiv(document.body,"div4Test","divShowMe_divMove_blClass",550,150,500,200,blColor[8]);// 创建一个AudioContext
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 创建一个音频源
        var source = audioContext.createBufferSource();
        
        // 加载音频文件
        fetch('1.mp3')
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer, buffer => {
            // 设置音频源
            source.buffer = buffer;
            
            // 创建一个音量控制节点
            var volume = audioContext.createGain();
            
            // 设置音量，范围从0（静音）到1（最大音量）
            volume.gain.value = 0.5; // 例如，设置为50%的音量
            
            // 连接音频源到音量控制节点，然后连接到音频上下文的目的地（通常是扬声器）
            source.connect(volume);
            volume.connect(audioContext.destination);
            
            // 开始播放音频
            source.start(0);
          }));

    }

    btnTest2.onclick = function(){
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const canvas = document.getElementById('audioCanvas');
        const ctx = canvas.getContext('2d');

        // 加载音频文件
        function loadAudio(url) {
        return fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => audioBuffer);
        }

        // 绘制波形图
        function drawWaveform(audioBuffer) {
        const { length } = audioBuffer;
        const sampleRate = audioContext.sampleRate;
        const data = audioBuffer.getChannelData(0); // 获取单声道数据，如果是立体声则需要处理两个通道
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const step = Math.ceil(length / canvasWidth); // 计算每个像素点对应的样本数
        const halfHeight = canvasHeight / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 清除画布
        ctx.beginPath();
        ctx.moveTo(0, halfHeight); // 从画布中心开始绘制

        for (let i = 0; i < length; i += step) {
            const value = data[i];
            const x = Math.round((i / length) * canvasWidth);
            const y = halfHeight + value * halfHeight; // 将样本值映射到画布高度
            if (i === 0) {
            ctx.moveTo(x, y); // 第一个点
            } else {
            ctx.lineTo(x, y); // 连接点
            }
        }

        ctx.lineTo(canvasWidth, halfHeight); // 连接画布末尾到中心线
        ctx.stroke(); // 完成绘制
        }

        // 加载并绘制波形图
        loadAudio('1.mp3') // 替换为你的音频文件路径
        .then(audioBuffer => drawWaveform(audioBuffer))
        .catch(error => console.error('Error loading audio:', error));
    }

    // 添加点击事件到每个步骤上，用于切换步骤状态
    steps.forEach(step => {
        step.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // 播放按钮的事件监听器
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            // 如果已经在播放，则停止播放
            isPlaying = false;
            playButton.innerHTML = "Play"; 
            console.log('Stopped playing.');
        } else {
            // 开始播放
            isPlaying = true;
            playButton.innerHTML = "Stop"; 
            playButton.disabled = true;
            currentStep = 0; //Jeremy fixed.
            console.log('playSequence');
            playSequence();
        }
    });

    // 播放序列的逻辑（简化版，不处理音频）
    function playSequence() {
        const intervalId = setInterval(function() {
            if (currentStep >= steps.length) {
                // 如果到达最后一个步骤，停止播放
               // clearInterval(intervalId);
               // isPlaying = false;
               // playButton.innerHTML = "Play"; 
               // playButton.disabled = false; 
               turns++;
               currentStep = 0;
               // return;
            }

            // 切换当前步骤的状态
            steps[currentStep].classList.add('active');

            a1.play();

            // 模拟等待一段时间（比如节拍）
            setTimeout(function() {
                console.log('setTimeout, currentStep='+currentStep);
                if(currentStep>0){
                    steps[currentStep-1].classList.remove('active');
                }
                
                if(currentStep==0&&turns>0){
                    steps[steps.length-1].classList.remove('active');
                }
                currentStep++;
            }, beatTime); // 假设每个节拍是500毫秒

        }, beatTime); // 每个步骤之间的间隔也是500毫秒（这里简化了逻辑，实际中可能需要根据BPM来计算）
    }
});