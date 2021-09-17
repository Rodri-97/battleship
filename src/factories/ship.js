const Ship = (length) => {
    const positionsHit = new Array(length).fill(false);

    const hit = (number) => {
        positionsHit[number] = true;
    };

    const isSunk = () => {
        for (let i = 0; i < positionsHit.length; i++) {
            if (positionsHit[i] === false) return false;
        };
        return true;
    };

    return { length, hit, isSunk };
};

module.exports = Ship;