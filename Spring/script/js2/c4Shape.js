
        // 图形基类
        class C4Shape {
            constructor(x1, y1, color, lineWidth) {
                this.x1 = x1;
                this.y1 = y1;
                this.color = color;
                this.lineWidth = lineWidth;
                this.offsetX = 0;
                this.offsetY = 0;
            }
            
            // 每个子类都需要实现draw方法
            draw(context) {
                throw new Error("子类必须实现draw方法");
            }
            
            // 预览绘制方法
            preview(context) {
                // 默认使用正常绘制方法，子类可以重写
                this.draw(context);
            }
            
            // 移动图形
            move(dx, dy) {
                this.x1 += dx;
                this.y1 += dy;
                // 子类可以重写此方法以处理特定属性
            }
            
            // 调整图形大小（子类应实现）
            resize(handle, x, y) {
                // 由子类实现具体的大小调整逻辑
            }
            
            // 检查点是否在图形上（子类应实现）
            isPointOnShape(x, y) {
                return false;
            }
            
            // 获取图形边界框（用于选中指示）
            getBoundingBox() {
                return {
                    x: this.x1,
                    y: this.y1,
                    width: 0,
                    height: 0
                };
            }
        }
        