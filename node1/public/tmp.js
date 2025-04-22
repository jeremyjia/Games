 
        class SampleClassManager {
            constructor() {
                this.sampleClasses = {
                    'Rect类': ` 

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
            if (obj === app.blackboard.draggingObject) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
            }
            if (obj.type === '矩形') {
                ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
            }
        });
    }
}

// 注册矩形工具
app.blackboard.registerTool(new RectTool());
// 自动选择新工具
setTimeout(() => {
    const buttons = app.blackboard.toolbar.querySelectorAll('button');
    buttons[buttons.length - 1].click();
}, 50);`,
                    '动物类': `class Animal {
            constructor(name, sound) {
                this.name = name;
                this.sound = sound;
            }

            makeSound() {
                return \`\${this.name} 发出声音：\${this.sound}！\`;
            }
        }

        // 使用示例
        const dog = new Animal('小狗', '汪汪汪');
        console.log(dog.makeSound());`
                };
            }

            // ... 保持原有createSampleButtons方法不变 ...
        }

        class C4Blackboard {
            // ... 其他方法保持不变 ...

            redrawObjects() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.drawnObjects.forEach(obj => {
                    if (obj === this.draggingObject) {
                        this.ctx.strokeStyle = 'red';
                        this.ctx.lineWidth = 3;
                    } else {
                        this.ctx.strokeStyle = 'black';
                        this.ctx.lineWidth = 1;
                    }
                    if (obj.type === '直线') {
                        this.ctx.beginPath();
                        this.ctx.moveTo(obj.startX, obj.startY);
                        this.ctx.lineTo(obj.endX, obj.endY);
                        this.ctx.stroke();
                    } else if (obj.type === '圆形') {
                        const radius = Math.sqrt((obj.endX - obj.startX) ** 2 + (obj.endY - obj.startY) ** 2);
                        this.ctx.beginPath();
                        this.ctx.arc(obj.startX, obj.startY, radius, 0, Math.PI * 2);
                        this.ctx.stroke();
                    } else if (obj.type === '矩形') {
                        this.ctx.strokeRect(obj.startX, obj.startY, obj.width, obj.height);
                    }
                });
            }

            getObjectAtPoint(x, y) {
                for (let i = this.drawnObjects.length - 1; i >= 0; i--) {
                    const obj = this.drawnObjects[i];
                    if (obj.type === '矩形') {
                        if (x >= obj.startX && x <= obj.startX + obj.width &&
                            y >= obj.startY && y <= obj.startY + obj.height) {
                            return obj;
                        }
                    }
                    // ... 其他对象类型检测保持原样 ...
                }
                return null;
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
                            endY: y,
                            width: x - this.selectedTool.startX,
                            height: y - this.selectedTool.startY
                        };
                        this.drawnObjects.push(newObject);
                    }
                }
                this.redrawObjects();
            }
        }

        // ... 保持其他类定义不变 ...

    </script>
</body>
</html>