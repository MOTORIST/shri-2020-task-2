import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/warning.text_sizes_should_be_equal.rule';

describe(ERROR_CODE, () => {
  const rightJson = `
  {
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l" } },
      { "block": "text", "mods": { "size": "l" } }
    ]
  }
  `;

  const wrongJson = `
  {
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l" } },
      { "block": "text", "mods": { "size": "m" } }
    ]
  }
  `;

  it('should return empty array, if all text blocks in the warning block the same size', () => {
    expect(linter(rightJson).length).toBe(0);
  });

  it('should return errors, if all text blocks has different sizes', () => {
    const errors = [
      {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          end: { column: 4, line: 8 },
          start: { column: 3, line: 2 },
        },
      },
    ];

    expect(linter(wrongJson)).toEqual(errors);
  });
});
