class TreeTool extends DrawingTool {
    constructor() {
        super();
        this.name = '树木';
        this.trunkWidth = 20;
    }

    // containsPoint 方法保持不变...

    drawShape(ctx, obj) {
        // 绘制树干
        ctx.fillStyle = obj.fillColor || '#8B4513';
        ctx.fillRect(
            obj.startX - this.trunkWidth/2,
            obj.startY,
            this.trunkWidth,
            obj.trunkHeight
        );

        // 绘制树冠
        ctx.fillStyle = obj.canopyColor || '#228B22';
        ctx.beginPath();
        ctx.moveTo(obj.startX, obj.startY - obj.canopyHeight);
        ctx.lineTo(obj.startX - obj.canopyWidth/2, obj.startY);
        ctx.lineTo(obj.startX + obj.canopyWidth/2, obj.startY);
        ctx.closePath();
        ctx.fill();
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        
        // 实时计算尺寸
        const trunkHeight = Math.abs(this.currentY - this.startY);
        const canopyHeight = trunkHeight * 0.8;
        const canopyWidth = trunkHeight * 0.6;

        // 半透明预览
        ctx.fillStyle = '#8B451344';
        ctx.fillRect(
            this.startX - this.trunkWidth/2,
            this.startY,
            this.trunkWidth,
            trunkHeight
        );

        ctx.fillStyle = '#228B2244';
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY - canopyHeight);
        ctx.lineTo(this.startX - canopyWidth/2, this.startY);
        ctx.lineTo(this.startX + canopyWidth/2, this.startY);
        ctx.closePath();
        ctx.fill();
    }

    endDrawing(ctx, x, y) {
        super.endDrawing();
        const trunkHeight = Math.abs(y - this.startY);
        const canopyHeight = trunkHeight * 0.8;
        const canopyWidth = trunkHeight * 0.6;
        
        app.blackboard.drawnObjects.push({
            type: this.name,
            startX: this.startX,
            startY: this.startY,
            trunkHeight: trunkHeight,
            canopyHeight: canopyHeight,
            canopyWidth: canopyWidth,
            fillColor: '#8B4513',  // 保存颜色信息
            canopyColor: '#228B22'
        });
    }
}

// 修改黑板的重绘方法
class C4Blackboard {
    // ... 其他方法保持不变 ...

    redrawObjects(currentTool) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已保存对象
        this.drawnObjects.forEach(obj => {
            const tool = this.tools.find(t => t.name === obj.type);
            tool?.draw(this.ctx, obj, obj === this.draggingObject);
        });

        // 实时绘制临时对象
        if (currentTool?.isDrawing) {
            currentTool.drawTemp(this.ctx);
        }
    }
}