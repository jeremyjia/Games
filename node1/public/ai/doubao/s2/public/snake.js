const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const levelSelect = document.getElementById('level-select');
const startButton = document.getElementById('start-button');

const cellSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: Math.floor(Math.random() * (canvas.width / cellSize)), y: Math.floor(Math.random() * (canvas.height / cellSize)) };
let direction = 'right';
let score = 0;
let gameInterval;

function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach((segment) => {
    ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  });
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `得分: ${score}`;
    food = { x: Math.floor(Math.random() * (canvas.width / cellSize)), y: Math.floor(Math.random() * (canvas.height / cellSize)) };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / cellSize || head.y < 0 || head.y >= canvas.height / cellSize) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveSnake();
  if (checkCollision()) {
    clearInterval(gameInterval);
    saveScore();
    alert('游戏结束！');
  }
  drawSnake();
  drawFood();
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  direction = 'right';
  score = 0;
  scoreDisplay.textContent = `得分: 0`;
  const level = parseInt(levelSelect.value);
  let speed;
  switch (level) {
    case 1:
      speed = 200;
      break;
    case 2:
      speed = 100;
      break;
    case 3:
      speed = 50;
      break;
  }
  gameInterval = setInterval(gameLoop, speed);
}

function saveScore() {
  const level = levelSelect.value;
  fetch('/save-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ score, level })
  });
}

startButton.addEventListener('click', startGame);

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});