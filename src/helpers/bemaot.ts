import {
  ObjectNode,
  PropertyNode,
  ArrayNode,
  LiteralNode,
  Location,
} from 'json-to-ast';
import { LinterErrorLocation } from '../types/LinterError';

interface Mods {
  [key: string]: string | number | boolean | null;
}

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

export function isBlock(node: ObjectNode, name: string | null = null): boolean {
  let hasBlock = false;
  let hasElement = false;
  let hasName = true;

  node.children.forEach((child: PropertyNode) => {
    if (child.key.value === 'block') {
      hasBlock = true;

      if (name && (child.value as LiteralNode).value !== name) {
        hasName = false;
      }
    }

    if (child.key.value === 'elem') {
      hasElement = true;
    }
  });

  return hasBlock && !hasElement && hasName;
}

export function getLocation(locData: Location): LinterErrorLocation {
  return {
    start: {
      line: locData.start.line,
      column: locData.start.column,
    },
    end: {
      line: locData.end.line,
      column: locData.end.column,
    },
  };
}

export function getMods(node: ObjectNode): Mods | undefined {
  const contentProperty = node.children.find((child: PropertyNode) => {
    return child.key.value === 'mods';
  });

  if (!contentProperty) {
    return;
  }

  const mods = (contentProperty?.value as ObjectNode).children.reduce(
    (modsAcc: Mods, child: PropertyNode) => {
      modsAcc[child.key.value] = (child.value as LiteralNode).value;

      return modsAcc;
    },
    {},
  );

  return mods;
}
