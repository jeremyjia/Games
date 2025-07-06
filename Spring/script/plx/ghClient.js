class GhClientWindow {
    constructor() {
        this.window = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.version = 'v0.12'; // 更新版本号
        
        // 确保在DOM加载完成后创建窗口
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createWindow());
        } else {
            this.createWindow();
        }
    }

    createWindow() {
        if (this.window) return;
        
        // 创建窗口容器
        this.window = document.createElement('div');
        this.window.id = 'ghClientWindow';
        Object.assign(this.window.style, {
            position: 'fixed',
            width: '400px',
            height: '300px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: '1000',
            display: 'none',
            flexDirection: 'column'
        });

        // 创建标题栏
        const titleBar = document.createElement('div');
        titleBar.textContent = `GitHub Client ${this.version}`;
        titleBar.style.padding = '8px';
        titleBar.style.cursor = 'move';
        titleBar.style.backgroundColor = '#e0e0e0';
        titleBar.style.borderBottom = '1px solid #ccc';
        titleBar.style.userSelect = 'none';
        titleBar.style.borderRadius = '5px 5px 0 0';

        // 添加双击标题栏归位功能
        titleBar.addEventListener('dblclick', () => this.resetPosition());

        // 创建内容区域
        const content = document.createElement('div');
        content.style.padding = '15px';
        content.style.flexGrow = '1';
        content.style.overflowY = 'auto';
        content.innerHTML = '<p>窗口内容显示在这里...</p>';

        // 关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.style.cssText = 'position: absolute; top: 5px; right: 5px; cursor: pointer;';
        closeBtn.onclick = () => this.toggleWindow();

        // 组装窗口
        titleBar.appendChild(closeBtn);
        this.window.appendChild(titleBar);
        this.window.appendChild(content);
        
        // 确保document.body存在
        if (document.body) {
            document.body.appendChild(this.window);
        } else {
            console.error('无法添加窗口: document.body 不存在');
            return;
        }

        // 设置拖拽事件 - 桌面端
        titleBar.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mouseup', () => this.stopDrag());
        window.addEventListener('mousemove', (e) => this.dragWindow(e));

        // 设置拖拽事件 - 移动端
        titleBar.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]));
        window.addEventListener('touchend', () => this.stopDrag());
        window.addEventListener('touchmove', (e) => {
            e.preventDefault(); // 防止滚动
            this.dragWindow(e.touches[0]);
        }, { passive: false });
    }

    startDrag(e) {
        if (e.target.tagName === 'BUTTON') return;
        this.isDragging = true;
        this.dragOffset = {
            x: e.clientX - this.window.offsetLeft,
            y: e.clientY - this.window.offsetTop
        };
        this.window.style.cursor = 'grabbing';
    }

    stopDrag() {
        this.isDragging = false;
        if (this.window) this.window.style.cursor = 'default';
    }

    dragWindow(e) {
        if (!this.isDragging || !this.window) return;
        
        // 移除边界限制，允许窗口移出屏幕
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        this.window.style.left = newX + 'px';
        this.window.style.top = newY + 'px';
    }

    // 新增：重置窗口位置到屏幕中央
    resetPosition() {
        if (!this.window) return;
        this.window.style.left = `calc(50% - 200px)`;
        this.window.style.top = `calc(50% - 150px)`;
    }

    toggleWindow() {
        if (!this.window) this.createWindow();
        
        if (this.window.style.display === 'none') {
            // 显示时重置位置到屏幕中央
            this.resetPosition();
            this.window.style.display = 'flex';
        } else {
            this.window.style.display = 'none';
        }
    }
}

// 创建全局实例
let ghClient;

// 确保在DOM加载完成后创建实例
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ghClient = new GhClientWindow();
    });
} else {
    ghClient = new GhClientWindow();
}

// 提供全局访问函数
window.toggle_gh_Client_Wnd = () => {
    // 确保实例已创建
    if (!ghClient) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                ghClient.toggleWindow();
            });
            return;
        }
    }
    ghClient.toggleWindow();
};
/*
升级 v0.12
let the window can move outside the screen
 
*/
