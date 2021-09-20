const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    };
    return true;
};

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const randomAxis = () => {
    const axes = ["x", "y"];
    const randomIndex = randomNumber(0, 2);
    return axes[randomIndex];
};

module.exports = { arraysEqual, randomNumber, randomAxis };