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
}

class C4Line extends C4DrawingObj {
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = this.color;
        ctx.stroke();
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
const drawHUD = function (_ve) {
    const fps = parseInt(_ve.fpsInput.value) || 30;
    const totalFrames = _ve.scenesHandler.scenes.reduce((sum, s) => sum + s.duration, 0);
    const currentFrame = _ve.currentFrame + 1;
    const currentScene = _ve.currentPlaySceneIndex + 1;
    const totalScenes = _ve.scenesHandler.scenes.length;

    _ve.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    _ve.ctx.fillRect(5, 5, 160, 60);

    _ve.ctx.fillStyle = 'white';
    _ve.ctx.font = '14px Arial';
    _ve.ctx.textBaseline = 'top';
    _ve.ctx.fillText(`帧率: ${fps} FPS`, 10, 10);
    _ve.ctx.fillText(`帧: ${currentFrame}/${totalFrames}`, 10, 30);
    _ve.ctx.fillText(`场景: ${currentScene}/${totalScenes}`, 10, 50);

    _ve.srtHandler.showCurrentSubTxt(_ve.ctx,_ve.canvas);
    
}
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
