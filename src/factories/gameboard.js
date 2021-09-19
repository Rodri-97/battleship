const Ship = require("./ship.js");

const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");
    let allShips = [];

    const isOutOfGrid = (ship) => {
        if (ship.length > gridSize) return true;
        if (ship.axis === "x") {
            const lastColumn = ship.firstColumn + ship.length - 1;
            if (lastColumn >= gridSize) return true;
        } else if (ship.axis === "y") {
            const lastRow = ship.firstRow + ship.length - 1;
            if (lastRow >= gridSize) return true;
        };
        return false;
    };

    const overridesExistingShip = (ship) => {
        if (ship.axis === "x") {
            const r = ship.firstRow;
            const lastColumn = ship.firstColumn + ship.length - 1;
            for (let c = ship.firstColumn; c <= lastColumn; c++) if (rows[r][c] != "") return true;
        } else if (ship.axis === "y") {
            const lastRow = ship.firstRow + ship.length - 1;
            const c = ship.firstColumn;
            for (let r = ship.firstRow; r <= lastRow; r++) if (rows[r][c] != "") return true;
        };
        return false;
    };

    const placeShip = (ship, axis, firstRow, firstColumn) => {
        ship.axis = axis;
        ship.firstRow = firstRow;
        ship.firstColumn = firstColumn;
        if (isOutOfGrid(ship) || overridesExistingShip(ship)) return;
        allShips.push(ship);
        ship.id = allShips.length - 1;

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

    const getPositionInShip = (row, column, ship) => {
        const firstRow = ship.firstRow;
        const firstColumn = ship.firstColumn;
        let counter = 0;

        if (ship.axis === "x") {
            const lastColumn = firstColumn + ship.length - 1;
            for (let c = firstColumn; c <= lastColumn; c++) {
                if (c === column) return counter;
                counter++;
            };
        } else if (ship.axis === "y") {
            const lastRow = firstRow + ship.length - 1;
            for (let r = firstRow; r <= lastRow; r++) {
                if (r === row) return counter;
                counter++;
            };
        };
    };

    const receiveAttack = (row, column) => {
        const positionAttacked = rows[row][column];
        
        if (positionAttacked[0] === "S") {
            const shipId = positionAttacked.slice(1);
            const ship = allShips[shipId];
            rows[row][column] = `X${shipId}`;
            const positionInShip = getPositionInShip(row, column, ship);
            ship.hit(positionInShip);
        } /*else if(positionAttacked[0] !== "S") {

        }*/;
    };

    return { rows, allShips, placeShip, receiveAttack };
};

module.exports = Gameboard;

/*const gridSize = 5;
const board = Gameboard(gridSize);
const printBoard = () => {
    console.log(board.rows);
    console.log("");
};

const firstShip = Ship(4);
board.placeShip(firstShip, "x", 3, 2);

const secondShip = Ship(9);
board.placeShip(secondShip, "y", 1, 8);

const thirdShip = Ship(2);
board.placeShip(thirdShip, "x", 0, 0);

printBoard();*/

// node gameboard.js