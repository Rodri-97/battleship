export const renderBoards = (human, computer) => {
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
        container.append(board);
        board.style.display = "grid";

        for (let i = 0; i < totalSize; i++) {
            const square = document.createElement("div");
            square.className = "square";
            board.append(square);
        };
    };
    placePlayerShips(human);
    placePlayerShips(computer);
};

const placePlayerShips = (player) => {
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
        if (ship.axis === "x") {
            lastSquareIndex = firstSquareIndex + ship.length - 1;
            for (let i = firstSquareIndex; i <= lastSquareIndex; i++) {
                const square = playerSquares[i];
                square.style.backgroundColor = "green";
            };
        } else if (ship.axis === "y") {
            lastSquareIndex = firstSquareIndex + (10 * ship.length) - 1;
            for (let i = firstSquareIndex; i <= lastSquareIndex; i += 10) {
                const square = playerSquares[i];
                square.style.backgroundColor = "green";
            };
        };
    };
};