//blDSClass.js
class CBlDSApp {
    constructor() {
        this.createStyles();
        this.createToolbar();
        this.createFloatingWindow();
        this.bindEvents();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .toolbar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #333;
                padding: 10px;
                z-index: 1000;
            }

            .toolbar-button {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
            }

            .floating-window {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 1px solid #ccc;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 1001;
                min-width: 250px;
                display: none;
            }

            .window-header {
                background: #f5f5f5;
                padding: 10px;
                cursor: move;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .close-button {
                background: none;
                border: none;
                font-size: 1.2em;
                cursor: pointer;
            }

            .nav-menu {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .nav-menu li {
                padding: 15px;
                border-bottom: 1px solid #eee;
            }

            .nav-menu a {
                text-decoration: none;
                color: #333;
                display: block;
            }

            @media (max-width: 480px) {
                .floating-window {
                    width: 90%;
                    max-width: 300px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createToolbar() {
        this.toolbar = document.createElement('div');
        this.toolbar.className = 'toolbar';
        
        this.button = document.createElement('button');
        this.button.className = 'toolbar-button';
        this.button.textContent = '打开菜单';
        
        this.toolbar.appendChild(this.button);
        document.body.appendChild(this.toolbar);
    }

    createFloatingWindow() {
        this.floatingWindow = document.createElement('div');
        this.floatingWindow.className = 'floating-window';
        
        const header = document.createElement('div');
        header.className = 'window-header';
        
        this.closeButton = document.createElement('button');
        this.closeButton.className = 'close-button';
        this.closeButton.innerHTML = '&times;';
        
        const nav = document.createElement('ul');
        nav.className = 'nav-menu';
        nav.innerHTML = `
            <li><a href="https://www.deepseek.com" target="_blank">DeepSeek 主页</a></li>
            <li><a href="#">菜单项2</a></li>
            <li><a href="#">菜单项3</a></li>
        `;
        
        header.appendChild(document.createTextNode('导航菜单'));
        header.appendChild(this.closeButton);
        this.floatingWindow.appendChild(header);
        this.floatingWindow.appendChild(nav);
        document.body.appendChild(this.floatingWindow);
    }

    bindEvents() {
        this.button.addEventListener('click', () => this.toggleWindow());
        this.closeButton.addEventListener('click', () => this.toggleWindow());
        
        // 实现窗口拖动
        const header = this.floatingWindow.querySelector('.window-header');
        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;

        const startDrag = (e) => {
            isDragging = true;
            initialX = e.clientX || e.touches[0].clientX;
            initialY = e.clientY || e.touches[0].clientY;
        };

        const duringDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = (e.clientX || e.touches[0].clientX) - initialX;
            currentY = (e.clientY || e.touches[0].clientY) - initialY;
            initialX = e.clientX || e.touches[0].clientX;
            initialY = e.clientY || e.touches[0].clientY;
            const rect = this.floatingWindow.getBoundingClientRect();
            const newX = rect.left + currentX;
            const newY = rect.top + currentY;
            this.floatingWindow.style.left = `${newX}px`;
            this.floatingWindow.style.top = `${newY}px`;
        };

        const stopDrag = () => {
            isDragging = false;
        };

        header.addEventListener('mousedown', startDrag);
        header.addEventListener('touchstart', startDrag);
        document.addEventListener('mousemove', duringDrag);
        document.addEventListener('touchmove', duringDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    toggleWindow() {
        this.floatingWindow.style.display = 
            this.floatingWindow.style.display === 'block' ? 'none' : 'block';
    }
}

