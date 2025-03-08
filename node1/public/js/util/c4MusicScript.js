//c4MusicScript.js 

class C4MusicScript {
    constructor() {
        this.BPM = 120;            // 默认BPM为120
        this.beatType = '4/4';      // 默认拍号为4/4
        this.beatNumerator = 4;     // 拍号分子
        this.beatDenominator = 4;   // 拍号分母
        this.barsPerLine = 4;       // 每行默认4小节
        this.x = 10;                // 默认X坐标
        this.y = 30;                // 默认Y坐标
        this.color = '#000000';      // 新增文本颜色属性
    }

    /**
     * 设置UI控件到指定的div元素中
     * @param {HTMLElement} div - 用于放置UI控件的div元素
     */
    setUI(div) {
        div.innerHTML = ''; // 清空div内容

        // BPM输入控件
        const bpmContainer = document.createElement('div');
        const bpmLabel = document.createElement('label');
        bpmLabel.textContent = 'BPM: ';
        this.bpmInput = document.createElement('input');
        this.bpmInput.type = 'number';
        this.bpmInput.min = 1;
        this.bpmInput.value = this.BPM;
        bpmLabel.appendChild(this.bpmInput);
        bpmContainer.appendChild(bpmLabel);

        // 拍号选择控件
        const beatTypeContainer = document.createElement('div');
        const beatTypeLabel = document.createElement('label');
        beatTypeLabel.textContent = '拍号: ';
        this.beatTypeSelect = document.createElement('select');
        ['4/4', '3/4', '6/8', '2/4'].forEach(beat => {
            const option = document.createElement('option');
            option.value = beat;
            option.textContent = beat;
            if (beat === this.beatType) option.selected = true;
            this.beatTypeSelect.appendChild(option);
        });
        beatTypeLabel.appendChild(this.beatTypeSelect);
        beatTypeContainer.appendChild(beatTypeLabel);

        // 每行小节数控件
        const barsPerLineContainer = document.createElement('div');
        const barsPerLineLabel = document.createElement('label');
        barsPerLineLabel.textContent = '每行小节数: ';
        this.barsPerLineInput = document.createElement('input');
        this.barsPerLineInput.type = 'number';
        this.barsPerLineInput.min = 1;
        this.barsPerLineInput.value = this.barsPerLine;
        barsPerLineLabel.appendChild(this.barsPerLineInput);
        barsPerLineContainer.appendChild(barsPerLineLabel);

        // 位置坐标控件
        const positionContainer = document.createElement('div');
        const xContainer = document.createElement('div');
        const xLabel = document.createElement('label');
        xLabel.textContent = 'X位置: ';
        this.xInput = document.createElement('input');
        this.xInput.type = 'number';
        this.xInput.value = this.x;
        xLabel.appendChild(this.xInput);
        xContainer.appendChild(xLabel);

        const yContainer = document.createElement('div');
        const yLabel = document.createElement('label');
        yLabel.textContent = 'Y位置: ';
        this.yInput = document.createElement('input');
        this.yInput.type = 'number';
        this.yInput.value = this.y;
        yLabel.appendChild(this.yInput);
        yContainer.appendChild(yLabel);
        positionContainer.append(xContainer, yContainer);

        // 新增颜色选择控件
        const colorContainer = document.createElement('div');
        const colorLabel = document.createElement('label');
        colorLabel.textContent = '文本颜色: ';
        this.colorInput = document.createElement('input');
        this.colorInput.type = 'color';
        this.colorInput.value = this.color;
        colorLabel.appendChild(this.colorInput);
        colorContainer.appendChild(colorLabel);

        // 组合所有控件
        div.append(
            bpmContainer,
            beatTypeContainer,
            barsPerLineContainer,
            positionContainer,
            colorContainer
        );

        // 事件监听器
        this.bpmInput.addEventListener('change', (e) => {
            this.BPM = parseInt(e.target.value) || 120;
        });

        this.beatTypeSelect.addEventListener('change', (e) => {
            this.beatType = e.target.value;
            const [numerator, denominator] = e.target.value.split('/').map(Number);
            this.beatNumerator = numerator;
            this.beatDenominator = denominator;
        });

        this.barsPerLineInput.addEventListener('change', (e) => {
            this.barsPerLine = parseInt(e.target.value) || 4;
        });

        this.xInput.addEventListener('change', (e) => {
            this.x = parseInt(e.target.value) || 10;
        });

        this.yInput.addEventListener('change', (e) => {
            this.y = parseInt(e.target.value) || 30;
        });

        this.colorInput.addEventListener('input', (e) => {
            this.color = e.target.value;
        });
    }

    /**
     * 在画布上显示当前时间对应的小节和拍数
     * @param {CanvasRenderingContext2D} ctx - 画布上下文
     * @param {number} currentTime - 当前时间（秒）
     */
    showInf(ctx, currentTime) {
        // 计算时间参数
        const beatDuration = 60 / this.BPM;
        const beatsPerBar = this.beatNumerator;
        const barDuration = beatsPerBar * beatDuration;

        // 计算小节和拍数
        const totalBeats = currentTime / beatDuration;
        const barNumber = Math.floor(totalBeats / beatsPerBar) + 1;
        const beatNumber = Math.floor(totalBeats % beatsPerBar) + 1;

        // 绘制文本
        ctx.font = '20px Arial';
        ctx.fillStyle = this.color;
        ctx.fillText(`小节: ${barNumber}, 拍: ${beatNumber}`, this.x, this.y);
        
        // 控制台输出
        console.log(`[${new Date().toISOString()}] 显示参数：`, {
            color: this.color,
            position: { x: this.x, y: this.y },
            text: `小节: ${barNumber}, 拍: ${beatNumber}`
        });
    }
}