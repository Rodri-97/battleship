import { Player } from "./factories/player.js";
import * as DOM from "./dom.js";

const startNewGame = () => {
    const playerName = document.getElementById("player-name").value;
    if (playerName.toLowerCase() === "computer") {
        alert("C'mon, you're not the computer! Try again.");
        document.getElementById("player-name").value = "";
        return;
    };
    const human = Player(playerName);
    const computer = Player("Computer");
    human.placeShipsRandomly();
    computer.placeShipsRandomly();
    console.log(computer.board.allShips);
    DOM.renderBoards(human);

    const squares = document.getElementsByClassName("square");
    for (let i = 100; i < squares.length; i++) {
        const square = squares[i];
        square.addEventListener("click", () => {
            const anyWinner = human.board.allShipsSunk() || computer.board.allShipsSunk();
            if (anyWinner) return;
            if (square.textContent === "X") return;
            const index = i - 100;
            DOM.receiveAttackOnComputer(square, index, computer, human);
            if (anyWinner) return;
            DOM.receiveComputerAttack(computer, human);
        });
    };
};

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", () => {
    startNewGame();
});