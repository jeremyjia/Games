 
class DeepSeekToolbox {
    constructor() { 
        this.floatingWindows = []; 
        this.init();
    }
    init() {
        this.#createStyle();
    }

    #createStyle() {
        const style = document.createElement('style');
        style.textContent = `
            body {
                margin: 0;
                padding: 0 0 60px 0;
            }
            .c_toolbar_fixed_at_bottom {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60px;
                background: #ffffff;
                display: flex;
                justify-content: space-around;
                align-items: center;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .c_toolbar_btn {
                padding: 12px;
                border: none;
                background: none;
                font-size: 24px;
                cursor: pointer;
                transition: opacity 0.3s;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .c_toolbar_btn span {
                font-size: 12px;
                margin-top: 4px;
            }
            @media (hover: hover) {
                .c_toolbar_btn:hover {
                    opacity: 0.7;
                }
            }
            .ds-floating-window {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                min-width: 300px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s;
                min-height: 150px;
            }
            .ds-floating-window.active {
                opacity: 1;
            }
            .window-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #eee;
                cursor: move;
                user-select: none;
            }
            .window-close {
                cursor: pointer;
                font-size: 24px;
                line-height: 1;
                padding: 0 8px;
            }
            .window-content {
                padding: 16px;
            } 
        `;
        document.head.appendChild(style);
    }

    createToolbar(parentElement, styleClass) {
        const tb = document.createElement('div');
        tb.className = styleClass; 
        parentElement.appendChild(tb);
        return tb;
    }

    addButtons(parentElement, cBtnStyle, bts) {
        bts.forEach(btnConfig => {
            const button = document.createElement('button');
            button.className = cBtnStyle;
            button.innerHTML = `${btnConfig.icon}<span>${btnConfig.text}</span>`;
            button.onclick = function(_btnc){
                return function(){
                    if(_btnc.action){
                        _btnc.action(_btnc.id);
                    }
                }
            }(btnConfig);
            parentElement.appendChild(button);
        });
    }
    #toggleWindow(windowElement) {
        const isActive = windowElement.classList.contains('active');
        if (isActive) {
            windowElement.classList.remove('active');
        } else {
            // 计算当前所有活动窗口的最大zIndex
            const activeWindows = document.querySelectorAll('.ds-floating-window.active');
            let maxZ = 1001; // 默认基础z-index
            activeWindows.forEach(win => {
                const zIndex = parseInt(window.getComputedStyle(win).zIndex, 10);
                if (!isNaN(zIndex) && zIndex > maxZ) {
                    maxZ = zIndex;
                }
            });
            windowElement.style.zIndex = maxZ + 1; // 确保在最前
            windowElement.classList.add('active');
        }
    }
    createFloatingWindow(id,content = '默认内容') {
        var r = document.getElementById(id);
        if(r){
            this.#toggleWindow(r); 
            return r;
        } 
        const windowEl = document.createElement('div');
        windowEl.id = id;
        windowEl.className = 'ds-floating-window';
        
        // 修改偏移量计算为50px
        const posOffset = this.floatingWindows.length * 50;
        windowEl.style.transform = `translate(calc(-50% + ${posOffset}px), calc(-50% + ${posOffset}px)`;
        windowEl.style.zIndex = 1001 + this.floatingWindows.length;

        // 保持其他逻辑不变
        windowEl.innerHTML = `
            <div class="window-header">
                <div>浮动窗口</div>
                <div class="window-close">×</div>
            </div>
            <div class="window-content">${content}</div>
        `;
 

        document.body.appendChild(windowEl);
        const windowInstance = { windowEl };
        this.floatingWindows.push(windowInstance);

        // 保持关闭逻辑
        windowEl.querySelector('.window-close').addEventListener('click', () => 
            this.#closeWindow(windowInstance)
        );

        this.#addDragSupport(windowEl);
        windowEl.classList.add('active');

        return windowEl;
    }
    #closeWindow(instance) {
        instance.windowEl.remove();
        this.floatingWindows = this.floatingWindows.filter(win => win !== instance);
         
    }

    #addDragSupport(windowEl) {
        const header = windowEl.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialX, initialY;

        const handleMove = (clientX, clientY) => {
            const dx = clientX - startX;
            const dy = clientY - startY;
            windowEl.style.left = `${initialX + dx}px`;
            windowEl.style.top = `${initialY + dy}px`;
        };

        const startDrag = (e) => {
            isDragging = true;
            const rect = windowEl.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;
            startX = e.clientX || e.touches[0].clientX;
            startY = e.clientY || e.touches[0].clientY;
            
            // 移除transform并设置实际位置
            windowEl.style.transform = 'none';
            windowEl.style.left = `${initialX}px`;
            windowEl.style.top = `${initialY}px`;
        };

        const duringDrag = (e) => {
            if (!isDragging) return;
            handleMove(
                e.clientX || e.touches[0].clientX,
                e.clientY || e.touches[0].clientY
            );
        };

        const stopDrag = () => isDragging = false;

        header.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', duringDrag);
        document.addEventListener('mouseup', stopDrag);

        header.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', duringDrag);
        document.addEventListener('touchend', stopDrag);
    }
} 