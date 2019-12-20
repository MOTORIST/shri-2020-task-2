import jsonToAst, { ObjectNode } from 'json-to-ast';

export function getBlockNode(blockName = 'BlockName'): ObjectNode {
  const blockJson = `{"block": "${blockName}"}`;
  return jsonToAst(blockJson) as ObjectNode;
}
