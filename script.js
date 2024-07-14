const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")
const widthInput = document.getElementById("widthInput")
const heightInput = document.getElementById("heightInput")
const countdownElement = document.getElementById("countdown")
const overlayElement = document.getElementById("overlay")
const startButton = document.getElementById("startButton")
const resetButton = document.getElementById("resetButton")
const errorMessage = document.getElementById("errorMessage")
const successMessage = document.getElementById("successMessage")
const speedDisplay = document.getElementById("speedDisplay")
const baitsEatenDisplay = document.getElementById("baitsEatenDisplay")

const minGridSize = 40
let canvasWidth = 400
let canvasHeight = 400
let gridSize = minGridSize
let snake
let direction
let bait
let gameOver = false
let lastRenderTime = 0
let speed = 1 // Initial moves per second
let speedIncrementInterval = 5000 // Time interval to increase speed in milliseconds
let lastSpeedIncrementTime = 0
let baitsEaten = 0 // Baits eaten counter

// Event listeners for game controls
startButton.addEventListener("click", startGame)
resetButton.addEventListener("click", resetGame)
document.addEventListener("keydown", changeDirection)

function startGame() {
  const width = parseInt(widthInput.value)
  const height = parseInt(heightInput.value)

  if (width <= minGridSize || height <= minGridSize) {
    errorMessage.textContent = `Width and height must be greater than ${minGridSize}.`
    return
  }

  errorMessage.textContent = ""
  successMessage.textContent = ""

  canvasWidth = width
  canvasHeight = height
  gridSize =
    Math.min(canvasWidth, canvasHeight) /
    Math.floor(Math.min(canvasWidth, canvasHeight) / minGridSize)
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  initializeGame()
  startButton.style.display = "none"
  resetButton.style.display = "none"
  startCountdown(3, () => {
    overlayElement.style.display = "none"
    window.requestAnimationFrame(mainLoop)
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

function initializeGame() {
  snake = [
    { x: gridSize * 2, y: 0 },
    { x: gridSize, y: 0 },
    { x: 0, y: 0 },
  ]
  direction = { x: gridSize, y: 0 }
  bait = getRandomBait()
  gameOver = false
  lastRenderTime = 0
  lastSpeedIncrementTime = performance.now()
  speed = 1
  baitsEaten = 0
  speedDisplay.textContent = speed
  baitsEatenDisplay.textContent = baitsEaten
  clearCanvas()
  drawSnake()
  drawBait()
}

function mainLoop(currentTime) {
  if (gameOver) {
    overlayElement.style.display = "flex"
    resetButton.style.display = "block"
    overlayElement.style.display = "flex"
    successMessage.textContent = "You lose!"
    return
  }

  window.requestAnimationFrame(mainLoop)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

  if (secondsSinceLastRender < 1 / speed) return

  lastRenderTime = currentTime

  clearCanvas()
  moveSnake()
  drawSnake()
  drawBait()
  checkGameOver()

  // Increase speed at defined intervals
  if (currentTime - lastSpeedIncrementTime > speedIncrementInterval) {
    speed += 0.5 // Increment speed
    lastSpeedIncrementTime = currentTime
    speedDisplay.textContent = speed.toFixed(1) // Update speed display
  }
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
    baitsEaten++
    baitsEatenDisplay.textContent = baitsEaten // Update baits eaten display

    // Temporarily increase the size of the snake
    snake.forEach((part) => {
      part.size = gridSize * 1.25 // Increase size by 25%
    })
    setTimeout(() => {
      snake.forEach((part) => {
        part.size = gridSize // Reset to original size
      })
    }, 500) // Duration of the size increase effect
  } else {
    snake.pop()
  }
}

function drawSnake() {
  snake.forEach((part, index) => {
    const isHead = index === 0
    const partSize = part.size || gridSize // Use the size property or default to gridSize

    ctx.fillStyle = "green"

    if (isHead) {
      drawSnakeHead(part, partSize)
    } else {
      drawSnakeBody(part)
    }
  })
}

function drawSnakeHead(part, partSize) {
  ctx.beginPath()
  ctx.arc(
    part.x + partSize / 2,
    part.y + partSize / 2,
    partSize / 2,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  // Draw eyes
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(
    part.x + partSize / 3,
    part.y + partSize / 3,
    partSize / 8,
    0,
    Math.PI * 2,
  )
  ctx.arc(
    part.x + (2 * partSize) / 3,
    part.y + partSize / 3,
    partSize / 8,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.arc(
    part.x + partSize / 3,
    part.y + partSize / 3,
    partSize / 16,
    0,
    Math.PI * 2,
  )
  ctx.arc(
    part.x + (2 * partSize) / 3,
    part.y + partSize / 3,
    partSize / 16,
    0,
    Math.PI * 2,
  )
  ctx.fill()

  // Draw mouth
  ctx.fillStyle = "black"
  ctx.beginPath()
  ctx.arc(
    part.x + partSize / 2,
    part.y + (2 * partSize) / 3,
    partSize / 8,
    0,
    Math.PI,
  )
  ctx.fill()
}

function drawSnakeBody(part) {
  ctx.beginPath()
  ctx.arc(
    part.x + gridSize / 2,
    part.y + gridSize / 2,
    gridSize / 2,
    0,
    Math.PI * 2,
  )
  ctx.fill()
}

function drawBait() {
  ctx.fillStyle = "red"
  ctx.fillRect(bait.x, bait.y, gridSize, gridSize)
}

function getRandomBait() {
  let baitX, baitY
  while (true) {
    baitX = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize
    baitY = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize
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
    direction = { x: -gridSize, y: 0 }
  }
  if (keyPressed === 38 && !goingDown) {
    direction = { x: 0, y: -gridSize }
  }
  if (keyPressed === 39 && !goingLeft) {
    direction = { x: gridSize, y: 0 }
  }
  if (keyPressed === 40 && !goingUp) {
    direction = { x: 0, y: gridSize }
  }
}

function checkGameOver() {
  const head = snake[0]
  const hitWall =
    head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight
  const hitSelf = snake
    .slice(1)
    .some((part) => part.x === head.x && part.y === head.y)

  if (hitWall || hitSelf) {
    gameOver = true
  }

  if (snake.length === (canvasWidth / gridSize) * (canvasHeight / gridSize)) {
    successMessage.textContent = "You win!"
    gameOver = true
  }
}

function resetGame() {
  overlayElement.style.display = "flex"
  startGame()
}
