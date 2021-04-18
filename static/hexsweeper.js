// Hexsweeper Script


export function generateBoard(boardSize, mineCount) {
    const board = []
    const mineIndices = getMineIndices(boardSize, mineCount);
    let tileCounter = [0]; // Counts current tile for mineIndices
    
    // Create top section of board
    const numTopRows = Math.ceil(0.5 * boardSize);
    let rowStart = 0;
    createBoardSection(board, boardSize, mineIndices, tileCounter, numTopRows, rowStart, 'top');

    // Create middle section of board
    const numMidRows = (boardSize - 1);
    rowStart = numTopRows;
    createBoardSection(board, boardSize, mineIndices, tileCounter, numMidRows, rowStart, 'mid');

    // Create bottom section of board
    const numBotRows = numTopRows;
    rowStart = numTopRows + numMidRows;
    createBoardSection(board, boardSize, mineIndices, tileCounter, numBotRows, rowStart, 'bot');

    return board;
};


export function markTile(tile) {
    // Mark a tile if it's hidden and unmark a tile if it's marked
    if (tile.status === 'hidden') {
        tile.status = 'marked';
    } else if (tile.status === 'marked') {
        tile.status = 'hidden';
    };
}


export function revealTile(board, tile) {
    // Make sure that we're clicking on a hidden tile
    if (tile.status !== 'hidden') {return};

    // If the tile is a mine, reveal it as a mine
    if (tile.mine) {
        tile.status = 'mine';
        return
    };

    // Otherwise, determine the number on the tile and reveal the tile
    tile.status = 'revealed';
    const neighborTiles = getNeighborTiles(board, tile);
    const neighborMines = neighborTiles.filter(tile => tile?.mine); // Filter mines
    
    if (neighborMines.length === 0) {
        // If there are no neighboring mines, reveal the neighboring tiles
        neighborTiles.forEach(neighborTile => {
            revealTile(board, neighborTile)
        });
    } else {
        // Display the number of adjacent mines
        const textContent = document.createElement('div');
        textContent.classList.add('text-content');
        textContent.append(neighborMines.length);

        tile.hex.appendChild(textContent);
    };
};


function getNeighborTiles(board, tile) {
    // Get all tiles that neighbor the input tile
    const tiles = []

    // Append left and right tiles
    appendNeighborTile(board, tile, tiles, -1, 0);
    appendNeighborTile(board, tile, tiles, 1, 0);
    
    // Append top and bottom tiles
    if (tile.x % 2 == 1) {
        // Append bottom tile
        appendNeighborTile(board, tile, tiles, 0, 1);

        // Append top tiles
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            appendNeighborTile(board, tile, tiles, xOffset, -1);
        };
    } else {
        // Append top tile
        appendNeighborTile(board, tile, tiles, 0, -1);

        // Append bottom tiles
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            appendNeighborTile(board, tile, tiles, xOffset, 1);
        };
    };
  
    return tiles
};


function appendNeighborTile(board, tile, tiles, xOffset, yOffset) {
    // Append the neighbor tile if it exists
    const neighborTile = board[tile.y + yOffset]?.[tile.x + xOffset];
    if (neighborTile) {tiles.push(neighborTile)};
};


function createBoardSection(board, boardSize, mineIndices, tileCounter, numRows, rowStart, section) {
    // Creates the relevant section of the board
    for (let i = 0; i < numRows; i++) {
        const row = []

        // Create empty hexes to fill the left side of the board
        const numEmptyHexes = getNumEmptyHexes(boardSize, i, section);
        for (let j = 0; j < numEmptyHexes; j++) {
            // Create empty hex and tile
            const hex = createHex(j, 'empty');
            const tile = createEmptyTile(hex, i, j, rowStart);

            row.push(tile);
        };

        // Create playable hexes
        const numPlayableHexes = getNumPlayableHexes(boardSize, numRows, i, section);
        for (let j = numEmptyHexes; j < (numEmptyHexes + numPlayableHexes); j++) {
            // Create hex and tile
            const hex = createHex(j);
            const tile = createTile(hex, i, j, rowStart, mineIndices, tileCounter);

            tileCounter[0]++;
            row.push(tile);
        };

        board.push(row);
    };
};


function getMineIndices(boardSize, mineCount) {
    const mineIndices = [];
    const numberOfTiles = getNumberofTiles(boardSize);

    while (mineIndices.length < mineCount) {
        const mineIndex = randInt(numberOfTiles);

        // If mineIndex is not already in the set, add it to the set
        if (!mineIndices.includes(mineIndex)) {
            mineIndices.push(mineIndex);
        };
    }

    return mineIndices
};


function getNumberofTiles(boardSize) {
    // Returns the number of playable tiles on the board
    return (3*boardSize - 1) * (boardSize) - (2*boardSize - 1);
};


function randInt(range) {
    // Returns a random integer from 0 to (range - 1)
    return Math.floor(Math.random() * range);
};


function createEmptyTile(hex, i, j, rowStart) {
    // Creates and returns an empty tile
    const tile = {
        hex,
        x: j,
        y: i + rowStart,
    };

    return tile
};


function createTile(hex, i, j, rowStart, mineIndices, tileCounter) {
    // Creates and returns a tile
    const tile = {
        hex,
        x: j,
        y: i + rowStart,
        mine: mineIndices.includes(tileCounter[0]),
        get status() {
            return this.hex.dataset.status;
        },
        set status(value) {
            this.hex.dataset.status = value;
        },
    };

    return tile
};


function getNumEmptyHexes(boardSize, i, section) {
    if (section === 'top') {
        return (boardSize - 2 * (i+1));
    } else if (section === 'mid') {
        return 0;
    };

    return (2*i + 1);
};


function getNumPlayableHexes(boardSize, numRows, i, section) {
    if (section === 'top') {
        return (3 + 4*i);
    } else if (section === 'mid') {
        return (2*numRows + 1);
    }
    
    return (2*boardSize - 4*i - 3);
};


function createHex(rowPos, emptyHex=null) {
    // Create hex element and set status to hidden
    const hex = document.createElement('div');
    hex.dataset.status = 'hidden';

    // Add hex classes
    if (emptyHex) {
        hex.classList.add('empty-hex');
    } else {
        hex.classList.add('hex');
    };

    // Set even hexes
    if (rowPos % 2 == 0) {hex.classList.add('even')}; 

    // Append sub hexes
    appendSubHex(hex, 'left');
    appendSubHex(hex, 'middle');
    appendSubHex(hex, 'right');

    return hex
};


function appendSubHex(hex, subHexClass) {
    // Creates a sub hex with the sub hex class and appends it to the hex
    const subHex = document.createElement('div');
    subHex.classList.add(subHexClass);
    hex.appendChild(subHex);
};