class Customer {
    constructor(number, bankSystem) {
        this.number = number;
        this.bankSystem = bankSystem;
        this.messages = [];
        this.hairColors = ['#5D4037', '#3E2723', '#6D4C41'];
        this.clothColors = ['#4A90E2', '#00C853', '#D50000', '#AA00FF'];
        this.messageChance = 0.3;
        this.element = this.createCustomerElement();

        this.canvas = null;
        this.ctx = null;
    }

    createCustomerElement() {
        const element = document.createElement('div');
        element.className = 'customer';
        element.innerHTML = `
            <div class="hair"></div>
            <div class="head">
                <div class="eye left"></div>
                <div class="eye right"></div>
            </div>
            <div class="arm left"></div>
            <div class="arm right"></div>
            <div class="body">${this.number}</div>
            <div class="leg left"></div>
            <div class="leg right"></div>
        `;

        const hairColor = this.hairColors[Math.floor(Math.random() * this.hairColors.length)];
        const clothColor = this.clothColors[Math.floor(Math.random() * this.clothColors.length)];
        
        element.querySelector('.hair').style.background = hairColor;
        element.querySelector('.body').style.background = clothColor;
        element.querySelectorAll('.leg').forEach(leg => leg.style.background = clothColor);

        element.addEventListener('click', () => this.showCustomerInfo());
        return element;
    }

    showCustomerInfo() {
        alert(`客户 ${this.number} 信息\n留言数量: ${this.messages.length}`);
    }


    drawOnMessageBoard(type = 'circle') {
        if (!this.bankSystem || !this.bankSystem.messageBoard) {
            console.error("Bank system or message board not available");
            return null;
        }
        
        // 创建消息容器
        const messageEl = document.createElement('div');
        messageEl.className = 'message';
        
        // 添加客户信息
        const header = document.createElement('span');
        header.className = 'number';
        header.textContent = `${this.number}号客户：`;
        messageEl.appendChild(header);
        
        // 添加描述文本
        const text = document.createElement('span');
        text.className = 'text';
        text.textContent = `绘制了一个${type === 'circle' ? '圆形' : '点赞'}`;
        messageEl.appendChild(text);
        
        // 创建画布
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.margin = '5px 0';
        canvas.style.border = '1px dashed #ccc';
        
        const ctx = canvas.getContext('2d');
        this.drawOnCanvas(ctx, type);
        
        messageEl.appendChild(canvas);
        
        // 返回完整的DOM元素
        return messageEl;
    }
    
    // 修改leaveMessage方法
    leaveMessage() {
        if (Math.random() < this.messageChance) {
            if (Math.random() > 0.5) {
                // 文字留言
                const messages = [
                    `服务很好，但等待时间有点长`,
                    `窗口工作人员非常专业`,
                    `希望能增加更多的服务窗口`,
                    `系统效率很高，点赞！`,
                    `排队时间太久了，建议改进`,
                    `环境很舒适，服务态度好`,
                    `希望能有更多的自助服务设备`,
                    `这是我见过最有效率的银行`
                ];
                const message = messages[Math.floor(Math.random() * messages.length)];
                return {
                    number: this.number,
                    message: message
                };
            } else {
                // 绘图留言
                const drawType = Math.random() > 0.5 ? 'circle' : 'like';
                return this.drawOnMessageBoard(drawType);
            }
        }
        return null;
    }
    
        drawOnCanvas(ctx, type) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            switch(type) {
                case 'circle':
                    this.drawCircle(ctx);
                    break;
                case 'like':
                    this.drawLike(ctx);
                    break;
                default:
                    this.drawCircle(ctx);
            }
        }
        
        drawCircle(ctx) {
            ctx.beginPath();
            ctx.arc(50, 50, 40, 0, Math.PI * 2);
            ctx.strokeStyle = this.clothColors[0];
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = '#FFEB3B';
            ctx.fill();
        }
        
        drawLike(ctx) {
            // 绘制点赞手势
            ctx.beginPath();
            // 手掌
            ctx.arc(50, 70, 30, 0, Math.PI);
            // 大拇指
            ctx.moveTo(20, 70);
            ctx.lineTo(20, 30);
            ctx.lineTo(40, 20);
            ctx.lineTo(50, 30);
            
            ctx.strokeStyle = '#FF9800';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = '#FFE0B2';
            ctx.fill();
        }

}