class RectTool extends DrawingTool {
    constructor() {
        super('矩形');
    }

    continueDrawing(ctx, x, y) {
        if (this.isDrawing) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.redrawObjects(ctx);
            const width = x - this.startX;
            const height = y - this.startY;
            ctx.strokeRect(this.startX, this.startY, width, height);
        }
    }

    redrawObjects(ctx) {
        app.blackboard.drawnObjects.forEach(obj => {
            ctx.beginPath();
            if (obj === app.blackboard.draggingObject) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            if (obj.type === '矩形') {
                ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
            } else if (obj.type === '直线') {
                ctx.moveTo(obj.startX, obj.startY);
                ctx.lineTo(obj.endX, obj.endY);
            } else if (obj.type === '圆形') {
                const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
                ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
            }
            ctx.stroke();
        });
    }
}

class LineTool extends DrawingTool {
    // ...其他代码保持不变...

    redrawObjects(ctx) {
        app.blackboard.drawnObjects.forEach(obj => {
            ctx.beginPath();
            if (obj === app.blackboard.draggingObject) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            if (obj.type === '直线') {
                ctx.moveTo(obj.startX, obj.startY);
                ctx.lineTo(obj.endX, obj.endY);
            } else if (obj.type === '圆形') {
                const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
                ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
            } else if (obj.type === '矩形') {
                ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
            }
            ctx.stroke();
        });
    }
}

class CircleTool extends DrawingTool {
    // ...其他代码保持不变...

    redrawObjects(ctx) {
        app.blackboard.drawnObjects.forEach(obj => {
            ctx.beginPath();
            if (obj === app.blackboard.draggingObject) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            if (obj.type === '圆形') {
                const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
                ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
            } else if (obj.type === '直线') {
                ctx.moveTo(obj.startX, obj.startY);
                ctx.lineTo(obj.endX, obj.endY);
            } else if (obj.type === '矩形') {
                ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
            }
            ctx.stroke();
        });
    }
}