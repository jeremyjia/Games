/*
file: c4BlClass.js 
升级：实现 
                    //在 win_about_me content 显示 this.name 

*/
function C4BlClass() {
    this.windows = {};          // 窗口实例集合
    this.windowPositions = {};  // 窗口位置存储
    this.activeDrag = null;     // 当前拖动状态

    this.aboutMe = function(btnHandle) {
        const colors = ['#ff0000', '#00ff00'];
        let currentIndex = parseInt(btnHandle.dataset.colorIndex) || 0;
        
        btnHandle.style.backgroundColor = colors[currentIndex];
        currentIndex = (currentIndex + 1) % colors.length;
        btnHandle.dataset.colorIndex = currentIndex;

        const id_about_me = btnHandle.dataset.windowId || 'default';
        const win_about_me = this.createWindow(id_about_me);
        const buttons = [
            {
                id: "1",
                name: "name1",
                clickFunction: function() {
                    const content = this.closest('[data-window-id]')
                                    .querySelector('.c4-content');
                    content.innerHTML = Date();
                }
            },
            {
                id: "2",
                name: "name2",
                clickFunction: function() {
                    const content = this.closest('[data-window-id]')
                                    .querySelector('.c4-content');
                    content.textContent = this.textContent;
                }
            }
        ];

        win_about_me.addToolbar(buttons);
        if (colors[currentIndex] === '#00ff00') {
            this.showWindow(id_about_me);
        } else {
            this.hideWindow(id_about_me);
        }
    };


    this.createWindow = function(id) {
        if (this.windows[id]) return this.windows[id];

        const win = document.createElement('div');
        const position = this.windowPositions[id] || { x: 100, y: 100 };
        
        win.style.cssText = `
            position: fixed;
            left: ${position.x}px;
            top: ${position.y}px;
            width: 200px;
            height: 150px;
            background: white;
            border: 2px solid #333;
            z-index: 9999;
            display: none;
        `;
        win.dataset.windowId = id;

        const titleBar = document.createElement('div');
        titleBar.textContent = `${id} 窗口`;
        titleBar.style.cssText = `
            background: #666;
            color: white;
            padding: 5px;
            cursor: move;
            user-select: none;
        `;

        const content = document.createElement('div');
        content.className = 'c4-content';
        content.textContent = "窗口内容区域";
        content.style.padding = "10px";

        win.appendChild(titleBar);
        win.appendChild(content);
        document.body.appendChild(win);

        titleBar.addEventListener('mousedown', (e) => {
            this.activeDrag = {
                window: win,
                startX: e.clientX,
                startY: e.clientY,
                startLeft: win.offsetLeft,
                startTop: win.offsetTop
            };
        });

        this.windows[id] = win;
        win.addToolbar = function(btns) {
            const existingToolbar = this.querySelector('.c4-toolbar');
            if (existingToolbar) existingToolbar.remove();

            const toolbar = document.createElement('div');
            toolbar.className = 'c4-toolbar';
            toolbar.style.cssText = `
                display: flex;
                gap: 4px;
                padding: 4px;
                background: #e0e0e0;
                border-bottom: 1px solid #aaa;
            `;

            btns.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn.name;
                button.id = btn.id;
                button.style.cssText = `
                    padding: 2px 6px;
                    font-size: 12px;
                    cursor: pointer;
                `;
                button.addEventListener('click', btn.clickFunction);
                toolbar.appendChild(button);
            });

            titleBar.insertAdjacentElement('afterend', toolbar);
        };
        return win;
    };

    document.addEventListener('mousemove', (e) => {
        if (!this.activeDrag) return;
        
        const dx = e.clientX - this.activeDrag.startX;
        const dy = e.clientY - this.activeDrag.startY;
        const win = this.activeDrag.window;
        
        win.style.left = (this.activeDrag.startLeft + dx) + "px";
        win.style.top = (this.activeDrag.startTop + dy) + "px";
    });

    document.addEventListener('mouseup', () => {
        if (!this.activeDrag) return;
        
        const win = this.activeDrag.window;
        const id = win.dataset.windowId;
        this.windowPositions[id] = { 
            x: win.offsetLeft, 
            y: win.offsetTop 
        };
        
        this.activeDrag = null;
    });

    this.showWindow = function(id) {
        const win = this.createWindow(id);
        win.style.display = 'block';
    };

    this.hideWindow = function(id) {
        const win = this.windows[id];
        if (win) win.style.display = 'none';
    };
}

var blo = new C4BlClass();