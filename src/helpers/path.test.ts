import { setPath, splitPath, Path, hasParent } from './path';

describe('setPath', () => {
  it('should return new array', () => {
    expect(setPath(['one'], 'two')).toEqual(['one', 'two']);
  });
});

describe('splitPath', () => {
  it('should return string', () => {
    const path: Path = ['parentBlock', '0', 'blockName'];
    expect(splitPath(['parentBlock', '0', 'blockName'])).toEqual({
      blockName: 'blockName',
      blockPosition: 0,
      path: ['parentBlock'],
    });
  });
});

describe('hasParent', () => {
  it('should return false, if parent block not found from path', () => {
    const path: Path = ['block', '0', 'blockName'];

    expect(hasParent(path, 'parentBlock')).toBeFalsy();
  });

  it('should return true, if parent block found from path', () => {
    const path: Path = ['parentBlock', '0', 'blockName'];

    expect(hasParent(path, 'parentBlock')).toBeTruthy();
  });
});
