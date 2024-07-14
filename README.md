# Snake Game

This is a simple implementation of the classic Snake game using HTML5 Canvas, JavaScript, and CSS.

## Features

- Adjustable game board width and height.
- Countdown overlay before the game starts.
- Snake starts at the position (0,0) and moves to the right initially.
- Responsive controls using the arrow keys.
- Game over conditions include hitting the wall or the snake hitting itself.
- Winning condition if the snake fills the entire board.

## How to Play

1. Open `index.html` in a web browser.
2. Adjust the width and height of the game board if desired.
3. Click the "Start Game" button.
4. A countdown will appear in the center of the canvas. The game will start after the countdown.
5. Use the arrow keys to control the snake:
   - Left Arrow: Move left
   - Right Arrow: Move right
   - Up Arrow: Move up
   - Down Arrow: Move down
6. The game ends if the snake hits the wall or itself. You win if the snake fills the entire board.

## Project Structure

.
├── index.html
├── styles.css
└── script.js

- `index.html`: The main HTML file that contains the structure of the game.
- `styles.css`: The CSS file that styles the game elements.
- `script.js`: The JavaScript file that contains the game logic.

## Customization

- You can adjust the initial size of the canvas by changing the default values in the `widthInput` and `heightInput` elements in `index.html`.
- The speed of the game can be modified by changing the interval time in the `setInterval` function inside `script.js`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Inspired by the classic Snake game.
- Developed using HTML5, CSS3, and JavaScript.

Enjoy the game!
