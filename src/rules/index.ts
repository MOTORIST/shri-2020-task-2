import { ObjectNode } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import rulesArray from './rules';
import { Rules } from '../types/Rules';

export function collectRulesData(
  node: ObjectNode,
  rules: Rules[] = rulesArray,
): RulesDataBuffer {
  const rulesDataBuffer: RulesDataBuffer = {};

  rules.forEach(({ getDataForRule, ERROR_CODE }: Rules) => {
    const data = getDataForRule(node);

    if (data) {
      rulesDataBuffer[ERROR_CODE] = [data];
    }
  });

  return rulesDataBuffer;
}

export function mergeRulesData(
  ...arrRulesData: RulesDataBuffer[]
): RulesDataBuffer {
  const result: RulesDataBuffer = {};
  arrRulesData.forEach(data => {
    Object.keys(data).forEach((key: string) => {
      if (result[key]) {
        result[key] = result[key].concat(data[key]);
      } else {
        result[key] = data[key];
      }
    });
  });

  return result;
}
