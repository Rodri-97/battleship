const Player = require("./player.js");
//const Gameboard = require("./gameboard.js");

const newGame = (player) => {
    const computer = Player("Computer");
    computer.placeShipsRandomly();
    const noWinner = !player.board.allShipsSunk() && !computer.board.allShipsSunk();
    while (noWinner) {
        playGame(player, computer);
    };
};

const playGame = (player, computer) => {

};

module.exports = { newGame, playGame };