import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/warning.invalid_placeholder_size.rule';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  const rightJson = `
  {
    "block": "warning",
    "content": [
      { "block": "placeholder", "mods": { "size": "m" } }
    ]
  }
  `;

  const wrongJson = `
  {
    "block": "warning",
    "content": [
      { "block": "placeholder", "mods": { "size": "xl" } }
    ]
  }
  `;

  it('should return empty array, if placeholder has standard size', () => {
    expect(linter(rightJson)).toEqual([]);
  });

  it('should return errors, if placeholder has not standard size', () => {
    const err: LinterError = {
      code: ERROR_CODE,
      error: ERROR_TEXT,
      location: {
        start: {
          column: 7,
          line: 5,
        },
        end: {
          column: 59,
          line: 5,
        },
      },
    };

    expect(linter(wrongJson)).toEqual([err]);
  });
});
