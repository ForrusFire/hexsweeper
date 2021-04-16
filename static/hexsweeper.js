

export function generateBoard(boardSize, mineCount) {
    const board = []
    
    // Create top section of board
    for (let i = 0; i < boardSize; i++) {
        const row = []

        for (var j = 0; j < i+1; j++) {
            row.push(0);
        }

        board.push(row);
    };

    // Create middle section of board
    for (let i = 0; i < 2*boardSize - 3; i++) {
        const row = []

        let parity = (i+1) % 2;
        for (var j = 0; j < boardSize - parity; j++) {
            row.push(0);
        }

        board.push(row);
    };

    // Create bottom section of board
    for (let i = boardSize-1; i > -1; i--) {
        const row = []

        for (var j = 0; j < i+1; j++) {
            row.push(0);
        }
        
        board.push(row);
    };

    return board;
};