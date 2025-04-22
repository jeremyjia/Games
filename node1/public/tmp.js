makeDraggable() {
    const header = this.element.firstChild;
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const handleStart = (clientX, clientY) => {
        isDragging = true;
        const rect = this.element.getBoundingClientRect(); // 使用实际渲染位置
        initialX = clientX - rect.left;  // 改用getBoundingClientRect
        initialY = clientY - rect.top;   // 获取准确的位置信息
        this.element.style.transition = 'none';
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;
        
        // 计算新的位置时考虑元素的实际尺寸
        const newX = clientX - initialX;
        const newY = clientY - initialY;

        // 限制移动范围时包含元素宽度高度
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;

        // 应用边界限制
        const clampedX = Math.min(Math.max(newX, 0), maxX);
        const clampedY = Math.min(Math.max(newY, 0), maxY);

        // 直接设置left/top而不是使用transform
        this.element.style.left = clampedX + 'px';
        this.element.style.top = clampedY + 'px';
    };

    const handleEnd = () => {
        isDragging = false;
        // 移除transition重置以便下次拖动时实时响应
        this.element.style.transition = 'all 0.3s ease';
    };

    // 统一处理指针事件
    const handlePointerDown = (e) => {
        if (e.target === header) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            handleStart(clientX, clientY);
        }
    };

    const handlePointerMove = (e) => {
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        handleMove(clientX, clientY);
    };

    // 使用更现代的指针事件处理
    header.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handleEnd);
    
    // 兼容触摸设备
    header.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
}