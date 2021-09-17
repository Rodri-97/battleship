const Gameboard = require("../factories/gameboard.js");
const arraysEqual = require("../helpers.js");

const gridSize = 10;
const board = Gameboard(gridSize);

test("Grid correclty initialized", () => {
    const allLinesInitialized = () => {
        const emptyStringsArray = new Array(gridSize).fill("");
        for (let i = 0; i < board.lines.length; i++) {
            const line = board.lines[i];
            if (!(arraysEqual(line, emptyStringsArray))) return false;
        };
        return true;
    };
    expect(allLinesInitialized()).toBe(true);
});

// npm run test gameboard.test.js