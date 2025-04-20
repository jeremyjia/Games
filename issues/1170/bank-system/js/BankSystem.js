class UltimateBankSystem {
    constructor(containerId, windowCount = 4) {
        this.container = document.getElementById(containerId);
        this.queue = [];
        this.currentNumber = 0;
        this.servedCount = 0;
        this.windows = Array.from({ length: windowCount }, (_, i) => ({
            id: i + 1,
            isAvailable: true,
            currentCustomer: null,
            element: null,
            announcementEl: null,
            timer: null
        }));
        this.autoTimer = null;
        this.messages = [];
        
                // 确保留言板初始化
                this.messageBoard = document.getElementById('messageBoard');
                if (!this.messageBoard) {
                    this.createMessageBoard();
                }
        this.initUI();
        this.renderStats();
        this.assignCustomerToWindow();
    }

    initUI() {
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

        this.queueArea = document.createElement('div');
        this.queueArea.className = 'queue-area';
        this.queueArea.innerHTML = '<span class="queue-label">排队队列：</span>';
        this.container.appendChild(this.queueArea);
    }

    takeNumber() {
        if(this.queue.length >= 50) {
            alert('排队人数已达上限');
            return null;
        }
        this.currentNumber++;
        const customer = new Customer(this.currentNumber, this);
        const queueItem = {
            number: this.currentNumber,
            customer: customer,
            element: customer.element
        };
        this.queue.push(queueItem);
        this.renderQueue();
        this.assignCustomerToWindow();
        return this.currentNumber;
    }

    toggleAutoGenerate(enable) {
        if (enable) {
            this.autoTimer = setInterval(() => {
                const batchSize = Math.floor(Math.random() * 3) + 1;
                for(let i = 0; i < batchSize; i++) this.takeNumber();
            }, 4000 + Math.random() * 8000);
        } else {
            clearInterval(this.autoTimer);
        }
    }

    assignCustomerToWindow() {
        this.windows.forEach(win => {
            if (win.isAvailable && this.queue.length > 0) {
                const queueItem = this.queue.shift();
                this.serveCustomer(win, queueItem);
                this.renderQueue();
            } else if(win.isAvailable && this.queue.length == 0) {
                win.announcementEl.innerHTML = `等待客户...`;
            }
        });
    }

    animateCustomerMovement(startPos, endPos, customerNumber, win) {
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

        const movingCustomer = this.createMovingCustomer(customerNumber, startPos);
        movingCustomer.classList.add('walking');
        movingCustomer.querySelectorAll('.arm').forEach(arm => arm.classList.add('walking'));
        movingCustomer.style.transform = `rotateY(${angle > Math.PI/2 ? 180 : 0}deg)`;

        movingCustomer.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${dx}px, ${dy}px)` }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            pathLine.remove();
            movingCustomer.remove();
        };
    }

    serveCustomer(win, queueItem) {
        win.isAvailable = false;
        win.currentCustomer = queueItem.number;
        win.announcementEl.innerHTML = `请 <strong>${queueItem.number}</strong> 号<br>至 ${win.id} 号窗口`;
        const light = win.element.querySelector('.status-light');
        light.style.background = '#ff5252';

        const messageContent = queueItem.customer.leaveMessage();
        if (messageContent) {
            this.addMessageToBoard(messageContent);
        }

        const startPos = {
            x: queueItem.element.offsetLeft + this.queueArea.offsetLeft + 35,
            y: queueItem.element.offsetTop + this.queueArea.offsetTop + 55
        };

        const endPos = {
            x: win.element.offsetLeft + 80,
            y: win.element.offsetTop + 120
        };

        this.animateCustomerMovement(startPos, endPos, queueItem.number, win);

        queueItem.customer.leaveMessage();

        win.timer = setTimeout(() => {
            this.completeService(win);
        }, 6000 + Math.random() * 9000);
    }

    completeService(win) {
        win.isAvailable = true;
        this.servedCount++;
        
        const light = win.element.querySelector('.status-light');
        light.style.background = '#4caf50';
        light.style.animation = 'pulse 0.8s ease 3';
        
        const customerClone = win.element.querySelector('.serving');
        if (customerClone) {
            customerClone.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-20px)' }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).onfinish = () => customerClone.remove();
        }

        this.renderStats();
        setTimeout(() => {
            this.assignCustomerToWindow();
            light.style.animation = '';
        }, 500);
    }

    renderQueue() {
        this.queueArea.innerHTML = '<span class="queue-label">排队队列：</span>';
        this.queue.forEach(queueItem => {
            this.queueArea.appendChild(queueItem.element);
        });
        this.renderStats();
    }

    renderStats() {
        document.getElementById('queueCount').textContent = this.queue.length;
        document.getElementById('servedCount').textContent = this.servedCount;
    }

    createMovingCustomer(number, pos) {
        const customer = new Customer(number, this);
        const element = customer.element;
        element.style.position = 'absolute';
        element.style.left = `${pos.x}px`;
        element.style.top = `${pos.y}px`;
        this.container.appendChild(element);
        return element;
    }

    createMessageBoard() {
        const panel = document.createElement('div');
        panel.id = 'messagePanel';
        panel.className = 'draggable-panel';
        panel.innerHTML = `
            <div class="header">客户留言板</div>
            <div class="content" id="messageBoard"></div>
        `;
        this.container.appendChild(panel);
        this.messageBoard = document.getElementById('messageBoard');
    }

    addMessageToBoard(messageContent) {
        if (!this.messageBoard) {
            console.error("Message board element not found");
            return;
        }

        let messageEl;
        
        // 处理字符串消息
        if (typeof messageContent === 'string') {
            messageEl = this.createTextMessage(this.lastCustomerNumber, messageContent);
        } 
        // 处理DOM元素消息
        else if (messageContent instanceof HTMLElement) {
            messageEl = messageContent;
        }
        // 处理对象形式的客户消息
        else if (messageContent && messageContent.number && messageContent.message) {
            messageEl = this.createTextMessage(messageContent.number, messageContent.message);
        }
        else {
            console.error("Invalid message content:", messageContent);
            return;
        }

        // 确保是有效的DOM节点
        if (!(messageEl instanceof Node)) {
            console.error("Created message is not a valid DOM node:", messageEl);
            return;
        }

        this.messageBoard.appendChild(messageEl);
        this.messageBoard.scrollTop = this.messageBoard.scrollHeight;
        
        // 限制留言数量
        if (this.messageBoard.children.length > 10) {
            this.messageBoard.removeChild(this.messageBoard.children[0]);
        }
    }

    createTextMessage(customerNumber, message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        messageEl.innerHTML = `
            <span class="number">${customerNumber}号客户：</span>
            <span class="text">${message}</span>
        `;
        return messageEl;
    }
}