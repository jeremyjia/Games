// 浮动窗口类
class FloatingWindow {
    constructor(content = '默认窗口内容') {
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;
        this.createWindow(content);
        this.addEventListeners();
        this.centerWindow();
    }

    createWindow(content) {
        // 创建窗口容器
        this.window = document.createElement('div');
        this.window.className = 'floating-window';
        
        // 创建标题栏
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        
        // 标题文本
        const title = document.createElement('span');
        title.textContent = '工具窗口';
        
        // 关闭按钮
        this.closeBtn = document.createElement('button');
        this.closeBtn.innerHTML = '&times;';
        
        // 内容区域
        const contentDiv = document.createElement('div');
        contentDiv.className = 'window-content';
        contentDiv.innerHTML = content;

        // 组装元素
        titleBar.append(title, this.closeBtn);
        this.window.append(titleBar, contentDiv);
        document.body.appendChild(this.window);
    }

    addEventListeners() {
        // 拖动处理
        const titleBar = this.window.querySelector('.title-bar');
        
        titleBar.addEventListener('mousedown', (e) => {
            this.startDragging(e);
        });

        document.addEventListener('mousemove', (e) => {
            this.handleDragging(e);
        });

        document.addEventListener('mouseup', () => {
            this.stopDragging();
        });

        // 关闭按钮
        this.closeBtn.addEventListener('click', () => {
            this.window.remove();
        });
    }

    startDragging(e) {
        this.isDragging = true;
        const rect = this.window.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;
        this.window.style.cursor = 'grabbing';
    }

    handleDragging(e) {
        if (!this.isDragging) return;
        const x = e.clientX - this.offsetX;
        const y = e.clientY - this.offsetY;
        this.window.style.left = `${x}px`;
        this.window.style.top = `${y}px`;
    }

    stopDragging() {
        this.isDragging = false;
        this.window.style.cursor = 'grab';
    }

    centerWindow() {
        const x = (window.innerWidth - this.window.offsetWidth) / 2;
        const y = (window.innerHeight - this.window.offsetHeight) / 2;
        this.window.style.left = `${x}px`;
        this.window.style.top = `${y}px`;
    }
}
