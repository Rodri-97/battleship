const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");
    let allShips = [];

    const placeShip = (ship, axis, firstRow, firstColumn) => {
        allShips.push(ship);
        ship.id = allShips.length - 1;
        ship.axis = axis;
        ship.firstRow = firstRow;
        ship.firstColumn = firstColumn;

        if (axis === "x") {
            const r = firstRow;
            const lastColumn = firstColumn + ship.length - 1;
            for (let c = firstColumn; c <= lastColumn; c++) rows[r][c] = `S${ship.id}`;
        } else if (axis === "y") {
            const c = firstColumn;
            const lastRow = firstRow + ship.length - 1;
            for (let r = firstRow; r <= lastRow; r++) rows[r][c] = `S${ship.id}`;
        };
    };

    /*const receiveAttack = (row, column) => {
        const positionAttacked = rows[row][column];
        const shipId = positionsAttacked.slice(1);
        const ship = allShips[shipId];
        if (positionAttacked[0] === "S") {
            positionAttacked[0] = "X";
            ship.hit();
        };
    };*/

    return { rows, placeShip };
};

module.exports = Gameboard;