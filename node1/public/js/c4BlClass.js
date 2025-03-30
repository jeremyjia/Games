/*
file: c4BlClass.js  

*/

function C4BlClass() {
    this.windows = {};          // 窗口实例集合
    this.windowPositions = {};  // 窗口位置和尺寸存储
    this.activeDrag = null;     // 当前拖动状态
    this.activeResize = null;   // 当前调整大小状态

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
                name: "issues",
                clickFunction: function() {
                    const _v = this.closest('[data-window-id]')
                                    .querySelector('.c4-content'); 
                    _v.innerHTML = this.name;  
					
                    var tb = blo0.blDiv(_v,_v.id+"tb","tb",blGrey[5]);
                    var v2 = blo0.blDiv(_v,_v.id+"v2","v2",blGrey[5]);
                    var url = "https://api.github.com/repos/jeremyjia/Games/issues/702/comments";
						blo0.blGetGithubCs(url,function(o){ 							
							var _i = 0; 							
							for(i in o){
								_i++;
								var a = o[i].body;
								var btnJS = blo0.blBtn(tb, tb.id+"btnJS"+i,_i,blGrey[2]);
								btnJS.onclick = function(_txt){
										return function(){
											v2.innerHTML = _txt;
										}
								}(a);
							}
						});
                }
            },
            {
                id: "2",
                name: "readMe",
                clickFunction: function() {
                    const content = this.closest('[data-window-id]')
                                    .querySelector('.c4-content');
                    content.innerHTML = `
                      利用AI重构 blclass.
                      现有功能： <br>
                      this.aboutMe  <br>
                      this.createWindow <br>
                      this.showWindow <br>
                      this.hideWindow <br>
                    `;
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

        const defaultPosition = { x: 100, y: 100, width: 200, height: 150 };
        const savedPosition = this.windowPositions[id] || {};
        const position = { ...defaultPosition, ...savedPosition };

        const win = document.createElement('div');
        win.style.cssText = `
            position: fixed;
            left: ${position.x}px;
            top: ${position.y}px;
            width: ${position.width}px;
            height: ${position.height}px;
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

        // 调整大小的事件处理
        win.addEventListener('mousedown', (e) => {
            const rect = win.getBoundingClientRect();
            const edgeThreshold = 5;
            const isRightEdge = e.clientX >= rect.right - edgeThreshold;
            const isBottomEdge = e.clientY >= rect.bottom - edgeThreshold;

            if (isRightEdge || isBottomEdge) {
                this.activeResize = {
                    window: win,
                    startX: e.clientX,
                    startY: e.clientY,
                    startWidth: win.offsetWidth,
                    startHeight: win.offsetHeight,
                    isRight: isRightEdge,
                    isBottom: isBottomEdge
                };
                e.preventDefault();
            }
        });

        // 调整光标样式
        win.addEventListener('mousemove', (e) => {
            const rect = win.getBoundingClientRect();
            const edgeThreshold = 5;
            const isRight = e.clientX >= rect.right - edgeThreshold;
            const isBottom = e.clientY >= rect.bottom - edgeThreshold;

            win.style.cursor = isRight && isBottom ? 'se-resize' :
                               isRight ? 'e-resize' :
                               isBottom ? 's-resize' : 'default';
        });

        win.addEventListener('mouseleave', () => {
            win.style.cursor = 'default';
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
        if (this.activeDrag) {
            const dx = e.clientX - this.activeDrag.startX;
            const dy = e.clientY - this.activeDrag.startY;
            const win = this.activeDrag.window;
            
            win.style.left = (this.activeDrag.startLeft + dx) + "px";
            win.style.top = (this.activeDrag.startTop + dy) + "px";
        } else if (this.activeResize) {
            const resize = this.activeResize;
            const win = resize.window;
            const deltaX = e.clientX - resize.startX;
            const deltaY = e.clientY - resize.startY;

            if (resize.isRight) {
                const newWidth = Math.max(50, resize.startWidth + deltaX);
                win.style.width = newWidth + 'px';
            }
            if (resize.isBottom) {
                const newHeight = Math.max(50, resize.startHeight + deltaY);
                win.style.height = newHeight + 'px';
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (this.activeDrag) {
            const win = this.activeDrag.window;
            const id = win.dataset.windowId;
            this.windowPositions[id] = { 
                x: win.offsetLeft, 
                y: win.offsetTop,
                width: win.offsetWidth,   // 保存宽度
                height: win.offsetHeight  // 保存高度
            };
            this.activeDrag = null;
        }
        if (this.activeResize) {
            const win = this.activeResize.window;
            const id = win.dataset.windowId;
            this.windowPositions[id] = {
                ...this.windowPositions[id],
                width: win.offsetWidth,
                height: win.offsetHeight
            };
            this.activeResize = null;
        }
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