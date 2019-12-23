import { LinterError } from './types/LinterError';
import jsonToAst, { ValueNode } from 'json-to-ast';
import { RulesDataBuffer } from './types/RulesDataBuffer';
import { mergeRulesData, collectRulesData, validation } from './rules';
import { getContent } from './helpers/bemaot';

function traverse(node: ValueNode): RulesDataBuffer {
  let rulesDataBuffer: RulesDataBuffer = {};

  if (node.type === 'Object') {
    rulesDataBuffer = mergeRulesData(rulesDataBuffer, collectRulesData(node));

    const content = getContent(node);

    if (content) {
      rulesDataBuffer = mergeRulesData(rulesDataBuffer, traverse(content));
    }
  }

  if (node.type === 'Array') {
    node.children.forEach((child: ValueNode, index: number) => {
      rulesDataBuffer = mergeRulesData(rulesDataBuffer, traverse(child));
    });
  }

  return rulesDataBuffer;
}

export default function linter(json: string) {
  if (!json) {
    throw new Error('json parameter is required');
  }

  const aot: ValueNode = jsonToAst(json);
  const rulesDataBuffer = traverse(aot);
  const errors: LinterError[] = validation(rulesDataBuffer);

  return errors;
}
