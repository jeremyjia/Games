
        
        // 自由绘制类
        class C4Freehand extends C4Shape {
            constructor(x1, y1, color, lineWidth) {
                super(x1, y1, color, lineWidth);
                this.points = [{x: x1, y: y1}];
                this.calculateBounds();
            }
            
            // 添加新点
            addPoint(x, y) {
                this.points.push({x, y});
                this.calculateBounds();
            }
            
            // 计算自由绘制的边界
            calculateBounds() {
                if (this.points.length === 0) return;
                
                let minX = this.points[0].x;
                let maxX = this.points[0].x;
                let minY = this.points[0].y;
                let maxY = this.points[0].y;
                
                for (const point of this.points) {
                    minX = Math.min(minX, point.x);
                    maxX = Math.max(maxX, point.x);
                    minY = Math.min(minY, point.y);
                    maxY = Math.max(maxY, point.y);
                }
                
                this.minX = minX;
                this.maxX = maxX;
                this.minY = minY;
                this.maxY = maxY;
            }
            
            draw(context) {
                if (this.points.length < 2) return;
                
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.beginPath();
                context.moveTo(this.points[0].x, this.points[0].y);
                
                for (let i = 1; i < this.points.length; i++) {
                    context.lineTo(this.points[i].x, this.points[i].y);
                }
                
                context.stroke();
                context.restore();
            }
            
            // 自由绘制预览方法，与实际绘制相同
            preview(context) {
                this.draw(context);
            }
            
            move(dx, dy) {
                super.move(dx, dy);
                for (const point of this.points) {
                    point.x += dx;
                    point.y += dy;
                }
                this.calculateBounds();
            }
            
            // 调整自由绘制图形的大小（缩放）
            resize(handle, x, y) {
                // 获取原始边界
                const originalMinX = this.minX;
                const originalMinY = this.minY;
                const originalMaxX = this.maxX;
                const originalMaxY = this.maxY;
                const originalWidth = originalMaxX - originalMinX;
                const originalHeight = originalMaxY - originalMinY;
                
                // 计算新的边界
                let newMinX = originalMinX;
                let newMinY = originalMinY;
                let newMaxX = originalMaxX;
                let newMaxY = originalMaxY;
                
                // 根据拖动的控制点调整边界
                if (handle.includes('w')) newMinX = x;
                if (handle.includes('e')) newMaxX = x;
                if (handle.includes('n')) newMinY = y;
                if (handle.includes('s')) newMaxY = y;
                
                // 确保不会缩小到太小
                const newWidth = newMaxX - newMinX;
                const newHeight = newMaxY - newMinY;
                if (newWidth < 10 || newHeight < 10) return;
                
                // 计算缩放比例和偏移量
                const scaleX = newWidth / originalWidth;
                const scaleY = newHeight / originalHeight;
                const offsetX = newMinX - originalMinX * scaleX;
                const offsetY = newMinY - originalMinY * scaleY;
                
                // 应用缩放和偏移到所有点
                for (const point of this.points) {
                    point.x = point.x * scaleX + offsetX;
                    point.y = point.y * scaleY + offsetY;
                }
                
                // 重新计算边界
                this.calculateBounds();
            }
            
            // 检查点是否在自由绘制的路径上
            isPointOnShape(x, y) {
                // 简化检查：如果点在边界框内，就认为选中了
                if (x < this.minX - this.lineWidth - 5 || x > this.maxX + this.lineWidth + 5 ||
                    y < this.minY - this.lineWidth - 5 || y > this.maxY + this.lineWidth + 5) {
                    return false;
                }
                
                // 更精确的检查：检查点是否靠近任何线段
                for (let i = 0; i < this.points.length - 1; i++) {
                    const p1 = this.points[i];
                    const p2 = this.points[i + 1];
                    
                    // 创建临时线段来检查距离
                    const tempLine = new C4Line(p1.x, p1.y, p2.x, p2.y, this.color, this.lineWidth);
                    if (tempLine.isPointOnShape(x, y)) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // 获取自由绘制的边界框
            getBoundingBox() {
                return {
                    x: this.minX - 5,
                    y: this.minY - 5,
                    width: this.maxX - this.minX + 10,
                    height: this.maxY - this.minY + 10
                };
            }
        }
        