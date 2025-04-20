// 拖动功能实现
function makeDraggable(panel) {
    const header = panel.querySelector('.header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
        panel.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const container = document.getElementById('container');
        const containerRect = container.getBoundingClientRect();
        
        let newLeft = e.clientX - offsetX - containerRect.left;
        let newTop = e.clientY - offsetY - containerRect.top;
        
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - panel.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - panel.offsetHeight));
        
        panel.style.left = `${newLeft}px`;
        panel.style.top = `${newTop}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        panel.style.cursor = 'move';
    });
}

// 初始化银行系统
const bankSystem = new UltimateBankSystem('container', 4);

// 在银行系统初始化后添加
document.querySelectorAll('.customer').forEach(customerEl => {
    const drawBtn = document.createElement('button');
    drawBtn.className = 'draw-btn';
    drawBtn.textContent = '绘图';
    customerEl.appendChild(drawBtn);
    
    drawBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const customerNumber = parseInt(customerEl.querySelector('.body').textContent);
        const customer = bankSystem.queue.find(c => c.number === customerNumber)?.customer;
        if (customer) {
            // 随机选择绘制类型
            const type = Math.random() > 0.5 ? 'circle' : 'like';
            customer.drawOnMessageBoard(type);
        }
    });
});

// 初始化拖动功能
makeDraggable(document.getElementById('statsPanel'));
makeDraggable(document.getElementById('messagePanel'));

// 事件监听
document.getElementById('takeNumber').addEventListener('click', () => {
    bankSystem.takeNumber();
});

document.getElementById('autoGenerate').addEventListener('change', function(e) {
    bankSystem.toggleAutoGenerate(e.target.checked);
});