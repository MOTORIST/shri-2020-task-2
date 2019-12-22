import { GetDataForRule, Rule } from '../types/Rules';
import { ObjectNode } from 'json-to-ast';

export const ERROR_CODE = 'FIXTURE_ERROR_CODE';
export const ERROR_TEXT = 'FIXTURE_ERROR_TEXT';

export const getDataForRule: GetDataForRule = (node: ObjectNode) => ({
  fixtureData: true,
});

export const FIXTURE_ERROR = {
  code: ERROR_CODE,
  error: ERROR_TEXT,
  location: {
    start: {
      column: 1,
      line: 1,
    },
    end: {
      column: 2,
      line: 1,
    },
  },
};

export const rule: Rule = () => [FIXTURE_ERROR];
