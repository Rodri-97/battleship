import { Player } from "./factories/player.js";
import * as DOM from "./dom.js";

// --> Create two players
// --> Randomly populate each player's board
// Render gameboards using information from player's gameboard factory function
// Add event listener to take user input when attacking
// Make computer attack randomly (switch turns after each player's attack)
// At each turn, check if all ships of any player are sunk and end the game if so.

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
    DOM.renderBoards(human, computer);
};

const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", () => {
    startNewGame();
});