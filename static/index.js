import {generateBoard} from './hexsweeper.js';

const BOARD_SIZE = 6;
const MINE_COUNT = 0;


const board = generateBoard(BOARD_SIZE, MINE_COUNT);
console.log(board);
const boardElem = $('.board');


// Mount board onto HTML element
board.forEach(row => {
    // Create hex row
    const rowElem = document.createElement('div');
    rowElem.classList.add('hex-row');

    // Add hexes onto hex rows
    row.forEach(tile => {
        rowElem.append(tile.hex);
    });

    // Append the hex row to the board element
    boardElem.append(rowElem);
});


// 1. Populate a board with tiles/mines
// 2. Left click on tiles
    // reveal tiles
// 3. Right click on tiles
    // mark tiles
// 4. Check for win/loss