const Gameboard = require("../factories/gameboard.js");
const Ship = require("../factories/ship.js");
const arraysEqual = require("../helpers.js");

const gridSize = 10;
const board = Gameboard(gridSize);

test("Grid correclty initialized", () => {
    const allRowsInitialized = () => {
        const emptyStringsArray = new Array(gridSize).fill("");
        for (let i = 0; i < board.rows.length; i++) {
            const row = board.rows[i];
            if (!(arraysEqual(row, emptyStringsArray))) return false;
        };
        return true;
    };
    expect(allRowsInitialized()).toBe(true);
});

test("Place horizontal ship", () => {
    const horizontalShip = Ship(4);
    const row = 3;
    const startingColumn = 2;
    board.placeShip(horizontalShip, "x", row, startingColumn);
    for (let c = 2; c < 6; c++) expect(board.rows[3][c]).toEqual("S0");
});

test("Place vertical ship", () => {
    const verticalShip = Ship(5);
    const startingRow = 4;
    const column = 7;
    board.placeShip(verticalShip, "y", startingRow, column);
    for (let r = 4; r < 9; r++) expect(board.rows[r][7]).toEqual("S1");
});

// npm run test gameboard.test.js