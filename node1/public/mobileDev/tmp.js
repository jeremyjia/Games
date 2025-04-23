class C4CanvasWnd {
    constructor() {
        this.isVisible = false;
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        
        // 创建浮动窗口
        this.wnd = document.createElement('div');
        this.wnd.style.cssText = `
            position: fixed;
            border: 2px solid #666;
            background: white;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.3);
            display: none;
            touch-action: none;
        `;
        
        // 创建标题栏
        const titleBar = document.createElement('div');
        titleBar.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #666;
            color: white;
            padding: 5px;
            cursor: move;
        `;
        
        // 标题文字
        const titleText = document.createElement('div');
        titleText.textContent = 'Canvas Window';
        
        // 关闭按钮
        this.closeBtn = document.createElement('div');
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.style.cssText = `
            cursor: pointer;
            padding: 0 8px;
            font-size: 20px;
            &:hover { background: #999 }
        `;
        
        // 组装标题栏
        titleBar.appendChild(titleText);
        titleBar.appendChild(this.closeBtn);
        
        // 创建画布
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'id_4_canvas';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        // 创建状态栏
        this.statusBar = document.createElement('div');
        this.statusBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #eee;
            padding: 5px;
            border-top: 1px solid #ccc;
        `;
        
        // 组装窗口
        this.wnd.appendChild(titleBar);
        this.wnd.appendChild(this.canvas);
        this.wnd.appendChild(this.statusBar);
        document.body.appendChild(this.wnd);
        
        // 事件监听
        this.canvas.addEventListener('mousedown', this.handleCanvasClick.bind(this));
        this.canvas.addEventListener('touchstart', this.handleCanvasClick.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMove.bind(this));
        this.canvas.addEventListener('touchmove', this.handleCanvasMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasUp.bind(this));
        this.canvas.addEventListener('touchend', this.handleCanvasUp.bind(this));
        titleBar.addEventListener('mousedown', this.startDrag.bind(this));
        titleBar.addEventListener('touchstart', this.startDrag.bind(this));
        this.closeBtn.addEventListener('click', () => this.toggleUI());
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        this.statusBar.textContent = `Clicked at: X:${x.toFixed(0)}, Y:${y.toFixed(0)}`;
    }

    handleCanvasMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        this.statusBar.textContent = `Moving at: X:${x.toFixed(0)}, Y:${y.toFixed(0)}`;
        e.preventDefault();
    }

    handleCanvasUp(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.changedTouches[0].clientX) - rect.left;
        const y = (e.clientY || e.changedTouches[0].clientY) - rect.top;
        this.statusBar.textContent = `Released at: X:${x.toFixed(0)}, Y:${y.toFixed(0)}`;
    }

    startDrag(e) {
        this.isDragging = true;
        this.dragStartX = e.clientX || e.touches[0].clientX;
        this.dragStartY = e.clientY || e.touches[0].clientY;
        this.offsetX = this.wnd.offsetLeft;
        this.offsetY = this.wnd.offsetTop;
        
        document.addEventListener('mousemove', this.onDrag.bind(this));
        document.addEventListener('touchmove', this.onDrag.bind(this));
        document.addEventListener('mouseup', this.stopDrag.bind(this));
        document.addEventListener('touchend', this.stopDrag.bind(this));
    }

    onDrag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        const x = (e.clientX || e.touches[0].clientX) - this.dragStartX;
        const y = (e.clientY || e.touches[0].clientY) - this.dragStartY;
        
        this.wnd.style.left = `${this.offsetX + x}px`;
        this.wnd.style.top = `${this.offsetY + y}px`;
    }

    stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onDrag);
        document.removeEventListener('touchmove', this.onDrag);
    }

    toggleUI() {
        this.isVisible = !this.isVisible;
        this.wnd.style.display = this.isVisible ? 'block' : 'none';
        if (this.isVisible) {
            this.wnd.style.width = '80%';
            this.wnd.style.height = '70%';
            this.wnd.style.left = '10%';
            this.wnd.style.top = '15%';
        }
    }
}

if (!app.c4) app.c4= new C4CanvasWnd();
app.c4.toggleUI();