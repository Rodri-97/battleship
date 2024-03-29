export const Gameboard = (gridSize) => {
    const rows = new Array(gridSize);
    for (let i = 0; i < rows.length; i++) rows[i] = new Array(gridSize).fill("");
    let allShips = [];
    let missedShots = [];

    const missedShot = (row, column) => {
        return { row, column };
    };

    const isOutOfGrid = (ship) => {
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
        if (isOutOfGrid(ship) || overridesExistingShip(ship)) return "Invalid position";
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
        } else {
            const shot = missedShot(row, column);
            missedShots.push(shot);
        };
    };

    const allShipsSunk = () => {
        for (let i = 0; i < allShips.length; i++) {
            const ship = allShips[i];
            if (ship.isSunk() === false) return false;
        };
        return true;
    };

    return { rows, allShips, missedShots, placeShip, receiveAttack, allShipsSunk };
};

//module.exports = Gameboard;