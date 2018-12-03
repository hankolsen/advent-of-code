/* eslint no-param-reassign: 0, no-multi-spaces: 0, no-shadow: 0 */

const getNewDirection = (currentDirection, direction) => (currentDirection + 4 + direction) % 4;

const directions = {
  0: [0, 1],  // North
  1: [1, 0],  // East
  2: [0, -1], // South
  3: [-1, 0], // West
};

const findDistance = (data) => {
  const input = data.split(', ').map((entry) => {
    const [, direction, steps] = entry.match(/([RL])(\d+)/);
    return {
      turn: direction === 'L' ? -1 : 1,
      steps,
    };
  });

  const { x, y } = input.reduce(({ x, y, dir }, { turn, steps }) => {
    dir = getNewDirection(dir, turn);
    const [dx, dy] = directions[dir];

    return {
      x: x + (steps * dx),
      y: y + (steps * dy),
      dir,
    };
  }, { x: 0, y: 0, dir: 0 });

  return Math.abs(x) + Math.abs(y);
};


const findDuplicate = () => {

};

module.exports = { findDistance, findDuplicate };
