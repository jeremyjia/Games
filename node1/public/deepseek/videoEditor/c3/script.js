const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sceneSelector = document.getElementById('scene-selector');
const addSceneBtn = document.getElementById('add-scene');
const deleteSceneBtn = document.getElementById('delete-scene');
const exportBtn = document.getElementById('export');
const exportModal = document.getElementById('export-modal');
const closeModal = document.querySelector('.close');
const exportJson = document.getElementById('export-json');

let scenes = [];
let currentSceneIndex = 0;
let frameRate = 1;
let isPlaying = false;

class Scene {
    constructor() {
        this.objects = [];
        this.background = null;
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    setBackground(bg) {
        this.background = bg;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.background) {
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        this.objects.forEach(obj => obj.draw(ctx));
    }
}

class Line {
    constructor(x1, y1, x2, y2, color = 'black') {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

class Circle {
    constructor(x, y, radius, color = 'black') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Rectangle {
    constructor(x, y, width, height, color = 'black') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Triangle {
    constructor(x1, y1, x2, y2, x3, y3, color = 'black') {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x3, this.y3);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function addScene() {
    const scene = new Scene();
    scenes.push(scene);
    updateSceneSelector();
    currentSceneIndex = scenes.length - 1;
    sceneSelector.value = currentSceneIndex;
    scene.draw();
}

function deleteScene() {
    if (scenes.length > 1) {
        scenes.splice(currentSceneIndex, 1);
        updateSceneSelector();
        currentSceneIndex = Math.max(0, currentSceneIndex - 1);
        sceneSelector.value = currentSceneIndex;
        scenes[currentSceneIndex].draw();
    }
}

function updateSceneSelector() {
    sceneSelector.innerHTML = '';
    scenes.forEach((scene, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Scene ${index + 1}`;
        sceneSelector.appendChild(option);
    });
}

function play() {
    isPlaying = true;
    animate();
}

function pause() {
    isPlaying = false;
}

function animate() {
    if (!isPlaying) return;
    scenes[currentSceneIndex].draw();
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 1000 / frameRate);
}

function exportToJson() {
    const json = JSON.stringify(scenes, null, 2);
    exportJson.textContent = json;
    exportModal.style.display = 'block';
}

addSceneBtn.addEventListener('click', addScene);
deleteSceneBtn.addEventListener('click', deleteScene);
sceneSelector.addEventListener('change', (e) => {
    currentSceneIndex = parseInt(e.target.value);
    scenes[currentSceneIndex].draw();
});
exportBtn.addEventListener('click', exportToJson);
closeModal.addEventListener('click', () => {
    exportModal.style.display = 'none';
});

document.getElementById('add-line').addEventListener('click', () => {
    const line = new Line(50, 50, 200, 200);
    scenes[currentSceneIndex].addObject(line);
    scenes[currentSceneIndex].draw();
});

document.getElementById('add-circle').addEventListener('click', () => {
    const circle = new Circle(150, 150, 50);
    scenes[currentSceneIndex].addObject(circle);
    scenes[currentSceneIndex].draw();
});

document.getElementById('add-rectangle').addEventListener('click', () => {
    const rectangle = new Rectangle(100, 100, 150, 100);
    scenes[currentSceneIndex].addObject(rectangle);
    scenes[currentSceneIndex].draw();
});

document.getElementById('add-triangle').addEventListener('click', () => {
    const triangle = new Triangle(100, 100, 150, 50, 200, 100);
    scenes[currentSceneIndex].addObject(triangle);
    scenes[currentSceneIndex].draw();
});

document.getElementById('set-forest').addEventListener('click', () => {
    scenes[currentSceneIndex].setBackground('green');
    scenes[currentSceneIndex].draw();
});

document.getElementById('set-beach').addEventListener('click', () => {
    scenes[currentSceneIndex].setBackground('blue');
    scenes[currentSceneIndex].draw();
});

document.getElementById('set-street').addEventListener('click', () => {
    scenes[currentSceneIndex].setBackground('gray');
    scenes[currentSceneIndex].draw();
});

document.getElementById('play').addEventListener('click', play);
document.getElementById('pause').addEventListener('click', pause);

// Initialize with one scene
addScene();