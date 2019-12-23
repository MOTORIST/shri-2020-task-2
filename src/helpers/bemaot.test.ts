import jsonToAst, { ObjectNode, Location } from 'json-to-ast';
import {
  isBlockOrElem,
  getContent,
  getLocation,
  getMods,
  getBlockName,
} from './bemaot';
import {
  getBlockNode,
  getFixtureBlockNodeWithMods,
} from '../../tests/fixtures/bemaot.fixtures';
import { FIXTURE_ERROR } from '../../tests/fixtures/rule.fixtures';
import { LinterErrorLocation } from '../types/LinterError';

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

describe('getLocation', () => {
  const locationNode: Location = {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 2, offset: 0 },
    source: null,
  };

  const linterErrorLocation: LinterErrorLocation = {
    start: {
      column: 1,
      line: 1,
    },
    end: {
      column: 2,
      line: 1,
    },
  };

  it('should return LinterErrorLocation object', () => {
    expect(getLocation(locationNode)).toEqual(linterErrorLocation);
  });
});

describe('getMods', () => {
  it('should return undefined, if block has not mods', () => {
    expect(getMods(getBlockNode())).toBeUndefined();
  });

  it('should return mods object, if block has mods', () => {
    expect(getMods(getFixtureBlockNodeWithMods())).toEqual({ fixture: true });
  });
});

describe('getBlockName', () => {
  it('should return block name', () => {
    const blockNode = getBlockNode('fixtureBlock');

    expect(getBlockName(blockNode)).toBe('fixtureBlock');
  });
});
