import jsonToAst, { ObjectNode } from 'json-to-ast';
import { isBlockOrElem, getContent } from './bemaot';

describe('isBlockOrElem', () => {
  it('should return true, if node is block', () => {
    const blockJson = `{"block": "NameBlock"}`;
    const blockNode = jsonToAst(blockJson) as ObjectNode;

    expect(isBlockOrElem(blockNode)).toBeTruthy();
  });

  it('should return true, if node is element', () => {
    const elemJson = `{"block": "NameBlock", "elem": "ElemName"}`;
    const elemNode = jsonToAst(elemJson) as ObjectNode;

    expect(isBlockOrElem(elemNode)).toBeTruthy();
  });
});

describe('getContent', () => {
  it('should return undefined, if block or element has not content', () => {
    const blockJson = `{"block": "NameBlock"}`;
    const blockNode = jsonToAst(blockJson) as ObjectNode;

    expect(getContent(blockNode)).toBeUndefined();
  });

  it('should return node type is Object, if block content is object', () => {
    const blockJson = `
    {
      "block": "NameBlock",
      "content": {
        "elem": "ElementName"
      }
    }`;

    const blockNode = jsonToAst(blockJson) as ObjectNode;

    expect(getContent(blockNode)?.type).toBe('Object');
  });

  it('should return node type is Array, if block content is array', () => {
    const blockJson = `
    {
      "block": "NameBlock",
      "content": [
        { "elem": "ElementName" }
      ]
    }`;

    const blockNode = jsonToAst(blockJson) as ObjectNode;

    expect(getContent(blockNode)?.type).toBe('Array');
  });
});
