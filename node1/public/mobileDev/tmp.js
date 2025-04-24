 
        if (typeof app === 'undefined') {
            app = {};
        }

        app.C4Note = function (id) {
            let d = document.getElementById(id);
            if (!d) {
                class Note {
                    constructor() {
                        this.currentNote = '3';
                        this.noteLength = '4';
                        this.fontSize = '24px';
                        this.fontFamily = 'Arial';
                        this.octave = 0;
                    }
                }

                d = document.createElement('div');
                d.id = id;
                d.note = new Note();

                // 修改容器为flex布局
                d.style.cssText = `
                    position: absolute;
                    width: 300px;
                    height: 400px;  /* 增加总高度以更好容纳内容 */
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 1000;
                    display: none;
                    flex-direction: column;
                `;

                const titleBar = document.createElement('div');
                titleBar.style.cssText = `
                    padding: 8px;
                    background: #f0f0f0;
                    cursor: move;
                    border-bottom: 1px solid #ccc;
                    flex-shrink: 0;  /* 固定标题栏高度 */
                `;

                // 关闭按钮保持不变...

                const editorContainer = document.createElement('div');
                editorContainer.style.cssText = `
                    padding: 10px;
                    flex: 1;  /* 弹性填充剩余空间 */
                    overflow-y: auto;
                    border-bottom: 1px solid #ccc;
                `;

                const canvasContainer = document.createElement('div');
                canvasContainer.style.cssText = `
                    padding: 10px;
                    flex: 1;  /* 弹性填充剩余空间 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    min-height: 100px;  /* 最小高度保障 */
                `;

                const canvas = document.createElement('canvas');
                canvas.style.cssText = `
                    width: 100%;
                    height: 100%;
                    border: 1px solid #eee;
                    cursor: crosshair;
                    background-color: #fafafa;
                `;

                // 修改绘制逻辑
                function updateCanvas() {
                    const ctx = canvas.getContext('2d');
                    const container = canvas.parentElement;
                    const width = container.clientWidth - 20;  // 计算有效宽度
                    const height = container.clientHeight - 20;  // 计算有效高度
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // 后续绘制逻辑保持不变...
                }

                // 其他逻辑保持不变...

                // 窗口拖动时添加边界检查
                function checkBoundary() {
                    const rect = d.getBoundingClientRect();
                    if (rect.left < 0) d.style.left = '0px';
                    if (rect.top < 0) d.style.top = '0px';
                    if (rect.right > window.innerWidth) 
                        d.style.left = (window.innerWidth - rect.width) + 'px';
                    if (rect.bottom > window.innerHeight) 
                        d.style.top = (window.innerHeight - rect.height) + 'px';
                }

                // 在拖动事件中添加边界检查
                document.onmousemove = function (e) {
                    if (isDragging) {
                        d.style.left = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - d.offsetWidth)) + 'px';
                        d.style.top = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - d.offsetHeight)) + 'px';
                    }
                };

                document.ontouchmove = function (e) {
                    if (isDragging) {
                        const touch = e.touches[0];
                        d.style.left = Math.max(0, Math.min(touch.clientX - offsetX, window.innerWidth - d.offsetWidth)) + 'px';
                        d.style.top = Math.max(0, Math.min(touch.clientY - offsetY, window.innerHeight - d.offsetHeight)) + 'px';
                        e.preventDefault();
                    }
                };
            }

            // 其他原有逻辑保持不变...
        }

        app.C4Note('n1c11');
    </script>
</body>

</html>