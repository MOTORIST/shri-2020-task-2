import { isBlock, getMods, getLocation } from '../helpers/bemaot';
import { ObjectNode, Location } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';

interface Data {
  typeBlock: 'h1' | 'h2';
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'TEXT.INVALID_H2_POSITION';
export const ERROR_TEXT =
  'Заголовок h2 (блок text с модификатором type h2) не может находиться перед h1 на том же или более глубоком уровне вложенности.';

export function getDataForRule(node: ObjectNode): Data | undefined {
  if (!isBlock(node, 'text')) {
    return;
  }

  const textMods = getMods(node);

  if (
    textMods &&
    textMods.type &&
    (textMods.type === 'h1' || textMods.type === 'h2')
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

  const h1Index: number = rulesData.findIndex(
    (block: Data) => block.typeBlock === 'h1',
  );

  if (h1Index === -1) {
    return;
  }

  rulesData.forEach((block: Data, h2Index: number) => {
    if (block.typeBlock === 'h2' && h2Index < h1Index) {
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
