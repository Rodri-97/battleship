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
    placeShipsOnBoard(human, computer);
};

// PSEUDOCODE:
// Loop over each player's ships
// CHeck if ship is vertical or horizontal
// Place ship accordingly

const placeShipsOnBoard = (human, computer) => {
    const humanBoard = human.board.rows;
    const computerBoard = computer.board.rows;

    const humanShips = human.board.allShips;
    const computerShips = computer.board.allShips;

    const squares = document.getElementsByClassName("square");
    const humanShipsUI = []
    const computerShipsUI = [];

    for (let i = 0; i < squares.length; i++) {
        if (i < 100) humanShipsUI.push(squares[i]);
        if (i >= 100) computerShipsUI.push(squares[i]);
    };

    for (let i = 0; i < humanShips.length; i++) {
        const ship = humanShips[i];
        let index;
        let square;
        //if (ship.axis === "x") {
        index = (ship.firstRow * 10) + ship.firstColumn;
        square = humanShipsUI[index];
        square.style.backgroundColor = "green";
        //} else if (ship.axis === "y") {
            
        //};
    };

    console.log(humanShips);
};