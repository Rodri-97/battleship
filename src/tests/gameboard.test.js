const Gameboard = require("../factories/gameboard.js");
const Ship = require("../factories/ship.js");
const { arraysEqual } = require("../helpers.js");

test("Grid correclty initialized", () => {
    const board = Gameboard(10);
    const allRowsInitialized = () => {
        const emptyStringsArray = new Array(10).fill("");
        for (let i = 0; i < board.rows.length; i++) {
            const row = board.rows[i];
            if (!(arraysEqual(row, emptyStringsArray))) return false;
        };
        return true;
    };
    expect(allRowsInitialized()).toBe(true);
});

test("Place horizontal ship", () => {
    const board = Gameboard(10);
    const horizontalShip = Ship(4);
    const row = 3;
    const firstColumn = 2;
    const lastColumn = firstColumn + horizontalShip.length - 1;
    board.placeShip(horizontalShip, "x", row, firstColumn);
    for (let c = firstColumn; c <= lastColumn; c++) expect(board.rows[3][c]).toEqual("S0");
});

test("Place vertical ship", () => {
    const board = Gameboard(10);
    const verticalShip = Ship(5);
    const firstRow = 4;
    const lastRow = firstRow + verticalShip.length - 1;
    const column = 9;
    board.placeShip(verticalShip, "y", firstRow, column);
    for (let r = firstRow; r <= lastRow; r++) expect(board.rows[r][9]).toEqual("S0");
});


test("Prevent ships out of grid", () => {
    const board = Gameboard(10);

    const outShip = Ship(5);
    board.placeShip(outShip, "y", 8, 8);
    expect(board.rows[8][8]).not.toEqual("S0");

    const validShip = Ship(2);
    board.placeShip(validShip, "x", 0, 0);
    expect(board.rows[0][0]).toEqual("S0");
});


test("Doesn't override existing ships", () => {
    const board = Gameboard(10);
    const ship = Ship(4);
    board.placeShip(ship, "y", 0, 7);
    const overShip = Ship(3);
    board.placeShip(overShip, "x", 2, 7);
    expect(board.rows[2][7]).toEqual("S0");
});


test("Receive attack", () => {
    const board = Gameboard(10);
    const ship0 = Ship(2);
    board.placeShip(ship0, "x", 0, 0);
    board.receiveAttack(0, 0);
    expect(board.rows[0][0]).toEqual("X0");
    expect(ship0.isSunk()).toBe(false);
    board.receiveAttack(0, 1);
    expect(ship0.isSunk()).toBe(true);
    board.receiveAttack(0, 2);
    const missedShot = board.missedShots[0];
    expect(missedShot.row).toBe(0);
    expect(missedShot.column).toBe(2);
});

test("Report if all ships have been sunk", () => {
    const board = Gameboard(10);
    const ship0 = Ship(2);
    const ship1 = Ship(2);
    board.placeShip(ship0, "x", 4, 4);
    board.placeShip(ship1, "y", 8, 7);
    board.receiveAttack(4, 4);
    board.receiveAttack(4, 5);
    expect(ship0.isSunk()).toBe(true);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(8, 7);
    board.receiveAttack(9, 7);
    expect(ship1.isSunk()).toBe(true);
    expect(board.allShipsSunk()).toBe(true);
});

// npm run test gameboard.test.js