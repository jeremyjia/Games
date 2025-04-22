 
class TriangleTool extends DrawingTool {
    constructor() {
        super();
        this.name = '三角形';
    }

    drawShape(ctx, obj) {
        const x1 = obj.startX + obj.width / 2;
        const y1 = obj.startY;
        const x2 = obj.startX;
        const y2 = obj.startY + obj.height;
        const x3 = obj.startX + obj.width;
        const y3 = y2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();
    }

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        const width = this.currentX - this.startX;
        const height = this.currentY - this.startY;

        const x1 = this.startX + width / 2;
        const y1 = this.startY;
        const x2 = this.startX;
        const y2 = this.startY + height;
        const x3 = this.startX + width;
        const y3 = y2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();
    }
}

// 在C4Blackboard的getObjectAtPoint方法中添加三角形碰撞检测
class C4Blackboard {
    // ...其他现有代码...

    getObjectAtPoint(x, y) {
        for (let i = this.drawnObjects.length - 1; i >= 0; i--) {
            const obj = this.drawnObjects[i];
            if (obj.type === '三角形') {
                const x1 = obj.startX + obj.width / 2;
                const y1 = obj.startY;
                const x2 = obj.startX;
                const y2 = obj.startY + obj.height;
                const x3 = obj.startX + obj.width;
                const y3 = y2;

                const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
                const area1 = Math.abs((x1 - x) * (y2 - y) - (x2 - x) * (y1 - y));
                const area2 = Math.abs((x2 - x) * (y3 - y) - (x3 - x) * (y2 - y));
                const area3 = Math.abs((x3 - x) * (y1 - y) - (x1 - x) * (y3 - y));
                const epsilon = 0.001;
                if ((area1 + area2 + area3) <= (areaOrig + epsilon)) {
                    return obj;
                }
            }
            // 其他形状的检测...
        }
        return null;
    }
}

// 在SampleClassManager中添加示例代码
class SampleClassManager {
    constructor() {
        this.sampleClasses = {
            '三角形类': `class TriangleTool extends DrawingTool {
                constructor() {
                    super();
                    this.name = '三角形';
                }

                drawShape(ctx, obj) {
                    const x1 = obj.startX + obj.width/2;
                    const y1 = obj.startY;
                    const x2 = obj.startX;
                    const y2 = obj.startY + obj.height;
                    const x3 = obj.startX + obj.width;
                    const y3 = y2;
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x3, y3);
                    ctx.closePath();
                    ctx.stroke();
                }

                drawTemp(ctx) {
                    if (!this.isDrawing) return;
                    const width = this.currentX - this.startX;
                    const height = this.currentY - this.startY;
                    
                    const x1 = this.startX + width/2;
                    const y1 = this.startY;
                    const x2 = this.startX;
                    const y2 = this.startY + height;
                    const x3 = this.startX + width;
                    const y3 = y2;
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.lineTo(x3, y3);
                    ctx.closePath();
                    ctx.stroke();
                }
            }

            // 注册三角形工具
            app.blackboard.registerTool(new TriangleTool());
            // 自动选择新工具
            setTimeout(() => {
                const buttons = app.blackboard.toolbar.querySelectorAll('button');
                buttons[buttons.length - 1].click();
            }, 50);`
        };
    }
}

// 在C4MobileDevApp中注册三角形工具
class C4MobileDevApp {
    constructor() {
        // ...其他初始化代码...
        this.blackboard.registerTool(new TriangleTool());
        // ...后续代码...
    }
}
</script>