import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { ObjectNode, Location } from 'json-to-ast';
import { hasParent } from '../helpers/path';
import { isBlock, getMods, getLocation } from '../helpers/bemaot';

interface Data {
  size: string;
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'WARNING.INVALID_PLACEHOLDER_SIZE';
export const ERROR_TEXT: string =
  'Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l';

export function getDataForRule(
  node: ObjectNode,
  path: string[],
): Data | undefined {
  if (isBlock(node, 'placeholder') && hasParent(path, 'warning')) {
    const mods = getMods(node);

    if (mods && mods.size) {
      return {
        size: mods.size as string,
        loc: getLocation(node.loc as Location),
      };
    }
  }

  return;
}

export function rule(
  rulesDataBuffer: RulesDataBuffer,
): LinterError[] | undefined {
  const rulesData: Data[] = rulesDataBuffer[ERROR_CODE] as Data[];
  const errors: LinterError[] = [];

  if (!rulesData) {
    return;
  }

  const standardSizes = new Map([
    ['s', 's'],
    ['m', 'm'],
    ['l', 'l'],
  ]);

  rulesData.forEach((placeholder: Data) => {
    if (!standardSizes.has(placeholder.size)) {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: placeholder.loc,
      };

      errors.push(err);
    }
  });

  return errors;
}
