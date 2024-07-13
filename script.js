const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const gridSize = 20
const canvasSize = 400
let snake = [
  { x: 0, y: 0 },
  { x: gridSize, y: 0 },
  { x: gridSize * 2, y: 0 },
]
let direction = { x: gridSize, y: 0 }
let bait = getRandomBait()
let gameOver = false
let gameInterval
const countdownElement = document.getElementById("countdown")

document.getElementById("startButton").addEventListener("click", startGame)
document.addEventListener("keydown", changeDirection)

function startGame() {
  if (gameInterval) {
    clearInterval(gameInterval)
  }
  resetGame()
  startCountdown(5, () => {
    gameInterval = setInterval(gameLoop, 1000)
  })
}

function startCountdown(seconds, callback) {
  let counter = seconds
  countdownElement.textContent = counter

  const countdownInterval = setInterval(() => {
    counter--
    countdownElement.textContent = counter

    if (counter <= 0) {
      clearInterval(countdownInterval)
      countdownElement.textContent = ""
      callback()
    }
  }, 1000)
}

function resetGame() {
  snake = [
    { x: 0, y: 0 },
    { x: gridSize, y: 0 },
    { x: gridSize * 2, y: 0 },
  ]
  direction = { x: gridSize, y: 0 }
  bait = getRandomBait()
  gameOver = false
  clearCanvas()
  drawSnake()
  drawBait()
}

function gameLoop() {
  if (gameOver) {
    clearInterval(gameInterval)
    alert("You lose")
    return
  }

  clearCanvas()
  moveSnake()
  drawSnake()
  drawBait()
  checkGameOver()
}

function clearCanvas() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y }
  snake.unshift(head)

  if (head.x === bait.x && head.y === bait.y) {
    bait = getRandomBait()
  } else {
    snake.pop()
  }
}

function drawSnake() {
  ctx.fillStyle = "green"
  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, gridSize, gridSize)
  })
}

function drawBait() {
  ctx.fillStyle = "red"
  ctx.fillRect(bait.x, bait.y, gridSize, gridSize)
}

function getRandomBait() {
  let baitX, baitY
  while (true) {
    baitX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    baitY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    if (!snake.some((part) => part.x === baitX && part.y === baitY)) {
      break
    }
  }
  return { x: baitX, y: baitY }
}

function changeDirection(event) {
  const keyPressed = event.keyCode
  const goingUp = direction.y === -gridSize
  const goingDown = direction.y === gridSize
  const goingRight = direction.x === gridSize
  const goingLeft = direction.x === -gridSize

  if (keyPressed === 37 && !goingRight) {
    // left arrow
    direction = { x: -gridSize, y: 0 }
  }
  if (keyPressed === 38 && !goingDown) {
    // up arrow
    direction = { x: 0, y: -gridSize }
  }
  if (keyPressed === 39 && !goingLeft) {
    // right arrow
    direction = { x: gridSize, y: 0 }
  }
  if (keyPressed === 40 && !goingUp) {
    // down arrow
    direction = { x: 0, y: gridSize }
  }
}

function checkGameOver() {
  const head = snake[0]
  const hitWall =
    head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize
  const hitSelf = snake
    .slice(1)
    .some((part) => part.x === head.x && part.y === head.y)

  if (hitWall || hitSelf) {
    gameOver = true
  }

  if (snake.length === (canvasSize / gridSize) ** 2) {
    clearInterval(gameInterval)
    alert("You win")
    gameOver = true
  }
}
