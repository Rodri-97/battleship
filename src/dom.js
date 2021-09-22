export const makeBoards = () => {
    const boards = document.getElementsByClassName("board");
    const totalSize = 10 * 10;

    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        board.style.width = "525px";
        board.style.height = "425px";
        board.style.gridTemplateColumns = `repeat(10, 1fr`;
        board.style.gridTemplateRows = `repeat(10, 1fr`;

        for (let i = 0; i < totalSize; i++) {
            const square = document.createElement("div");
            square.style.border = "4px solid red";
            square.style.backgroundColor = "white";
            board.append(square);
        };
    };
};