const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const lines = new Array(gridSize).fill([]);
    for (let line of lines) line.push("");

    return { lines };
};

module.exports = Gameboard;