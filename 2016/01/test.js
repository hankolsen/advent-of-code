const { findDistance, findDuplicate } = require('./blocks');


describe('test day 01', () => {
  test('it should solve part 1', () => {
    expect(findDistance('R2, L3')).toEqual(5);
    expect(findDistance('R2, R2, R2')).toEqual(2);
    expect(findDistance('R5, L5, R5, R3')).toEqual(12);
  });

  test('it should solve part 2', () => {
    expect(findDuplicate('R8, R4, R4, R8')).toEqual(4);
  });
});
