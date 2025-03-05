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