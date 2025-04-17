 
class C4MobileDevApp {
    // ... 其他代码保持不变 ...

    #createTabButton(text, isActive = false) {
        const btn = document.createElement('button');
        // 增加tab-button类名
        btn.className = `tab-button px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'} hover:bg-blue-100 transition-colors flex-1`;
        btn.textContent = text;
        return btn;
    }

    #switchTab(tabName) {
        document.querySelectorAll('#func-tab-content, #doc-tab-content').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll('.tab-button').forEach(el => {
            el.classList.remove('bg-blue-500', 'text-white');
        });
        
        if (tabName === 'func') {
            document.getElementById('func-tab-content').classList.remove('hidden');
            // 使用更可靠的选择器
            this.funcWindow.querySelector('.tab-button:first-child').classList.add('bg-blue-500', 'text-white');
        } else {
            document.getElementById('doc-tab-content').classList.remove('hidden');
            this.funcWindow.querySelector('.tab-button:last-child').classList.add('bg-blue-500', 'text-white');
        }
    }

    // ... 其余代码保持不变 ...
}
</script>