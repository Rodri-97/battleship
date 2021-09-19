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
    const firstColumn = 2;
    const lastColumn = firstColumn + horizontalShip.length - 1;
    board.placeShip(horizontalShip, "x", row, firstColumn);
    for (let c = firstColumn; c <= lastColumn; c++) expect(board.rows[3][c]).toEqual("S0");
});

test("Place vertical ship", () => {
    const verticalShip = Ship(5);
    const firstRow = 4;
    const lastRow = firstRow + verticalShip.length - 1;
    const column = 7;
    board.placeShip(verticalShip, "y", firstRow, column);
    for (let r = firstRow; r <= lastRow; r++) expect(board.rows[r][7]).toEqual("S1");
});

// npm run test gameboard.test.js