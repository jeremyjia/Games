 
        class C4IssueManager {
            constructor() {
                this.element = document.createElement('div');
                this.element.id = 'id_4_debug_wnd_wnd';
                this.element.classList.add('max-w-2xl', 'bg-white', 'rounded-lg', 'shadow', 'p-4', 'fixed', 'draggable-window');
                this.element.style.zIndex = '100';
                this.element.style.left = '50%';
                this.element.style.top = '50%';
                this.element.style.transform = 'translate(-50%, -50%)';
                this.#createHeader();
                this.#createBody();
                this.makeDraggable();
                document.body.appendChild(this.element);
                this.element.style.display = 'none';
            }

            #createHeader() {
                const header = document.createElement('div');
                header.classList.add('bg-gray-200', 'p-2', 'cursor-move', 'select-none');
                header.textContent = '可拖动头部';
                this.element.prepend(header);
            }

            makeDraggable() {
                const header = this.element.firstChild;
                let isDragging = false;
                let startX, startY, initialX, initialY;

                const startDrag = (clientX, clientY) => {
                    isDragging = true;
                    initialX = clientX - this.element.offsetLeft;
                    initialY = clientY - this.element.offsetTop;
                    this.element.style.transition = 'none';
                };

                const duringDrag = (clientX, clientY) => {
                    if (!isDragging) return;
                    const newX = clientX - initialX;
                    const newY = clientY - initialY;
                    
                    // 限制窗口在可视区域内
                    const maxX = window.innerWidth - this.element.offsetWidth;
                    const maxY = window.innerHeight - this.element.offsetHeight;
                    
                    this.element.style.left = `${Math.min(Math.max(newX, 0), maxX}px`;
                    this.element.style.top = `${Math.min(Math.max(newY, 0), maxY}px`;
                };

                const stopDrag = () => {
                    isDragging = false;
                    this.element.style.transition = 'all 0.3s ease';
                };

                // 鼠标事件
                header.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
                document.addEventListener('mousemove', (e) => duringDrag(e.clientX, e.clientY));
                document.addEventListener('mouseup', stopDrag);

                // 触摸事件
                header.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    startDrag(e.touches[0].clientX, e.touches[0].clientY);
                });
                document.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                    duringDrag(e.touches[0].clientX, e.touches[0].clientY);
                });
                document.addEventListener('touchend', stopDrag);
            }
        }

        class C4Blackboard {
            constructor() {
                this.canvas = document.createElement('canvas');
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                this.canvas.style.position = 'fixed';
                this.canvas.style.top = '0';
                this.canvas.style.left = '0';
                this.ctx = this.canvas.getContext('2d');
                this.tools = [];
                this.selectedTool = null;
                this.toolbar = document.createElement('div');
                this.toolbar.classList.add('fixed', 'top-12', 'left-0', 'right-0', 'bg-white', 'shadow', 'flex', 'p-2');
                this.drawnObjects = [];
                this.draggingObject = null;
                this.dragOffsetX = 0;
                this.dragOffsetY = 0;
                document.body.appendChild(this.canvas);
                document.body.appendChild(this.toolbar);

                // 统一的事件处理
                const handleEvent = (handler) => (e) => {
                    const isTouch = e.type.startsWith('touch');
                    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
                    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
                    const rect = this.canvas.getBoundingClientRect();
                    handler(clientX - rect.left, clientY - rect.top);
                };

                this.canvas.addEventListener('mousedown', handleEvent(this.onMouseDown.bind(this)));
                this.canvas.addEventListener('touchstart', handleEvent(this.onMouseDown.bind(this)));
                this.canvas.addEventListener('mousemove', handleEvent(this.onMouseMove.bind(this)));
                this.canvas.addEventListener('touchmove', handleEvent(this.onMouseMove.bind(this)));
                this.canvas.addEventListener('mouseup', handleEvent(this.onMouseUp.bind(this)));
                this.canvas.addEventListener('touchend', handleEvent(this.onMouseUp.bind(this)));
            }

            // 保持其他方法不变，更新坐标获取逻辑...
            
            onMouseDown(x, y) {
                this.draggingObject = this.getObjectAtPoint(x, y);
                if (this.draggingObject) {
                    this.dragOffsetX = x - this.draggingObject.startX;
                    this.dragOffsetY = y - this.draggingObject.startY;
                } else {
                    this.selectedTool?.startDrawing(this.ctx, x, y);
                }
            }

            onMouseMove(x, y) {
                if (this.draggingObject) {
                    const dx = x - this.dragOffsetX - this.draggingObject.startX;
                    const dy = y - this.dragOffsetY - this.draggingObject.startY;

                    if (this.draggingObject.type === '直线' || this.draggingObject.type === '圆形') {
                        this.draggingObject.startX += dx;
                        this.draggingObject.startY += dy;
                        this.draggingObject.endX += dx;
                        this.draggingObject.endY += dy;
                    } else {
                        this.draggingObject.startX = x - this.dragOffsetX;
                        this.draggingObject.startY = y - this.dragOffsetY;
                    }
                    this.redrawObjects();
                } else {
                    this.redrawObjects();
                    this.selectedTool?.continueDrawing(this.ctx, x, y);
                }
            }

            onMouseUp(x, y) {
                if (this.draggingObject) {
                    this.draggingObject = null;
                } else {
                    this.selectedTool?.endDrawing(this.ctx, x, y);
                    if (this.selectedTool) {
                        const newObject = {
                            type: this.selectedTool.name,
                            startX: this.selectedTool.startX,
                            startY: this.selectedTool.startY,
                            endX: x,
                            endY: y
                        };
                        this.drawnObjects.push(newObject);
                    }
                }
            }

            // 保持其他方法不变...
        }

        // 保持其他类不变（DrawingTool, LineTool, CircleTool, C4MobileDevApp 等）...

        const app = new C4MobileDevApp();
    </script>
</body>
</html>