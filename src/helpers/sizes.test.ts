import { getSize } from './sizes';

describe('getSize', () => {
  it('should return l size, if size argument is l and step 0', () => {
    expect(getSize('l')).toBe('l');
  });

  it('should return xxl size, if size argument is l and step 2', () => {
    expect(getSize('l', 2)).toBe('xxl');
  });

  it('should return undefined, if size not found', () => {
    expect(getSize('notfound')).toBeUndefined();
  });

  it('should return undefined, if big step', () => {
    expect(getSize('xxxxxl', 10)).toBeUndefined();
  });
});
