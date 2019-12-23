import { ValueNode, ObjectNode, Location } from 'json-to-ast';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { isBlock, getLocation, getContent, getMods } from '../helpers/bemaot';

interface Data {
  textSizes: string[];
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
export const ERROR_TEXT = 'Тексты в блоке warning должны быть одного размера';

export function getDataForRule(node: ObjectNode): Data | undefined {
  if (!isBlock(node, 'warning')) {
    return;
  }

  const data: Data = {
    textSizes: [],
    loc: getLocation(node.loc as Location),
  };

  const warningContent = getContent(node);

  if (warningContent && warningContent.type === 'Array') {
    data.textSizes = warningContent.children.reduce(
      (sizes: string[], textNode: ValueNode) => {
        if (textNode.type === 'Object' && isBlock(textNode, 'text')) {
          const textMods = getMods(textNode);
          if (textMods) {
            sizes.push(textMods.size as string);
          }
        }

        return sizes;
      },
      [],
    );

    return data;
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

  rulesData.forEach(data => {
    if (!data.textSizes.every(size => size === data.textSizes[0])) {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: data.loc,
      };

      errors.push(err);
    }
  });

  return errors;
}
