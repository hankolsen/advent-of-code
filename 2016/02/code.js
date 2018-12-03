/* eslint no-param-reassign: 0, no-shadow: 0 */

const directions = {
  U: [0, -1],
  R: [1, 0],
  D: [0, 1],
  L: [-1, 0],
};




const findCode = (data) => {
  const input = data.map(row => row.split(''));
  let startPosition = { x: 1, y: 1 };

  const getNumber = ({ x, y }) => {
    const numbers = {
      '0,0': 1,
      '1,0': 2,
      '2,0': 3,
      '0,1': 4,
      '1,1': 5,
      '2,1': 6,
      '0,2': 7,
      '1,2': 8,
      '2,2': 9,
    };
    return numbers[`${x},${y}`];
  };

  const code = input.map((row) => {
    startPosition = row.reduce(({ x, y }, dir) => {
      x += directions[dir][0];
      y += directions[dir][1];
      x = Math.max(0, Math.min(x, 2));
      y = Math.max(0, Math.min(y, 2));
      return { x, y };

    }, startPosition);

    return getNumber(startPosition);
  });

  return code.join('');
};

const findCode2 = (data) => {
  const input = data.map(row => row.split(''));
  let startPosition = { x: 0, y: 2 };

  const getNumber = ({ x, y }) => {
    const numbers = {
      '2,0': 1,
      '1,1': 2,
      '2,1': 3,
      '3,1': 4,
      '0,2': 5,
      '1,2': 6,
      '2,2': 7,
      '3,2': 8,
      '4,2': 9,
      '1,3': 'A',
      '2,3': 'B',
      '3,3': 'C',
      '2,4': 'D',
    };
    return numbers[`${x},${y}`];
  };

  const code = input.map((row) => {
    startPosition = row.reduce(({ x, y }, dir) => {
      const newX = x + directions[dir][0];
      const newY = y + directions[dir][1];
      if (!getNumber({ x: newX, y: newY })) {
        return { x, y };
      }
      return { x: newX, y: newY };
    }, startPosition);
    return getNumber(startPosition);
  });

  return code.join('');

};

module.exports = { findCode, findCode2 };
