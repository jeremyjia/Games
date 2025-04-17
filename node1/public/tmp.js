 
        class C4MobileDevApp {
            constructor() {
                this.version = "0.25.1"; // 版本升级
                // ...其他保持不变的代码...
            }

            blTogglePluginsWindow() {
                this.isPluginsWindowVisible = !this.isPluginsWindowVisible;
                this.pluginsWindow.style.display = this.isPluginsWindowVisible ? 'block' : 'none';
                
                // 新增：切换按钮激活状态
                const btn = document.getElementById('id4togglePluginsWnd');
                if(btn) btn.classList.toggle('active', this.isPluginsWindowVisible);
            }

            #updateStatusBarLineCount() {
                const textarea = document.getElementById('id4ta_in_sandbox');
                const statusBar = this.panel.querySelector('.p-2.bg-gray-100.text-sm.text-gray-600');
                const lineCount = textarea.value.split('\n').length;
                
                // 修改：创建按钮时携带激活状态
                statusBar.innerHTML = `<div>当前仓库: ${this.currentRepo}，文本框行数: ${lineCount}<div>
                    <button id="id4togglePluginsWnd" 
                            onclick="app.blTogglePluginsWindow()"
                            class="${this.isPluginsWindowVisible ? 'active' : ''}">
                        plugIns
                    </button>
                    <div id="id4_plugIns"></div>`;
            }

            // ...其他保持不变的方法...
        }
    </script>
</body>
</html>