class C4Blackboard {
    // ... 其他方法保持不变

    redrawObjects(ctx, currentTool) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已保存的对象
        this.drawnObjects.forEach(obj => this.drawSingleObject(obj, ctx));
        
        // 绘制当前正在绘制的临时对象
        if (currentTool && currentTool.isDrawing) {
            this.drawTempObject(currentTool, ctx);
        }
    }

    drawSingleObject(obj, ctx = this.ctx) {
        ctx.save();
        this.applyObjectStyle(obj, ctx);
        
        switch(obj.type) {
            case '直线':
                this.drawLine(obj, ctx);
                break;
            case '圆形':
                this.drawCircle(obj, ctx);
                break;
            case '矩形':
                this.drawRect(obj, ctx);
                break;
        }
        
        ctx.restore();
    }

    applyObjectStyle(obj, ctx) {
        if (obj === this.draggingObject) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
        }
    }

    drawLine(obj, ctx) {
        ctx.beginPath();
        ctx.moveTo(obj.startX, obj.startY);
        ctx.lineTo(obj.endX, obj.endY);
        ctx.stroke();
    }

    drawCircle(obj, ctx) {
        const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
        ctx.beginPath();
        ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawRect(obj, ctx) {
        ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
    }

    drawTempObject(tool, ctx) {
        ctx.save();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        
        switch(tool.name) {
            case '直线':
                this.drawLine(tool.getTempObject(), ctx);
                break;
            case '圆形':
                this.drawCircle(tool.getTempObject(), ctx);
                break;
            case '矩形':
                this.drawRect(tool.getTempObject(), ctx);
                break;
        }
        
        ctx.restore();
    }
}

class DrawingTool {
    // 新增方法获取临时绘制对象
    getTempObject() {
        return {
            type: this.name,
            startX: this.startX,
            startY: this.startY,
            endX: this.currentX,
            endY: this.currentY,
            width: this.currentX - this.startX,
            height: this.currentY - this.startY
        };
    }
}

// 修改各个工具类的continueDrawing方法
class RectTool extends DrawingTool {
    continueDrawing(ctx, x, y) {
        if (this.isDrawing) {
            this.currentX = x;
            this.currentY = y;
            app.blackboard.redrawObjects(ctx, this);
        }
    }
}

class LineTool extends DrawingTool {
    continueDrawing(ctx, x, y) {
        if (this.isDrawing) {
            this.currentX = x;
            this.currentY = y;
            app.blackboard.redrawObjects(ctx, this);
        }
    }
}

class CircleTool extends DrawingTool {
    continueDrawing(ctx, x, y) {
        if (this.isDrawing) {
            this.currentX = x;
            this.currentY = y;
            app.blackboard.redrawObjects(ctx, this);
        }
    }
}