// c4DrawingObjs.js
class C4DrawingObj {
    constructor(startX, startY, endX, endY, color) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
    }

    draw(ctx) {
        throw new Error("Abstract method must be implemented");
    }
    setUI(div, onChange) {
        div.innerHTML = ''; // 清空原有内容
        // 创建颜色选择器
        const colorContainer = document.createElement('div');
        colorContainer.style.margin = '5px 0';
        const colorLabel = document.createElement('label');
        colorLabel.textContent = '颜色: ';
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = this.color;
        colorInput.addEventListener('input', (e) => {
            this.color = e.target.value;
            if (onChange) onChange();
        });
        colorContainer.appendChild(colorLabel);
        colorContainer.appendChild(colorInput);
        div.appendChild(colorContainer);
    }
}

class C4Line extends C4DrawingObj {
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    setUI(div, onChange) {
        super.setUI(div, onChange); // 创建颜色输入

        const addCoordinateInput = (labelText, value, property) => {
            const container = document.createElement('div');
            container.style.margin = '5px 0';
            const label = document.createElement('label');
            label.textContent = labelText;
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any'; // 允许小数
            input.value = value;
            input.addEventListener('input', (e) => {
                this[property] = parseFloat(e.target.value);
                if (onChange) onChange();
            });
            container.appendChild(label);
            container.appendChild(input);
            div.appendChild(container);
        };

        addCoordinateInput('起点 X:', this.startX, 'startX');
        addCoordinateInput('起点 Y:', this.startY, 'startY');
        addCoordinateInput('终点 X:', this.endX, 'endX');
        addCoordinateInput('终点 Y:', this.endY, 'endY');
    }
    // 添加点击检测
    isPointInside(x, y) {
        const buffer = 5; // 点击容差
        return this.pointToLineDistance(x, y) < buffer;
    }
    pointToLineDistance(x, y) {
        const { startX: x1, startY: y1, endX: x2, endY: y2 } = this;
        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        if (lenSq !== 0) {
            param = dot / lenSq;
        }

        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

}

class C4Rect extends C4DrawingObj {
    // 添加动态尺寸计算
    get width() { return Math.abs(this.endX - this.startX); }
    get height() { return Math.abs(this.endY - this.startY); }
    draw(ctx) {
        ctx.fillStyle = this.color;
        const width = this.endX - this.startX;
        const height = this.endY - this.startY;
        ctx.fillRect(this.startX, this.startY, width, height);
    }
    setUI(div, onChange) {
        super.setUI(div, onChange); // 创建颜色输入

        const addCoordinateInput = (labelText, value, property) => {
            const container = document.createElement('div');
            container.style.margin = '5px 0';
            const label = document.createElement('label');
            label.textContent = labelText;
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.value = value;
            input.addEventListener('input', (e) => {
                this[property] = parseFloat(e.target.value);
                if (onChange) onChange();
            });
            container.appendChild(label);
            container.appendChild(input);
            div.appendChild(container);
        };

        addCoordinateInput('起点 X:', this.startX, 'startX');
        addCoordinateInput('起点 Y:', this.startY, 'startY');
        addCoordinateInput('终点 X:', this.endX, 'endX');
        addCoordinateInput('终点 Y:', this.endY, 'endY');
    }
    
    isPointInside(x, y) {
        const left = Math.min(this.startX, this.endX);
        const right = Math.max(this.startX, this.endX);
        const top = Math.min(this.startY, this.endY);
        const bottom = Math.max(this.startY, this.endY);
        return x >= left && x <= right && y >= top && y <= bottom;
    }
}

const createShape = function (type, start, end) {   
    const color = '#000';
    switch (type) {
        case 'line':
            return new C4Line(start.x, start.y, end.x, end.y, color);
        case 'rect':
            return new C4Rect(start.x, start.y, end.x, end.y, color);
        default:
            return null;
    }
}
const drawTempShape = function (videoEditor,ctx,currentTool,currentPos) { 
    ctx.save();
    // 使用黑色边框和半透明填充
    ctx.strokeStyle = '#000';
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;

    switch (currentTool) {
        case 'line':
            ctx.beginPath();
            ctx.moveTo(videoEditor.startPos.x, videoEditor.startPos.y);
            ctx.lineTo(currentPos.x, currentPos.y);
            ctx.stroke();
            break;
        case 'rect':
            ctx.fillRect(
                videoEditor.startPos.x,
                videoEditor.startPos.y,
                currentPos.x - videoEditor.startPos.x,
                currentPos.y - videoEditor.startPos.y
            );
            ctx.strokeRect(
                videoEditor.startPos.x,
                videoEditor.startPos.y,
                currentPos.x - videoEditor.startPos.x,
                currentPos.y - videoEditor.startPos.y
            );
            break;
    }
    ctx.restore();
}
const drawHUD = function (_ve, x, y, fontSize) {
    const fps = parseInt(_ve.fpsInput.value) || 30;
    const totalFrames = _ve.scenesHandler.scenes.reduce((sum, s) => sum + s.duration, 0);
    const currentFrame = _ve.currentFrame + 1;
    const currentScene = _ve.currentPlaySceneIndex + 1;
    const totalScenes = _ve.scenesHandler.scenes.length;

    // 时间计算（优先使用音频时间，若不可用则使用帧数计算）
    let currentTimeInSeconds, totalTimeInSeconds;
    if (_ve.audio && !isNaN(_ve.audio.currentTime)) {
        currentTimeInSeconds = _ve.audio.currentTime;
    } else {
        currentTimeInSeconds = (_ve.currentFrame) / fps;
    }

    if (_ve.audio && !isNaN(_ve.audio.duration) && _ve.audio.duration > 0) {
        totalTimeInSeconds = _ve.audio.duration;
    } else {
        totalTimeInSeconds = totalFrames / fps;
    }

    // 时间格式化函数
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toFixed(2).padStart(5, '0')
        ].join(':');
    };

    // 调整HUD背景尺寸
    _ve.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    _ve.ctx.fillRect(5, 5, 220, 100); // 加宽背景以适应时间显示

    // 绘制文本信息
    _ve.ctx.fillStyle = 'white';
    _ve.ctx.font = `${fontSize}px Arial`;
    _ve.ctx.textBaseline = 'top';
    _ve.ctx.fillText(`帧率: ${fps} FPS`, x, y);
    _ve.ctx.fillText(`帧: ${currentFrame}/${totalFrames}`, x, y + 20);
    _ve.ctx.fillText(`场景: ${currentScene}/${totalScenes}`, x, y + 40);
    _ve.ctx.fillText(`时间: ${formatDuration(currentTimeInSeconds)}/${formatDuration(totalTimeInSeconds)}`, x, y + 60);

    // 原有字幕逻辑
    oSrt = new C4Srt();  
    oSrt.getCurrentSubtitle(_ve.audio.currentTime); 
    oSrt.showCurrentSubTxt(_ve.ctx, _ve.canvas);
};
const  drawSelectionHighlight = function (_v_e) {
    if (!_v_e.selectedShape) return;
    
    _v_e.ctx.save();
    _v_e.ctx.strokeStyle = '#FF0000';
    _v_e.ctx.lineWidth = 2;
    
    // 统一处理直线和矩形的控制点绘制
    if (_v_e.selectedShape instanceof C4Line || _v_e.selectedShape instanceof C4Rect) {
        // 绘制控制点
        const drawControlPoint = (x, y, isSelected) => {
            _v_e.ctx.beginPath();
            _v_e.ctx.arc(x, y, 8, 0, Math.PI * 2);
            _v_e.ctx.fillStyle = isSelected ? '#FF0000' : '#FFFFFF';
            _v_e.ctx.strokeStyle = '#000000';
            _v_e.ctx.lineWidth = 2;
            _v_e.ctx.fill();
            _v_e.ctx.stroke();
        };
        
        // 绘制图形轮廓
        if (_v_e.selectedShape instanceof C4Line) {
            _v_e.ctx.beginPath();
            _v_e.ctx.moveTo(_v_e.selectedShape.startX, _v_e.selectedShape.startY);
            _v_e.ctx.lineTo(_v_e.selectedShape.endX, _v_e.selectedShape.endY);
            _v_e.ctx.stroke();
        } else {
            _v_e.ctx.strokeRect(
                _v_e.selectedShape.startX,
                _v_e.selectedShape.startY,
                _v_e.selectedShape.endX - _v_e.selectedShape.startX,
                _v_e.selectedShape.endY - _v_e.selectedShape.startY
            );
        }
        
        // 绘制控制点
        drawControlPoint(
            _v_e.selectedShape.startX,
            _v_e.selectedShape.startY,
            _v_e.selectedPoint === 'start'
        );
        drawControlPoint(
            _v_e.selectedShape.endX,
            _v_e.selectedShape.endY,
            _v_e.selectedPoint === 'end'
        );
    }
    
    _v_e.ctx.restore();
}

