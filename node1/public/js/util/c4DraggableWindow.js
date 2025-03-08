
//c4DraggableWindow.js

class C4DraggableWindow {
    static highestZIndex = 999; // 新增静态变量用于追踪最高z-index

    constructor(title, content, initialLeft = 20, initialTop = 20, isVisible = true) {
        this.isVisible = isVisible;
        this.#createWindow(title, content, initialLeft, initialTop);
        this.#addDragListeners();
        this.windowElement.style.display = isVisible ? 'block' : 'none';
    }

    show() {
        if (!this.isVisible) {
            this.isVisible = true;
            this.windowElement.style.display = 'block';
        }
    }

    #createWindow(title, content, initialLeft, initialTop) {
        this.windowElement = document.createElement('div');
        Object.assign(this.windowElement.style, {
            position: 'fixed',
            left: `${initialLeft}px`,
            top: `${initialTop}px`,
            background: 'white',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            zIndex: `${++C4DraggableWindow.highestZIndex}`, // 动态设置初始z-index
            minWidth: '300px'
        });

        this.titleBar = document.createElement('div');
        this.titleBar.textContent = title;
        Object.assign(this.titleBar.style, {
            padding: '8px',
            background: '#f0f0f0',
            cursor: 'move',
            userSelect: 'none',
            borderBottom: '1px solid #ddd',
            touchAction: 'none'
        });

        this.contentContainer = document.createElement('div');
        Object.assign(this.contentContainer.style, {
            padding: '10px',
            background: 'white',
            maxHeight: '60vh',
            overflowY: 'auto'
        });
        this.contentContainer.appendChild(content);

        this.windowElement.append(this.titleBar, this.contentContainer);
        document.body.appendChild(this.windowElement);
    }

    #addDragListeners() {
        let isDragging = false;
        let initialX, initialY;

        const mouseDownHandler = (e) => {
            isDragging = true;
            initialX = e.clientX - this.windowElement.offsetLeft;
            initialY = e.clientY - this.windowElement.offsetTop;
            // 点击时提升z-index
            this.windowElement.style.zIndex = ++C4DraggableWindow.highestZIndex;
        };

        const mouseMoveHandler = (e) => {
            if (!isDragging) return;
            this.windowElement.style.left = `${e.clientX - initialX}px`;
            this.windowElement.style.top = `${e.clientY - initialY}px`;
        };

        const handlers = {
            mouseup: () => isDragging = false,
            mousemove: mouseMoveHandler,
            touchend: () => isDragging = false,
            touchstart: (e) => {
                const touch = e.touches[0];
                initialX = touch.clientX - this.windowElement.offsetLeft;
                initialY = touch.clientY - this.windowElement.offsetTop;
                isDragging = true;
                // 触摸开始时提升z-index
                this.windowElement.style.zIndex = ++C4DraggableWindow.highestZIndex;
            },
            touchmove: (e) => {
                if (!isDragging) return;
                const touch = e.touches[0];
                this.windowElement.style.left = `${touch.clientX - initialX}px`;
                this.windowElement.style.top = `${touch.clientY - initialY}px`;
            }
        };

        this.titleBar.addEventListener('mousedown', mouseDownHandler);
        document.addEventListener('mouseup', handlers.mouseup);
        document.addEventListener('mousemove', handlers.mousemove);
        this.titleBar.addEventListener('touchstart', handlers.touchstart);
        document.addEventListener('touchend', handlers.touchend);
        document.addEventListener('touchmove', handlers.touchmove);
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.windowElement.style.display = this.isVisible ? 'block' : 'none';
    }
}

//升级：  
