import { isBlock, getMods, getLocation } from '../helpers/bemaot';
import { ObjectNode, Location } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';

interface Data {
  typeBlock: 'h2' | 'h3';
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'TEXT.INVALID_H3_POSITION';
export const ERROR_TEXT =
  'Заголовок h3 (блок text с модификатором type h3) не может находиться перед h2 на том же или более глубоком уровне вложенности.';

export function getDataForRule(node: ObjectNode): Data | undefined {
  if (!isBlock(node, 'text')) {
    return;
  }

  const textMods = getMods(node);

  if (
    textMods &&
    textMods.type &&
    (textMods.type === 'h2' || textMods.type === 'h3')
  ) {
    return {
      typeBlock: textMods.type,
      loc: getLocation(node.loc as Location),
    };
  }
}

export function rule(
  rulesDataBuffer: RulesDataBuffer,
): LinterError[] | undefined {
  const rulesData: Data[] = rulesDataBuffer[ERROR_CODE] as Data[];
  const errors: LinterError[] = [];

  if (!rulesData) {
    return;
  }

  const maxH2Index: number = rulesData.reduce(
    (acc: number, block: Data, index: number) => {
      return block.typeBlock === 'h2' && acc < index ? (acc = index) : acc;
    },
    -1,
  );

  if (maxH2Index === -1) {
    return;
  }

  rulesData.forEach((block: Data, h3Index: number) => {
    if (block.typeBlock === 'h3' && h3Index < maxH2Index) {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: block.loc,
      };

      errors.push(err);
    }
  });

  return errors;
}
