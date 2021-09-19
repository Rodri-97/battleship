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
    const column = 9;
    board.placeShip(verticalShip, "y", firstRow, column);
    for (let r = firstRow; r <= lastRow; r++) expect(board.rows[r][9]).toEqual("S1");
});

test("Prevent ships out of grid", () => {
    const outShip1 = Ship(11);
    board.placeShip(outShip1, "x", 0, 0);
    expect(board.rows[0][0]).not.toEqual("S2");

    const outShip2 = Ship(6);
    board.placeShip(outShip2, "y", 8, 3);
    expect(board.rows[8][3]).not.toEqual("S2");

    const validShip = Ship(2);
    board.placeShip(validShip, "x", 0, 0);
    expect(board.rows[0][0]).toEqual("S2");
});

test("Doesn't override existing ships", () => {
    const overShip = Ship(3);
    board.placeShip(overShip, "y", 0, 0);
    expect(board.rows[0][0]).not.toEqual("S3");
});

test("Receive attack", () => {
    board.receiveAttack(0, 0);
    expect(board.rows[0][0]).toEqual("X2");
    const ship2 = board.allShips[2];
    expect(ship2.isSunk()).toBe(false);
    board.receiveAttack(0, 1);
    expect(ship2.isSunk()).toBe(true);
    board.receiveAttack(0, 2);
    const missedShot = board.missedShots[0];
    expect(missedShot.row).toBe(0);
    expect(missedShot.column).toBe(2);
});

// npm run test gameboard.test.js