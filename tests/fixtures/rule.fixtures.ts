import { GetDataForRule } from '../types/Rules';
import { ObjectNode } from 'json-to-ast';

export const ERROR_CODE = 'FIXTURE_ERROR_CODE';

export const getDataForRule: GetDataForRule = (node: ObjectNode) => ({
  fixtureData: true,
});
