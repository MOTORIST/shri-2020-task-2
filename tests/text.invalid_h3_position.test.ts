import linter from '../src/index';
import {
  ERROR_CODE,
  ERROR_TEXT,
} from '../src/rules/text.invalid_h3_position.rule';
import { LinterError } from '../src/types/LinterError';

describe(ERROR_CODE, () => {
  describe('same level', () => {
    const rightJson = `
    [
      {"block": "text", "mods": { "type": "h2" }},
      {"block": "text", "mods": { "type": "h3" }}
    ]
    `;

    const wrongJson = `
    [
      {"block": "text", "mods": { "type": "h3" }},
      {"block": "text", "mods": { "type": "h2" }}
    ]
    `;

    it('should return empty error, if h3 below h2', () => {
      expect(linter(rightJson)).toEqual([]);
    });

    it('should return errors, if h3 above h2', () => {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          start: {
            column: 7,
            line: 3,
          },
          end: {
            column: 50,
            line: 3,
          },
        },
      };

      expect(linter(wrongJson)).toEqual([err]);
    });
  });

  describe('deep level', () => {
    const rightJson = `
    [
      {"block": "text", "mods": { "type": "h2" }},
      {
        "block": "container",
        "content": {"block": "text", "mods": { "type": "h3" }}
      }
    ]
    `;

    const wrongJson = `
    [
      {"block": "text", "mods": { "type": "h3" }},
      {
        "block": "container",
        "content": {"block": "text", "mods": { "type": "h2" }}
      }
    ]
    `;

    it('should return empty error, if h3 below h2', () => {
      expect(linter(rightJson)).toEqual([]);
    });

    it('should return errors, if h3 above h2', () => {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: {
          start: {
            column: 7,
            line: 3,
          },
          end: {
            column: 50,
            line: 3,
          },
        },
      };

      expect(linter(wrongJson)).toEqual([err]);
    });
  });
});
