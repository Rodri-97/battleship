const Ship = require("./index.js");

const newShip = Ship(5);

test("Gives correct length", () =>  {
  expect(newShip.length).toBe(5);
});

test("Ship not sunk by default", () => {
  expect(newShip.isSunk()).toBe(false);
});

test("Sink ship", () => {
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  newShip.hit(4);
  expect(newShip.isSunk()).toBe(true);
});

