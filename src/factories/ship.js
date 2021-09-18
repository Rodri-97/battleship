const Ship = (length) => {
    let id; // Defined in gameboard.js
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

    return { id, length, hit, isSunk };
};

module.exports = Ship;