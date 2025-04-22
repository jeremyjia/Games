 
class C4Blackboard {
    // ... 其他方法保持不变

    redrawObjects(ctx, currentTool) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已保存的对象
        this.drawnObjects.forEach(obj => {
            const tool = this.tools.find(t => t.name === obj.type);
            tool?.draw(this.ctx, obj, obj === this.draggingObject);
        });
        
        // 绘制当前正在绘制的临时对象
        if (currentTool && currentTool.isDrawing) {
            currentTool.drawTemp(this.ctx);
        }
    }

    // 移除旧的绘图方法 ： drawLine, drawCircle, drawRect等
}

class DrawingTool {
    // 添加通用绘制方法
    draw(ctx, obj, isDragging) {
        ctx.save();
        this.applyStyle(ctx, isDragging);
        this.drawShape(ctx, obj);
        ctx.restore();
    }

    applyStyle(ctx, isDragging) {
        ctx.strokeStyle = isDragging ? 'red' : 'black';
        ctx.lineWidth = isDragging ? 3 : 1;
    }

    drawShape(ctx, obj) {} // 由子类实现
}

class LineTool extends DrawingTool {
    constructor() {
        super();
        this.name = '直线';
    }

    drawShape(ctx, obj) {
        ctx.beginPath();
        ctx.moveTo(obj.startX, obj.startY);
        ctx.lineTo(obj.endX, obj.endY);
        ctx.stroke();
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.currentX, this.currentY);
        ctx.stroke();
    }
}

class CircleTool extends DrawingTool {
    constructor() {
        super();
        this.name = '圆形';
    }

    drawShape(ctx, obj) {
        const radius = Math.sqrt(
            (obj.endX - obj.startX) ** 2 + 
            (obj.endY - obj.startY) ** 2
        );
        ctx.beginPath();
        ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        const radius = Math.sqrt(
            (this.currentX - this.startX) ** 2 + 
            (this.currentY - this.startY) ** 2
        );
        ctx.beginPath();
        ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

class RectTool extends DrawingTool {
    constructor() {
        super();
        this.name = '矩形';
    }

    drawShape(ctx, obj) {
        ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        const width = this.currentX - this.startX;
        const height = this.currentY - this.startY;
        ctx.strokeRect(this.startX, this.startY, width, height);
    }
}

// 其他工具类保持类似结构...
</script>