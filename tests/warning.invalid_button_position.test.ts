import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/warning.invalid_button_position.rule';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  describe('same level', () => {
    const rightJson = `
    {
      "block": "warning",
      "content": [
        { "block": "placeholder", "mods": { "size": "m"} },
        { "block": "button", "mods": { "size": "m" } }
      ]
    }
    `;

    const wrongJson = `
    {
      "block": "warning",
      "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
      ]
    }
    `;

    it('should return empty array, if button has right position', () => {
      expect(linter(rightJson)).toEqual([]);
    });

    it('should return errors, if button has not right position', () => {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          start: {
            column: 9,
            line: 5,
          },
          end: {
            column: 55,
            line: 5,
          },
        },
      };
      expect(linter(wrongJson)).toEqual([err]);
    });
  });

  describe('deep level', () => {
    const rightJson = `
    {
      "block": "warning",
      "content": {
        "block": "container",
        "content": [
          { "block": "placeholder", "mods": { "size": "m"} },
          { "block": "button", "mods": { "size": "m" } }
        ]
      }
    }
    `;

    const wrongJson = `
    {
      "block": "warning",
      "content": {
        "block": "container",
        "content": [
          { "block": "button", "mods": { "size": "m" } },
          { "block": "placeholder", "mods": { "size": "m"} }
        ]
      }
    }
    `;

    it('should return empty array, if button has right position', () => {
      expect(linter(rightJson)).toEqual([]);
    });

    it('should return errors, if button has not right position', () => {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          start: {
            column: 11,
            line: 7,
          },
          end: {
            column: 57,
            line: 7,
          },
        },
      };

      expect(linter(wrongJson)).toEqual([err]);
    });
  });
});
