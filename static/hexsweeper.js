// Hexsweeper Script


export function generateBoard(boardSize, mineCount) {
    const board = []
    
    // Create top section of board
    const numTopRows = Math.ceil(0.5 * boardSize);
    for (let i = 0; i < numTopRows; i++) {
        const row = []

        // Create empty hexes to fill the left side of the board
        const numEmptyHexes = (boardSize - 2 * (i+1));
        for (let j = 0; j < numEmptyHexes; j++) {
            // Create empty hex and tile
            const hex = createHex(j, 'empty');
            const tile = {
                hex,
                x: j,
                y: i,
            };

            row.push(tile);
        };

        // Create playable hexes
        const numPlayableHexes = (3 + 4*i);
        for (let j = numEmptyHexes; j < (numEmptyHexes + numPlayableHexes); j++) {
            // Create hex and tile
            const hex = createHex(j);
            const tile = {
                hex,
                x: j,
                y: i,
                get status() {
                    return this.hex.dataset.status;
                },
                set status(value) {
                    this.hex.dataset.status = value;
                },
            };

            row.push(tile);
        };

        board.push(row);
    };

    // Create middle section of board
    const numMidRows = (boardSize - 1);
    for (let i = 0; i < numMidRows; i++) {
        const row = []

        // Create playable hexes
        for (let j = 0; j < (2*numMidRows + 1); j++) {
            // Create hex and tile
            const hex = createHex(j);
            const tile = {
                hex,
                x: j,
                y: i + numTopRows,
                get status() {
                    return this.hex.dataset.status;
                },
                set status(value) {
                    this.hex.dataset.status = value;
                },
            };

            row.push(tile);
        };

        board.push(row);
    };

    // Create bottom section of board
    const numBotRows = numTopRows;
    for (let i = 0; i < numBotRows; i++) {
        const row = []

        // Create empty hexes to fill the left side of the board
        const numEmptyHexes = (2*i + 1);
        for (let j = 0; j < numEmptyHexes; j++) {
            // Create empty hex and tile
            const hex = createHex(j, 'empty');
            const tile = {
                hex,
                x: j,
                y: i + numTopRows + numMidRows,
            };

            row.push(tile);
        };

        // Create playable hexes
        const numPlayableHexes = (2*boardSize - 4*i - 3);
        for (let j = numEmptyHexes; j < numEmptyHexes + numPlayableHexes; j++) {
            // Create hex and tile
            const hex = createHex(j);
            const tile = {
                hex,
                x: j,
                y: i + numTopRows + numMidRows,
                get status() {
                    return this.hex.dataset.status;
                },
                set status(value) {
                    this.hex.dataset.status = value;
                },
            };

            row.push(tile);
        };
        
        board.push(row);
    };

    return board;
};



function createHex(rowPos, emptyHex=null) {
    // Create hex element and set it to hidden
    const hex = document.createElement('div');
    hex.dataset.status = 'hidden';

    // Add hex classes
    if (emptyHex) {
        hex.classList.add('empty-hex');
    } else {
        hex.classList.add('hex');
    };
    
    if (rowPos % 2 == 0) {hex.classList.add('even')}; // Set even hexes

    // Create hex left
    const hexLeft = document.createElement('div');
    hexLeft.classList.add('left');
    hex.appendChild(hexLeft);

    // Create hex middle
    const hexMiddle = document.createElement('div');
    hexMiddle.classList.add('middle');
    hex.appendChild(hexMiddle);

    // Create hex right
    const hexRight = document.createElement('div');
    hexRight.classList.add('right')
    hex.appendChild(hexRight);

    return hex
};