import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/grid.too_much_marketing_blocks.rule';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  const rightJson = `
  {
    "block": "grid",
     "mods": {
         "m-columns": "10"
     },
    "content": [
      {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
              "m-col": "8"
          },
          "content": [
              {
                  "block": "payment"
              }
          ]
      },
      {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
              "m-col": "2"
          },
          "content": [
              {
                  "block": "offer"
              }
          ]
      }
    ]
  }
  `;

  const wrongJson = `
  {
    "block": "grid",
     "mods": {
         "m-columns": "10"
     },
    "content": [
      {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
              "m-col": "2"
          },
          "content": [
              {
                  "block": "payment"
              }
          ]
      },
      {
          "block": "grid",
          "elem": "fraction",
          "elemMods": {
              "m-col": "8"
          },
          "content": [
              {
                  "block": "offer"
              }
          ]
      }
    ]
  }
  `;

  it('should return empty array, if m-col offer modifier <= m-columns / 2', () => {
    expect(linter(rightJson)).toEqual([]);
  });

  it('should return errors, if m-col offer modifier > m-columns / 2', () => {
    const err: LinterError = {
      code: ERROR_CODE,
      error: ERROR_TEXT,
      location: {
        start: {
          column: 3,
          line: 2,
        },
        end: {
          column: 4,
          line: 33,
        },
      },
    };

    expect(linter(wrongJson)).toEqual([err]);
  });
});
