import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/warning.invalid_button_size.rule';

describe(ERROR_CODE, () => {
  const rightJson = `
  {
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l" } },
      { "block": "button", "mods": { "size": "xl" } }
    ]
  }
  `;

  const wrongJson = `
  {
    "block": "warning",
    "content": [
      { "block": "text", "mods": { "size": "l" } },
      { "block": "button", "mods": { "size": "s" } }
    ]
  }
  `;

  it('should return empty array, if button has right size', () => {
    expect(linter(rightJson)).toEqual([]);
  });

  it('should return errors, if button block has not right size', () => {
    const errors = [
      {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          end: { column: 53, line: 6 },
          start: { column: 7, line: 6 },
        },
      },
    ];

    expect(linter(wrongJson)).toEqual(errors);
  });
});
