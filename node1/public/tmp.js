class BLC4ObjsInWindow {
    constructor(id) {
        if (!window.blos) window.blos = [];
        const existing = window.blos.find(obj => obj.id === id);
        if (existing) return existing;

        this.id = id;
        this.currentColor = 'red';
        this.isVisible = false;
        this.dragData = { isDragging: false, startX: 0, startY: 0 };
        this.activeButton = null;
        this.objectToolbar = null;

        // UI初始化
        this.createWindow();
        this.createToolbars();
        this.createCanvas();
        this.assembleUI();
        this.bindEvents();
        
        // 默认高亮红色按钮
        this.highlightButton(this.btnRed);
        window.blos.push(this);
    }

    createWindow() {
        this.window = document.createElement('div');
        Object.assign(this.window.style, {
            position: 'absolute',
            display: 'flex',          // 启用Flex布局
            flexDirection: 'column',  // 垂直排列子元素
            border: '1px solid #666',
            background: '#f0f0f0',
            minWidth: '300px',
            minHeight: '200px',
            left: '100px',
            top: '100px'
        });
    }

    createToolbars() {
        const toolbarStyle = {
            padding: '4px',
            cursor: 'move',
            display: 'flex',
            gap: '8px',
            flex: 'none'  // 禁止工具栏伸缩
        };

        // 顶部工具栏
        this.topToolbar = document.createElement('div');
        Object.assign(this.topToolbar.style, {
            ...toolbarStyle,
            background: '#007BFF'
        });
        this.btnCount = this.createButton('显示数量');
        this.btnHelp = this.createButton('功能说明');
        this.btnManage = this.createButton('管理对象');
        this.btnClose = this.createButton('关闭');
        this.topToolbar.append(this.btnCount, this.btnHelp, this.btnManage, this.btnClose);

        // 底部工具栏
        this.bottomToolbar = document.createElement('div');
        Object.assign(this.bottomToolbar.style, {
            ...toolbarStyle,
            background: '#ddd'
        });
        this.btnRed = this.createButton('红');
        this.btnGreen = this.createButton('绿');
        this.bottomToolbar.append(this.btnRed, this.btnGreen);
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        Object.assign(this.canvas.style, {
            width: '100%',
            height: '100%',    // 高度由Flex布局控制
            background: 'white',
            flex: '1'         // 占据剩余空间
        });
        this.ctx = this.canvas.getContext('2d');
    }

    assembleUI() {
        // 按顺序添加：顶部工具栏 -> 画布 -> 底部工具栏
        this.window.append(this.topToolbar, this.canvas, this.bottomToolbar);
        document.body.appendChild(this.window);
        this.resizeCanvas();
    }

    createButton(text) {
        const btn = document.createElement('button');
        btn.textContent = text;
        Object.assign(btn.style, {
            padding: '4px 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: '1px solid transparent',
            background: 'none'
        });
        return btn;
    }

    bindEvents() {
        // 拖动处理（保持不变）
        const handleDrag = {
            start: (e) => {
                const event = e.touches? e.touches[0] : e;
                this.dragData.isDragging = true;
                this.dragData.startX = event.clientX - this.window.offsetLeft;
                this.dragData.startY = event.clientY - this.window.offsetTop;
            },
            move: (e) => {
                const event = e.touches? e.touches[0] : e;
                if (!this.dragData.isDragging) return;
                this.window.style.left = `${event.clientX - this.dragData.startX}px`;
                this.window.style.top = `${event.clientY - this.dragData.startY}px`;
            },
            end: () => this.dragData.isDragging = false
        };

        this.topToolbar.addEventListener('mousedown', handleDrag.start);
        document.addEventListener('mousemove', handleDrag.move);
        document.addEventListener('mouseup', handleDrag.end);

        this.topToolbar.addEventListener('touchstart', handleDrag.start);
        document.addEventListener('touchmove', handleDrag.move);
        document.addEventListener('touchend', handleDrag.end);

        // 按钮事件处理（保持不变）
        const bindAction = (btn, action) => {
            btn.addEventListener('click', () => {
                action();
                this.highlightButton(btn);
            });
        };

        bindAction(this.btnCount, () => this.showCount());
        bindAction(this.btnHelp, () => this.showHelp());
        bindAction(this.btnRed, () => this.currentColor = 'red');
        bindAction(this.btnGreen, () => this.currentColor = 'green');
        bindAction(this.btnManage, () => this.createObjectToolbar());
        bindAction(this.btnClose, () => this.closeWindow());
        
        // 画布响应式（保持不变）
        new ResizeObserver(() => this.resizeCanvas()).observe(this.window);
    }

    // 以下方法保持不变
    highlightButton(button) {
        [this.btnCount, this.btnHelp, this.btnRed, this.btnGreen, this.btnManage, this.btnClose].forEach(btn => {
            const isActive = btn === button;
            btn.style.background = isActive ? '#c0c0c0' : '';
            btn.style.boxShadow = isActive ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : '';
            btn.style.border = isActive ? '1px solid #808080' : '1px solid transparent';
        });
    }
    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    showCount() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.currentColor;
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`对象数量: ${window.blos.length}`, 10, 20);
    }
    showHelp() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.currentColor;
        this.ctx.font = '14px Arial';
        [
            '功能说明：',
            '1. 拖动顶部栏移动窗口',
            '2. 底部按钮切换文本颜色',
            '3. 显示当前管理对象数量',
            '4. 最近点击的按钮会保持高亮',
            '5. 点击关闭按钮关闭窗口'
        ].forEach((line, i) => this.ctx.fillText(line, 10, 20 + i * 20));
    }
    toggleUI() {
        this.isVisible = !this.isVisible;
        this.window.style.display = this.isVisible ? 'block' : 'none';
    }
    closeWindow() {
        this.window.remove();
        const index = window.blos.findIndex(obj => obj.id === this.id);
        if (index!== -1) {
            window.blos.splice(index, 1);
        }
    }
    createObjectToolbar() {
        // 移除旧工具栏
        if (this.objectToolbar) {
            this.objectToolbar.remove();
        }

        // 创建新工具栏
        this.objectToolbar = document.createElement('div');
        Object.assign(this.objectToolbar.style, {
            padding: '4px',
            background: '#eee',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap'
        });

        // 为每个对象创建按钮
        window.blos.forEach(obj => {
            const btn = this.createButton(obj.id);
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', () => this.showObjectInfo(obj.id));
            this.objectToolbar.appendChild(btn);
        });

        // 插入到画布上方
        this.window.insertBefore(this.objectToolbar, this.canvas);
    }

    showObjectInfo(id) {
        // 查找目标对象并触发其UI切换
        const targetObj = window.blos.find(obj => obj.id === id);
        if (targetObj) {
            targetObj.toggleUI();
        }

        // 原有信息显示逻辑
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.currentColor;
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`当前对象ID: ${id}`, 10, 20);
        this.highlightButton(this.btnManage);
    }

    static getInstance(id) {
        return window.blos?.find(obj => obj.id === id) || new this(id);
    }
}

// 初始化实例
const objManager = BLC4ObjsInWindow.getInstance('id_s177_i2c3_BLC4ObjsInWindow');
objManager.toggleUI();