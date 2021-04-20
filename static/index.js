import {generateBoard, revealTile, markTile, checkWin, checkLose, getNumberofTiles} from './hexsweeper.js';
import {setSettings} from './settings.js';
import {renderTimer, startTimer, stopTimer} from "./timer.js"

// Global constants
const BOARD_SIZE = (sessionStorage.getItem('board')) ? sessionStorage.getItem('board') : 6;
const MINE_TILE_PERCENTAGE = 0.22; // About 15% to 25% is standard
const MINE_COUNT = getMineCount();


// Set settings
setSettings();


// Board
const board = generateBoard(BOARD_SIZE, MINE_COUNT);
const boardElem = document.querySelector('.board');

boardElem.style.width = getBoardDim('width'); // Set board width
boardElem.style.height = getBoardDim('height'); // Set board height

// Win-Loss message text element
const messageText = $('.message-text');

// Timer
const timer = [0];
const timerElem = document.querySelector('.timer');
renderTimer(timer, timerElem);

let timerID; // ID returned by setInterval and closed by clearInterval
const delta = 10; // Time between intervals


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
            // If there is no timerID yet, start the timer
            timerID = (timerID === undefined) ? startTimer(timer, timerElem, delta) : timerID;

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
    if (win) {
        stopTimer(timerID);
        stopBoardClicks(boardElem);
        messageText.text("You Win!");
    };

    const lose = checkLose(board);
    if (lose) {
        stopTimer(timerID);
        stopBoardClicks(boardElem);
        messageText.text("You Lose!");

        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === 'marked') {markTile(tile)}; // Unmark all tiles
                if (tile.mine) {revealTile(board, tile)}; // Reveal all mines
            });
        });
    };
};


function stopBoardClicks(boardElem) {
    // The 'capture:true' makes sure the stopProp goes off before any other events
    boardElem.addEventListener("click", stopProp, {capture: true});
    boardElem.addEventListener("contextmenu", stopProp, {capture: true});
};


function stopProp(event) {
    // Stops all other events on the call
    event.stopImmediatePropagation()
};


function getMineCount() {
    return Math.floor(MINE_TILE_PERCENTAGE * getNumberofTiles(BOARD_SIZE));
};


function getBoardDim(dim) {
    // Gets the board dimension in pixels and returns a string to input as CSS style
    if (dim === 'width') {return (180 + 94*(2*BOARD_SIZE - 2)) + 'px'};
    if (dim === 'height') {return (100 + 110*(2*BOARD_SIZE - 1)) + 'px'};
};