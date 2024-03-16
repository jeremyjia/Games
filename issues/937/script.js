document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const playButton = document.getElementById('play-button');
    const btnTest = document.getElementById('test');
    let isPlaying = false;
    let currentStep = 0;

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
                clearInterval(intervalId);
                isPlaying = false;
                playButton.innerHTML = "Play"; 
                playButton.disabled = false;
                console.log('Sequence finished.'); //这句之后，setTimeout会被执行一次
                return;
            }

            // 切换当前步骤的状态
            steps[currentStep].classList.add('active');

            // 模拟等待一段时间（比如节拍）
            setTimeout(function() {
                console.log('setTimeout, currentStep='+currentStep);
                if(currentStep>0) 
                    steps[currentStep-1].classList.remove('active');
                currentStep++;
            }, 555); // 假设每个节拍是500毫秒
        }, 555); // 每个步骤之间的间隔也是500毫秒（这里简化了逻辑，实际中可能需要根据BPM来计算）
    }
});