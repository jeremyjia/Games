//c4VideoEditor.js

class VideoEditor {
    constructor() { 
        this.selectedShape = null;
        this.dragOffset = { x: 0, y: 0 };
        this.currentSceneIndex = -1;
        this.currentPlaySceneIndex = -1;
        this.isPlaying = false;
        this.currentFrame = 0;
        this.animationId = null;
        this.audio = new Audio();
        this.audio.src = 'http://localhost:3001/deepseek/2025/02/03/i3/1.mp3';
        this.audio.addEventListener('ended', () => this.stopPlay());
        
        this.srt = srt;
        this.srtHandler = new C4Srt(this.srt);  


        this.createViewportMeta();
        this.initGlobalStyle();
        this.initDOM();
        this.createAudioPresetWindow();
        
        this.isDrawing = false;
        this.tempShape = null;
        this.registerCanvasEvents();
    }
 
    
    registerCanvasEvents() {
        this.canvas.addEventListener('mousedown', e => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', e => this.whileDrawing(e));
        this.canvas.addEventListener('mouseup', e => this.finishDrawing(e));
        this.canvas.addEventListener('mouseleave', e => this.finishDrawing(e));
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
        // 添加新事件处理
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', e => this.handleMouseUp(e));
        this.canvas.addEventListener('mouseleave', e => this.handleMouseUp(e));
    }

    handleMouseDown(e) {
        if (this.isPlaying) return;
        
        const pos = this.getCanvasPosition(e);
        
        // 优先检测是否选中图形
        this.selectedShape = this.findShapeAt(pos.x, pos.y);
        if (this.selectedShape) {
            this.dragOffset = {
                x: pos.x - this.selectedShape.startX,
                y: pos.y - this.selectedShape.startY
            };
            this.isDraggingShape = true;
            this.redrawCanvas();
            return;
        }
        
        // 原有绘图逻辑
        if (this.scenesHandler.currentTool) {
            this.startDrawing(e);
        }
    }
    
    handleMouseMove(e) {
        if (!this.isDraggingShape) {
            this.whileDrawing(e);
            return;
        }
        
        const pos = this.getCanvasPosition(e);
        this.moveSelectedShape(pos.x, pos.y);
        this.redrawCanvas();
    }

    handleMouseUp() {
        if (this.isDraggingShape) {
            this.isDraggingShape = false;
            this.updateJsonContent();
        }
        this.finishDrawing();
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
        
        const dx = x - this.selectedShape.startX - this.dragOffset.x;
        const dy = y - this.selectedShape.startY - this.dragOffset.y;
        
        this.selectedShape.startX += dx;
        this.selectedShape.startY += dy;
        this.selectedShape.endX += dx;
        this.selectedShape.endY += dy;
    }

    redrawCanvas() {
        this.updateCanvasColor(
            this.scenesHandler.scenes[this.currentSceneIndex].color
        );
        this.drawSelectionHighlight();
    }
    drawSelectionHighlight() {
        if (!this.selectedShape) return;
        
        this.ctx.save();
        this.ctx.strokeStyle = '#FF0000';
        this.ctx.lineWidth = 2;
        
        if (this.selectedShape instanceof C4Line) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.selectedShape.startX, this.selectedShape.startY);
            this.ctx.lineTo(this.selectedShape.endX, this.selectedShape.endY);
            this.ctx.stroke();
        } else if (this.selectedShape instanceof C4Rect) {
            this.ctx.strokeRect(
                this.selectedShape.startX,
                this.selectedShape.startY,
                this.selectedShape.endX - this.selectedShape.startX,
                this.selectedShape.endY - this.selectedShape.startY
            );
        }
        
        this.ctx.restore();
    }

    createAudioPresetWindow() {
        this.audioPresetContent = document.createElement('div');
        this.audioPresetContent.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
        `;

        const baseURL = 'https://littleflute.github.io/english/NewConceptEnglish/Book2/';
        for (let i = 1; i <= 36; i++) { 
            const btn = document.createElement('button');
            btn.textContent = `第 ${i} 课`;
            btn.style.cssText = `
                padding: 4px 8px;
                background: #9C27B0;
                color: white;
                font-size: 12px;
            `;
            btn.onclick = () => {
                // 关键修改：用padStart补足两位数路径
                const paddedI = i.toString().padStart(2, '0');
                const url = `${baseURL}${paddedI}.mp3`;
                this.audioUrlInput.value = url;
                this.audio.src = url;
                this.updateJsonContent();
            };
            this.audioPresetContent.appendChild(btn);
        }

        this.audioPresetWindow = new C4DraggableWindow(
            '音频预设',
            this.audioPresetContent,
            400,  
            20,
            false
        );
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
        this.updateJsonContent();
        setTimeout(() => {
            const targetLine = this.jsonContent.querySelector(`[data-scene-id="${sceneId}"]`);
            if (targetLine) {
                this.jsonContent.querySelectorAll('.line').forEach(line => {
                    line.classList.remove('highlight');
                });
                targetLine.classList.add('highlight');
                targetLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 0);
    }

    updateJsonContent() {
        if (this.jsonWindow.isVisible) {
            const jsonStr = this.generateVideoJson();
            const lines = jsonStr.split('\n');
            this.jsonContent.innerHTML = lines.map(line => {
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
            this.sceneToolbar, // 将工具栏容器传递给场景管理器
            id => this.selectScene(id),
            () => this.updateJsonContent()
        );
        this.sceneWindow = new C4DraggableWindow('场景管理', this.sceneToolbar, 20, 20);
        this.createVideoManagerToolbar();
        this.createCanvas();
        this.createPlayToolbar();

        this.jsonContent = document.createElement('div');
        this.jsonContent.className = 'json-content';
        this.jsonContent.style.cssText = `
            padding: 10px;
            max-height: 200px;
            overflow: auto;
            margin: 0;
            background: white;
        `;
        this.jsonWindow = new C4DraggableWindow('jsonWindow', this.jsonContent, 20, 200);
        // 创建结果窗口元素
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

        const toggleWindowBtn = document.createElement('button');
        toggleWindowBtn.textContent = '切换场景窗口';
        toggleWindowBtn.onclick = () => this.sceneWindow.toggleVisibility();

        const toggleJsonBtn = document.createElement('button');
        toggleJsonBtn.textContent = '切换数据窗口';
        toggleJsonBtn.onclick = () => {
            this.jsonWindow.toggleVisibility();
            if (this.jsonWindow.isVisible) {
                this.updateJsonContent();
            }
        };

        const audioUrlInput = document.createElement('input');
        audioUrlInput.type = 'url';
        audioUrlInput.placeholder = '音频URL';
        audioUrlInput.value = this.audio.src;
        audioUrlInput.style.flex = '1';
        audioUrlInput.addEventListener('change', (e) => {
            this.audio.src = e.target.value;
            this.updateJsonContent();
        });

        // 新增音频预设切换按钮
        const toggleAudioPresetBtn = document.createElement('button');
        toggleAudioPresetBtn.textContent = '音频预设';
        toggleAudioPresetBtn.onclick = () => this.audioPresetWindow.toggleVisibility();

        // 在原有工具栏中添加新按钮
        this.videoManagerToolbar.appendChild(toggleAudioPresetBtn);
        this.videoManagerToolbar.appendChild(toggleWindowBtn);
        this.videoManagerToolbar.appendChild(toggleJsonBtn);
        
        this.audioUrlInput = audioUrlInput;
        this.videoManagerToolbar.appendChild(audioUrlInput);
        document.body.appendChild(this.videoManagerToolbar);
    }
    
    
    getCanvasScale() {
        return {
            x: 640 / this.canvas.width,
            y: 480 / this.canvas.height
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
            canvasWidth: this.canvas.width,  // 新增画布尺寸
            canvasHeight: this.canvas.height,
            width: 640,
            height: 480,
            scenes: scenesData,
            audio: this.audio.src
        }, null, 2);
    }

    selectScene(id) {
        const sceneData = this.scenesHandler.getScenesData().find(s => s.id === id);
        if (sceneData) {
            this.currentSceneIndex = this.scenesHandler.currentSceneIndex;
            this.updateCanvasColor(sceneData.color); // 自动触发重绘
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
        this.fpsInput.addEventListener('change', () => this.updateJsonContent());

            
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
        // 新增字幕处理
        const currentTime = this.audio.currentTime;
        
        this.srtHandler.getCurrentSubtitle(currentTime); 
         
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
        
        if (isPlaying) this.drawHUD();
    }


    drawHUD() {
        const fps = parseInt(this.fpsInput.value) || 30;
        const totalFrames = this.scenesHandler.scenes.reduce((sum, s) => sum + s.duration, 0);
        const currentFrame = this.currentFrame + 1;
        const currentScene = this.currentPlaySceneIndex + 1;
        const totalScenes = this.scenesHandler.scenes.length;

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(5, 5, 160, 60);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(`帧率: ${fps} FPS`, 10, 10);
        this.ctx.fillText(`帧: ${currentFrame}/${totalFrames}`, 10, 30);
        this.ctx.fillText(`场景: ${currentScene}/${totalScenes}`, 10, 50);

        this.srtHandler.showCurrentSubTxt(this.ctx,this.canvas);
        
    }
    startDrawing(e) {
        if (!this.scenesHandler.currentTool || this.currentSceneIndex === -1) return;

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
        if (!this.isDrawing) return;

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
        this.drawTempShape(currentPos);
    }

    finishDrawing(e) {
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
        const newShape = this.createShape(
            this.scenesHandler.currentTool,
            this.startPos,
            endPos,
            scene.color
        );

        if (newShape) {
            scene.drawingObjs.push(newShape);
            this.updateJsonContent();
        }
    }
    createShape(type, start, end) {  // 移除颜色参数
        // 固定使用黑色保存图形
        const color = '#000';
        switch (type) {
            case 'line':
                return new C4Line(start.x, start.y, end.x, end.y, color);
            case 'rect':
                return new C4Rect(start.x, start.y, end.x, end.y, color);
            default:
                return null;
        }
    }

    drawTempShape(currentPos) {
        const ctx = this.ctx;
        ctx.save();
        // 使用黑色边框和半透明填充
        ctx.strokeStyle = '#000';
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;

        switch (this.scenesHandler.currentTool) {
            case 'line':
                ctx.beginPath();
                ctx.moveTo(this.startPos.x, this.startPos.y);
                ctx.lineTo(currentPos.x, currentPos.y);
                ctx.stroke();
                break;
            case 'rect':
                ctx.fillRect(
                    this.startPos.x,
                    this.startPos.y,
                    currentPos.x - this.startPos.x,
                    currentPos.y - this.startPos.y
                );
                ctx.strokeRect(
                    this.startPos.x,
                    this.startPos.y,
                    currentPos.x - this.startPos.x,
                    currentPos.y - this.startPos.y
                );
                break;
        }
        ctx.restore();
    }


    redrawSceneGraphics() {
        const scene = this.scenesHandler.scenes[this.currentSceneIndex];
        scene.drawingObjs.forEach(obj => obj.draw(this.ctx));
    }

    
}

