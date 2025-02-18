 
class DeepSeekToolbox {
    constructor() {
        this.windowStack = [];
        this.init();
    }
    init() {
        this.#createStyle();
        this.#createGlobalListeners();
    }

    #createGlobalListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ds-floating-window')) {
                const windowEl = e.target.closest('.ds-floating-window');
                this.#bringToFront(windowEl);
            }
        });
    }
    #createStyle() {
        const style = document.createElement('style');
        style.textContent = `
            /* 基础样式 */
        body {
            margin: 0;
            padding: 0 0 60px 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        /* 底部工具栏样式 */
        .c_toolbar_fixed_at_bottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(145deg, #98ccf3, #6baed6);
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-shadow: 0 -2px 15px rgba(0,0,0,0.15);
            z-index: 1000;
            backdrop-filter: blur(5px);
        }

        .c_toolbar_btn {
            padding: 12px 18px;
            border: none;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #2c3e50;
        }

        .c_toolbar_btn span {
            font-size: 12px;
            margin-top: 6px;
            font-weight: 500;
        }

        .c_toolbar_btn.active {
            background: rgba(255,255,255,0.3);
            transform: translateY(-5px);
        }

        /* 浮动窗口样式 */
        .ds-floating-window {
            position: fixed;
            background: rgba(255,255,255,0.98);
            min-width: 320px;
            border-radius: 16px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
            z-index: 1001;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            /* 移除transform定位 */
            left: 20px;
            top: 20px;
            transform: scale(0.95);
        }
        .ds-floating-window.active {
            opacity: 1;
            transform: scale(1);
        }
        .window-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 18px 24px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            cursor: move;
            user-select: none;
            background: rgba(255,255,255,0.9);
            border-radius: 16px 16px 0 0;
        }

        .window-title {
            font-weight: 600;
            color: #2c3e50;
            font-size: 16px;
        }

        .window-close {
            cursor: pointer;
            font-size: 28px;
            line-height: 1;
            padding: 4px 12px;
            color: #7f8c8d;
            transition: color 0.2s;
        }

        .window-close:hover {
            color: #e74c3c;
        }

        .window-content {
            padding: 24px;
            max-height: 70vh;
            overflow-y: auto;
            color: #34495e;
            line-height: 1.6;
        }

        /* 窗口内工具栏样式 */
        .c_toolbar_inside_window {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(145deg, #98ccf3, #6baed6);
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-radius: 0 0 16px 16px;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }

        @media (max-width: 480px) {
            .ds-floating-window {
                width: 90vw;
                min-width: auto;
            }
        }
        `;
        const cvStyle = `/* Canvas 基础样式 */
        .test-canvas {
            border: 2px solid #2c3e50;
            background: #ffffff;
            margin: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }`;
        style.textContent += cvStyle;
        document.head.appendChild(style);
    }

    // 工具栏创建方法
    createToolbar(parentElement, styleClass) {
        const tb = document.createElement('div');
        tb.className = styleClass;
        parentElement.appendChild(tb);
        return tb;
    }
    createCanvas(parentElement, styleClass) {
        const cv = document.createElement('canvas');
        cv.className = styleClass;
        parentElement.appendChild(cv);
        return cv;
    }


    // 按钮组添加方法
    addButtons(parentElement, styleClass, buttonsConfig) {
        buttonsConfig.forEach(config => {
            const btn = document.createElement('button');
            btn.className = styleClass;
            btn.innerHTML = `${config.icon}<span>${config.text}</span>`;
            btn.onclick = () => config.action(config.id);
            parentElement.appendChild(btn);
        });
    }
    #toggleWindow(windowEl) {
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) {
            this.#bringToFront(windowEl);
        }
    }

    // 浮动窗口管理
    createFloatingWindow(id, content = '', title = 'DeepSeek Toolbox') {
        let existingWindow = this.windowStack.find(w => w.id === id);
        if (existingWindow) {
            this.#toggleWindow(existingWindow.element);
            return existingWindow.element;
        }
        // 设置初始居中定位
        const windowEl = this.#createWindowElement(id, title, content);
            windowEl.style.left = '50%';
            windowEl.style.top = '50%';
            windowEl.style.transform = 'translate(-50%, -50%) scale(0.95)';
        this.#setupWindowBehavior(windowEl, id);
        
        this.windowStack.push({
            id: id,
            element: windowEl,
            zIndex: 1001 + this.windowStack.length
        });

        return windowEl;
    }
    #createWindowElement(id, title, content) {
        const windowEl = document.createElement('div');
        windowEl.id = id;
        windowEl.className = 'ds-floating-window';
        windowEl.innerHTML = `
            <div class="window-header">
                <div class="window-title">${title}</div>
                <div class="window-close">×</div>
            </div>
            <div class="window-content">${content}</div>
        `;
        document.body.appendChild(windowEl);
        return windowEl;
    }
    #addCloseHandler(windowEl, id) {
        windowEl.querySelector('.window-close').addEventListener('click', () => {
            windowEl.classList.remove('active');
            setTimeout(() => {
                windowEl.remove();
                this.windowStack = this.windowStack.filter(w => w.id !== id);
            }, 300);
        });
    }
    #bringToFront(windowEl) {
        const maxZ = Math.max(...this.windowStack.map(w => w.zIndex), 1001);
        windowEl.style.zIndex = maxZ + 1;
    }

    #setupWindowBehavior(windowEl, id) {
        this.#addDragSupport(windowEl);
        this.#addCloseHandler(windowEl, id);
        setTimeout(() => windowEl.classList.add('active'), 10);
        this.#bringToFront(windowEl);
    }


    #closeWindow(instance) {
        instance.windowEl.remove();
        this.floatingWindows = this.floatingWindows.filter(win => win !== instance);
         
    }
    // 拖拽功能实现
    #addDragSupport(windowEl) {
            const header = windowEl.querySelector('.window-header');
            let isDragging = false;
            let startX, startY, initialX, initialY;

            const startDrag = (e) => {
                isDragging = true;
                const rect = windowEl.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;
                startX = e.clientX || e.touches[0].clientX;
                startY = e.clientY || e.touches[0].clientY;
                
                // 移除可能影响定位的transform
                windowEl.style.transform = 'none';
                windowEl.style.transition = 'none';
                this.#bringToFront(windowEl);
            };

            const duringDrag = (e) => {
                if (!isDragging) return;
                e.preventDefault();
                
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;
                
                const dx = clientX - startX;
                const dy = clientY - startY;
                
                // 直接更新元素位置
                windowEl.style.left = `${initialX + dx}px`;
                windowEl.style.top = `${initialY + dy}px`;
            };

            const endDrag = () => {
                isDragging = false;
                windowEl.style.transition = '';
            };

            // 桌面端事件
            header.addEventListener('mousedown', startDrag);
            document.addEventListener('mousemove', duringDrag);
            document.addEventListener('mouseup', endDrag);

            // 移动端事件
            header.addEventListener('touchstart', startDrag, { passive: false });
            document.addEventListener('touchmove', duringDrag, { passive: false });
            document.addEventListener('touchend', endDrag);
    }

} 