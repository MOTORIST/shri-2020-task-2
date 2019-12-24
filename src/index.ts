import { LinterError } from './types/LinterError';
import jsonToAst, { ValueNode } from 'json-to-ast';
import { RulesDataBuffer } from './types/RulesDataBuffer';
import { mergeRulesData, collectRulesData, validation } from './rules';
import { getContent, isBlock, getBlockName } from './helpers/bemaot';
import { Path, setPath } from './helpers/path';
import { Rules } from './types/Rules';
import rulesArray from './rules/rules';

function traverse(
  node: ValueNode,
  path: Path = [],
  rules: Rules[] = rulesArray,
): RulesDataBuffer {
  let rulesDataBuffer: RulesDataBuffer = {};

  if (node.type === 'Object') {
    if (isBlock(node)) {
      path = setPath(path, getBlockName(node) as string);
    }

    rulesDataBuffer = mergeRulesData(
      rulesDataBuffer,
      collectRulesData(node, path),
    );

    const content = getContent(node);

    if (content) {
      rulesDataBuffer = mergeRulesData(
        rulesDataBuffer,
        traverse(content, path),
      );
    }
  }

  if (node.type === 'Array') {
    node.children.forEach((child: ValueNode, index: number) => {
      const newPath = setPath(path, index);
      rulesDataBuffer = mergeRulesData(
        rulesDataBuffer,
        traverse(child, newPath),
      );
    });
  }

  return rulesDataBuffer;
}

export default function linter(json: string): LinterError[] {
  if (!json) {
    throw new Error('json parameter is required');
  }

  const aot: ValueNode = jsonToAst(json);
  const rulesDataBuffer = traverse(aot);
  const errors: LinterError[] = validation(rulesDataBuffer);

  return errors;
}

const _global =
  typeof window !== 'undefined' ? (window as any) : (global as any);

_global.linter = linter;
