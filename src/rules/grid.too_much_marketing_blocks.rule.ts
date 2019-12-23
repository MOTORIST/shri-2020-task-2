import { RulesDataBuffer } from '../types/RulesDataBuffer';
import { LinterError, LinterErrorLocation } from '../types/LinterError';
import { ObjectNode, Location, ValueNode } from 'json-to-ast';
import {
  isBlock,
  getMods,
  getLocation,
  getContent,
  isElem,
  getElemMods,
  hasBlock,
} from '../helpers/bemaot';

type ElemMod = number | null;

interface Data {
  countColumns: ElemMod;
  mColPayment: ElemMod;
  mColOffer: ElemMod;
  loc: LinterErrorLocation;
}

export const ERROR_CODE: string = 'GRID.TOO_MUCH_MARKETING_BLOCKS';
export const ERROR_TEXT =
  'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid.';

export function getDataForRule(node: ObjectNode): Data | undefined {
  if (!isBlock(node, 'grid')) {
    return;
  }

  const data: Data = {
    countColumns: null,
    mColPayment: null,
    mColOffer: null,
    loc: getLocation(node.loc as Location),
  };

  const gridMods = getMods(node);

  if (!gridMods || !gridMods['m-columns']) {
    return;
  }

  data.countColumns = Number.parseInt(gridMods['m-columns'] as string, 10);

  const gridContent = getContent(node);

  if (!gridContent || gridContent.type !== 'Array') {
    return;
  }

  gridContent.children.forEach((gridNode: ValueNode) => {
    if (isElem(gridNode as ObjectNode, 'fraction')) {
      const fractionMods = getElemMods(gridNode as ObjectNode);
      const mColFractionMod = fractionMods && fractionMods['m-col'];

      if (hasBlock(gridNode as ObjectNode, 'payment') && mColFractionMod) {
        data.mColPayment = Number.parseInt(mColFractionMod as string, 10);
      }

      if (hasBlock(gridNode as ObjectNode, 'offer') && mColFractionMod) {
        data.mColOffer = Number.parseInt(mColFractionMod as string, 10);
      }
    }
  });

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
    if (
      data.mColOffer &&
      data.countColumns &&
      data.mColOffer > Math.floor(data.countColumns / 2)
    ) {
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
