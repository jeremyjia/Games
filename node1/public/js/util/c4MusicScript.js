//c4MusicScript.js 
//...

class C4MusicScript {
    constructor(user) {
        this.user = user;
        this.BPM = 120; // 默认BPM为120
        this.beatType = '4/4'; // 默认拍号为4/4
        this.beatNumerator = 4; // 拍号分子
        this.beatDenominator = 4; // 拍号分母
        this.barsPerLine = 4; // 每行默认4小节
        this.x = 110; // 默认X坐标
        this.y = 30; // 默认Y坐标 
        this.w = 22;  
        this.h = 22;  
        this.setWndOpen = false; // 跟踪setWnd是否打开
        this.isSetWndActive = false; // 顶部条激活状态
        this.isDragging = false; // 标记矩形是否正在被拖动
        this.startX = 0; // 鼠标按下时的初始X坐标
        this.startY = 0; // 鼠标按下时的初始Y坐标
        this.offsetX = 0; // 矩形的初始X坐标偏移量
        this.offsetY = 0; // 矩形的初始Y坐标偏移量
    }

    #toggleSetWnd() {
        this.setWndOpen = !this.setWndOpen;
        this.isSetWndActive = this.setWndOpen;
        
        if (this.setWndOpen) {
            // 创建新窗口
            this.resultContent = document.createElement('div');
            this.resultContent.style.cssText = `
                padding: 10px;
                min-width: 300px;
                max-width: 600px;
                background: white;
            `;
            this.setWnd = new C4DraggableWindow('生成结果', this.resultContent, 100, 100, true);
        } else {
            // 关闭窗口
            if (this.setWnd) {
                this.setWnd.toggleVisibility();
            }
        }
        this.user.redrawCanvas();
    }

    draw_ui_handle(ctx) { 
        ctx.fillStyle = 'blue'; 
        ctx.fillRect(this.x, this.y, this.w, this.h); 
        ctx.fillStyle = this.isSetWndActive ? '#FFA500' : 'brown'; 
        ctx.fillRect(this.x, this.y-5, this.w, 5); 
    }

    handle_mouse_up(ctx, pos) {
        this.isDragging = false;
    }

    handle_mouse_move(ctx, pos) {
        if (this.isDragging) {
            const dx = pos.x - this.startX;
            const dy = pos.y - this.startY;
            this.x = this.offsetX + dx;
            this.y = this.offsetY + dy;
            this.user.redrawCanvas();
        }
    }

    handle_mouse_down(ctx, pos) {
        const clickX = pos.x;
        const clickY = pos.y;

        if (clickX >= this.x && clickX <= this.x + this.w && 
            clickY >= this.y && clickY <= this.y + this.h) {
            this.isDragging = true;
            this.startX = clickX;
            this.startY = clickY;
            this.offsetX = this.x;
            this.offsetY = this.y;
            return true;
        } 
        else if (clickX >= this.x && clickX <= this.x + this.w && 
                 clickY >= this.y -5 && clickY <= this.y) {
            this.#toggleSetWnd();
            return true;
        }
        return false;
    }

    setUI(div) {
        div.innerHTML = ''; 

        // BPM控件
        const bpmContainer = document.createElement('div');
        const bpmLabel = document.createElement('label');
        bpmLabel.textContent = 'BPM: ';
        this.bpmInput = document.createElement('input');
        this.bpmInput.type = 'number';
        this.bpmInput.min = 1;
        this.bpmInput.value = this.BPM;
        bpmLabel.appendChild(this.bpmInput);
        bpmContainer.appendChild(bpmLabel);

        // 拍号控件
        const beatTypeContainer = document.createElement('div');
        const beatTypeLabel = document.createElement('label');
        beatTypeLabel.textContent = '拍号: ';
        this.beatTypeSelect = document.createElement('select');
        ['4/4', '3/4', '6/8', '2/4'].forEach(beat => {
            const option = document.createElement('option');
            option.value = beat;
            option.textContent = beat;
            option.selected = beat === this.beatType;
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

        // 位置控件
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

        // 事件绑定
        this.bpmInput.addEventListener('change', (e) => {
            this.BPM = parseInt(e.target.value) || 120;
        });

        this.beatTypeSelect.addEventListener('change', (e) => {
            const [numerator, denominator] = e.target.value.split('/').map(Number);
            this.beatType = e.target.value;
            this.beatNumerator = numerator;
            this.beatDenominator = denominator;
        });

        this.barsPerLineInput.addEventListener('change', (e) => {
            this.barsPerLine = parseInt(e.target.value) || 4;
        });

        this.xInput.addEventListener('change', (e) => {
            this.x = parseInt(e.target.value) || 10;
            this.user.redrawCanvas();
        });

        this.yInput.addEventListener('change', (e) => {
            this.y = parseInt(e.target.value) || 30;
            this.user.redrawCanvas();
        });

        div.append(bpmContainer, beatTypeContainer, 
                 barsPerLineContainer, positionContainer);
    }

    showInf(ctx, currentTime) {
        const beatDuration = 60 / this.BPM;
        const beatsPerBar = this.beatNumerator;
        const barDuration = beatsPerBar * beatDuration;
        const totalBeats = currentTime / beatDuration;
        const barNumber = Math.floor(totalBeats / beatsPerBar) + 1;
        const beatNumber = Math.floor(totalBeats % beatsPerBar) + 1;

        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`小节: ${barNumber}, 拍: ${beatNumber}`, this.x, this.y);
    }
}