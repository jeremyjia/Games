document.addEventListener('DOMContentLoaded', function() {    
    document.title+="~jsv0.31";
    const steps = document.querySelectorAll('.step');
    const playButton = document.getElementById('play-button');
    const btnTest = document.getElementById('test');
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
        blo0.blMDiv(document.body,"div4Test","divShowMe_divMove_blClass",550,150,500,200,blColor[8]);
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