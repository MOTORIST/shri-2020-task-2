import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/text.invalid_h2_position.rule';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  const rightJson = `
  [
    {"block": "text", "mods": { "type": "h1" }},
    {"block": "text", "mods": { "type": "h2" }}
  ]
  `;

  const wrongJson = `
  [
    {"block": "text", "mods": { "type": "h2" }},
    {"block": "text", "mods": { "type": "h1" }}
  ]
  `;

  it('should return empty array, if h2 below h1', () => {
    expect(linter(rightJson)).toEqual([]);
  });

  it('should return errors, if h2 above h1', () => {
    const err: LinterError = {
      code: ERROR_CODE,
      error: ERROR_TEXT,
      location: {
        start: {
          column: 5,
          line: 3,
        },
        end: {
          column: 48,
          line: 3,
        },
      },
    };

    expect(linter(wrongJson)).toEqual([err]);
  });
});
