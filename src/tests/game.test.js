// npm run test game.test.js

const Game = require("../factories/game.js");

test("Works correctly", () => {
    const testing = Game();
    expect(testing).toBe("Test");
});