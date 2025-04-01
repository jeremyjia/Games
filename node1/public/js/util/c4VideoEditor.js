//c4VideoEditor.js

class VideoEditor {
    constructor() { 
        this.musicScript = new C4MusicScript(this);
        this.div4Debug = null;
        this.width = 640;
        this.height = 480;
        this.selectedShape = null;
        this.dragOffset = { x: 0, y: 0 };
        this.currentSceneIndex = -1;
        this.currentPlaySceneIndex = -1;
        this.isPlaying = false;
        this.currentFrame = 0;
        this.animationId = null;
        this.audio = new Audio();
        this.audio.src = 'http://192.168.192.123:3000/deepseek/2025/02/03/i3/1.mp3';
        this.audio.addEventListener('ended', () => this.stopPlay()); 

        this.createViewportMeta();
        this.initGlobalStyle();
        this.initDOM(); 
        
        this.isDrawing = false;
        this.tempShape = null;
        this.registerCanvasEvents();
    }
   
    registerCanvasEvents() {  
        this.canvas.addEventListener('mouseup', e => this.finishDrawing(e));
        this.canvas.addEventListener('mouseleave', e => this.finishDrawing(e));
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
        // 添加新事件处理
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', e => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseleave', e => this.handleMouseUp(e));
        document.addEventListener('keydown', e => this.handleKeyDown(e));
    }

    // 新增键盘事件处理
    handleKeyDown(e) {
        if (e.key === 'Delete' && this.selectedShape) {
            this.deleteSelectedShape();
        }
    }
    // 新增删除方法
    deleteSelectedShape() {
        if (this.currentSceneIndex === -1 || !this.selectedShape) return;

        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        const index = scene.drawingObjs.indexOf(this.selectedShape);
        if (index !== -1) {
            scene.drawingObjs.splice(index, 1);
            this.selectedShape = null;
            this.redrawCanvas();
            this.updateJson();
        }
    }
    handleMouseDown(e) {
        const pos = this.getCanvasPosition(e);
        if(this.musicScript.handle_mouse_down(this.ctx,pos))  return;

        if (this.isPlaying) return;
        
        
        // 优先检测是否选中图形或控制点
        const hitTest = this.findHitTarget(pos.x, pos.y);
        if (!hitTest && this.selectedShape) {  // 点击空白处取消选中
            this.selectedShape = null;
            this.redrawCanvas();
        }

        if (hitTest) {
            hitTest.shape.setUI(this.scenesHandler.selectedShapeUI, () => {
                this.redrawCanvas();
            });
            this.selectedShape = hitTest.shape;
            this.selectedPoint = hitTest.point; // 'start', 'end' 或 null（整体移动）
            this.dragOffset = {
                x: pos.x - (this.selectedPoint ? this.selectedShape[this.selectedPoint + 'X'] : this.selectedShape.startX),
                y: pos.y - (this.selectedPoint ? this.selectedShape[this.selectedPoint + 'Y'] : this.selectedShape.startY)
            };
            this.isDraggingShape = true;
            this.redrawCanvas();
            return;
        }
        
        // 仅在未拖拽且选择工具时开始绘图
        if (this.scenesHandler.currentTool && !this.isDraggingShape) {
            this.startDrawing(e);
        }

    }
    
    findHitTarget(x, y) {
        if (this.currentSceneIndex === -1) return null;
        
        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        for (let i = scene.drawingObjs.length - 1; i >= 0; i--) {
            const shape = scene.drawingObjs[i];
            
            // 统一处理直线和矩形的控制点检测
            if (shape instanceof C4Line || shape instanceof C4Rect) {
                const startDist = Math.hypot(x - shape.startX, y - shape.startY);
                const endDist = Math.hypot(x - shape.endX, y - shape.endY);
                const controlPointRadius = 8;
                
                if (startDist < controlPointRadius) {
                    return { shape, point: 'start' };
                }
                if (endDist < controlPointRadius) {
                    return { shape, point: 'end' };
                }
            }
            
            // 整体图形检测
            if (shape.isPointInside(x, y)) {
                return { shape, point: null };
            }
        }
        return null;
    }


    handleMouseMove(e) {
        const pos = this.getCanvasPosition(e);
        this.musicScript.handle_mouse_move(this.ctx,pos);
        if (!this.isDraggingShape) {
            this.whileDrawing(e);
            return;
        }
        
        this.moveSelectedShape(pos.x, pos.y);
        this.redrawCanvas();
    }

    handleMouseUp(e) {
        const pos = this.getCanvasPosition(e);
        this.musicScript.handle_mouse_up(this.ctx,pos);

        if (this.isDraggingShape) {
            this.isDraggingShape = false;
            this.updateJson();
        } else {
            this.finishDrawing(); // 只有非拖拽时才调用结束绘图
        }
    }
    // 新增辅助方法
    getCanvasPosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    findShapeAt(x, y) {
        if (this.currentSceneIndex === -1) return null;
        
        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        // 反向查找最后绘制的图形
        for (let i = scene.drawingObjs.length - 1; i >= 0; i--) {
            const shape = scene.drawingObjs[i];
            if (shape.isPointInside(x, y)) {
                return shape;
            }
        }
        return null;
    }
    moveSelectedShape(x, y) {
        if (!this.selectedShape) return;
        
        if (this.selectedPoint) {
            // 移动单个控制点
            this.selectedShape[this.selectedPoint + 'X'] = x - this.dragOffset.x;
            this.selectedShape[this.selectedPoint + 'Y'] = y - this.dragOffset.y;
        } else {
            // 原有整体移动逻辑
            const dx = x - this.selectedShape.startX - this.dragOffset.x;
            const dy = y - this.selectedShape.startY - this.dragOffset.y;
            
            this.selectedShape.startX += dx;
            this.selectedShape.startY += dy;
            this.selectedShape.endX += dx;
            this.selectedShape.endY += dy;
        }
    }

    redrawCanvas() {
        this.updateCanvasColor(
            this.scenesHandler.scenes[this.currentSceneIndex].color
        );
        drawSelectionHighlight(this);
        this.musicScript.draw_ui_handle(this.ctx);
    }
    
    

    initGlobalStyle() {
        const style = document.createElement('style');
        style.textContent = `
            button {
                padding: 6px 12px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: opacity 0.2s;
            }
            button:active { opacity: 0.8; }
            .json-content {
                white-space: pre-wrap;
                font-family: monospace;
                counter-reset: line;
            }
            .json-content .line {
                display: block;
            }
            .json-content .line::before {
                counter-increment: line;
                content: counter(line) ". ";
                display: inline-block;
                width: 3em;
                padding-right: 0.5em;
                color: #666;
                user-select: none;
                border-right: 1px solid #ddd;
                margin-right: 0.5em;
            }
            .json-content .line.highlight {
                background-color: #ffeb3b;
                transition: background-color 
            }
        `;
        document.head.appendChild(style);
    }

    highlightJsonLine(sceneId) {
        if (!this.jsonWindow.isVisible) {
            this.jsonWindow.toggleVisibility();
        }
        this.updateJson();
        setTimeout(() => {
            let jsonContent = this.jsonWindow.getJsonContent();
            const targetLine = jsonContent.querySelector(`[data-scene-id="${sceneId}"]`);
            if (targetLine) {
                jsonContent.querySelectorAll('.line').forEach(line => {
                    line.classList.remove('highlight');
                });
                targetLine.classList.add('highlight');
                targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 0);
    }

    updateJson() {
        if (this.jsonWindow.isVisible) {
            const jsonStr = this.generateVideoJson();
            const lines = jsonStr.split('\n');
            let jsonContent = this.jsonWindow.getJsonContent();
            jsonContent.innerHTML = lines.map(line => {
                const escapedLine = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                const idMatch = line.match(/"id":\s*(\d+)/);
                if (idMatch) {
                    return `<div class="line" data-scene-id="${idMatch[1]}">${escapedLine}</div>`;
                } else {
                    return `<div class="line">${escapedLine}</div>`;
                }
            }).join('');
        }
    }

    createViewportMeta() {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(meta);
    }

    initDOM() {
        this.createSceneToolbar();
        this.scenesHandler = new C4Scenes(
            this.sceneToolbar,  
            id => this.selectScene(id),
            () => this.updateJson()
        );
        
        this.createVideoManagerToolbar(); 
        this.createCanvas();
        this.createPlayToolbar();

        this.springWnd = new C4SpringWnd(this);  
        this.videoSetWnd = new C4VideoSetWnd(this);  
        this.jsonWindow = new C4JsonWnd(); 

        this.resultContent = document.createElement('div');
        this.resultContent.style.cssText = `
            padding: 10px;
            min-width: 300px;
            max-width: 600px;
            background: white;
        `;
        this.resultWindow = new C4DraggableWindow('生成结果', this.resultContent, 100, 100, false);
    
    }

    createSceneToolbar() {
        this.sceneToolbar = document.createElement('div');
        Object.assign(this.sceneToolbar.style, {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '10px',
            overflowY: 'auto', // 添加滚动条
            maxHeight: '300px' // 限制最大高度
        });
    }
    
    createVideoManagerToolbar() {
        this.videoManagerToolbar = document.createElement('div');
        this.videoManagerToolbar.style.cssText = `
            display: flex;
            gap: 10px;
            padding: 10px;
            background: #e0e0e0;
            border-bottom: 1px solid #ccc;
        `;
    
        // 工具栏配置数组
        const toolbarConfig = [
            {
                type: 'button',
                text: 'videoEditor_v0.12',
                style: {
                    background: 'transparent',
                    border: '1px solid #666'
                }
            },
            {
                type: 'button',
                text: 'setVideo',
                onClick: () => this.videoSetWnd.toggleVisibility(),
                style: {
                    background: '#9C27B0',
                    color: 'white'
                }
            },
            {
                type: 'button',
                text: 'scenesWnd',
                onClick: () => this.scenesHandler.sceneWindow.toggleVisibility(),
                style: {
                    background: '#4CAF50',
                    color: 'white'
                }
            },
            {
                type: 'button',
                text: 'jsonWnd',
                onClick: () => {
                    this.jsonWindow.toggleVisibility();
                    if (this.jsonWindow.isVisible) this.updateJson();
                },
                style: {
                    background: '#2196F3',
                    color: 'white'
                }
            },
            {
                type: 'input',
                placeholder: '音频URL',
                value: this.audio.src,
                style: { flex: '1' },
                onChange: (e) => {
                    this.audio.src = e.target.value;
                    this.updateJson();
                }
            }
        ];
    
        // 根据配置创建元素
        toolbarConfig.forEach(config => {
            if (config.type === 'button') {
                const btn = document.createElement('button');
                btn.textContent = config.text;
                
                // 合并样式
                btn.style.cssText = Object.entries({
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    ...config.style
                }).map(([k, v]) => `${k}: ${v}`).join(';');
    
                if (config.onClick) {
                    btn.addEventListener('click', config.onClick.bind(this));
                }
                
                this.videoManagerToolbar.appendChild(btn);
            }
            else if (config.type === 'input') {
                const input = document.createElement('input');
                input.type = 'url';
                input.placeholder = config.placeholder;
                input.value = config.value || '';
                
                // 合并样式
                input.style.cssText = Object.entries({
                    padding: '4px 8px',
                    borderRadius: '4px',
                    ...config.style
                }).map(([k, v]) => `${k}: ${v}`).join(';');
    
                if (config.onChange) {
                    input.addEventListener('change', config.onChange.bind(this));
                }
                
                // 保存音频输入引用
                if (config.placeholder === '音频URL') {
                    this.audioUrlInput = input;
                }
                
                this.videoManagerToolbar.appendChild(input);
            }
        });
    
        document.body.appendChild(this.videoManagerToolbar);
    }

    getCanvasScale() {
        return {
            x: this.width / this.canvas.width,
            y: this.height / this.canvas.height
        };
    }
    
    generateVideoJson() {
        // 添加有效性检查
        if (!this.scenesHandler.scenes.every(s => s.drawingObjs)) {
            alert('请确保所有场景的图形数据完整');
            return;
        }
        const scale = this.getCanvasScale();
        const scenesData = this.scenesHandler.scenes.map(scene => ({
            id: scene.id,
            color: scene.color,
            duration: scene.duration,
            // 保持绘图对象数据不变
            drawingObjs: scene.drawingObjs.map(obj => ({
                type: obj.constructor.name.replace("C4", ""),
                startX: Math.round(obj.startX * scale.x),
                startY: Math.round(obj.startY * scale.y),
                endX: Math.round(obj.endX * scale.x),
                endY: Math.round(obj.endY * scale.y),
                color: obj.color
            }))
        }));
        return JSON.stringify({
            fps: parseInt(this.fpsInput.value) || 30,
            canvasWidth: this.canvas.width,  
            canvasHeight: this.canvas.height,
            width: this.width,
            height: this.height,
            scenes: scenesData,
            audio: this.audio.src
        }, null, 2);
    }

    selectScene(id) {
        const sceneData = this.scenesHandler.getScenesData().find(s => s.id === id);
        if (sceneData) {
            this.currentSceneIndex = this.scenesHandler.currentSceneIndex;
            this.updateCanvasColor(sceneData.color); 
            this.highlightJsonLine(id);
        }
    }


    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 150;
        this.canvas.style.cssText = `
            width: 100%;
            max-width: 800px;
            height: auto;
            border: 2px solid #666;
            margin: 10px;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }

    createPlayToolbar() {
        this.playToolbar = document.createElement('div');
        this.playToolbar.style.cssText = `
            display: flex;
            gap: 10px;
            padding: 5px;
            background: #f0f0f0;
        `;

        this.playBtn = document.createElement('button');
        this.playBtn.textContent = '播放';
        this.playBtn.onclick = () => this.togglePlay();

        const fpsContainer = document.createElement('div');
        fpsContainer.innerHTML = `
            <label>帧率: <input type="number" value="30" min="1" style="width:50px"></label>
        `;
        this.fpsInput = fpsContainer.querySelector('input');
        this.fpsInput.addEventListener('change', () => this.updateJson());

            
        const generateBtn = document.createElement('button');
        generateBtn.textContent = 's1GenVideo';
        generateBtn.style.background = '#2196F3';
        generateBtn.style.color = 'white';
        generateBtn.onclick = () => this.generateVideo();
        this.playToolbar.appendChild(generateBtn);

        this.playToolbar.appendChild(this.playBtn);
        this.playToolbar.appendChild(fpsContainer);
        document.body.appendChild(this.playToolbar);
    }

    generateVideo() {
        if (this.scenesHandler.scenes.length === 0) {
            alert('请先创建至少一个场景！');
            return;
        }

        // 更新结果窗口内容
        this.resultContent.innerHTML = '<div>生成中，请稍候...</div>';
        this.resultWindow.show();

        const data = {
            fps: parseInt(this.fpsInput.value) || 30,
            audio: this.audio.src,
            scenes: this.scenesHandler.scenes.map(scene => ({
                color: scene.color,
                duration: scene.duration,
                drawingObjs: scene.drawingObjs.map(obj => {
                    const baseObj = {
                        type: obj.constructor.name.replace("C4", ""),
                        color: obj.color,
                        startX: Math.round(obj.startX),
                        startY: Math.round(obj.startY),
                        endX: Math.round(obj.endX),
                        endY: Math.round(obj.endY)
                    };
                    
                    // 添加形状特定属性
                    if (obj.constructor.name === "C4Rect") {
                        baseObj.width = Math.round(obj.width);
                        baseObj.height = Math.round(obj.height);
                    } else if (obj.constructor.name === "C4Line") {
                        baseObj.lineWidth = obj.lineWidth;
                    }
                    
                    return baseObj;
                })
            }))
        };

        fetch('http://localhost:3000/generate_video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`服务器错误: ${response.status} - ${text}`);
                });
            }
            return response.blob();
        }).then(blob => {
            const url = URL.createObjectURL(blob);
            this.resultContent.innerHTML = '';
            
            // 创建视频播放器
            const video = document.createElement('video');
            video.controls = true;
            video.src = url;
            video.style.width = '100%';
            
            // 创建按钮容器
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
                display: flex;
                gap: 10px;
                margin-top: 10px;
            `;

            // 下载按钮
            const downloadBtn = document.createElement('button');
            downloadBtn.textContent = '下载视频';
            downloadBtn.style.cssText = `
                background: #2196F3;
                color: white;
            `;
            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = url;
                a.download = 'video-output.mp4';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            // 新增关闭按钮
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '关闭窗口';
            closeBtn.style.cssText = `
                background: #f44336;
                color: white;
            `;
            closeBtn.onclick = () => this.resultWindow.toggleVisibility();

            buttonContainer.appendChild(downloadBtn);
            buttonContainer.appendChild(closeBtn);

            this.resultContent.appendChild(video);
            this.resultContent.appendChild(buttonContainer);
        })

        .catch(error => {
            console.error('生成失败:', error);
            resultContent.innerHTML = `
                <div style="color: red;">
                    <strong>生成失败:</strong><br>
                    ${error.message}
                </div>
            `;
        });
    }

    togglePlay() {
        this.isPlaying ? this.stopPlay() : this.startPlay();
    }

    startPlay() {
        if (this.scenesHandler.scenes.length === 0) return;
        this.isPlaying = true;
        this.playBtn.textContent = '停止';
        this.currentFrame = 0;
        this.currentPlaySceneIndex = -1;

        const fps = parseInt(this.fpsInput.value) || 30;
        this.audio.currentTime = this.currentFrame / fps;
        this.audio.play().catch(error => {
            console.error('音频播放失败:', error);
            this.stopPlay();
        });

        this.animate();
    }

    stopPlay() {
        this.isPlaying = false;
        this.playBtn.textContent = '播放';
        cancelAnimationFrame(this.animationId);
        this.audio.pause();
        this.audio.currentTime = 0;
        this.clearPlayHighlights();
        if (this.currentSceneIndex >=0 && this.currentSceneIndex < this.scenes.length) {
            this.updateCanvasColor(this.scenesHandler.scenes[this.currentSceneIndex].color);
        }
    }

    highlightSceneButton(index) {
        this.scenesHandler.scenes.forEach((scene, i) => {
            scene.btn.style.outline = i === index ? "2px solid #00f" : "";
        });
        
        if (index >= 0 && index < this.scenesHandler.scenes.length) {
            const sceneElement = this.scenesHandler.scenes[index].element;
            sceneElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    }

    clearPlayHighlights() {
        this.scenesHandler.scenes.forEach(scene => scene.btn.style.outline = "");
    }

    animate() {
        if (!this.isPlaying) return;

        const fps = parseInt(this.fpsInput.value) || 30;
        const currentTime = this.audio.currentTime;
        this.currentFrame = Math.floor(currentTime * fps);

        const totalFrames = this.scenesHandler.scenes.reduce((sum, s) => sum + s.duration, 0);
        if (this.currentFrame >= totalFrames) {
            this.stopPlay();
            return;
        }
 
        this.updatePlayback();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updatePlayback() {
        let accumulated = 0;
        let currentSceneIndex = -1;
        
        for (let i = 0; i < this.scenesHandler.scenes.length; i++) {
            accumulated += this.scenesHandler.scenes[i].duration;
            if (this.currentFrame < accumulated) {
                currentSceneIndex = i;
                break;
            }
        }

        if (currentSceneIndex !== -1) { 
            // 强制更新画布（包含颜色和图形）
            this.updateCanvasColor(
                this.scenesHandler.scenes[currentSceneIndex].color, 
                true
            ); 
            if (this.currentPlaySceneIndex !== currentSceneIndex) {
                this.highlightSceneButton(currentSceneIndex);
                this.currentPlaySceneIndex = currentSceneIndex;
            }
        }  
    }
    
    
    updateCanvasColor(color, isPlaying = false) {
        // 清空画布
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 确定当前场景索引
        const sceneIndex = isPlaying ? this.currentPlaySceneIndex : this.currentSceneIndex;
        
        // 重绘图形（新增以下部分）
        if (sceneIndex !== -1 && sceneIndex < this.scenesHandler.scenes.length) {
            const scene = this.scenesHandler.scenes[sceneIndex];
            scene.drawingObjs.forEach(obj => obj.draw(this.ctx));
        }
        
        if (isPlaying) {
            drawHUD(this,44,10,12);
            this.musicScript.showInf(this.ctx, this.audio.currentTime);
        }
        this.musicScript.draw_ui_handle(this.ctx);
    }


    
    startDrawing(e) {
        if (!this.scenesHandler.currentTool || this.currentSceneIndex === -1 || this.isDraggingShape) return; // 添加拖拽状态检查

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;  // 新增缩放计算
        const scaleY = this.canvas.height / rect.height;
        this.startPos = {
            x: (e.clientX - rect.left) * scaleX,  // 应用缩放
            y: (e.clientY - rect.top) * scaleY
        };
        this.isDrawing = true;
    }


    whileDrawing(e) {
        if (!this.isDrawing || this.isDraggingShape) return; // 拖拽时停止绘图更新

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;  // 新增缩放计算
        const scaleY = this.canvas.height / rect.height;
        const currentPos = {
            x: (e.clientX - rect.left) * scaleX,  // 应用缩放
            y: (e.clientY - rect.top) * scaleY
        };

        this.updateCanvasColor(
            this.scenesHandler.scenes[this.currentSceneIndex].color,
            this.isPlaying
        );
        this.redrawSceneGraphics();
        drawTempShape(this,this.ctx,this.scenesHandler.currentTool,currentPos);
    }

    finishDrawing(e) {
        if (this.isDraggingShape) return; // 拖拽时不要结束绘图
        if (!this.isDrawing) return;
        this.isDrawing = false;

        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;  // 新增缩放计算
        const scaleY = this.canvas.height / rect.height;
        const endPos = {
            x: (e.clientX - rect.left) * scaleX,  // 应用缩放
            y: (e.clientY - rect.top) * scaleY
        };

        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        const newShape = createShape(
            this.scenesHandler.currentTool,
            this.startPos,
            endPos,
            scene.color
        );

        if (newShape) {
            scene.drawingObjs.push(newShape);
            this.updateJson();
        }
    }

    redrawSceneGraphics() {
        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        scene.drawingObjs.forEach(obj => obj.draw(this.ctx));
    }  
}
 // 升级： 用配置数组重构 createVideoManagerToolbar
