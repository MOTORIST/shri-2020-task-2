import { ObjectNode, PropertyNode, ValueNode, ArrayNode } from 'json-to-ast';

export function isBlockOrElem(node: ObjectNode): boolean {
  return node.children.some(
    (child: PropertyNode) =>
      child.key.value === 'block' || child.key.value === 'elem',
  );
}

export function getContent(
  node: ObjectNode,
): ObjectNode | ArrayNode | undefined {
  const contentProperty = node.children.find((child: PropertyNode) => {
    return child.key.value === 'content';
  });

  return contentProperty?.value as ObjectNode | ArrayNode;
}
