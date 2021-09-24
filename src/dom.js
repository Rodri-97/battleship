import { getDigits } from "./helpers.js";

const resetSquares = () => {
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) squares[i].style.backgroundColor = "";
};

const placePlayerShips = (player) => {
    resetSquares();
    const playerShips = player.board.allShips;

    const squares = document.getElementsByClassName("square");
    const playerSquares = [];

    if (player.name.toLowerCase() === "computer") {
        for (let i = 100; i < 200; i++) playerSquares.push(squares[i]);
    } else {
        for (let i = 0; i < 100; i++) playerSquares.push(squares[i]);
    };

    for (let i = 0; i < playerShips.length; i++) {
        const ship = playerShips[i];
        const firstSquareIndex = (ship.firstRow * 10) + ship.firstColumn;
        let lastSquareIndex;
        if (ship.axis === "x") lastSquareIndex = firstSquareIndex + ship.length - 1;
        else if (ship.axis === "y") lastSquareIndex = firstSquareIndex + (10 * ship.length) - 1;

        let counter = firstSquareIndex;
        while (counter <= lastSquareIndex) {
            const square = playerSquares[counter];
            square.style.backgroundColor = "green";
            if (ship.axis === "x") counter++;
            else if (ship.axis === "y") counter += 10;
        };
    };
};

export const renderBoards = (player) => {
    const newGameDiv = document.getElementById("new-game");
    newGameDiv.style.display = "none";

    const container = document.getElementById("container");
    container.style.display = "grid";

    const playerBoard = document.createElement("div");
    playerBoard.className = "board";
    playerBoard.id = "player-board";
    const computerBoard = document.createElement("div");
    computerBoard.className = "board";
    computerBoard.id = "computer-board";
    const boards = [playerBoard, computerBoard];
    const totalSize = 10 * 10;

    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        board.style.display = "grid";
        const boardDiv = document.createElement("div");
        const boardTitle = document.createElement("div");
        boardTitle.className = "board-title";
        if (board.id === "player-board") boardTitle.textContent = `${player.name}'s board`;
        else if (board.id === "computer-board") boardTitle.textContent = "Computer's board";
        boardDiv.append(boardTitle);
        boardDiv.append(board);
        container.append(boardDiv);

        for (let i = 0; i < totalSize; i++) {
            const square = document.createElement("div");
            square.className = "square";
            board.append(square);
        };
    };
    placePlayerShips(player);
};

const displayWinner = (winner) => {
    const winningMessage = `${winner.name} won!`;
    alert(winningMessage);
    const title = document.getElementById("title");
    title.textContent = winningMessage;
};

export const receiveAttackOnComputer = (square, index, computer, human) => {
    const row = getDigits(index)[0];
    const column = getDigits(index)[1];
    human.attackEnemyBoard(computer.board, row, column);
    const successfulAttack = computer.board.rows[row][column][0] === "X";
    if (successfulAttack) square.style.backgroundColor = "red";
    square.textContent = "X";
    if (computer.board.allShipsSunk()) displayWinner(human);
};

export const receiveComputerAttack = (computer, human) => {
    const computerAttack = computer.randomPlay(human.board);
    const rowAttacked = computerAttack[0];
    const columnAttacked = computerAttack[1];
    let squareIndex = rowAttacked.toString() + columnAttacked.toString();
    squareIndex = Number(squareIndex);
    const squares = document.getElementsByClassName("square");
    const squareAttacked = squares[squareIndex];
    squareAttacked.textContent = "X";
    const successfulAttack = human.board.rows[rowAttacked][columnAttacked][0] === "X";
    if (successfulAttack) squareAttacked.style.backgroundColor = "red";
    if (human.board.allShipsSunk()) displayWinner(computer);
};