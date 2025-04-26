/**
 * 完整的 UltimateBankSystem 类
 * 包含所有修复和改进：
 * 1. 留言板显示绘图客户编号
 * 2. 客户在窗口等待位置优化
 * 3. 与 Customer 类解耦
 * 4. 完整的动画效果
 */

function UltimateBankSystem(containerId, options) {
    // 合并默认配置
    this.config = Object.assign({
        windowCount: 4,
        maxQueueLength: 50,
        autoGenerateInterval: { min: 4000, max: 12000 },
        serviceDuration: { min: 6000, max: 15000 },
        customerClass: Customer // 默认使用Customer类，但可替换
    }, options);
    
    // 初始化属性
    this.container = document.getElementById(containerId);
    if (!this.container) {
        throw new Error('Container element not found');
    }
    
    this.queue = [];
    this.currentNumber = 0;
    this.servedCount = 0;
    this.messages = [];
    this.autoTimer = null;
    
    // 初始化窗口
    this.windows = Array.from({ length: this.config.windowCount }, (_, i) => ({
        id: i + 1,
        isAvailable: true,
        currentCustomer: null,
        element: null,
        announcementEl: null,
        timer: null
    }));
    
    // 初始化UI
    this._initUI();
    this._renderStats();
    
    // 初始化留言板
    this.messageBoard = document.getElementById('messageBoard');
    if (!this.messageBoard) {
        this._createMessageBoard();
    }
}

/* ========== UI 初始化方法 ========== */

UltimateBankSystem.prototype._initUI = function() {
    this._addStyles(); // 添加样式
    
    // 创建窗口元素
    this.windows.forEach((win, index) => {
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.style.left = `${60 + index * 230}px`;
        windowEl.innerHTML = `
            <div class="window-number">窗口 ${win.id}</div>
            <div class="status-light"></div>
            <div class="announcement">等待客户...</div>
        `;
        this.container.appendChild(windowEl);
        win.element = windowEl;
        win.announcementEl = windowEl.querySelector('.announcement');
    });
    
    // 创建排队区域
    this.queueArea = document.createElement('div');
    this.queueArea.className = 'queue-area';
    this.queueArea.innerHTML = '<span class="queue-label">排队队列：</span>';
    this.container.appendChild(this.queueArea);
};

UltimateBankSystem.prototype._addStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
        .window {
            position: relative;
            width: 180px;
            height: 200px;
            background: #f5f5f5;
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .window-number {
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .status-light {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #4caf50;
            margin: 10px auto;
            transition: background 0.3s ease;
        }
        
        .announcement {
            text-align: center;
            font-size: 14px;
            margin-top: 10px;
        }
        
        .queue-area {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            padding: 10px;
            background: #e9f5ff;
            border-top: 1px solid #ddd;
            min-height: 60px;
        }
        
        .queue-label {
            font-weight: bold;
            margin-right: 10px;
        }
        
        .customer {
            margin: 0 5px;
            transition: all 0.3s ease;
        }
        
        .path-line {
            position: absolute;
            height: 2px;
            background: rgba(0,0,0,0.1);
            transform-origin: 0 0;
            z-index: -1;
        }
        
        .walking {
            animation: walk 0.5s infinite alternate;
        }
        
        .walking .arm {
            animation: swing 0.5s infinite alternate;
        }
        
        .serving {
            position: absolute;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        @keyframes walk {
            from { transform: translateY(0); }
            to { transform: translateY(-5px); }
        }
        
        @keyframes swing {
            from { transform: rotate(-10deg); }
            to { transform: rotate(10deg); }
        }
        
        .draggable-panel {
            position: fixed;
            right: 20px;
            top: 20px;
            width: 300px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        }
        
        .draggable-panel .header {
            padding: 10px;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
            cursor: move;
            font-weight: bold;
        }
        
        .draggable-panel .content {
            padding: 10px;
            max-height: 300px;
            overflow-y: auto;
        }
        
        .message {
            margin-bottom: 10px;
            padding: 8px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        
        .message .number {
            font-weight: bold;
            color: #2196F3;
        }
        
        .drawing-header {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .customer-drawing {
            margin: 10px 0;
        }
        
        .customer-drawing canvas {
            display: block;
            margin: 0 auto;
        }
    `;
    document.head.appendChild(style);
};

UltimateBankSystem.prototype._createMessageBoard = function() {
    const panel = document.createElement('div');
    panel.id = 'messagePanel';
    panel.className = 'draggable-panel';
    panel.innerHTML = `
        <div class="header">客户留言板</div>
        <div class="content" id="messageBoard"></div>
    `;
    this.container.appendChild(panel);
    this.messageBoard = document.getElementById('messageBoard');
    
    // 简单实现拖拽功能
    let isDragging = false;
    let offsetX, offsetY;
    
    panel.querySelector('.header').addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
        panel.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        panel.style.left = `${e.clientX - offsetX}px`;
        panel.style.top = `${e.clientY - offsetY}px`;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        panel.style.cursor = 'grab';
    });
};

/* ========== 客户管理方法 ========== */

UltimateBankSystem.prototype.takeNumber = function() {
    if (this.queue.length >= this.config.maxQueueLength) {
        console.warn('排队人数已达上限');
        return null;
    }
    
    this.currentNumber++;
    
    // 使用配置的customerClass创建客户
    const customer = new this.config.customerClass(this.currentNumber);
    
    const queueItem = {
        number: this.currentNumber,
        customer: customer,
        element: customer.element
    };
    
    this.queue.push(queueItem);
    this._renderQueue();
    this._assignCustomerToWindow();
    
    return this.currentNumber;
};

UltimateBankSystem.prototype.toggleAutoGenerate = function(enable) {
    if (enable) {
        this.autoTimer = setInterval(() => {
            const batchSize = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < batchSize; i++) {
                this.takeNumber();
            }
        }, this._getRandomInterval());
    } else {
        clearInterval(this.autoTimer);
        this.autoTimer = null;
    }
};

UltimateBankSystem.prototype._getRandomInterval = function() {
    const { min, max } = this.config.autoGenerateInterval;
    return min + Math.random() * (max - min);
};

/* ========== 窗口服务方法 ========== */

UltimateBankSystem.prototype._assignCustomerToWindow = function() {
    this.windows.forEach(win => {
        if (win.isAvailable && this.queue.length > 0) {
            const queueItem = this.queue.shift();
            this._serveCustomer(win, queueItem);
            this._renderQueue();
        } else if (win.isAvailable) {
            win.announcementEl.textContent = '等待客户...';
        }
    });
};

UltimateBankSystem.prototype._serveCustomer = function(win, queueItem) {
    win.isAvailable = false;
    win.currentCustomer = queueItem.number;
    win.announcementEl.innerHTML = `请 <strong>${queueItem.number}</strong> 号<br>至 ${win.id} 号窗口`;
    
    // 更新窗口状态灯
    const light = win.element.querySelector('.status-light');
    light.style.background = '#ff5252';
    
    // 处理客户留言
    this._handleCustomerMessage(queueItem.customer);
    
    // 动画：客户移动到窗口
    const startPos = this._getCustomerPosition(queueItem.element);
    const endPos = this._getWindowPosition(win);
    this._animateCustomerMovement(startPos, endPos, queueItem.number, win);
    
    // 设置服务完成计时器
    win.timer = setTimeout(() => {
        this._completeService(win);
    }, this._getRandomServiceDuration());
};

UltimateBankSystem.prototype._getRandomServiceDuration = function() {
    const { min, max } = this.config.serviceDuration;
    return min + Math.random() * (max - min);
};

UltimateBankSystem.prototype._completeService = function(win) {
    win.isAvailable = true;
    this.servedCount++;
    
    const light = win.element.querySelector('.status-light');
    light.style.background = '#4caf50';
    light.style.animation = 'pulse 0.8s ease 3';
    
    // 移除客户动画
    const customerClone = win.element.querySelector('.serving');
    if (customerClone) {
        customerClone.animate([
            { opacity: 1, transform: 'translateY(0) scale(0.8)' },
            { opacity: 0, transform: 'translateY(-20px) scale(0.9)' }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => customerClone.remove();
    }
    
    this._renderStats();
    
    setTimeout(() => {
        this._assignCustomerToWindow();
        light.style.animation = '';
    }, 500);
};

/* ========== 动画效果方法 ========== */

UltimateBankSystem.prototype._getCustomerPosition = function(customerElement) {
    return {
        x: customerElement.offsetLeft + this.queueArea.offsetLeft + 35,
        y: customerElement.offsetTop + this.queueArea.offsetTop + 55
    };
};

UltimateBankSystem.prototype._getWindowPosition = function(win) {
    // 调整客户在窗口的位置，使其更靠近窗口
    return {
        x: win.element.offsetLeft + 60,
        y: win.element.offsetTop + 100
    };
};

UltimateBankSystem.prototype._animateCustomerMovement = function(startPos, endPos, customerNumber, win) {
    // 创建路径线
    const pathLine = document.createElement('div');
    pathLine.className = 'path-line';
    this.container.appendChild(pathLine);
    
    const dx = endPos.x - startPos.x;
    const dy = endPos.y - startPos.y;
    const length = Math.sqrt(dx ** 2 + dy ** 2);
    const angle = Math.atan2(dy, dx);
    
    pathLine.style.width = `${length}px`;
    pathLine.style.left = `${startPos.x}px`;
    pathLine.style.top = `${startPos.y}px`;
    pathLine.style.transform = `rotate(${angle}rad)`;
    
    // 创建移动的客户
    const movingCustomer = this._createMovingCustomer(customerNumber, startPos);
    movingCustomer.classList.add('walking');
    movingCustomer.querySelectorAll('.arm').forEach(arm => arm.classList.add('walking'));
    movingCustomer.style.transform = `rotateY(${angle > Math.PI/2 ? 180 : 0}deg)`;
    
    // 执行动画
    movingCustomer.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${dx}px, ${dy}px)` }
    ], {
        duration: 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        pathLine.remove();
        movingCustomer.remove();
        this._showCustomerAtWindow(win, customerNumber);
    };
};

UltimateBankSystem.prototype._showCustomerAtWindow = function(win, customerNumber) {
    const customer = this._createMovingCustomer(customerNumber, this._getWindowPosition(win));
    customer.classList.add('serving');
    win.element.appendChild(customer);
};

UltimateBankSystem.prototype._createMovingCustomer = function(number, pos) {
    const customer = new this.config.customerClass(number);
    const element = customer.element;
    element.style.position = 'absolute';
    element.style.left = `${pos.x}px`;
    element.style.top = `${pos.y}px`;
    this.container.appendChild(element);
    return element;
};

/* ========== 消息处理方法 ========== */

UltimateBankSystem.prototype._handleCustomerMessage = function(customer) {
    // 使用回调方式处理消息
    customer.createMessage((message) => {
        this._addMessageToBoard(message);
    });
};

UltimateBankSystem.prototype._addMessageToBoard = function(message) {
    if (!this.messageBoard) {
        console.error("Message board not available");
        return;
    }
    
    let messageEl;
    
    if (message.type === 'text') {
        messageEl = this._createTextMessage(message.id, message.content);
    } else if (message.type === 'drawing') {
        // 为绘图消息添加客户编号显示
        const container = document.createElement('div');
        const header = document.createElement('div');
        header.className = 'drawing-header';
        header.textContent = `${message.id}号客户绘制：`;
        container.appendChild(header);
        container.appendChild(message.element);
        messageEl = container;
    }
    
    if (messageEl) {
        this.messageBoard.appendChild(messageEl);
        this.messageBoard.scrollTop = this.messageBoard.scrollHeight;
        
        // 限制留言数量
        if (this.messageBoard.children.length > 10) {
            this.messageBoard.removeChild(this.messageBoard.children[0]);
        }
    }
};

UltimateBankSystem.prototype._createTextMessage = function(customerNumber, message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = `
        <span class="number">${customerNumber}号客户：</span>
        <span class="text">${message}</span>
    `;
    return messageEl;
};

/* ========== 状态渲染方法 ========== */

UltimateBankSystem.prototype._renderQueue = function() {
    this.queueArea.innerHTML = '<span class="queue-label">排队队列：</span>';
    this.queue.forEach(queueItem => {
        this.queueArea.appendChild(queueItem.element);
    });
    this._renderStats();
};

UltimateBankSystem.prototype._renderStats = function() {
    const queueCountEl = document.getElementById('queueCount');
    const servedCountEl = document.getElementById('servedCount');
    
    if (queueCountEl) queueCountEl.textContent = this.queue.length;
    if (servedCountEl) servedCountEl.textContent = this.servedCount;
};

/* ========== 公共方法 ========== */

UltimateBankSystem.prototype.reset = function() {
    // 停止自动生成
    this.toggleAutoGenerate(false);
    
    // 清除所有计时器
    this.windows.forEach(win => {
        if (win.timer) clearTimeout(win.timer);
    });
    
    // 重置状态
    this.queue = [];
    this.currentNumber = 0;
    this.servedCount = 0;
    this.messages = [];
    
    // 重置窗口
    this.windows.forEach(win => {
        win.isAvailable = true;
        win.currentCustomer = null;
        win.announcementEl.textContent = '等待客户...';
        const light = win.element.querySelector('.status-light');
        light.style.background = '';
        light.style.animation = '';
        
        // 移除所有客户元素
        const customers = win.element.querySelectorAll('.serving');
        customers.forEach(c => c.remove());
    });
    
    // 重置UI
    this._renderQueue();
    if (this.messageBoard) {
        this.messageBoard.innerHTML = '';
    }
};