const canvas = document.getElementById('gameOfLifeCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20; // 每个格子的大小
const gridWidth = canvas.width / gridSize;
const gridHeight = canvas.height / gridSize;

// 初始化滑翔机模式
let grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(false));
grid[2][3] = true;
grid[3][4] = true;
grid[4][2] = true;
grid[4][3] = true;
grid[4][4] = true;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (grid[y][x]) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            }
        }
    }
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const nx = x + i;
            const ny = y + j;
            if (
                nx >= 0 && nx < gridWidth &&
                ny >= 0 && ny < gridHeight &&
                !(i === 0 && j === 0) &&
                grid[ny][nx]
            ) {
                count++;
            }
        }
    }
    return count;
}

function nextGeneration() {
    const nextGrid = Array.from(grid, row => row.slice());
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const neighbors = countNeighbors(x, y);
            if (grid[y][x]) {
                if (neighbors < 2 || neighbors > 3) {
                    nextGrid[y][x] = false; // 死亡
                }
            } else {
                if (neighbors === 3) {
                    nextGrid[y][x] = true; // 诞生
                }
            }
        }
    }
    grid = nextGrid;
    drawGrid();
}

// 初始绘制滑翔机
//drawGrid();

// 每秒更新一次
setInterval(nextGeneration, 111);