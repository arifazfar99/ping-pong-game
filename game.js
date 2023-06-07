// Constants
const containerWidth = 500;
const containerHeight = 300;
const paddleWidth = 80;
const paddleHeight = 10;
const ballSize = 10;
const paddleSpeed = 8;

// Game elements
const container = document.getElementById("game-container");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");

// Paddle position
let paddleX = containerWidth / 2 - paddleWidth / 2;

// Ball position and direction
let ballX = containerWidth / 2;
let ballY = containerHeight / 2;
let ballSpeedX = -2;
let ballSpeedY = -2;

// Game state
let gameOver = false;

// Update game elements
function update() {
  if (!gameOver) {
    // Update paddle position
    paddle.style.left = paddleX + "px";

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Ball collision with container boundaries
    if (ballX <= 0 || ballX >= containerWidth - ballSize) {
      ballSpeedX *= -1; // Reverse X direction
    }

    if (ballY <= 0) {
      ballSpeedY *= -1; // Reverse Y direction
    }

    // Ball collision with paddle
    if (
      ballY + ballSize >= containerHeight - paddleHeight &&
      ballX + ballSize >= paddleX &&
      ballX <= paddleX + paddleWidth
    ) {
      ballSpeedY *= -1; // Reverse Y direction
    }

    // Ball hits the ground (game over condition)
    if (ballY >= containerHeight) {
      gameOver = true;
      alert("Game Over!");
      resetGame();
    }
  }
}

// Handle keyboard input
function handleKeyDown(event) {
  if (!gameOver) {
    if (event.key === "ArrowLeft" && paddleX > 0) {
      paddleX -= paddleSpeed;
    } else if (
      event.key === "ArrowRight" &&
      paddleX < containerWidth - paddleWidth
    ) {
      paddleX += paddleSpeed;
    }
  } else {
    resetGame();
  }
}

// Reset the game
function resetGame() {
  // Reset paddle position
  paddleX = containerWidth / 2 - paddleWidth / 2;

  // Reset ball position and direction
  ballX = containerWidth / 2;
  ballY = containerHeight / 2;
  ballSpeedX = -2;
  ballSpeedY = -2;

  // Reset game state
  gameOver = false;
}

// Game loop
function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener("keydown", handleKeyDown);

// Start the game loop
gameLoop();
