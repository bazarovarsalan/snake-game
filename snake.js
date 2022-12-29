const board = document.querySelector("#board");
const context = board.getContext("2d");
const resetButton = document.querySelector(".resetButton");
const score = document.querySelector(".score");
let countScore = 0;
const w = board.width;
const h = board.height;
let running = false;
const unitSize = 15;
let xVelocity = 0;
let yVelocity = 0;
let foodX = Math.round((Math.random() * (w - unitSize)) / unitSize) * unitSize;
let foodY = Math.round((Math.random() * (h - unitSize)) / unitSize) * unitSize;

let snake = [{ x: w / 2, y: h / 2 }];
window.addEventListener("keydown", direction);
resetButton.addEventListener("click", resetGame);
gameStart();

function gameStart() {
  running = true;
  score.textContent = countScore;
  createFood();
  drawFood();
  upDate();
}

function upDate() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      upDate();
    }, 200);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  context.fillStyle = "black";
  context.fillRect(0, 0, w, h);
}

function createFood() {
  foodX = Math.round((Math.random() * (w - unitSize)) / unitSize) * unitSize;
  foodY = Math.round((Math.random() * (h - unitSize)) / unitSize) * unitSize;
}

function drawFood() {
  context.fillStyle = "red";
  let x = foodX + unitSize / 2;
  let y = foodY + unitSize / 2;
  context.beginPath();
  context.ellipse(x, y, unitSize / 2, unitSize / 2, 0, 0, Math.PI * 2);
  context.fill();
  context.stroke();
}

function moveSnake() {
  if (running) {
    const headSnake = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(headSnake);
    if (snake[0].x === foodX && snake[0].y === foodY) {
      countScore += 1;
      score.textContent = countScore;
      createFood();
      drawFood();
    } else {
      snake.pop();
    }
  }
}

function drawSnake() {
  snake.forEach((snakePart) => {
    context.fillStyle = "green";
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function direction(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  if (keyPressed === LEFT && xVelocity !== unitSize) {
    xVelocity = -unitSize;
    yVelocity = 0;
  } else if (keyPressed === UP && yVelocity !== unitSize) {
    xVelocity = 0;
    yVelocity = -unitSize;
  } else if (keyPressed === RIGHT && xVelocity !== -unitSize) {
    xVelocity = unitSize;
    yVelocity = 0;
  } else if (keyPressed === DOWN && yVelocity !== -unitSize) {
    xVelocity = 0;
    yVelocity = unitSize;
  }
}

function checkGameOver() {
  if (snake[0].x < 0 || snake[0].x > w) {
    running = false;
  } else if (snake[0].y < 0 || snake[0].y > h) {
    running = false;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  context.font = "30px Courier";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText("Game over", w / 2, h / 2);
}

function resetGame() {
  clearBoard();
  countScore = 0;
  snake = [{ x: w / 2, y: h / 2 }];
  xVelocity = 0;
  yVelocity = 0;
  gameStart();
}
