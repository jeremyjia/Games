makeDraggable() {
    const header = this.element.firstChild;
    let isDragging = false;
    let startX, startY, initialX, initialY;

    const handleStart = (clientX, clientY) => {
        isDragging = true;
        const rect = this.element.getBoundingClientRect();
        // 计算正确的初始偏移（考虑滚动和元素实际位置）
        initialX = clientX - rect.left;
        initialY = clientY - rect.top;
        // 记录元素当前的实际位置
        startX = rect.left;
        startY = rect.top;
        this.element.style.transition = 'none';
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;
        
        // 计算基于初始点击位置的增量
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        // 计算新位置
        let newX = startX + deltaX - initialX;
        let newY = startY + deltaY - initialY;

        // 应用边界限制
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;

        newX = Math.min(Math.max(newX, 0), maxX);
        newY = Math.min(Math.max(newY, 0), maxY);

        // 直接设置元素位置
        this.element.style.left = `${newX}px`;
        this.element.style.top = `${newY}px`;
    };

    const handleEnd = () => {
        isDragging = false;
        this.element.style.transition = 'all 0.3s ease';
    };

    // 统一处理指针事件
    const handlePointerDown = (e) => {
        if (e.target === header) {
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            handleStart(clientX, clientY);
            e.preventDefault();
        }
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        handleMove(clientX, clientY);
        e.preventDefault();
    };

    header.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handleEnd);
    
    // 兼容触摸设备
    header.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
}