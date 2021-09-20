// npm run test player.test.js

const Player = require("../factories/player.js");
const Ship = require("../factories/ship.js");
const { countElement, countSubstring } = require("../helpers.js");

test("Human player attacks the other player's board", () => {
    const player1 = Player("Player 1");
    const player2 = Player("Player 2");
    const ship1 = Ship(2);
    player1.board.placeShip(ship1, "x", 2, 2);
    const ship2 = Ship(2);
    player2.board.placeShip(ship2, "y", 0, 0);
    expect(player2.board.rows[0][0]).toBe("S0");

    const firstAttack = player1.attackEnemyBoard(player2.board, 0, 0);
    expect(player2.board.rows[0][0]).toBe("X0");
    expect(firstAttack).toBe(undefined);

    const lastAttack = player1.attackEnemyBoard(player2.board, 1, 0);
    expect(player2.board.rows[1][0]).toBe("X0");
    expect(lastAttack).toBe("Player 1 won!");
});

test("Computer places ships randomly", () => {
    const computer = Player("Computer");
    computer.placeShipsRandomly();
    const board = computer.board.rows;
    const sizeOfCarrier = countElement(board, "S0");
    const sizeOfBattleShip = countElement(board, "S1");
    const sizeOfCruiser = countElement(board, "S2");
    const sizeOfSubmarine = countElement(board, "S3");
    const sizeOfDestroyer = countElement(board, "S4");
    expect(sizeOfCarrier).toBe(5);
    expect(sizeOfBattleShip).toBe(4);
    expect(sizeOfCruiser).toBe(3);
    expect(sizeOfSubmarine).toBe(3);
    expect(sizeOfDestroyer).toBe(2);
});

test("Computer attacks randomly", () => {
    const human = Player("Human");
    const computer = Player("Computer");

    for (let row = 0; row < 10; row++) {
        const humanShip1 = Ship(5);
        const humanShip2 = Ship(5);
        human.board.placeShip(humanShip1, "x", row, 0);
        human.board.placeShip(humanShip2, "x", row, 5);
    };

    let XsInHumanBoard = countSubstring(human.board.rows, "X");
    expect(XsInHumanBoard).toBe(0);
    expect(computer.allPlays.length).toBe(0);

    computer.randomPlay(human.board);

    XsInHumanBoard = countSubstring(human.board.rows, "X");
    expect(XsInHumanBoard).toBe(1);
    expect(computer.allPlays.length).toBe(1);
});