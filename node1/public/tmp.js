class TreeTool extends DrawingTool {
    constructor() {
        super();
        this.name = '树木';
        this.trunkWidth = 20;
    }

    containsPoint(x, y, obj) {
        // 检测树干区域
        const trunkLeft = obj.startX - this.trunkWidth/2;
        const trunkRight = obj.startX + this.trunkWidth/2;
        const trunkBottom = obj.startY + obj.trunkHeight;
        
        // 检测树冠区域（三角形）
        const canopyTop = obj.startY - obj.canopyHeight;
        const canopyLeft = obj.startX - obj.canopyWidth/2;
        const canopyRight = obj.startX + obj.canopyWidth/2;

        // 检查是否在树干范围内
        const inTrunk = x >= trunkLeft && x <= trunkRight && 
                       y >= obj.startY && y <= trunkBottom;

        // 检查是否在树冠范围内（三角形）
        const inCanopy = (
            y >= canopyTop && y <= obj.startY &&
            x >= canopyLeft && x <= canopyRight &&
            (x - obj.startX) <= (obj.canopyWidth/2 * (y - canopyTop)/obj.canopyHeight) &&
            (obj.startX - x) <= (obj.canopyWidth/2 * (y - canopyTop)/obj.canopyHeight)
        );

        return inTrunk || inCanopy;
    }

    drawShape(ctx, obj, isDragging) {
        // 保存原始样式
        ctx.save();
        
        // 应用高亮样式
        this.applyStyle(ctx, isDragging);
        
        // 设置树干颜色（高亮时使用红色半透明，否则使用存储颜色）
        ctx.fillStyle = isDragging ? 'rgba(255, 0, 0, 0.5)' : (obj.fillColor || '#8B4513');
        ctx.strokeStyle = isDragging ? 'red' : 'black';
        ctx.lineWidth = isDragging ? 3 : 1;
        
        // 绘制树干
        ctx.fillRect(
            obj.startX - this.trunkWidth/2,
            obj.startY,
            this.trunkWidth,
            obj.trunkHeight
        );
        ctx.strokeRect(
            obj.startX - this.trunkWidth/2,
            obj.startY,
            this.trunkWidth,
            obj.trunkHeight
        );

        // 设置树冠颜色（高亮时使用绿色半透明）
        ctx.fillStyle = isDragging ? 'rgba(0, 255, 0, 0.5)' : (obj.canopyColor || '#228B22');
        ctx.beginPath();
        ctx.moveTo(obj.startX, obj.startY - obj.canopyHeight);
        ctx.lineTo(obj.startX - obj.canopyWidth/2, obj.startY);
        ctx.lineTo(obj.startX + obj.canopyWidth/2, obj.startY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 恢复原始样式
        ctx.restore();
    }

    // 保持其他方法不变...
}

app.blackboard.registerTool(new TreeTool());