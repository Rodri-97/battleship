const Ship = (length) => {
    const positions = new Array(length);
    for (let i = 0; i < positions.length; i++) positions[i] = "S";
    
    const hit = (number) => {
        positions[number] = "X";
    };

    const isSunk = () => {
        for (let i = 0; i < positions.length; i++) {
            if (positions[i] === "S") return false;
        };
        return true;
    };

    return { positions, length, hit, isSunk };
};

module.exports = Ship;