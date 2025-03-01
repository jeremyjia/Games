// c4Scenes.js 
class C4Scenes {
    constructor(sceneToolbar, onSceneSelected, onScenesUpdated) {
        this.scenes = [];
        this.sceneToolbar = sceneToolbar; // 使用外部传入的工具栏容器
        this.currentSceneIndex = -1;
        this.draggedScene = null;
        this.draggedIndex = -1;
        this.onSceneSelected = onSceneSelected;
        this.onScenesUpdated = onScenesUpdated;

        // 在传入的工具栏容器中添加新建按钮
        const newSceneBtn = document.createElement('button');
        newSceneBtn.textContent = '+';
        newSceneBtn.style.cssText = `
            background: #4CAF50;
            color: white;
            margin-bottom: 10px;
        `;
        newSceneBtn.onclick = () => this.addScene();
        this.sceneToolbar.appendChild(newSceneBtn);

         
        const tbDrawing = document.createElement('div');
        tbDrawing.style.cssText = `
            display: flex;
            gap: 5px;
            margin-bottom: 10px;
        `;

        this.lineBtn = document.createElement('button');
        this.lineBtn.textContent = 'Line';
        this.lineBtn.onclick = () => this.setTool('line');

        this.rectBtn = document.createElement('button');
        this.rectBtn.textContent = 'Rectangle';
        this.rectBtn.onclick = () => this.setTool('rect');

        tbDrawing.appendChild(this.lineBtn);
        tbDrawing.appendChild(this.rectBtn);
        this.sceneToolbar.insertBefore(tbDrawing, this.sceneToolbar.firstChild);

        this.currentTool = null;

        this.onSceneSelected = (id) => {
            onSceneSelected(id);
            // 强制重绘画布
            if (this.currentSceneIndex !== -1) {
                const scene = this.scenes[this.currentSceneIndex];
                onSceneSelected(scene.id);
            }
        };
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
            id: Date.now(),
            color: this.getRandomColor(),
            duration: 30,
            element: null,
            btn: null, 
            drawingObjs: []  // 新增绘图对象数组
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

        const sceneBtn = document.createElement('button');
        sceneBtn.textContent = `场景 0`; // 临时占位文本
        sceneBtn.style.cssText = `
            padding: 4px 8px;
            background: ${scene.color};
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        sceneBtn.onclick = () => this.selectScene(scene.id);

        const durationInput = document.createElement('input');
        durationInput.type = 'number';
        durationInput.value = scene.duration;
        durationInput.onchange = (e) => {
            scene.duration = Math.max(1, parseInt(e.target.value) || 1);
            this.onScenesUpdated?.();
        };

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = scene.color;
        colorInput.oninput = (e) => {
            scene.color = e.target.value;
            sceneBtn.style.backgroundColor = scene.color;
            this.onScenesUpdated?.();
        };

        sceneItem.appendChild(sceneBtn);
        sceneItem.appendChild(durationInput);
        sceneItem.appendChild(colorInput);
        this.sceneToolbar.appendChild(sceneItem);

        scene.element = sceneItem;
        scene.btn = sceneBtn;
        this.scenes.push(scene);
        this.updateSceneNumbers(); // 新增：统一更新序号
        this.selectScene(scene.id);
        this.onScenesUpdated?.();
    }

    // 新增方法：更新所有场景按钮的序号
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
            this.sceneToolbar.insertBefore(this.draggedScene.element, targetScene.element);
        } else {
            this.sceneToolbar.insertBefore(this.draggedScene.element, targetScene.element.nextSibling);
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
        this.updateSceneNumbers(); // 新增：拖拽结束后更新序号
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