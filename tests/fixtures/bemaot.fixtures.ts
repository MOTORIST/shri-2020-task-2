import jsonToAst, { ObjectNode } from 'json-to-ast';

export function getBlockNode(blockName = 'BlockName'): ObjectNode {
  const blockJson = `{"block": "${blockName}"}`;
  return jsonToAst(blockJson) as ObjectNode;
}

export function getFixtureBlockNodeWithMods(
  blockName = 'BlockName',
): ObjectNode {
  const blockJson = `
  {
    "block": "${blockName}",
    "mods": { "fixture": true }
  }
  `;

  return jsonToAst(blockJson) as ObjectNode;
}

export function getFixtureBlockNodeWithBlock(
  blockName = 'BlockName',
): ObjectNode {
  const blockJson = `
  {
    "block": "fixture",
    "mods": { "fixture": true },
    "content": {
      "block": "${blockName}"
    }
  }
  `;

  return jsonToAst(blockJson) as ObjectNode;
}

export function getFixtureBlockNodeWithBlocks(
  blockName = 'BlockName',
): ObjectNode {
  const blockJson = `
  {
    "block": "fixture",
    "mods": { "fixture": true },
    "content": [
      { "block": "firstBlock" },
      { "block": "${blockName}" },
      { "block": "lastBlock" }
    ]
  }
  `;

  return jsonToAst(blockJson) as ObjectNode;
}

export function getFixtureElement(elementName = 'ElementName'): ObjectNode {
  const blockJson = `{"elem": "${elementName}"}`;

  return jsonToAst(blockJson) as ObjectNode;
}

export function getFixtureElementWithMods(
  elementName = 'ElementName',
): ObjectNode {
  const elemJson = `
  {
    "elem": "${elementName}",
    "elemMods": { "fixture": true }
  }
  `;

  return jsonToAst(elemJson) as ObjectNode;
}
