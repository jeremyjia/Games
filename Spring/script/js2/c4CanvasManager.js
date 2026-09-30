
// 画布管理器类
class C4CanvasManager {
    constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.context = this.canvas.getContext('2d');
                this.shapes = [];
                this.currentShape = null;
                this.isDrawing = false;
                this.drawMode = 'free'; // 默认自由绘制
                this.currentColor = '#000000';
                this.currentLineWidth = 5;
                this.selectedShape = null;
                this.isMoving = false;
                this.isResizing = false;
                this.resizeHandle = null;
                this.lastX = 0;
                this.lastY = 0;
                this.selectedIndicator = document.getElementById('selected-indicator');
                this.resizeHandles = document.getElementById('resize-handles');
                
                // 绑定事件处理方法
                this.#bindEvents();
                
                // 初始化画布大小
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
                
                // 绑定调整大小控制点事件
                this.bindResizeHandleEvents();
    }
            
    // 绑定事件
    #bindEvents() {
                // 鼠标事件
                this.canvas.addEventListener('mousedown', (e) => this.handlePointerDown(e));
                this.canvas.addEventListener('mousemove', (e) => this.handlePointerMove(e));
                this.canvas.addEventListener('mouseup', () => this.handlePointerUp());
                this.canvas.addEventListener('mouseout', () => this.handlePointerUp());
                
                // 触摸事件
                this.canvas.addEventListener('touchstart', (e) => this.handlePointerDown(e));
                this.canvas.addEventListener('touchmove', (e) => this.handlePointerMove(e));
                this.canvas.addEventListener('touchend', () => this.handlePointerUp());
    }
            
    // 绑定调整大小控制点事件
    bindResizeHandleEvents() {
                const handles = this.resizeHandles.querySelectorAll('.resize-handle');
                
                handles.forEach(handle => {
                    // 鼠标事件
                    handle.addEventListener('mousedown', (e) => {
                        e.stopPropagation(); // 防止事件冒泡到画布
                        if (this.selectedShape) {
                            this.isResizing = true;
                            this.resizeHandle = handle.classList[1]; // 获取nw, ne等类名
                            const [x, y] = this.getCoordinates(e);
                            this.lastX = x;
                            this.lastY = y;
                        }
                    });
                    
                    // 触摸事件
                    handle.addEventListener('touchstart', (e) => {
                        e.stopPropagation(); // 防止事件冒泡到画布
                        if (this.selectedShape) {
                            this.isResizing = true;
                            this.resizeHandle = handle.classList[1]; // 获取nw, ne等类名
                            const [x, y] = this.getCoordinates(e);
                            this.lastX = x;
                            this.lastY = y;
                        }
                    });
                });
    }
            
    // 处理指针按下事件
    handlePointerDown(e) {
                e.preventDefault();
                const [x, y] = this.getCoordinates(e);
                
                if (this.drawMode === 'select') {
                    // 选择模式：尝试选择图形
                    this.selectedShape = this.findShapeAt(x, y);
                    
                    if (this.selectedShape) {
                        this.isMoving = true;
                        this.lastX = x;
                        this.lastY = y;
                        this.updateSelectedIndicator();
                        this.showResizeHandles();
                    } else {
                        // 未选中任何图形，清除选择状态
                        this.deselectShape();
                    }
                } else {
                    // 绘制模式：开始绘制新图形
                    this.isDrawing = true;
                    
                    // 根据当前模式创建相应的图形对象
                    switch(this.drawMode) {
                        case 'free':
                            this.currentShape = new C4Freehand(x, y, this.currentColor, this.currentLineWidth);
                            break;
                        case 'line':
                            this.currentShape = new C4Line(x, y, x, y, this.currentColor, this.currentLineWidth);
                            break;
                        case 'rect':
                            this.currentShape = new C4Rect(x, y, x, y, this.currentColor, this.currentLineWidth);
                            break;
                        case 'circle':
                            this.currentShape = new C4Circle(x, y, x, y, this.currentColor, this.currentLineWidth);
                            break;
                    }
                }
    }
            
    // 处理指针移动事件
    handlePointerMove(e) {
                e.preventDefault();
                
                if (!this.isDrawing && !this.isMoving && !this.isResizing) return;
                
                const [x, y] = this.getCoordinates(e);
                
                if (this.isResizing && this.selectedShape && this.resizeHandle) {
                    // 调整选中图形的大小
                    this.selectedShape.resize(this.resizeHandle, x, y);
                    this.lastX = x;
                    this.lastY = y;
                    
                    this.redrawAll();
                    this.updateSelectedIndicator();
                    this.updateResizeHandlesPosition();
                } else if (this.isMoving && this.selectedShape) {
                    // 移动选中的图形
                    const dx = x - this.lastX;
                    const dy = y - this.lastY;
                    
                    this.selectedShape.move(dx, dy);
                    this.lastX = x;
                    this.lastY = y;
                    
                    this.redrawAll();
                    this.updateSelectedIndicator();
                    this.updateResizeHandlesPosition();
                } else if (this.isDrawing && this.currentShape) {
                    // 绘制中
                    switch(this.drawMode) {
                        case 'free':
                            this.currentShape.addPoint(x, y);
                            // 自由绘制实时更新
                            this.redrawAll();
                            this.currentShape.preview(this.context);
                            break;
                        case 'line':
                            this.currentShape.x2 = x;
                            this.currentShape.y2 = y;
                            this.redrawAll();
                            this.currentShape.preview(this.context);
                            break;
                        case 'rect':
                            this.currentShape.updateEndPoint(x, y);
                            this.redrawAll();
                            this.currentShape.preview(this.context);
                            break;
                        case 'circle':
                            this.currentShape.updateEndPoint(x, y);
                            this.redrawAll();
                            this.currentShape.preview(this.context);
                            break;
                    }
                }
    }
            
    // 处理指针释放事件
    handlePointerUp() {
                if (this.isDrawing && this.currentShape) {
                    this.shapes.push(this.currentShape);
                    this.currentShape = null;
                    this.isDrawing = false;
                    this.redrawAll();
                }
                
                this.isMoving = false;
                this.isResizing = false;
                this.resizeHandle = null;
    }
            
            // 查找指定坐标处的图形
            findShapeAt(x, y) {
                // 从后往前查找，确保最新绘制的图形先被选中
                for (let i = this.shapes.length - 1; i >= 0; i--) {
                    if (this.shapes[i].isPointOnShape(x, y)) {
                        return this.shapes[i];
                    }
                }
                return null;
            }
            
            // 更新选中指示器
            updateSelectedIndicator() {
                if (this.selectedShape) {
                    const bounds = this.selectedShape.getBoundingBox();
                    this.selectedIndicator.style.display = 'block';
                    this.selectedIndicator.style.left = `${bounds.x}px`;
                    this.selectedIndicator.style.top = `${bounds.y}px`;
                    this.selectedIndicator.style.width = `${bounds.width}px`;
                    this.selectedIndicator.style.height = `${bounds.height}px`;
                } else {
                    this.selectedIndicator.style.display = 'none';
                }
            }
            
            // 显示调整大小控制点
            showResizeHandles() {
                if (this.selectedShape) {
                    this.resizeHandles.style.display = 'block';
                    this.updateResizeHandlesPosition();
                } else {
                    this.resizeHandles.style.display = 'none';
                }
            }
            
            // 更新调整大小控制点位置
            updateResizeHandlesPosition() {
                if (!this.selectedShape) return;
                
                const bounds = this.selectedShape.getBoundingBox();
                const handles = this.resizeHandles.querySelectorAll('.resize-handle');
                
                // 设置控制点容器位置
                this.resizeHandles.style.left = `${bounds.x}px`;
                this.resizeHandles.style.top = `${bounds.y}px`;
                this.resizeHandles.style.width = `${bounds.width}px`;
                this.resizeHandles.style.height = `${bounds.height}px`;
                this.resizeHandles.style.pointerEvents = 'auto';
            }
            
            // 取消选择图形
            deselectShape() {
                this.selectedShape = null;
                this.updateSelectedIndicator();
                this.resizeHandles.style.display = 'none';
                this.resizeHandles.style.pointerEvents = 'none';
            }
            
            // 删除选中的图形
            removeSelectedShape() {
                if (this.selectedShape) {
                    const index = this.shapes.indexOf(this.selectedShape);
                    if (index !== -1) {
                        this.shapes.splice(index, 1);
                    }
                    this.deselectShape();
                    this.redrawAll();
                    return true;
                }
                return false;
            }
            
            // 调整画布大小
            resizeCanvas() {
                const rect = this.canvas.getBoundingClientRect();
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
                this.redrawAll(); // 重绘所有图形
            }
            
            // 设置绘制模式
            setDrawMode(mode) {
                this.drawMode = mode;
                // 切换模式时取消选择
                if (mode !== 'select') {
                    this.deselectShape();
                }
            }
            
            // 设置画笔颜色
            setColor(color) {
                this.currentColor = color;
            }
            
            // 设置画笔大小
            setLineWidth(width) {
                this.currentLineWidth = width;
            }
            
            // 清空画布
            clearCanvas() {
                this.shapes = [];
                this.deselectShape();
                this.redrawAll();
            }
            
            // 重绘所有图形
            redrawAll() {
                // 清空画布
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // 绘制所有保存的图形
                this.shapes.forEach(shape => {
                    shape.draw(this.context);
                });
            }
            
            // 获取坐标
            getCoordinates(e) {
                const rect = this.canvas.getBoundingClientRect();
                let x, y;
                
                if (e.type.includes('touch')) {
                    x = e.touches[0].clientX - rect.left;
                    y = e.touches[0].clientY - rect.top;
                } else {
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                }
                
                return [x, y];
            }
}
        