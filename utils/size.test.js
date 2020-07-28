import size from './size';

describe('size tests', () => {
  it('should limit the size of an array', () => {
    const input = [1, 3, 5, 4, 6, 7];
    const expected = [1, 3];
    const result = size(input, 2);
    expect(result).toEqual(expected);
  });
});
