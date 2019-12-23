import linter from '../src/index';
import { ERROR_CODE, ERROR_TEXT } from '../src/rules/text.several_h1';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  const rightJson = `
  [
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
  ]
  `;

  const wrongJson = `
  [
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
  ]
  `;

  it('should return empty array, if h1 one per page', () => {
    expect(linter(rightJson)).toEqual([]);
  });

  it('should return errors, if h1 not one per page', () => {
    const err: LinterError = {
      code: ERROR_CODE,
      error: ERROR_TEXT,
      location: {
        start: {
          column: 5,
          line: 7,
        },
        end: {
          column: 6,
          line: 10,
        },
      },
    };

    expect(linter(wrongJson)).toEqual([err]);
  });
});
