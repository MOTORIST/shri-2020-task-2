import { ObjectNode } from 'json-to-ast';

export type GetDataForRule = (node: ObjectNode) => object | undefined;

export interface Rules {
  ERROR_CODE: string;
  getDataForRule: GetDataForRule;
}
