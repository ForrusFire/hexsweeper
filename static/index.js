import {generateBoard, revealTile, markTile} from './hexsweeper.js';

const BOARD_SIZE = 6;
const MINE_COUNT = 18;


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
        // Left click
        tile.hex.addEventListener("click", function() {
            revealTile(board, tile)
            // TODO
            // checkGameEnd()
        });
        // Right click
        tile.hex.addEventListener("contextmenu", function(event) {
            event.preventDefault() // Prevent default right click menu
            markTile(tile)
            // TODO
            // listMinesLeft()
        });
    });

    // Append the hex row to the board element
    boardElem.append(rowElem);
});


// 3. Left click on tiles
    // reveal tiles
// 4. Check for win/loss