const Ship = require('../main.js');

test('Ship stores its length and coordinates', () => {
    const ship = new Ship(4, [2,3,4,5]);
    expect(ship.myLen).toBe(4);
    expect(ship.cords).toEqual([2,3,4,5]);
  });
  
  

  test('Ship is sunk when hit count >= length', () => {
    const ship = new Ship(2, [4, 5]);
    ship.hit(4);
    ship.hit(5);
    expect(ship.isSunk()).toBe(true);
});
