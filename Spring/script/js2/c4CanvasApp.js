
// 应用主控制器
class C4CanvasApp {
            constructor() {
                // 初始化画布管理器
                this.canvasManager = new C4CanvasManager('drawing-canvas');
                
                // 获取DOM元素
                this.settingsBtn = document.getElementById('settings_btn');
                this.settingsWindow = document.getElementById('settings-window');
                this.closeBtn = document.getElementById('close-btn');
                this.colorOptions = document.querySelectorAll('.color-option');
                this.canvasContainer = document.getElementById('canvas');
                this.customColorInput = document.getElementById('custom-color-input');
                this.applyCustomBtn = document.getElementById('apply_custom_btn');
                this.windowHeader = document.getElementById('window-header');
                this.freeDrawBtn = document.getElementById('free_draw_btn');
                this.lineBtn = document.getElementById('line_btn');
                this.rectBtn = document.getElementById('rect_btn');
                this.circleBtn = document.getElementById('circle_btn');
                this.selectBtn = document.getElementById('select_btn');
                this.deleteBtn = document.getElementById('delete_btn');
                this.clearBtn = document.getElementById('clear_btn');
                this.gridToggleBtn = document.getElementById('grid_toggle');
                this.gridOverlay = document.getElementById('grid-overlay');
                this.tooltip = document.getElementById('tooltip');
                this.brushSizeSlider = document.getElementById('brush-size');
                this.brushSizeValue = document.getElementById('brush-size-value');
                this.gridToggle = document.getElementById('grid-toggle');
                this.gridStatus = document.getElementById('grid-status');
                this.currentToolDisplay = document.getElementById('current-tool');
                this.previewShape = document.getElementById('preview-shape');
                
                // 初始化变量
                this.isDragging = false;
                this.currentX = 0;
                this.currentY = 0;
                this.initialX = 0;
                this.initialY = 0;
                this.xOffset = 0;
                this.yOffset = 0;
                
                // 初始化设置窗口位置
                this.settingsWindow.style.top = '150px';
                this.settingsWindow.style.left = '50%';
                this.settingsWindow.style.transform = 'translateX(-50%)';
                
                // 绑定事件
                this.bindEvents();
                
                // 初始化网格显示
                this.gridToggle.dispatchEvent(new Event('change'));
                
                // 隐藏初始画布内容
                document.querySelector('.canvas-content').style.display = 'none';
            }
            
            // 绑定所有事件
            bindEvents() {
                // 设置按钮切换
                this.settingsBtn.addEventListener('click', () => this.toggleSettingsWindow());
                
                // 关闭设置窗口
                this.closeBtn.addEventListener('click', () => this.hideSettingsWindow());
                
                // 颜色选择
                this.colorOptions.forEach(option => {
                    option.addEventListener('click', (e) => this.selectColor(e.target));
                });
                
                // 应用自定义颜色
                this.applyCustomBtn.addEventListener('click', () => this.applyCustomColor());
                
                // 窗口拖动
                this.windowHeader.addEventListener('mousedown', (e) => this.dragStart(e));
                this.windowHeader.addEventListener('touchstart', (e) => this.dragStart(e));
                document.addEventListener('mousemove', (e) => this.drag(e));
                document.addEventListener('touchmove', (e) => this.drag(e));
                document.addEventListener('mouseup', () => this.dragEnd());
                document.addEventListener('touchend', () => this.dragEnd());
                
                // 工具选择
                this.freeDrawBtn.addEventListener('click', () => this.selectTool('free'));
                this.lineBtn.addEventListener('click', () => this.selectTool('line'));
                this.rectBtn.addEventListener('click', () => this.selectTool('rect'));
                this.circleBtn.addEventListener('click', () => this.selectTool('circle'));
                this.selectBtn.addEventListener('click', () => this.selectTool('select'));
                
                // 删除选中图形
                this.deleteBtn.addEventListener('click', () => this.deleteSelectedShape());
                
                // 清空画布
                this.clearBtn.addEventListener('click', () => this.clearCanvas());
                
                // 网格开关
                this.gridToggle.addEventListener('change', () => this.toggleGrid());
                this.gridToggleBtn.addEventListener('click', () => this.toggleGridBtn());
                
                // 画笔大小调整
                this.brushSizeSlider.addEventListener('input', () => this.updateBrushSize());
                
                // 键盘快捷键
                document.addEventListener('keydown', (e) => this.handleKeyboard(e));
            }
            
            // 切换设置窗口显示
            toggleSettingsWindow() {
                if (this.settingsWindow.style.display === 'block') {
                    this.hideSettingsWindow();
                } else {
                    this.showSettingsWindow();
                }
            }
            
            // 显示设置窗口
            showSettingsWindow() {
                this.settingsWindow.style.display = 'block';
            }
            
            // 隐藏设置窗口
            hideSettingsWindow() {
                this.settingsWindow.style.display = 'none';
            }
            
            // 选择颜色
            selectColor(element) {
                const type = element.getAttribute('data-type');
                const color = element.getAttribute('data-color');
                
                // 画笔颜色选择
                if (type === 'brush') {
                    // 移除所有画笔颜色的active类
                    document.querySelectorAll('.color-option[data-type="brush"]').forEach(opt => {
                        opt.classList.remove('active');
                    });
                    
                    // 为当前选项添加active类
                    element.classList.add('active');
                    
                    // 更新画笔颜色
                    this.canvasManager.setColor(color);
                    return;
                }
                
                // 画布背景颜色选择
                // 移除所有背景颜色的active类
                document.querySelectorAll('.color-option:not([data-type])').forEach(opt => {
                    opt.classList.remove('active');
                });
                
                // 为当前选项添加active类
                element.classList.add('active');
                
                // 更改画布背景
                this.canvasContainer.style.backgroundColor = color;
            }
            
            // 应用自定义颜色
            applyCustomColor() {
                const color = this.customColorInput.value;
                if (this.isValidColor(color)) {
                    this.canvasContainer.style.backgroundColor = color;
                    // 移除所有预设背景颜色的active类
                    document.querySelectorAll('.color-option:not([data-type])').forEach(opt => {
                        opt.classList.remove('active');
                    });
                } else {
                    alert('请输入有效的颜色值（如 #FFFFFF 或 rgb(255,255,255)');
                }
            }
            
            // 验证颜色值是否有效
            isValidColor(color) {
                const style = new Option().style;
                style.color = color;
                return style.color !== '';
            }
            
            // 拖动窗口开始
            dragStart(e) {
                if (e.type === "touchstart") {
                    this.initialX = e.touches[0].clientX - this.xOffset;
                    this.initialY = e.touches[0].clientY - this.yOffset;
                } else {
                    this.initialX = e.clientX - this.xOffset;
                    this.initialY = e.clientY - this.yOffset;
                }
                
                if (e.target === this.windowHeader) {
                    this.isDragging = true;
                }
            }
            
            // 拖动窗口
            drag(e) {
                if (this.isDragging) {
                    e.preventDefault();
                    
                    if (e.type === "touchmove") {
                        this.currentX = e.touches[0].clientX - this.initialX;
                        this.currentY = e.touches[0].clientY - this.initialY;
                    } else {
                        this.currentX = e.clientX - this.initialX;
                        this.currentY = e.clientY - this.initialY;
                    }
                    
                    this.xOffset = this.currentX;
                    this.yOffset = this.currentY;
                    
                    this.setTranslate(this.currentX, this.currentY, this.settingsWindow);
                }
            }
            
            // 拖动窗口结束
            dragEnd() {
                this.initialX = this.currentX;
                this.initialY = this.currentY;
                this.isDragging = false;
            }
            
            // 设置元素位置
            setTranslate(xPos, yPos, el) {
                el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
            }
            
            // 选择工具
            selectTool(tool) {
                // 重置所有按钮状态
                this.freeDrawBtn.classList.remove('active');
                this.lineBtn.classList.remove('active');
                this.rectBtn.classList.remove('active');
                this.circleBtn.classList.remove('active');
                this.selectBtn.classList.remove('active');
                
                // 设置当前工具按钮状态
                switch(tool) {
                    case 'free':
                        this.freeDrawBtn.classList.add('active');
                        this.currentToolDisplay.textContent = '自由绘制';
                        break;
                    case 'line':
                        this.lineBtn.classList.add('active');
                        this.currentToolDisplay.textContent = '直线';
                        break;
                    case 'rect':
                        this.rectBtn.classList.add('active');
                        this.currentToolDisplay.textContent = '矩形';
                        break;
                    case 'circle':
                        this.circleBtn.classList.add('active');
                        this.currentToolDisplay.textContent = '圆形';
                        break;
                    case 'select':
                        this.selectBtn.classList.add('active');
                        this.currentToolDisplay.textContent = '选择/编辑';
                        break;
                }
                
                // 更新绘图模式
                this.canvasManager.setDrawMode(tool);
            }
            
            // 删除选中的图形
            deleteSelectedShape() {
                // 如果没有选中的图形，提示用户
                if (!this.canvasManager.selectedShape) {
                    // 短暂显示提示
                    this.showTooltip("请先选择一个图形", 2000);
                    return;
                }
                
                // 调用画布管理器的删除方法
                const deleted = this.canvasManager.removeSelectedShape();
                if (deleted) {
                    this.showTooltip("图形已删除", 1000);
                }
            }
            
            // 显示工具提示
            showTooltip(text, duration = 2000) {
                const tooltip = document.getElementById('tooltip');
                tooltip.textContent = text;
                tooltip.style.opacity = '1';
                
                // 定位在画布中央
                const canvas = document.getElementById('canvas');
                const rect = canvas.getBoundingClientRect();
                tooltip.style.left = (rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.height / 2 - 50) + 'px';
                
                // 定时隐藏
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, duration);
            }
            
            // 清空画布
            clearCanvas() {
                if (confirm('确定要清空画布吗？')) {
                    this.canvasManager.clearCanvas();
                }
            }
            
            // 切换网格显示
            toggleGrid() {
                if (this.gridToggle.checked) {
                    this.gridOverlay.classList.remove('hidden');
                    this.gridStatus.textContent = '开';
                    this.gridToggleBtn.innerHTML = '<i class="fas fa-th"></i> <span>网格: 开</span>';
                } else {
                    this.gridOverlay.classList.add('hidden');
                    this.gridStatus.textContent = '关';
                    this.gridToggleBtn.innerHTML = '<i class="fas fa-th"></i> <span>网格: 关</span>';
                }
            }
            
            // 网格按钮切换
            toggleGridBtn() {
                this.gridToggle.checked = !this.gridToggle.checked;
                this.toggleGrid();
            }
            
            // 更新画笔大小
            updateBrushSize() {
                const size = this.brushSizeSlider.value;
                this.brushSizeValue.textContent = size;
                this.canvasManager.setLineWidth(size);
            }
            
            // 处理键盘事件
            handleKeyboard(e) {
                // ESC键关闭设置窗口
                if (e.key === 'Escape' && this.settingsWindow.style.display === 'block') {
                    this.hideSettingsWindow();
                }
                
                // Delete键删除选中图形
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    e.preventDefault();
                    this.deleteSelectedShape();
                }
                
                // 数字键1-5切换工具
                if (e.key === '1') this.selectTool('free');
                if (e.key === '2') this.selectTool('line');
                if (e.key === '3') this.selectTool('rect');
                if (e.key === '4') this.selectTool('circle');
                if (e.key === '5') this.selectTool('select');
            }
}
        