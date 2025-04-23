 
class C4IssueManager {
    constructor() {
        // ... 其他原有代码保持不变 ...

        const closeButton = document.createElement('button');
        closeButton.classList.add('text-gray-600', 'hover:text-gray-800', 'focus:outline-none');
        closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        
        // 统一使用 pointer 事件处理
        closeButton.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            this.element.style.display = 'none';
        });

        // 移除旧的 touch 和 click 事件监听
        header.appendChild(closeButton);

        // ... 其他原有代码保持不变 ...
    }

    makeDraggable() {
        // ... 原有拖动代码保持不变 ...
    }
}

// ... 其他类保持不变 ...
</script>