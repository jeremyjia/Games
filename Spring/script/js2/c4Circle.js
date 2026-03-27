// 圆形类
        class C4Circle extends C4Shape {
            constructor(x1, y1, x2, y2, color, lineWidth) {
                super(x1, y1, color, lineWidth);
                this.x2 = x2;
                this.y2 = y2;
                this.radius = this.calculateRadius();
            }
            
            calculateRadius() {
                return Math.sqrt(Math.pow(this.x2 - this.x1, 2) + Math.pow(this.y2 - this.y1, 2));
            }
            
            // 更新终点并重新计算半径
            updateEndPoint(x2, y2) {
                this.x2 = x2;
                this.y2 = y2;
                this.radius = this.calculateRadius();
            }
            
            draw(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.beginPath();
                context.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.restore();
            }
            
            preview(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.setLineDash([5, 5]);
                context.beginPath();
                context.arc(this.x1, this.y1, this.radius, 0, Math.PI * 2);
                context.stroke();
                context.setLineDash([]);
                context.restore();
            }
            
            move(dx, dy) {
                super.move(dx, dy);
                this.x2 += dx;
                this.y2 += dy;
                this.radius = this.calculateRadius();
            }
            
            // 调整圆形大小（改变半径）
            resize(handle, x, y) {
                // 拖动任何控制点都会改变半径
                this.x2 = x;
                this.y2 = y;
                this.radius = this.calculateRadius();
            }
            
            // 检查点是否在圆上
            isPointOnShape(x, y) {
                const dx = x - this.x1;
                const dy = y - this.y1;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // 检查点是否在圆的边缘附近（考虑线宽）
                return Math.abs(distance - this.radius) <= this.lineWidth + 5;
            }
            
            // 获取圆形的边界框
            getBoundingBox() {
                return {
                    x: this.x1 - this.radius - 5,
                    y: this.y1 - this.radius - 5,
                    width: this.radius * 2 + 10,
                    height: this.radius * 2 + 10
                };
            }
        }
        