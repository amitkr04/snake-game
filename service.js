const gameBoard = document.querySelector("#gameBoard");
const gameBoardCtx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetButton = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const backgroundcolour = "white";
const snakeColour = "lightgreen";
const snakeBorder = "black";
const foodColour = "red";
const unitsize = 25;

let running = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;

let score = 0;

let snake = [
  { x: unitsize * 4, y: 0 },
  { x: unitsize * 3, y: 0 },
  { x: unitsize * 2, y: 0 },
  { x: unitsize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnack();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  gameBoardCtx.fillStyle = backgroundcolour;
  gameBoardCtx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitsize) * unitsize;

    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitsize);
  foodY = randomFood(0, gameHeight - unitsize);
}
function drawFood() {
  gameBoardCtx.fillStyle = foodColour;
  gameBoardCtx.fillRect(foodX, foodY, unitsize, unitsize);
}
function moveSnack() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  gameBoardCtx.fillStyle = snakeColour;
  gameBoardCtx.strokeStyle = snakeBorder;

  snake.forEach((snakePart) => {
    gameBoardCtx.fillRect(snakePart.x, snakePart.y, unitsize, unitsize);
    gameBoardCtx.strokeRect(snakePart.x, snakePart.y, unitsize, unitsize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity === -unitsize;
  const goingDown = yVelocity === unitsize;
  const goingRight = xVelocity === unitsize;
  const goingLeft = xVelocity === -unitsize;

  switch (true) {
    case keyPressed === LEFT && !goingRight:
      xVelocity = -unitsize;
      yVelocity = 0;
      break;

    case keyPressed === UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitsize;
      break;

    case keyPressed === RIGHT && !goingLeft:
      xVelocity = unitsize;
      yVelocity = 0;
      break;

    case keyPressed === DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitsize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;

    case snake[0].x >= gameWidth:
      running = false;
      break;

    case snake[0].y < 0:
      running = false;
      break;

    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
      break;
    }
  }
}
function displayGameOver() {
  gameBoardCtx.font = "50px MV Boli";
  gameBoardCtx.fillStyle = "black";
  gameBoardCtx.textAlign = "center";
  gameBoardCtx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = unitsize;
  yVelocity = 0;

  snake = [
    { x: unitsize * 4, y: 0 },
    { x: unitsize * 3, y: 0 },
    { x: unitsize * 2, y: 0 },
    { x: unitsize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}
