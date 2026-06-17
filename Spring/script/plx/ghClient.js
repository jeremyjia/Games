//ghClient.js
class GhClientWindow {
    constructor() {
        this.window = null;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.version = 'v0.25'; // 更新版本号
        this.currentRepo = 's177'; // 默认仓库
        
        // DOM 元素引用
        this.issueToolbar = null;
        this.commentToolbar = null;
        this.textArea = null;
        this.statusBar = null;
        this.runButton = null;
        this.updateButton = null;
        
        // 存储当前 issue 和评论数据
        this.currentIssue = null;
        this.currentComments = [];
        
        // 各仓库可用的 issue 列表
        this.repoIssues = {
            's177': [1, 2],
            'Javascript': [1, 2, 3],
            'Songs': [1, 2, 3, 4]
        };
        
        // 存储最后点击的按钮（独立存储）
        this.lastClickedIssueButton = null;
        this.lastClickedCommentButton = null;
        
        // 确保在DOM加载完成后创建窗口
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.createWindow());
        } else {
            this.createWindow();
        }
    }

    async #apiRequest(method, endpoint, data) {
        try {
            // 注意：在实际应用中，不要在客户端代码中硬编码敏感信息
            const xdToken = "ghp_2BF" + "JztcBlHHOkBybs" + "UVJZGHQ4S" + "wvFR0poLqc";
            const url = `https://api.github.com/repos/littleflute/${this.currentRepo}/${endpoint}`;
            const headers = {
                'Authorization': `token ${xdToken}`,
                'Content-Type': 'application/json'
            };
            
            const response = await fetch(url, {
                method,
                headers,
                body: data ? JSON.stringify(data) : null
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }
            return response.json();
        } catch (error) {
            console.error('API请求错误:', error);
            this.#updateStatus(`API请求错误: ${error.message}`);
            throw error;
        }
    }

    createWindow() {
        if (this.window) return;
        
        // 创建窗口容器
        this.window = document.createElement('div');
        this.window.id = 'ghClientWindow';
        Object.assign(this.window.style, {
            position: 'fixed',
            width: '600px',
            height: '500px',
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
        titleBar.style.display = 'flex';
        titleBar.style.justifyContent = 'space-between';
        titleBar.style.alignItems = 'center';

        // 添加双击标题栏归位功能
        titleBar.addEventListener('dblclick', () => this.resetPosition());

        // 仓库选择器
        const repoSelector = document.createElement('select');
        repoSelector.innerHTML = `
            <option value="s177">s177</option>
            <option value="Javascript">Javascript</option>
            <option value="Songs">Songs</option>
        `;
        repoSelector.style.marginRight = '10px';
        repoSelector.onchange = (e) => {
            this.currentRepo = e.target.value;
            // 切换仓库时重置评论工具条和文本框
            this.#resetCommentToolbar();
            this.#addIssueButtons();
            this.#updateStatus(`已切换到仓库: ${this.currentRepo}`);
        };
        titleBar.appendChild(repoSelector);

        // 关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'X';
        closeBtn.style.cssText = 'cursor: pointer; padding: 2px 8px;';
        closeBtn.onclick = () => this.toggleWindow();
        titleBar.appendChild(closeBtn);

        // 创建第一个工具条 (Issue 工具栏)
        this.issueToolbar = document.createElement('div');
        this.issueToolbar.style.padding = '5px';
        this.issueToolbar.style.backgroundColor = '#f5f5f5';
        this.issueToolbar.style.borderBottom = '1px solid #ddd';
        this.issueToolbar.style.display = 'flex';
        this.issueToolbar.style.gap = '5px';
        
        // 添加 Issue 按钮
        this.#addIssueButtons();

        // 创建第二个工具条 (评论工具栏)
        this.commentToolbar = document.createElement('div');
        this.commentToolbar.style.padding = '5px';
        this.commentToolbar.style.backgroundColor = '#f5f5f5';
        this.commentToolbar.style.borderBottom = '1px solid #ddd';
        this.commentToolbar.style.display = 'flex';
        this.commentToolbar.style.flexWrap = 'wrap';
        this.commentToolbar.style.gap = '5px';

        // 创建中间文本框
        this.textArea = document.createElement('textarea');
        this.textArea.style.flexGrow = '1';
        this.textArea.style.padding = '10px';
        this.textArea.style.border = 'none';
        this.textArea.style.resize = 'none';
        this.textArea.placeholder = '评论内容将显示在这里...';

        // 创建状态栏
        this.statusBar = document.createElement('div');
        this.statusBar.style.padding = '5px';
        this.statusBar.style.backgroundColor = '#e0e0e0';
        this.statusBar.style.borderTop = '1px solid #ccc';
        this.statusBar.style.display = 'flex';
        this.statusBar.style.justifyContent = 'space-between';
        this.statusBar.style.alignItems = 'center';
        this.statusBar.innerHTML = '<span id="statusText">就绪</span>';
        
        // 添加运行按钮
        this.runButton = document.createElement('button');
        this.runButton.textContent = '运行代码';
        this.runButton.style.padding = '3px 10px';
        this.runButton.onclick = () => this.#runCode();
        this.statusBar.appendChild(this.runButton);

         
        this.updateButton = document.createElement('button');
        this.updateButton.textContent = '更新代码';
        this.updateButton.style.backgroundColor = '#188';
        this.updateButton.style.padding = '3px 10px';
        this.updateButton.onclick = () => this.#updateCode();
        this.statusBar.appendChild(this.updateButton);

        // 组装窗口
        this.window.appendChild(titleBar);
        this.window.appendChild(this.issueToolbar);
        this.window.appendChild(this.commentToolbar);
        this.window.appendChild(this.textArea);
        this.window.appendChild(this.statusBar);
        
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

    // 新增：重置评论工具栏
    #resetCommentToolbar() {
        this.commentToolbar.innerHTML = '';
        this.textArea.value = '';
        this.currentIssue = null;
        this.currentComments = [];
        
        // 移除评论按钮高亮
        if (this.lastClickedCommentButton) {
            this.lastClickedCommentButton.style.backgroundColor = '';
            this.lastClickedCommentButton.style.border = '';
            this.lastClickedCommentButton.style.fontWeight = '';
            this.lastClickedCommentButton = null;
        }
    }

    #addIssueButtons() {
        // 清空现有按钮
        this.issueToolbar.innerHTML = '';
        
        // 获取当前仓库的可用 issue 列表
        const issues = this.repoIssues[this.currentRepo] || [1, 2];
        
        // 为每个 issue 添加按钮
        issues.forEach(issueNumber => {
            const issueBtn = document.createElement('button');
            issueBtn.textContent = `读取Issue #${issueNumber}`;
            issueBtn.style.padding = '5px 10px';
            issueBtn.onclick = () => {
                // 高亮当前按钮
                this.#highlightIssueButton(issueBtn);
                this.#loadIssue(issueNumber);
            };
            this.issueToolbar.appendChild(issueBtn);
        });
    }

    async #loadIssue(number) {
        try {
            this.#updateStatus(`正在加载 ${this.currentRepo} 仓库的 Issue #${number}...`);
            
            // 并行获取 issue 和评论
            const [issue, comments] = await Promise.all([
                this.#apiRequest('GET', `issues/${number}`),
                this.#apiRequest('GET', `issues/${number}/comments`)
            ]);
            
            this.currentIssue = issue;
            this.currentComments = comments;
            
            // 清空评论工具栏
            this.commentToolbar.innerHTML = '';
            
            // 添加 issue 标题作为第一个按钮
            const titleBtn = document.createElement('button');
            titleBtn.textContent = `标题: ${issue.title}`;
            titleBtn.style.padding = '5px 10px';
            titleBtn.style.fontWeight = 'bold';
            titleBtn.onclick = () => {
                // 高亮当前按钮
                this.#highlightCommentButton(titleBtn);
                this.#displayComment(issue.body || '无内容');
            };
            this.commentToolbar.appendChild(titleBtn);
            
            // 为每个评论添加按钮
            comments.forEach((comment, index) => {
                const commentBtn = document.createElement('button');
                commentBtn.textContent = `评论 ${index + 1} (${comment.user.login})`;
                commentBtn.style.padding = '5px 10px';
                commentBtn.onclick = () => {
                    // 高亮当前按钮
                    this.#highlightCommentButton(commentBtn);
                    this.#displayComment(comment.body);
                };
                this.commentToolbar.appendChild(commentBtn);
            });
            
            this.#updateStatus(`成功加载 ${this.currentRepo} 仓库的 Issue #${number}，共 ${comments.length} 条评论`);
        } catch (error) {
            this.#updateStatus(`加载 Issue 失败: ${error.message}`);
        }
    }

    // 新增：高亮issue按钮功能（蓝色）
    #highlightIssueButton(button) {
        // 移除之前issue按钮的高亮
        if (this.lastClickedIssueButton) {
            this.lastClickedIssueButton.style.backgroundColor = '#888';
            this.lastClickedIssueButton.style.border = '';
            this.lastClickedIssueButton.style.fontWeight = '';
        }
        
        // 高亮当前issue按钮（蓝色系）
        button.style.backgroundColor = '#2196F3';
        button.style.border = '2px solid #0b7dda';
        button.style.fontWeight = 'bold';
        button.style.color = 'white';
        
        // 存储当前按钮
        this.lastClickedIssueButton = button;
    }

    // 新增：高亮评论按钮功能（绿色）
    #highlightCommentButton(button) {
        // 移除之前评论按钮的高亮
        if (this.lastClickedCommentButton) {
            this.lastClickedCommentButton.style.backgroundColor = '';
            this.lastClickedCommentButton.style.border = '';
            this.lastClickedCommentButton.style.fontWeight = '';
            this.lastClickedCommentButton.style.color = '';
        }
        
        // 高亮当前评论按钮（绿色系）
        button.style.backgroundColor = '#4CAF50';
        button.style.border = '2px solid #45a049';
        button.style.fontWeight = 'bold';
        button.style.color = 'white';
        
        // 存储当前按钮
        this.lastClickedCommentButton = button;
    }

    #displayComment(content) {
        this.textArea.value = content || '无内容';
        this.#updateStatus('已显示评论内容');
    }

    // 新增：更新代码到GitHub
    async #updateCode() {
        if (!this.lastClickedCommentButton) {
            this.#updateStatus('错误: 请先选择一个issue标题或评论');
            return;
        }

        // 获取当前选中的评论按钮索引
        const buttons = Array.from(this.commentToolbar.children);
        const selectedIndex = buttons.indexOf(this.lastClickedCommentButton);
        
        if (selectedIndex === -1) {
            this.#updateStatus('错误: 无法确定选中的项目');
            return;
        }

        const newContent = this.textArea.value;
        if (!newContent.trim()) {
            this.#updateStatus('错误: 内容不能为空');
            return;
        }

        try {
            this.#updateStatus('正在更新GitHub内容...');
            
            // 0 = issue标题, >0 = 评论
            if (selectedIndex === 0) {
                // 更新issue主体
                await this.#apiRequest('PATCH', `issues/${this.currentIssue.number}`, {
                    body: newContent
                });
                this.#updateStatus('成功更新issue主体内容');
            } else {
                // 更新评论
                const commentIndex = selectedIndex - 1;
                const commentId = this.currentComments[commentIndex].id;
                await this.#apiRequest('PATCH', `issues/comments/${commentId}`, {
                    body: newContent
                });
                this.#updateStatus(`成功更新评论 #${commentIndex + 1}`);
            }

            // 重新加载当前issue以获取最新内容
            await this.#loadIssue(this.currentIssue.number);
            
            // 重新高亮选中的按钮
            if (buttons[selectedIndex]) {
                this.#highlightCommentButton(buttons[selectedIndex]);
                this.#displayComment(newContent);
            }
        } catch (error) {
            this.#updateStatus(`更新失败: ${error.message}`);
        }
    }

    #runCode() {
        const code = this.textArea.value;
        if (!code.trim()) {
            this.#updateStatus('没有可运行的代码');
            return;
        }
        
        try {
            this.#updateStatus('正在运行代码...');
            
            // 创建一个沙箱环境来运行代码
            const result = new Function(code)();
            
            // 处理同步返回值
            if (result !== undefined) {
                this.#updateStatus(`代码执行成功，返回值: ${JSON.stringify(result)}`);
            } else {
                this.#updateStatus('代码执行成功');
            }
        } catch (error) {
            this.#updateStatus(`代码执行错误: ${error.message}`);
        }
    }

    #updateStatus(message) {
        const statusText = this.statusBar.querySelector('#statusText');
        if (statusText) {
            statusText.textContent = message;
        }
        console.log(`[GitHub Client] ${message}`);
    }

    startDrag(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT') return;
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
        this.window.style.left = `calc(50% - 300px)`;
        this.window.style.top = `calc(50% - 250px)`;
    }

    toggleWindow() {
        if (!this.window) this.createWindow();
        
        if (this.window.style.display === 'none') {
            // 显示时重置位置到屏幕中央
            this.resetPosition();
            this.window.style.display = 'flex';
            this.#updateStatus('窗口已打开');
        } else {
            this.window.style.display = 'none';
            this.#updateStatus('窗口已关闭');
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
升级 ghClient.js v0.25 
code #updateCode, 用文本框里的内容更新 github 上的内容。

return all new code
 
*/
