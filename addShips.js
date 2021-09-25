import { Ship } from "./factories/ship.js";
import { Player } from "./factories/player.js";
import { getDigits } from "./helpers.js";
import * as DOM from "./dom.js";

const addShips = (human) => {
    DOM.renderSingleBoard(human);

    const toggleBtn = document.getElementById("toggle-btn");
    toggleBtn.addEventListener("click", () => {
        if (toggleBtn.textContent === "Horizontal") toggleBtn.textContent = "Vertical";
        else if (toggleBtn.textContent === "Vertical") toggleBtn.textContent = "Horizontal";
    });

    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        square.addEventListener("click", () => {
            let shipLength;
            const numberOfShips = human.board.allShips.length;
            const title = document.getElementById("single-board-title");
    
            if (numberOfShips === 0) {
                shipLength = 5;
                title.textContent = "Place your battleship";
            } else if (numberOfShips === 1) {
                shipLength = 4;
                title.textContent = "Place your cruiser";
            } else if (numberOfShips === 2) {
                shipLength = 3;
                title.textContent = "Place your submarine";
            } else if (numberOfShips === 3) {
                shipLength = 3;
                title.textContent = "Place your destroyer";
            } else if (numberOfShips === 4) {
                shipLength = 2;
            } else if (numberOfShips === 5) {
                return;
            };

            const ship = Ship(shipLength);
            let axis;
            if (toggleBtn.textContent === "Horizontal") axis = "x";
            else if (toggleBtn.textContent === "Vertical") axis = "y";
            const row = getDigits(i)[0];
            const column = getDigits(i)[1];
            human.board.placeShip(ship, axis, row, column);
            DOM.placePlayerShips(human);
            if (numberOfShips === 4) startNewGame(human);
        });
    };
};