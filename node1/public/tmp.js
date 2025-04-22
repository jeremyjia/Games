makeDraggable() {
    const header = this.element.firstChild;
    let isDragging = false;
    let initialX, initialY;

    const handleStart = (clientX, clientY) => {
        isDragging = true;
        const rect = this.element.getBoundingClientRect();
        // 转换元素位置为具体像素并移除transform
        this.element.style.left = `${rect.left}px`;
        this.element.style.top = `${rect.top}px`;
        this.element.style.transform = 'none';
        // 计算初始偏移量（鼠标在元素内的位置）
        initialX = clientX - rect.left;
        initialY = clientY - rect.top;
        this.element.style.transition = 'none';
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging) return;
        
        // 计算新位置
        let newX = clientX - initialX;
        let newY = clientY - initialY;

        // 应用边界限制
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

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