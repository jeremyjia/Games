class DeepSeekToolbox {
    constructor() { 
        this.floatingWindow = null; // 窗口实例引用
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
        `;
        const style_4_floating_window = `
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
                display: none;
                opacity: 0;
                transition: opacity 0.3s;
            }
            .ds-floating-window.active {
                display: block;
                opacity: 1;
            }
            .window-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 16px;
                border-bottom: 1px solid #eee;
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
            .window-mask {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                z-index: 1000;
                display: none;
        }`;
        style.textContent  += style_4_floating_window;

        document.head.appendChild(style);
    }

    createToolbar(parentElement,styleClass) {
        const tb = document.createElement('div');
        tb.className = styleClass; 
        parentElement.appendChild(tb);
        return tb;
    }

    addButtons(parentElement,cBtnStyle,bts) {
        bts.forEach(btnConfig => {
            const button = document.createElement('button');
            button.className = cBtnStyle;
            button.innerHTML = `${btnConfig.icon}<span>${btnConfig.text}</span>`;
            button.onclick = btnConfig.action;
            parentElement.appendChild(button);
        });
    }
    createFloatingWindow(content = '默认内容') {
        if (!this.floatingWindow) {
            // 创建窗口结构
            const windowEl = document.createElement('div');
            windowEl.className = 'ds-floating-window';
            
            // 添加窗口内容
            windowEl.innerHTML = `
                <div class="window-header">
                    <div>浮动窗口</div>
                    <div class="window-close">×</div>
                </div>
                <div class="window-content">${content}</div>
            `;
            
            // 创建遮罩层
            this.windowMask = document.createElement('div');
            this.windowMask.className = 'window-mask';
            
            document.body.append(this.windowMask, windowEl);
            
            // 绑定关闭事件
            windowEl.querySelector('.window-close').onclick = () => 
                this.toggleWindow(false);
            this.windowMask.onclick = () => this.toggleWindow(false);
            
            this.floatingWindow = windowEl;
        }
        
        // 切换显示状态
        this.toggleWindow();
    }
    toggleWindow(show) {
        const shouldShow = show ?? !this.floatingWindow.classList.contains('active');
        
        this.floatingWindow.classList.toggle('active', shouldShow);
        this.windowMask.style.display = shouldShow ? 'block' : 'none';
    }
}
