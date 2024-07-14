# Snake Game

This is a simple implementation of the classic Snake Game using HTML, CSS, and JavaScript.

## Features

- Adjustable game area width and height
- Speed increases over time
- Score tracking for baits eaten
- Countdown before the game starts
- Reset game functionality

## How to Use

### Running the Game

1. Open `index.html` in your web browser.
2. Adjust the width and height of the game area using the input fields under "Settings".
3. Click "Start Game" to begin playing.
4. Use the arrow keys on your keyboard to control the snake:
   - **Left Arrow (←)**: Move left
   - **Up Arrow (↑)**: Move up
   - **Right Arrow (→)**: Move right
   - **Down Arrow (↓)**: Move down
5. The game will end if the snake hits the wall or itself.
6. Click "Reset Game" to restart the game.

### Files

- `index.html`: The main HTML file containing the game structure.
- `styles.css`: The CSS file for styling the game.
- `script.js`: The JavaScript file for game logic.

### Adjusting Game Settings

- **Width and Height**: Change the dimensions of the game area using the input fields before starting the game.
- **Speed Increase**: The snake's speed will automatically increase every 5 seconds.

### Game Elements

- **Game Area**: The canvas where the game is played.
- **Settings Panel**: Input fields to set the width and height of the game area.
- **Start Button**: Begins the game.
- **Reset Button**: Resets the game to its initial state.
- **Speed Display**: Shows the current speed of the snake.
- **Baits Eaten Display**: Shows the number of baits eaten by the snake.
- **Countdown**: Displays a countdown before the game starts.
- **Overlay**: Displays messages such as game over and the reset button.

## License

This project is licensed under the MIT License.
