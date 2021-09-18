const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");
    let allShips = [];

    const placeHorizontalShip = (row, startingColumn, ship) => {
        allShips.push(ship);
        ship.id = allShips.length - 1;
        const endingColumn = startingColumn + ship.length;
        for (let i = startingColumn; i < endingColumn; i++) {
            rows[row][i] = `S${ship.id}`;
        };
    };

    // const placeVerticalShip = (startingRow, column, ship) => {};

    const getPositionIndexInShip = () => {

    };

    const receiveAttack = (row, column) => {
        const positionAttacked = rows[row][column];
        const shipId = positionsAttacked.slice(1);
        const ship = allShips[shipId];
        if (positionAttacked[0] === "S") {
            positionAttacked[0] = "X";
            ship.hit();
        };
    };

    return { rows, placeHorizontalShip };
};

module.exports = Gameboard;