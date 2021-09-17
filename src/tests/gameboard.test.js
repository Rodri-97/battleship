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
    board.placeHorizontalShip(3, 2, horizontalShip);
    expect(board.rows[3]).toEqual(["", "", "S", "S", "S", "S", "", "", "", ""]);
    expect(board.rows[4]).toEqual(["", "", "", "", "", "", "", "", "", ""]);
});

// npm run test gameboard.test.js