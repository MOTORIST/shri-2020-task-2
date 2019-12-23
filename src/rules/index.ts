import { ObjectNode } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import rulesArray from './rules';
import { Rules } from '../types/Rules';
import { LinterError } from '../types/LinterError';
import { Path } from '../helpers/path';

export function collectRulesData(
  node: ObjectNode,
  path: Path = [],
  rules: Rules[] = rulesArray,
): RulesDataBuffer {
  const rulesDataBuffer: RulesDataBuffer = {};

  rules.forEach(({ getDataForRule, ERROR_CODE }: Rules) => {
    const data = getDataForRule(node, path);

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

export function validation(
  rulesDataBuffer: RulesDataBuffer,
  rules: Rules[] = rulesArray,
): LinterError[] {
  const getErrors = (errorsAcc: LinterError[], { rule }: Rules) => {
    const err = rule(rulesDataBuffer);

    if (err) {
      errorsAcc = errorsAcc.concat(err);
    }

    return errorsAcc;
  };

  const errors = rules.reduce(getErrors, []);

  return errors;
}
