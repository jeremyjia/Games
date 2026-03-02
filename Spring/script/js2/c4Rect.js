
        // 矩形类
        class C4Rect extends C4Shape {
            constructor(x1, y1, x2, y2, color, lineWidth) {
                super(x1, y1, color, lineWidth);
                this.x2 = x2;
                this.y2 = y2;
            }
            
            // 更新终点
            updateEndPoint(x2, y2) {
                this.x2 = x2;
                this.y2 = y2;
            }
            
            draw(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.beginPath();
                
                const x = Math.min(this.x1, this.x2);
                const y = Math.min(this.y1, this.y2);
                const width = Math.abs(this.x2 - this.x1);
                const height = Math.abs(this.y2 - this.y1);
                
                context.rect(x, y, width, height);
                context.stroke();
                context.restore();
            }
            
            preview(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.setLineDash([5, 5]);
                context.beginPath();
                
                const x = Math.min(this.x1, this.x2);
                const y = Math.min(this.y1, this.y2);
                const width = Math.abs(this.x2 - this.x1);
                const height = Math.abs(this.y2 - this.y1);
                
                context.rect(x, y, width, height);
                context.stroke();
                context.setLineDash([]);
                context.restore();
            }
            
            move(dx, dy) {
                super.move(dx, dy);
                this.x2 += dx;
                this.y2 += dy;
            }
            
            // 调整矩形大小
            resize(handle, x, y) {
                const originalMinX = Math.min(this.x1, this.x2);
                const originalMinY = Math.min(this.y1, this.y2);
                const originalMaxX = Math.max(this.x1, this.x2);
                const originalMaxY = Math.max(this.y1, this.y2);
                
                // 确保矩形不会缩小到零或负数大小
                if (handle.includes('w') && x >= originalMaxX - 10) return;
                if (handle.includes('e') && x <= originalMinX + 10) return;
                if (handle.includes('n') && y >= originalMaxY - 10) return;
                if (handle.includes('s') && y <= originalMinY + 10) return;
                
                // 根据拖动的控制点调整相应的边
                if (this.x1 === originalMinX) {
                    if (handle.includes('w')) this.x1 = x;
                    if (handle.includes('e')) this.x2 = x;
                } else {
                    if (handle.includes('w')) this.x2 = x;
                    if (handle.includes('e')) this.x1 = x;
                }
                
                if (this.y1 === originalMinY) {
                    if (handle.includes('n')) this.y1 = y;
                    if (handle.includes('s')) this.y2 = y;
                } else {
                    if (handle.includes('n')) this.y2 = y;
                    if (handle.includes('s')) this.y1 = y;
                }
            }
            
            // 检查点是否在矩形的边上
            isPointOnShape(x, y) {
                const rectX = Math.min(this.x1, this.x2);
                const rectY = Math.min(this.y1, this.y2);
                const rectWidth = Math.abs(this.x2 - this.x1);
                const rectHeight = Math.abs(this.y2 - this.y1);
                
                // 检查点是否在矩形的边缘附近（考虑线宽）
                const onLeftEdge = x >= rectX - this.lineWidth - 5 && x <= rectX + this.lineWidth + 5 &&
                                  y >= rectY && y <= rectY + rectHeight;
                                  
                const onRightEdge = x >= rectX + rectWidth - this.lineWidth - 5 && x <= rectX + rectWidth + this.lineWidth + 5 &&
                                   y >= rectY && y <= rectY + rectHeight;
                                   
                const onTopEdge = y >= rectY - this.lineWidth - 5 && y <= rectY + this.lineWidth + 5 &&
                                 x >= rectX && x <= rectX + rectWidth;
                                 
                const onBottomEdge = y >= rectY + rectHeight - this.lineWidth - 5 && y <= rectY + rectHeight + this.lineWidth + 5 &&
                                    x >= rectX && x <= rectX + rectWidth;
                                    
                return onLeftEdge || onRightEdge || onTopEdge || onBottomEdge;
            }
            
            // 获取矩形的边界框
            getBoundingBox() {
                const x = Math.min(this.x1, this.x2);
                const y = Math.min(this.y1, this.y2);
                const width = Math.abs(this.x2 - this.x1);
                const height = Math.abs(this.y2 - this.y1);
                
                // 为边界框增加一些边距
                return {
                    x: x - 5,
                    y: y - 5,
                    width: width + 10,
                    height: height + 10
                };
            }
        }
        