// Pseudocode

export const makeBoards = () => {
    const newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.style.display = "none";

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
        container.append(board);
        board.style.display = "grid";

        for (let i = 0; i < totalSize; i++) {
            const square = document.createElement("div");
            square.className = "square";
            board.append(square);
        };
    };
};

export const placeShipsOnBoard = () => {

};