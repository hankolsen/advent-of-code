const { countOrbits, getOrbits, findShortestDistance } = require('./solve');

describe('Day 6', () => {
  it('should solve part 1 examples', () => {
    const input = [
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
    ];

    expect(countOrbits(getOrbits(input))).toEqual(42);
  });

  it('should solve part 2 examples', () => {
    const input = [
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
      'K)YOU',
      'I)SAN',
    ];
    expect(findShortestDistance(input, 'YOU', 'SAN')).toBe(4);
  });
});
