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
}

class C4Rect extends C4DrawingObj {
    draw(ctx) {
        ctx.fillStyle = this.color;
        const width = this.endX - this.startX;
        const height = this.endY - this.startY;
        ctx.fillRect(this.startX, this.startY, width, height);
    }
}