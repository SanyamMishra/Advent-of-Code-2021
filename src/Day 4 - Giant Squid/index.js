const inputFromFile = require('../../inputFromFile');

const rowsAndColsToCheckForWin = [
    // rows
    [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
    [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]],
    [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
    [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],

    // cols
    [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
    [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
    [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
    [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3]],
    [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
];

// Get board markers maps array
function getBoardMarkersMaps(boards) {
    const boardMarkersMaps = [];

    // Create all board markers maps as emplty object
    for (let i = 0; i < boards.length; i++) {
        boardMarkersMaps[i] = {};
    }

    // Initialize all board markers maps with key as
    // board numbers and value as false marker
    for (let i = 0; i < boards.length; i++) {
        boards[i].forEach(row => {
            row.forEach(element => {
                boardMarkersMaps[i][element] = false;
            });
        });
    }

    return boardMarkersMaps;
}

// Mark the number drawn for all the boards
function markNumberDrawnOnAllBoards(boardMarkersMaps, numberDrawn) {
    boardMarkersMaps.forEach(boardMarkersMap => {
        boardMarkersMap[numberDrawn] = true;
    });
}

// Check if the board has a winning streak
function checkWin(board, boardMarkersMap) {
    for (let k = 0; k < rowsAndColsToCheckForWin.length; k++) {
        let streakFound = true;

        for (let l = 0; l < rowsAndColsToCheckForWin[k].length; l++) {
            if (!boardMarkersMap[board[rowsAndColsToCheckForWin[k][l][0]][rowsAndColsToCheckForWin[k][l][1]]]) {
                streakFound = false;
                break;
            }
        }

        if (streakFound) {
            return true;
        }
    }

    return false;
}

// Calculate score of the board
function calculateScore(boardMarkersMap, numberDrawn) {
    let sum = 0;
    for (let [key, value] of Object.entries(boardMarkersMap)) {
        sum += !value ? +key : 0;
    }

    return sum * numberDrawn;
}

function part1(numbersToDraw, boards) {
    const boardMarkersMaps = getBoardMarkersMaps(boards);

    // Draw numbers
    for (let i = 0; i < numbersToDraw.length; i++) {
        const numberDrawn = numbersToDraw[i];
        markNumberDrawnOnAllBoards(boardMarkersMaps, numberDrawn);

        // No need to check for win if less than 5 numbers drawn
        if (i < 4) continue;

        // Check for win for all the boards
        for (let j = 0; j < boards.length; j++) {
            const board = boards[j];
            const boardMarkersMap = boardMarkersMaps[j];

            if (checkWin(board, boardMarkersMap)) {
                return calculateScore(boardMarkersMap, numberDrawn);
            }
        }
    }
}

function part2(numbersToDraw, boards) {
    const boardMarkersMaps = getBoardMarkersMaps(boards);
    const boardsWonIndicesSet = new Set();

    // Draw numbers
    for (let i = 0; i < numbersToDraw.length; i++) {
        const numberDrawn = numbersToDraw[i];

        markNumberDrawnOnAllBoards(boardMarkersMaps, numberDrawn);

        // No need to check for win if less than 5 numbers drawn
        if (i < 4) continue;

        // Check for win for all the boards
        for (let j = 0; j < boards.length; j++) {
            if (boardsWonIndicesSet.has(j)) continue;

            const board = boards[j];
            const boardMarkersMap = boardMarkersMaps[j];

            if (checkWin(board, boardMarkersMap)) {
                boardsWonIndicesSet.add(j);

                if (boardsWonIndicesSet.size === boards.length) {
                    return calculateScore(boardMarkersMap, numberDrawn);
                }
            }
        }
    }
}

module.exports = {
    partOne: async (inputType = 'sample') => {
        const {
            numberToDraw,
            boards
        } = await inputFromFile.readDay4Input(inputType);
        return part1(numberToDraw, boards);
    },
    partTwo: async (inputType = 'sample') => {
        const {
            numberToDraw,
            boards
        } = await inputFromFile.readDay4Input(inputType);
        return part2(numberToDraw, boards);
    }
};