const testFunction = require('./index.js');

test('adds 1 + 2 to equal 3', () => {
  expect(testFunction(1, 2)).toBe(3);
});

// npm run test index.test.js