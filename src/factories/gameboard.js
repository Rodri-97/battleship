const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");

    const placeHorizontalShip = (row, startingColumn, ship) => {
        const endingColumn = startingColumn + ship.length;
        for (let i = startingColumn; i < endingColumn; i++) rows[row][i] = "S";
    };

    return { rows, placeHorizontalShip };
};

module.exports = Gameboard;