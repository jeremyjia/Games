document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const frameToolbar = document.getElementById('frame-toolbar');
    const sceneToolbar = document.getElementById('scene-toolbar');
    const drawToolbar = document.getElementById('draw-toolbar');
    const playToolbar = document.getElementById('play-toolbar');
    const exportJsonButton = document.getElementById('export-json');
    const modal = document.getElementById('modal');
    const jsonOutput = document.getElementById('json-output');
    const closeModal = document.querySelector('.close');

    let frames = [];
    let currentFrameIndex = 0;
    let isPlaying = false;
    let animationFrameId;

    // 工具条拖动功能
    function makeToolbarDraggable(toolbar) {
        let offsetX, offsetY, isDragging = false;

        toolbar.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - toolbar.getBoundingClientRect().left;
            offsetY = e.clientY - toolbar.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                toolbar.style.left = `${e.clientX - offsetX}px`;
                toolbar.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    makeToolbarDraggable(frameToolbar);
    makeToolbarDraggable(sceneToolbar);
    makeToolbarDraggable(drawToolbar);
    makeToolbarDraggable(playToolbar);

    // 帧管理
    document.getElementById('add-frame').addEventListener('click', () => {
        frames.push({ elements: [] });
        currentFrameIndex = frames.length - 1;
        renderFrame();
    });

    document.getElementById('remove-frame').addEventListener('click', () => {
        if (frames.length > 1) {
            frames.splice(currentFrameIndex, 1);
            currentFrameIndex = Math.min(currentFrameIndex, frames.length - 1);
            renderFrame();
        }
    });

    // 场景工具
    document.getElementById('forest').addEventListener('click', () => {
        addScene('树林');
    });

    document.getElementById('beach').addEventListener('click', () => {
        addScene('海边');
    });

    document.getElementById('road').addEventListener('click', () => {
        addScene('马路');
    });

    function addScene(scene) {
        frames[currentFrameIndex].elements.push({ type: 'scene', value: scene });
        renderFrame();
    }

    // 绘图工具
    let currentTool = null;

    document.getElementById('line').addEventListener('click', () => {
        currentTool = 'line';
    });

    document.getElementById('circle').addEventListener('click', () => {
        currentTool = 'circle';
    });

    document.getElementById('rectangle').addEventListener('click', () => {
        currentTool = 'rectangle';
    });

    document.getElementById('triangle').addEventListener('click', () => {
        currentTool = 'triangle';
    });

    canvas.addEventListener('mousedown', (e) => {
        if (currentTool) {
            const startX = e.offsetX;
            const startY = e.offsetY;

            const onMouseMove = (e) => {
                const endX = e.offsetX;
                const endY = e.offsetY;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                renderFrame();
                drawShape(startX, startY, endX, endY);
            };

            const onMouseUp = (e) => {
                const endX = e.offsetX;
                const endY = e.offsetY;
                frames[currentFrameIndex].elements.push({ type: currentTool, startX, startY, endX, endY });
                renderFrame();
                canvas.removeEventListener('mousemove', onMouseMove);
                canvas.removeEventListener('mouseup', onMouseUp);
            };

            canvas.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('mouseup', onMouseUp);
        }
    });

    function drawShape(startX, startY, endX, endY) {
        ctx.beginPath();
        switch (currentTool) {
            case 'line':
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                ctx.arc(startX, startY, radius, 0, Math.PI * 2);
                break;
            case 'rectangle':
                ctx.rect(startX, startY, endX - startX, endY - startY);
                break;
            case 'triangle':
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.lineTo(startX * 2 - endX, endY);
                ctx.closePath();
                break;
        }
        ctx.stroke();
    }

// 播放控制
document.getElementById('play').addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        playAnimation();
    }
});

document.getElementById('pause').addEventListener('click', () => {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
});

function playAnimation() {
    if (isPlaying) {
        renderFrame();
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
        animationFrameId = requestAnimationFrame(playAnimation);
    }
}

// 渲染帧
function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const frame = frames[currentFrameIndex];
    if (frame) {
        frame.elements.forEach(element => {
            if (element.type === 'scene') {
                ctx.fillText(element.value, 50, 50);
            } else {
                drawShape(element.startX, element.startY, element.endX, element.endY);
            }
        });
    }
}

// 导出JSON
exportJsonButton.addEventListener('click', () => {
    jsonOutput.textContent = JSON.stringify(frames, null, 2);
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
});