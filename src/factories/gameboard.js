const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const lines = new Array(gridSize).fill([]);
    for (let i = 0; i < lines.length; i++) lines[i].push("");

    return { lines };
};

module.exports = Gameboard;