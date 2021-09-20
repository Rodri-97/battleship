// npm run test ship.test.js

const Ship = require("../factories/ship.js");

test("Prevent ships too big or too small", () => {
  const bigShip = Ship(6);
  const smallShip = Ship(1);
  const ship5 = Ship(5);
  const ship2 = Ship(2);
  expect(bigShip).toBe(undefined);
  expect(smallShip).toBe(undefined);
  expect(ship5).not.toBe(undefined);
  expect(ship2).not.toBe(undefined);
});

const newShip = Ship(5);

test("Gives correct length", () =>  {
  expect(newShip.length).toBe(5);
});

test("Ship not sunk by default", () => {
  expect(newShip.isSunk()).toBe(false);
});

test("Ship not sunk after hitting some of the targets", () => {
  newShip.hit(0);
  newShip.hit(1);
  newShip.hit(2);
  newShip.hit(3);
  expect(newShip.isSunk()).toBe(false);
});

test("Ship sunk after hitting all of the targets", () => {
  newShip.hit(4);
  expect(newShip.isSunk()).toBe(true);
});