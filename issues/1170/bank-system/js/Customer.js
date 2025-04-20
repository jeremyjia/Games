class Customer {
    constructor(number, bankSystem) {
        this.number = number;
        this.bankSystem = bankSystem;
        this.messages = [];
        this.hairColors = ['#5D4037', '#3E2723', '#6D4C41'];
        this.clothColors = ['#4A90E2', '#00C853', '#D50000', '#AA00FF'];
        this.messageChance = 0.3;
        this.element = this.createCustomerElement();
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

    leaveMessage() {
        if (Math.random() < this.messageChance) {
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
            this.messages.push(message);
            this.bankSystem.addMessageToBoard(this.number, message);
            return true;
        }
        return false;
    }
}