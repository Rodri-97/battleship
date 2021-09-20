const Ship = (length) => {
    if (length < 2 || length > 5) return;
    let id;
    let axis;
    let firstRow;
    let firstColumn;

    const positionsHit = new Array(length);
    for (let i = 0; i < positionsHit.length; i++) positionsHit[i] = false;
    
    const hit = (number) => {
        positionsHit[number] = true;
    };

    const isSunk = () => {
        for (let i = 0; i < positionsHit.length; i++) {
            if (positionsHit[i] === false) return false;
        };
        return true;
    };

    return { id, axis, firstRow, firstColumn, length, hit, isSunk };
};

module.exports = Ship;

// node src/factories/ship.js