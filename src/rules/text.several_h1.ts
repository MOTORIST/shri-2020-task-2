import { ObjectNode, Location } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { isBlock, getMods, getLocation } from '../helpers/bemaot';

interface Data {
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'TEXT.SEVERAL_H1';
export const ERROR_TEXT =
  'Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.';

export function getDataForRule(node: ObjectNode): Data | undefined {
  if (!isBlock(node, 'text')) {
    return;
  }

  const textMods = getMods(node);

  if (textMods && textMods.type && textMods.type === 'h1') {
    return {
      loc: getLocation(node.loc as Location),
    };
  }
}

export function rule(
  rulesDataBuffer: RulesDataBuffer,
): LinterError[] | undefined {
  const rulesData: Data[] = rulesDataBuffer[ERROR_CODE] as Data[];
  const errors: LinterError[] = [];

  if (!rulesData || rulesData.length <= 1) {
    return;
  }

  rulesData.slice(1).forEach((H1: Data) => {
    const err: LinterError = {
      code: ERROR_CODE,
      error: ERROR_TEXT,
      location: H1.loc,
    };

    errors.push(err);
  });

  return errors;
}
