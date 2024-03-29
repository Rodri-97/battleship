import { Ship } from "./factories/ship.js";
import { Player } from "./factories/player.js";
import { getDigits } from "./helpers.js";
import * as DOM from "./dom.js";

const addShips = (human) => {
    const title = document.getElementById("title");
    title.textContent = "Place your carrier";
    const toggleBtn = document.getElementById("toggle-btn");
    toggleBtn.style.display = "block";
    toggleBtn.addEventListener("click", () => {
        if (toggleBtn.textContent === "Horizontal") toggleBtn.textContent = "Vertical";
        else if (toggleBtn.textContent === "Vertical") toggleBtn.textContent = "Horizontal";
    });

    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < 100; i++) {
        const square = squares[i];
        square.addEventListener("click", () => {
            let shipLength;
            let numberOfShips = human.board.allShips.length;
            if (numberOfShips === 0) shipLength = 5;
            else if (numberOfShips === 1) shipLength = 4;
            else if (numberOfShips === 2) shipLength = 3;
            else if (numberOfShips === 3) shipLength = 3;
            else if (numberOfShips === 4) shipLength = 2;
            else if (numberOfShips === 5) return;

            const ship = Ship(shipLength);
            let axis;
            if (toggleBtn.textContent === "Horizontal") axis = "x";
            else if (toggleBtn.textContent === "Vertical") axis = "y";
            const row = getDigits(i)[0];
            const column = getDigits(i)[1];
            human.board.placeShip(ship, axis, row, column);
            DOM.placePlayerShips(human);

            numberOfShips = human.board.allShips.length;
            if (numberOfShips === 1) title.textContent = "Place your battleship";
            else if (numberOfShips === 2) title.textContent = "Place your cruiser";
            else if (numberOfShips === 3) title.textContent = "Place your submarine";
            else if (numberOfShips === 4) title.textContent = "Place your destroyer";
            else if (numberOfShips === 5) {
                title.textContent = `${human.name}'s board`;
                toggleBtn.style.display = "none";
                startNewGame(human);
            }; 
        });
    };
};

const startNewGame = (human) => {
    const title = document.getElementById("title");
    title.textContent = "The game has started!";
    const computer = Player("Computer");
    computer.placeShipsRandomly();

    const squares = document.getElementsByClassName("square");
    for (let i = 100; i < squares.length; i++) {
        const square = squares[i];
        square.addEventListener("click", () => {
            let anyWinner = human.board.allShipsSunk() || computer.board.allShipsSunk();
            if (anyWinner) return;
            if (square.textContent === "X") return;
            const index = i - 100;
            DOM.receiveAttackOnComputer(square, index, computer, human);
            anyWinner = human.board.allShipsSunk() || computer.board.allShipsSunk();
            if (anyWinner) return;
            DOM.receiveComputerAttack(computer, human);
        });
    };
};

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", () => {
    const playerName = document.getElementById("player-name").value;
    if (playerName.trim() === "" || playerName.toLowerCase().trim() === "computer") {
        alert("Invalid name. Try again.");
        document.getElementById("player-name").value = "";
        return;
    };
    const human = Player(playerName);
    DOM.renderBoards(human);
    addShips(human);
});

const replayBtn = document.getElementById("replay-btn");
replayBtn.addEventListener("click", () => {
    location.reload();
});