import { linter } from '../src';

describe('linter', () => {
  it('should return empty array, if not errors', () => {
    const json = `{}`;

    expect(linter(json)).toEqual([]);
  });
});
