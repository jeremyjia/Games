// c4Scenes.js 
class C4Scenes {
    constructor(sceneToolbar, onSceneSelected, onScenesUpdated) {
        this.nextUUID = Date.now(); // 使用时间戳初始化确保唯一性
        this.sceneWindow = new C4DraggableWindow('scenesManager', sceneToolbar, 444, 151);
        this.scenes = [];
        this.sceneToolbar = sceneToolbar;
        this.currentSceneIndex = -1;
        this.nextSceneId = 1; // 新增ID计数器
        this.draggedScene = null;
        this.draggedIndex = -1;
        this.onSceneSelected = onSceneSelected;
        this.onScenesUpdated = onScenesUpdated;
 
        const header = document.createElement('div');
        header.style.cssText = ` 
            position: sticky;
            top: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 1;
            padding: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-bottom: 2px solid rgba(255, 255, 255, 0.15);
            color: white;
        `;

        // Create a scrollable container for scenes
        this.scenesContainer = document.createElement('div');
        this.scenesContainer.style.cssText = `
            overflow-y: auto;
            flex-grow: 1;
        `;

        // Configure the main toolbar layout
        this.sceneToolbar.style.cssText = `
            display: flex;
            flex-direction: column;
            height: 100%;
        `;
        this.sceneToolbar.appendChild(header);
        this.sceneToolbar.appendChild(this.scenesContainer);

        // Add drawing tools to the header
        const tbDrawing = document.createElement('div');
        tbDrawing.style.cssText = `
            display: flex;
            gap: 5px; 
            background-color: red;
            margin-bottom: 1px;
        `;

        this.lineBtn = document.createElement('button');
        this.lineBtn.textContent = 'Line';
        this.lineBtn.onclick = () => this.setTool('line');

        this.rectBtn = document.createElement('button');
        this.rectBtn.textContent = 'Rectangle';
        this.rectBtn.onclick = () => this.setTool('rect');

        tbDrawing.appendChild(this.lineBtn);
        tbDrawing.appendChild(this.rectBtn);
        header.appendChild(tbDrawing);
        this.selectedShapeUI = document.createElement('div');
        this.selectedShapeUI.style.cssText = `
            display: flex;
            gap: 5px; 
            background-color: lightblue;
            margin-bottom: 1px;
        `;

        header.appendChild(this.selectedShapeUI);
        
        const newSceneBtn = document.createElement('button');
        newSceneBtn.textContent = '+';
        newSceneBtn.style.cssText = `
            background: #4CAF50;
            color: white;
            margin-bottom: 10px;
            width: 100%;
        `;
        newSceneBtn.onclick = () => this.addScene();
        header.appendChild(newSceneBtn);

        this.currentTool = null;
 

        
        // Add to your button creation code:
        this.lineBtn.style.color = 'brown';
        this.rectBtn.style.color = 'brown';
        newSceneBtn.style.color = 'white';

        // Add hover effects:
        this.lineBtn.style.transition = 'background 0.3s';
        this.rectBtn.style.transition = 'background 0.3s';
        newSceneBtn.style.transition = 'background 0.3s';
    }
    
    setTool(tool) {
        this.currentTool = tool;
        this.lineBtn.style.background = tool === 'line' ? '#2196F3' : '';
        this.rectBtn.style.background = tool === 'rect' ? '#2196F3' : '';
    }


    getScenes() {
        return this.scenes;
    } 
    addScene() {
        const scene = {
            uuid: this.nextUUID++, // 新增唯一标识
            id: this.nextSceneId++, // 使用自增唯一ID
            color: this.getRandomColor(),
            duration: 30,
            element: null,
            btn: null,
            drawingObjs: []
        };
    
        const sceneItem = document.createElement('div');
        sceneItem.style.cssText = `
            display: flex;
            gap: 8px;
            padding: 8px;
            background: #f8f8f8;
            border-radius: 4px;
            align-items: center;
            cursor: move;
        `;
        sceneItem.draggable = true;
     
        sceneItem.addEventListener('dragstart', e => this.handleDragStart(e, scene));
        sceneItem.addEventListener('dragover', e => this.handleDragOver(e, scene));
        sceneItem.addEventListener('drop', e => this.handleDrop(e));
        sceneItem.addEventListener('dragend', e => this.handleDragEnd(e));
    
        
        const elementsConfig = [
            {
                type: 'button',
                props: {
                    textContent: '场景 0',
                    style: {
                        padding: '4px 8px',
                        background: scene.color,
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    },
                    onclick: () => this.selectScene(scene.id)
                },
                postCreate: element => scene.btn = element // 保存按钮引用
            },
            {
                type: 'input',
                props: {
                    type: 'number',
                    value: scene.duration,
                    onchange: e => {
                        scene.duration = Math.max(1, parseInt(e.target.value) || 1);
                        this.onScenesUpdated?.();
                    }
                }
            },
            {
                type: 'input',
                props: {
                    type: 'color',
                    value: scene.color,
                    oninput: e => {
                        scene.color = e.target.value;
                        scene.btn.style.backgroundColor = scene.color; // 更新按钮颜色
                        this.onScenesUpdated?.();
                    }
                }
            },
            {
                type: 'button',
                props: {
                    textContent: '×',
                    style: {
                        background: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        width: '24px',
                        height: '24px',
                        padding: '0',
                        transition: 'background 0.3s'
                    },
                    onmouseover: function() {
                        this.style.background = '#cc0000';
                    },
                    onmouseout: function() {
                        this.style.background = '#ff4444';
                    },
                    onclick: (e) => {
                        e.stopPropagation();
                        this.deleteScene(scene.id);
                    }
                }
            }
        ];
     
        elementsConfig.forEach(config => {
            const element = document.createElement(config.type);
             
            Object.entries(config.props).forEach(([key, value]) => {
                if (key === 'style') {
                    Object.assign(element.style, value);
                } else if (typeof value === 'function') {
                    element[key] = value;  
                } else {
                    element[key] = value;
                }
            });
    
            // 后处理
            if (config.postCreate) config.postCreate(element);
            sceneItem.appendChild(element);
        });
    
        this.scenesContainer.appendChild(sceneItem);
        scene.element = sceneItem;
        this.scenes.push(scene);
        this.updateSceneNumbers();
        this.selectScene(scene.id);
        this.onScenesUpdated?.();
    }
    deleteScene(sceneId) {
        const index = this.scenes.findIndex(s => s.id === sceneId);
        if (index === -1) return;

        // 从DOM中移除元素
        this.scenes[index].element.remove();
        
        // 从数组中移除场景
        this.scenes.splice(index, 1);

        // 更新当前选中索引
        if (this.currentSceneIndex === index) {
            this.currentSceneIndex = -1;
            this.onSceneSelected?.(null);
        } else if (this.currentSceneIndex > index) {
            this.currentSceneIndex--;
        }

        // 更新场景编号并触发回调
        this.updateSceneNumbers();
        this.onScenesUpdated?.();
    }
    updateSceneNumbers() {
        this.scenes.forEach((scene, index) => {
            scene.btn.textContent = `场景 ${index + 1}`;
        });
    }

    handleDragStart(e, scene) {
        e.dataTransfer.setData('text/plain', scene.id);
        this.draggedScene = scene;
        this.draggedIndex = this.scenes.findIndex(s => s.id === scene.id);
        scene.element.style.opacity = '0.5';
    }

    handleDragOver(e, targetScene) {
        e.preventDefault();
        const targetIndex = this.scenes.findIndex(s => s.id === targetScene.id);
        if (this.draggedIndex === targetIndex) return;

        const rect = targetScene.element.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        if (e.clientY < midY) {
            this.scenesContainer.insertBefore(this.draggedScene.element, targetScene.element);
        } else {
            this.scenesContainer.insertBefore(this.draggedScene.element, targetScene.element.nextSibling);
        }

        const newScenes = [...this.scenes];
        newScenes.splice(this.draggedIndex, 1);
        const newIndex = newScenes.findIndex(s => s.id === targetScene.id);
        newScenes.splice(e.clientY < midY ? newIndex : newIndex + 1, 0, this.draggedScene);
        
        this.scenes = newScenes;
        this.draggedIndex = this.scenes.findIndex(s => s.id === this.draggedScene.id);
    }

    handleDrop(e) {
        e.preventDefault();
    }

    handleDragEnd(e) {
        this.draggedScene.element.style.opacity = '1';
        this.draggedScene = null;
        this.updateSceneNumbers();  
        this.onScenesUpdated?.();
    }

    selectScene(id) {
        const index = this.scenes.findIndex(s => s.id === id);
        this.scenes.forEach((s, i) => {
            s.btn.style.border = i === index ? '5px solid #f00' : '';
        });
        this.currentSceneIndex = index;
        this.onSceneSelected?.(id);
    }

    getScenesData() {
        return this.scenes.map(scene => ({
            id: scene.id,
            color: scene.color,
            duration: scene.duration,
            drawingObjs: scene.drawingObjs.map(obj => ({
                type: obj.constructor.name,
                startX: obj.startX,
                startY: obj.startY,
                endX: obj.endX,
                endY: obj.endY,
                color: obj.color
            }))
        }));
    }

    getRandomColor() {
        const h = Math.random() * 360;
        return this.hslToHex(h, 70, 60);
    }

    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}
 