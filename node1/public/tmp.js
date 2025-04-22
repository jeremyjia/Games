class C4Blackboard {
    // ... 其他保持不变 ...

    onMouseMove(e) {
        const coords = this.getCanvasCoordinates(e);
        const x = coords.x;
        const y = coords.y;

        if (this.draggingObject) {
            // ... 拖动逻辑保持不变 ...
        } else {
            // 更新当前坐标并重绘
            this.selectedTool?.continueDrawing(x, y);
            this.redrawObjects(this.selectedTool); // 传递当前工具
        }
    }

    redrawObjects(currentTool) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制已保存对象
        this.drawnObjects.forEach(obj => {
            const tool = this.tools.find(t => t.name === obj.type);
            tool?.draw(this.ctx, obj, obj === this.draggingObject);
        });

        // 绘制临时对象
        if (currentTool?.isDrawing) {
            const tempObj = currentTool.getTempObject();
            currentTool.draw(this.ctx, tempObj);
        }
    }
}

class DrawingTool {
    // ... 其他保持不变 ...

    continueDrawing(x, y) {
        this.currentX = x;
        this.currentY = y;
    }

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

class LineTool extends DrawingTool {
    // ... 其他保持不变 ...

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        const tempObj = this.getTempObject();
        this.draw(ctx, tempObj);
    }
}

class CircleTool extends DrawingTool {
    // ... 其他保持不变 ...

    drawTemp(ctx) {
        if (!this.isDrawing) return;
        const tempObj = this.getTempObject();
        this.draw(ctx, tempObj);
    }
}