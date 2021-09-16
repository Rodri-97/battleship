const Ship = (length) => {
    const positionsHit = new Array(length).fill(false);

    const hit = (number) => {
        positionsHit[number] = true;
    };

    const isSunk = () => {
        for (let position of positionsHit) {
            if (position === false) return false;
        };
        return true;
    };

    return { length, hit, isSunk };
};
module.exports = Ship;