//const Player = require("./player.js");
import { Player } from "./player.js";

export const newGame = (player) => {
    const computer = Player("Computer");
    computer.placeShipsRandomly();
    const noWinner = !player.board.allShipsSunk() && !computer.board.allShipsSunk();
    while (noWinner) {
        playGame(player, computer);
    };
};

export const playGame = (player, computer) => {

};

//module.exports = { newGame, playGame };