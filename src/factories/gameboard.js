const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");
    let allShips = [];

    const placeShip = (ship, axis, startingRow, startingColumn) => {
        allShips.push(ship);
        ship.id = allShips.length - 1;
        ship.axis = axis;
        ship.startingRow = startingRow;
        ship.startingColumn = startingColumn;

        if (axis === "x") {
            const r = startingRow;
            const endingColumn = startingColumn + ship.length;
            for (let c = startingColumn; c < endingColumn; c++) rows[r][c] = `S${ship.id}`;
        } else if (axis === "y") {
            const c = startingColumn;
            const endingRow = startingRow + ship.length;
            for (let r = startingRow; r < endingRow; r++) rows[r][c] = `S${ship.id}`;
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