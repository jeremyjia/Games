 
class C4Blackboard {
    // ... 其他保持不变 ...

    getCanvasCoordinates(e) {
        const rect = this.canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    onMouseDown(e) {
        const coords = this.getCanvasCoordinates(e);
        const x = coords.x;
        const y = coords.y;
        this.draggingObject = this.getObjectAtPoint(x, y);
        
        if (this.draggingObject) {
            this.dragOffsetX = x - this.draggingObject.startX;
            this.dragOffsetY = y - this.draggingObject.startY;
        } else {
            this.selectedTool?.startDrawing(this.ctx, x, y);
        }
    }

    onMouseMove(e) {
        const coords = this.getCanvasCoordinates(e);
        const x = coords.x;
        const y = coords.y;

        if (this.draggingObject) {
            const dx = x - this.dragOffsetX - this.draggingObject.startX;
            const dy = y - this.dragOffsetY - this.draggingObject.startY;

            if (this.draggingObject.type === '直线' || this.draggingObject.type === '圆形') {
                this.draggingObject.startX += dx;
                this.draggingObject.startY += dy;
                this.draggingObject.endX += dx;
                this.draggingObject.endY += dy;
            } else {
                this.draggingObject.startX = x - this.dragOffsetX;
                this.draggingObject.startY = y - this.dragOffsetY;
            }
            this.redrawObjects();
        } else {
            this.redrawObjects();
            this.selectedTool?.continueDrawing(this.ctx, x, y);
        }
    }

    onMouseUp(e) {
        const coords = this.getCanvasCoordinates(e);
        const x = coords.x;
        const y = coords.y;

        if (this.draggingObject) {
            this.draggingObject = null;
        } else {
            this.selectedTool?.endDrawing(this.ctx, x, y);
            if (this.selectedTool) {
                const newObject = {
                    type: this.selectedTool.name,
                    startX: this.selectedTool.startX,
                    startY: this.selectedTool.startY,
                    endX: x,
                    endY: y
                };
                this.drawnObjects.push(newObject);
            }
        }
    }

    // 更新事件监听器
    constructor() {
        // ... 其他初始化代码 ...
        
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.onMouseDown(e);
        }, { passive: false });
        
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.onMouseMove(e);
        }, { passive: false });
        
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.onMouseUp(e);
        }, { passive: false });
    }
}

// ... 保持其他类不变 ...
</script>