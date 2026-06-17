// 直线类
class C4Line extends C4Shape {
    constructor(x1, y1, x2, y2, color, lineWidth) {
                super(x1, y1, color, lineWidth);
                this.x2 = x2;
                this.y2 = y2;
    }
            
            draw(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(this.x1, this.y1);
                context.lineTo(this.x2, this.y2);
                context.stroke();
                context.restore();
            }
            
            preview(context) {
                context.save();
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.color;
                context.setLineDash([5, 5]);
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(this.x1, this.y1);
                context.lineTo(this.x2, this.y2);
                context.stroke();
                context.setLineDash([]);
                context.restore();
            }
            
            move(dx, dy) {
                console.log(Date() + ":" + dx + "," + dy);
                super.move(dx, dy);
                this.x2 += dx;
                this.y2 += dy;
            }
            
            // 调整直线大小（改变端点位置）
            resize(handle, x, y) {
                console.log(Date() + ":" + x + "," + y);
                // 直线只有两个端点，根据拖动的控制点决定修改哪个端点
                if (handle === 'nw' || handle === 'w' || handle === 'n') {
                    this.x1 = x;
                    this.y1 = y;
                } else {
                    this.x2 = x;
                    this.y2 = y;
                }
            }
            
            // 检查点是否在线段上（使用点到线段的距离）
            isPointOnShape(x, y) {
                const distance = this.pointToLineDistance(x, y);
                return distance <= this.lineWidth + 5; // 增加一点容错
            }
            
            // 计算点到线段的距离
            pointToLineDistance(x, y) {
                const A = x - this.x1;
                const B = y - this.y1;
                const C = this.x2 - this.x1;
                const D = this.y2 - this.y1;
                
                const dot = A * C + B * D;
                const lenSq = C * C + D * D;
                let param = -1;
                
                if (lenSq !== 0) param = dot / lenSq;
                
                let xx, yy;
                
                if (param < 0) {
                    xx = this.x1;
                    yy = this.y1;
                } else if (param > 1) {
                    xx = this.x2;
                    yy = this.y2;
                } else {
                    xx = this.x1 + param * C;
                    yy = this.y1 + param * D;
                }
                
                const dx = x - xx;
                const dy = y - yy;
                return Math.sqrt(dx * dx + dy * dy);
            }
            
            // 获取直线的边界框
            getBoundingBox() {
                const x = Math.min(this.x1, this.x2);
                const y = Math.min(this.y1, this.y2);
                const width = Math.abs(this.x2 - this.x1);
                const height = Math.abs(this.y2 - this.y1);
                
                // 为边界框增加一些边距，使其更容易看到
                return {
                    x: x - 5,
                    y: y - 5,
                    width: width + 10,
                    height: height + 10
                };
            }
        }
        