class C4MovableWnd {
    static instances = {};

    constructor(id) {
        if (C4MovableWnd.instances[id]) {
            return C4MovableWnd.instances[id];
        }

        this.id = id;
        this.isTouch = false;
        this.hasPositioned = false;
        this.currentTool = null;
        this.shapes = [];
        this.draggingShape = null;
        this.drawingShape = null;
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.initialize();
        C4MovableWnd.instances[id] = this;
    }

    initialize() {
        this.createElements();
        this.setStyles();
        this.bindEvents();
    }

    createElements() {
        this.element = document.createElement('div');
        this.titleBar = document.createElement('div');
        this.toolbar = document.createElement('div');
        this.canvas = document.createElement('canvas');
        this.toolbarCircleBtn = document.createElement('button');
        this.toolbarRectBtn = document.createElement('button');

        this.toolbar.appendChild(this.toolbarCircleBtn);
        this.toolbar.appendChild(this.toolbarRectBtn);
        this.element.appendChild(this.titleBar);
        this.element.appendChild(this.toolbar);
        this.element.appendChild(this.canvas);
        document.body.appendChild(this.element);

        this.canvas.id = 'id4canvas';
        this.toolbar.id = 'id4toolbar';
    }

    setStyles() {
        Object.assign(this.element.style, {
            position: 'fixed',
            display: 'none',
            flexDirection: 'column',
            width: '400px',
            height: '500px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 1000,
            borderRadius: '4px',
            overflow: 'hidden'
        });

        Object.assign(this.titleBar.style, {
            cursor: 'move',
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            userSelect: 'none',
            fontSize: '14px',
            fontWeight: 'bold'
        });

        Object.assign(this.toolbar.style, {
            backgroundColor: '#e0e0e0',
            padding: '4px',
            borderBottom: '1px solid #ccc'
        });

        const buttonStyle = {
            padding: '4px 8px',
            margin: '2px',
            border: '1px solid #999',
            borderRadius: '3px',
            backgroundColor: '#fff',
            cursor: 'pointer'
        };

        Object.assign(this.toolbarCircleBtn.style, buttonStyle);
        Object.assign(this.toolbarRectBtn.style, buttonStyle);

        Object.assign(this.canvas.style, {
            flex: '1',
            backgroundColor: 'white'
        });

        this.titleBar.textContent = 'Movable Window';
        this.toolbarCircleBtn.textContent = 'addCircle';
        this.toolbarRectBtn.textContent = 'addRect';
    }

    bindEvents() {
        this.onDragStart = this.handleDragStart.bind(this);
        this.onDragMove = this.handleDragMove.bind(this);
        this.onDragEnd = this.handleDragEnd.bind(this);
        this.onCanvasMouseDown = this.handleCanvasMouseDown.bind(this);
        this.onCanvasMouseMove = this.handleCanvasMouseMove.bind(this);
        this.onCanvasMouseUp = this.handleCanvasMouseUp.bind(this);

        this.titleBar.addEventListener('mousedown', this.onDragStart);
        this.titleBar.addEventListener('touchstart', this.onDragStart, { passive: false });

        this.toolbarCircleBtn.addEventListener('click', () => this.handleToolSelect('circle'));
        this.toolbarRectBtn.addEventListener('click', () => this.handleToolSelect('rect'));
        this.canvas.addEventListener('mousedown', this.onCanvasMouseDown);
        this.canvas.addEventListener('touchstart', this.onCanvasMouseDown, { passive: false });
    }

    handleToolSelect(toolType) {
        this.currentTool = this.currentTool === toolType ? null : toolType;

        const activeStyle = {
            backgroundColor: '#4CAF50',
            color: 'white',
            borderColor: '#357a38'
        };
        const defaultStyle = {
            backgroundColor: '#fff',
            color: 'inherit',
            borderColor: '#999'
        };

        if (this.currentTool === 'circle') {
            Object.assign(this.toolbarCircleBtn.style, activeStyle);
            Object.assign(this.toolbarRectBtn.style, defaultStyle);
        } else if (this.currentTool === 'rect') {
            Object.assign(this.toolbarRectBtn.style, activeStyle);
            Object.assign(this.toolbarCircleBtn.style, defaultStyle);
        } else {
            Object.assign(this.toolbarCircleBtn.style, defaultStyle);
            Object.assign(this.toolbarRectBtn.style, defaultStyle);
        }
    }

    handleDragStart(e) {
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const rect = this.element.getBoundingClientRect();

        this.initialX = clientX - rect.left;
        this.initialY = clientY - rect.top;
        this.isTouch = !!e.touches;

        document.addEventListener('mousemove', this.onDragMove);
        document.addEventListener('touchmove', this.onDragMove, { passive: false });
        document.addEventListener('mouseup', this.onDragEnd);
        document.addEventListener('touchend', this.onDragEnd);
    }

    handleDragMove(e) {
        if (this.isTouch) e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const newX = clientX - this.initialX;
        const newY = clientY - this.initialY;

        this.element.style.left = `${newX}px`;
        this.element.style.top = `${newY}px`;
    }

    handleDragEnd() {
        document.removeEventListener('mousemove', this.onDragMove);
        document.removeEventListener('touchmove', this.onDragMove);
        document.removeEventListener('mouseup', this.onDragEnd);
        document.removeEventListener('touchend', this.onDragEnd);
        this.isTouch = false;
    }

    center() {
        const rect = this.element.getBoundingClientRect();
        this.element.style.left = `${(window.innerWidth - rect.width) / 2}px`;
        this.element.style.top = `${(window.innerHeight - rect.height) / 2}px`;
    }

    toggleWnd() {
        if (this.element.style.display === 'none') {
            this.element.style.display = 'flex';
            if (!this.hasPositioned) {
                this.center();
                this.hasPositioned = true;
            }
            const rect = this.canvas.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
            this.redrawCanvas();
        } else {
            this.element.style.display = 'none';
        }
    }

    handleCanvasMouseDown(e) {
        e.preventDefault();
        const canvas = this.canvas;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;
    
        // 先检测是否存在图形被点击
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (shape.type === 'circle') {
                const dx = x - shape.x;
                const dy = y - shape.y;
                if (dx * dx + dy * dy <= shape.radius * shape.radius) {
                    this.draggingShape = shape;
                    this.offsetX = x - shape.x;
                    this.offsetY = y - shape.y;
                    document.addEventListener('mousemove', this.onCanvasMouseMove);
                    document.addEventListener('touchmove', this.onCanvasMouseMove, { passive: false });
                    document.addEventListener('mouseup', this.onCanvasMouseUp);
                    document.addEventListener('touchend', this.onCanvasMouseUp);
                    return; // 优先处理拖拽
                }
            } else if (shape.type === 'rect') {
                const halfWidth = shape.width / 2;
                const halfHeight = shape.height / 2;
                if (x >= shape.x - halfWidth && 
                    x <= shape.x + halfWidth && 
                    y >= shape.y - halfHeight && 
                    y <= shape.y + halfHeight) {
                    this.draggingShape = shape;
                    this.offsetX = x - shape.x;
                    this.offsetY = y - shape.y;
                    document.addEventListener('mousemove', this.onCanvasMouseMove);
                    document.addEventListener('touchmove', this.onCanvasMouseMove, { passive: false });
                    document.addEventListener('mouseup', this.onCanvasMouseUp);
                    document.addEventListener('touchend', this.onCanvasMouseUp);
                    return; // 优先处理拖拽
                }
            }
        }
    
        // 没有拖拽时才进入绘制模式
        if (this.currentTool) {
            this.isDrawing = true;
            this.startX = x;
            this.startY = y;
            
            const hue = Math.random() * 360;
            this.drawingShape = {
                type: this.currentTool,
                x: this.startX,
                y: this.startY,
                radius: 0,
                width: 0,
                height: 0,
                hue: hue
            };
    
            document.addEventListener('mousemove', this.onCanvasMouseMove);
            document.addEventListener('touchmove', this.onCanvasMouseMove, { passive: false });
            document.addEventListener('mouseup', this.onCanvasMouseUp);
            document.addEventListener('touchend', this.onCanvasMouseUp);
        }
    }
    handleCanvasMouseMove(e) {
        if (this.isTouch) e.preventDefault();
        const canvas = this.canvas;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        if (this.isDrawing && this.drawingShape) {
            if (this.drawingShape.type === 'circle') {
                const dx = x - this.startX;
                const dy = y - this.startY;
                this.drawingShape.x = this.startX;
                this.drawingShape.y = this.startY;
                this.drawingShape.radius = Math.sqrt(dx*dx + dy*dy);
            } else if (this.drawingShape.type === 'rect') {
                this.drawingShape.x = (this.startX + x) / 2;
                this.drawingShape.y = (this.startY + y) / 2;
                this.drawingShape.width = Math.abs(x - this.startX);
                this.drawingShape.height = Math.abs(y - this.startY);
            }
            this.redrawCanvas();
        }
        else if (this.draggingShape) {
            this.draggingShape.x = x - this.offsetX;
            this.draggingShape.y = y - this.offsetY;
            this.redrawCanvas();
        }
    }

    
    handleCanvasMouseUp() {
        if (this.isDrawing) {
            if (this.drawingShape) {
                
                if ((this.drawingShape.type === 'circle' && this.drawingShape.radius > 2) ||
                    (this.drawingShape.type === 'rect' && this.drawingShape.width > 2 && this.drawingShape.height > 2)) {
                    this.shapes.push(this.drawingShape);
                }
                this.drawingShape = null;
            }
            this.isDrawing = false;
        }
        this.draggingShape = null;
        
        document.removeEventListener('mousemove', this.onCanvasMouseMove);
        document.removeEventListener('touchmove', this.onCanvasMouseMove);
        document.removeEventListener('mouseup', this.onCanvasMouseUp);
        document.removeEventListener('touchend', this.onCanvasMouseUp);
        this.redrawCanvas();
    }

    redrawCanvas() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制所有图形
        for (const shape of this.shapes) {
            if (shape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${shape.hue}, 70%, 50%)`;
                ctx.fill();
                ctx.closePath();
            } else if (shape.type === 'rect') {
                ctx.beginPath();
                ctx.rect(
                    shape.x - shape.width/2, 
                    shape.y - shape.height/2, 
                    shape.width, 
                    shape.height
                );
                ctx.fillStyle = `hsl(${shape.hue}, 70%, 50%)`;
                ctx.fill();
                ctx.closePath();
            }
        }

        // 绘制临时图形
        if (this.drawingShape) {
            ctx.save();
            ctx.globalAlpha = 0.7;
            if (this.drawingShape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(this.drawingShape.x, this.drawingShape.y, this.drawingShape.radius, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${this.drawingShape.hue}, 70%, 50%)`;
                ctx.fill();
                ctx.closePath();
            } else if (this.drawingShape.type === 'rect') {
                ctx.beginPath();
                ctx.rect(
                    this.drawingShape.x - this.drawingShape.width/2,
                    this.drawingShape.y - this.drawingShape.height/2,
                    this.drawingShape.width,
                    this.drawingShape.height
                );
                ctx.fillStyle = `hsl(${this.drawingShape.hue}, 70%, 50%)`;
                ctx.fill();
                ctx.closePath();
            }
            ctx.restore();
        }
    }
}

if (!window.c4) window.c4 = new C4MovableWnd('id_4_c4');
window.c4.toggleWnd();