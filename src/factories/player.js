//const Gameboard = require("./gameboard.js");
//const Ship = require("./ship.js");
//const { randomNumber, randomAxis } = require("../helpers.js");

import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { randomNumber, randomAxis, arrayContainsArray, getFreeAdjacent } from "../helpers.js";

export const Player = (name) => {
    const board = Gameboard(10);
    const allPlays = [];

    const attackEnemyBoard = (enemyBoard, row, column) => {
        allPlays.push([row, column]);
        enemyBoard.receiveAttack(row, column);
    };

    const placeShipsRandomly = () => {
        const carrier = Ship(5);
        const battleship = Ship(4);
        const cruiser = Ship(3);
        const submarine = Ship(3);
        const destroyer = Ship(2);
        const ships = [carrier, battleship, cruiser, submarine, destroyer];

        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            const axis = randomAxis();
            const row = randomNumber(0, 10);
            const column = randomNumber(0, 10);
            let placeShipOnBoard = board.placeShip(ship, axis, row, column);
            while (placeShipOnBoard === "Invalid position") {
                const newAxis = randomAxis();
                const newRow = randomNumber(0, 10);
                const newColumn = randomNumber(0, 10);
                placeShipOnBoard = board.placeShip(ship, newAxis, newRow, newColumn);
            };
        };
    };

    const randomPlay = (enemyBoard) => {
        if (allPlays.length > 0) {
            const lastPositionAttacked = allPlays[allPlays.length - 1];
            const row = lastPositionAttacked[0];
            const column = lastPositionAttacked[1];
            if (enemyBoard.rows[row][column][0] === "X") {
                const freeAdjacent = getFreeAdjacent(allPlays, row, column);
                if (freeAdjacent !== "None") {
                    const adjacentRow = freeAdjacent[0];
                    const adjacentColumn = freeAdjacent[1];
                    attackEnemyBoard(enemyBoard, adjacentRow, adjacentColumn);
                    return [adjacentRow, adjacentColumn];
                };
            };
        };

        let randomRow = randomNumber(0, 10);
        let randomColumn = randomNumber(0, 10);
        while (arrayContainsArray(allPlays, [randomRow, randomColumn])) {
            randomRow = randomNumber(0, 10);
            randomColumn = randomNumber(0, 10);
        };
        attackEnemyBoard(enemyBoard, randomRow, randomColumn);
        return [randomRow, randomColumn];
    };

    return { name, board, allPlays, attackEnemyBoard, placeShipsRandomly, randomPlay };
};

//module.exports = Player;