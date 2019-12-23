import { ObjectNode, Location } from 'json-to-ast';
import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { isBlock, getLocation } from '../helpers/bemaot';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { getStringPath, splitPath, hasParent } from '../helpers/path';

type TypeBlock = 'button' | 'placeholder';

interface Data {
  typeBlock: TypeBlock;
  path: string;
  position: number;
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'WARNING.INVALID_BUTTON_POSITION';
export const ERROR_TEXT =
  'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности.';

export function getDataForRule(
  node: ObjectNode,
  path: string[],
): Data | undefined {
  if (isBlock(node, 'button') && hasParent(path, 'warning')) {
    const { path: blockPath, blockPosition } = splitPath(path);

    return {
      typeBlock: 'button',
      path: getStringPath(path),
      position: blockPosition,
      loc: getLocation(node.loc as Location),
    };
  }

  if (isBlock(node, 'placeholder') && hasParent(path, 'warning')) {
    const { path: blockPath, blockPosition } = splitPath(path);

    return {
      typeBlock: 'placeholder',
      path: getStringPath(path),
      position: blockPosition,
      loc: getLocation(node.loc as Location),
    };
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

  const isError = (data: Data[], button: Data) => {
    return data.some(
      (placeholder: Data) =>
        placeholder.typeBlock === 'placeholder' &&
        button.path === placeholder.path &&
        button.position < placeholder.position,
    );
  };

  rulesData.forEach((button: Data) => {
    if (button.typeBlock === 'button' && isError(rulesData, button)) {
      const err: LinterError = {
        code: ERROR_CODE,
        error: ERROR_TEXT,
        location: button.loc,
      };

      errors.push(err);
    }
  });

  return errors;
}
