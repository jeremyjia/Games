 
        class SampleClassManager {
            constructor() {
                this.sampleClasses = {
                    'tree': `class TreeTool extends DrawingTool {
    constructor() {
        super();
        this.name = '树木';
        this.trunkWidth = 20;  // 树干固定宽度
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

    drawShape(ctx, obj) {
        // 绘制树干
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(
            obj.startX - this.trunkWidth/2,
            obj.startY,
            this.trunkWidth,
            obj.trunkHeight
        );

        // 绘制树冠
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.moveTo(obj.startX, obj.startY - obj.canopyHeight);  // 顶点
        ctx.lineTo(obj.startX - obj.canopyWidth/2, obj.startY); // 左下角
        ctx.lineTo(obj.startX + obj.canopyWidth/2, obj.startY); // 右下角
        ctx.closePath();
        ctx.fill();
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        
        // 计算树干高度和树冠尺寸
        const trunkHeight = Math.abs(this.currentY - this.startY);
        const canopyHeight = trunkHeight * 0.8;
        const canopyWidth = trunkHeight * 0.6;

        // 绘制临时树干
        ctx.fillStyle = '#8B451366';
        ctx.fillRect(
            this.startX - this.trunkWidth/2,
            this.startY,
            this.trunkWidth,
            trunkHeight
        );

        // 绘制临时树冠
        ctx.fillStyle = '#228B2266';
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY - canopyHeight);
        ctx.lineTo(this.startX - canopyWidth/2, this.startY);
        ctx.lineTo(this.startX + canopyWidth/2, this.startY);
        ctx.closePath();
        ctx.fill();
    }

    endDrawing(ctx, x, y) {
        super.endDrawing();
        const trunkHeight = y - this.startY;
        const canopyHeight = trunkHeight * 0.8;
        const canopyWidth = trunkHeight * 0.6;
        
        app.blackboard.drawnObjects.push({
            type: this.name,
            startX: this.startX,
            startY: this.startY,
            trunkHeight: trunkHeight,
            canopyHeight: canopyHeight,
            canopyWidth: canopyWidth
        });
    }
}

app.blackboard.registerTool(new TreeTool());
// 自动选择新工具
setTimeout(() => {
    const buttons = app.blackboard.toolbar.querySelectorAll('button');
    buttons[buttons.length - 1].click();
}, 50);`,
                    // 其他类保持不变...
                };
            }
            // 其余代码保持不变...
        }

        // 其他类保持不变...

        class C4MobileDevApp {
            constructor() {
                // 初始化代码保持不变...
                this.blackboard.registerTool(new LineTool());
                this.blackboard.registerTool(new CircleTool());
                // 移除旧的TreeTool注册
                setTimeout(() => {
                    this.blackboard.toolbar.querySelector('button').click();
                }, 100);
                // 其余初始化代码保持不变...
            }
            // 其余方法保持不变...
        }

        // 其他类保持不变...
    </script>
</body>
</html>