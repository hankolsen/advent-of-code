const { findCode, findCode2 } = require('./code');

const input = [
  'ULL',
  'RRDDD',
  'LURDL',
  'UUUUD',
];

describe('test day 02', () => {
  test('it should find the corect code', () => {
    expect(findCode(input)).toEqual('1985');
  });

  test('it should find the corect code', () => {
    expect(findCode2(input)).toEqual('5DB3');
  });
});
