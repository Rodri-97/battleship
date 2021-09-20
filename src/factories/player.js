const Gameboard = require("./gameboard.js");
const Ship = require("./ship.js");
const { randomNumber, randomAxis } = require("../helpers.js");

const Player = (name) => {
    const board = Gameboard(10);
    const allPlays = [];

    const attackEnemyBoard = (enemyBoard, row, column) => {
        allPlays.push([row, column]);
        enemyBoard.receiveAttack(row, column);
        if (enemyBoard.allShipsSunk()) return `${name} won!`;
    };

    const placeShipsRandomly = () => {
        const carrier = Ship(5);
        const battleship = Ship(4);
        const cruiser = Ship(3);
        const submarine = Ship(3);
        const destroyer = Ship(2);
    };

    const randomPlay = (enemyBoard) => {
        let randomRow = randomNumber(0, 10);
        let randomColumn = randomNumber(0, 10);
        while (allPlays.includes([randomRow, randomColumn])) {
            randomRow = randomNumber(0, 10);
            randomColumn = randomNumber(0, 10);
        };
        attackEnemyBoard(enemyBoard, randomRow, randomColumn);
    };

    return { name, board, attackEnemyBoard, randomPlay };
};

module.exports = Player;
/*
const player1 = Player("Rodrigo");
const board1 = player1.board;
const ship1 = Ship(2);
const ship2 = Ship(10);
const ship3 = Ship(6);
const ship4 = Ship(4);
board1.placeShip(ship1, "x", 1, 1);
board1.placeShip(ship2, "y", 0, 0);
board1.placeShip(ship3, "x", 3, 3);
board1.placeShip(ship4, "y", 6, 4);

const player2 = Player("Computer");
const shipC = Ship(2);
player2.board.placeShip(shipC, "y", 2, 2);

const printBoards = () => {
    console.log(player1.board.rows);
    console.log(" ");
    console.log(player2.board.rows);
    console.log(" ");
};
//printBoards();

player2.randomPlay(player1.board);
console.log(player1.board.rows);*/

// node src/factories/player.js