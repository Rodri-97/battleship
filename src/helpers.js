export const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    };
    return true;
};

export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const randomAxis = () => {
    const axes = ["x", "y"];
    const randomIndex = randomNumber(0, 2);
    return axes[randomIndex];
};

export const countElement = (_2Darray, element) => {
    const arr = _2Darray;
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === element) counter++;
        };
    };
    return counter;
};

export const countSubstring = (_2Darray, substring) => {
    const arr = _2Darray;
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].includes(substring)) counter++;
        };
    };
    return counter;
};

export const getDigits = (number) => {
    let firstDigit;
    let secondDigit;
    const numStr = number.toString();

    if (numStr.length === 1) {
        firstDigit = 0;
        secondDigit = Number(numStr[0]);
    } 
    else if (numStr.length === 2) {
        firstDigit = Number(numStr[0]);
        secondDigit = Number(numStr[1]);
    }; 

    return [firstDigit, secondDigit];
};

export const arrayContainsArray = (_2Darr, normalArr) => {
    const arr1 = _2Darr;
    const arr2 = normalArr;
    for (let i = 0; i < arr1.length; i++) {
        let counter = 0;
        for (let j = 0; j < arr1[i].length; j++) if (arr1[i][j] === arr2[j]) counter += 1;
        if (counter === arr2.length) return true;
    };
    return false;
};

//module.exports = { arraysEqual, randomNumber, randomAxis, countElement, countSubstring };