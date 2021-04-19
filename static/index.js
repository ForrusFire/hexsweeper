import {generateBoard, revealTile, markTile, checkWin, checkLose, getNumberofTiles} from './hexsweeper.js';

// Global constants
const BOARD_SIZE = 6;
const MINE_COUNT = Math.floor(0.2 * getNumberofTiles(BOARD_SIZE));


// Board
const board = generateBoard(BOARD_SIZE, MINE_COUNT);
const boardElem = document.querySelector('.board');

const boardWidth = 180 + 94*(2*BOARD_SIZE - 2);
boardElem.style.width = (boardWidth + "px"); // Set board width
const boardHeight = 100 + 110*(2*BOARD_SIZE - 1);
boardElem.style.height = (boardHeight + "px"); // Set board height

// Win-Loss message text element
const messageText = $('.message-text');


// Mount board onto HTML element
board.forEach(row => {
    // Create hex row
    const rowElem = document.createElement('div');
    rowElem.classList.add('hex-row');

    // Add hexes onto hex rows
    row.forEach(tile => {
        rowElem.append(tile.hex);
        // Left click
        tile.hex.addEventListener("click", function() {
            revealTile(board, tile)
            checkGameEnd()
        });
        // Right click
        tile.hex.addEventListener("contextmenu", function(event) {
            event.preventDefault() // Prevent default right click menu
            markTile(tile)
        });
    });

    // Append the hex row to the board element
    boardElem.append(rowElem);
});


function checkGameEnd() {
    const win = checkWin(board, BOARD_SIZE, MINE_COUNT);
    const lose = checkLose(board);

    if (win || lose) {
        // The 'capture:true' makes sure the stopProp goes off before any other events
        boardElem.addEventListener("click", stopProp, {capture: true});
        boardElem.addEventListener("contextmenu", stopProp, {capture: true});
    };
    
    if (win) {
        messageText.text("You Win!");
    };

    if (lose) {
        messageText.text("You Lose!");
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === 'marked') {markTile(tile)}; // Unmark all tiles
                if (tile.mine) {revealTile(board, tile)}; // Reveal all mines
            });
        });
    };
};


function stopProp(event) {
    // Stops all other events on the call
    event.stopImmediatePropagation()
};