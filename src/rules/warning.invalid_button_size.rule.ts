import { ObjectNode, ValueNode, Location } from 'json-to-ast';
import { isBlock, getContent, getMods, getLocation } from '../helpers/bemaot';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { getSize } from '../helpers/sizes';

interface Button {
  buttonSize: string | number | boolean | null;
  loc: LinterErrorLocation;
}

interface Data {
  standardTextSizes?: string | number | boolean | null;
  buttons?: Button[];
}

export const ERROR_CODE: string = 'WARNING.INVALID_BUTTON_SIZE';
export const ERROR_TEXT =
  'Размер кнопки блока warning должен быть на 1 шаг больше эталонного.';

export function getDataForRule(node: ObjectNode): object | undefined {
  if (!isBlock(node, 'warning')) {
    return;
  }

  const data: Data = {};
  const warningContent = getContent(node);

  if (warningContent && warningContent.type === 'Array') {
    warningContent.children.forEach((warningBlock: ValueNode) => {
      if (warningBlock.type === 'Object' && isBlock(warningBlock, 'text')) {
        const textMods = getMods(warningBlock);

        if (
          textMods &&
          textMods.hasOwnProperty('size') &&
          !data.standardTextSizes
        ) {
          data.standardTextSizes = getSize(textMods.size as string, 1);
        }
      }

      if (warningBlock.type === 'Object' && isBlock(warningBlock, 'button')) {
        const textMods = getMods(warningBlock);

        if (textMods && textMods.hasOwnProperty('size')) {
          const button: Button = {
            buttonSize: textMods.size,
            loc: getLocation(warningBlock.loc as Location),
          };

          data.buttons = data.buttons ? data.buttons.concat(button) : [button];
        }
      }
    });
  }

  return data;
}

export function rule(
  rulesDataBuffer: RulesDataBuffer,
): LinterError[] | undefined {
  const rulesData: Data[] = rulesDataBuffer[ERROR_CODE] as Data[];
  const errors: LinterError[] = [];

  if (!rulesData) {
    return;
  }

  rulesData.forEach((data: Data) => {
    if (data.standardTextSizes && data.buttons) {
      data.buttons.forEach((button: Button) => {
        if (button.buttonSize !== data.standardTextSizes) {
          const err: LinterError = {
            code: ERROR_CODE,
            error: ERROR_TEXT,
            location: button.loc,
          };

          errors.push(err);
        }
      });
    }
  });

  return errors;
}
