import { ObjectNode } from 'json-to-ast';
import { RulesDataBuffer } from './RulesDataBuffer';
import { LinterError } from './LinterError';

export type GetDataForRule = (node: ObjectNode) => object | undefined;
export type Rule = (rulesDataBuffer: RulesDataBuffer) => LinterError[];

export interface Rules {
  ERROR_CODE: string;
  getDataForRule: GetDataForRule;
  rule: Rule;
}
