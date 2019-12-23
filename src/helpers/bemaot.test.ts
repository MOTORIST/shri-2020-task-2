import jsonToAst, { ObjectNode, Location } from 'json-to-ast';
import {
  isBlockOrElem,
  getContent,
  getLocation,
  getMods,
  getBlockName,
  isElem,
  getElemMods,
  hasBlock,
} from './bemaot';
import {
  getBlockNode,
  getFixtureBlockNodeWithMods,
  getFixtureElement,
  getFixtureElementWithMods,
  getFixtureBlockNodeWithBlock,
  getFixtureBlockNodeWithBlocks,
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

describe('isElem', () => {
  it('should return false, if node is not element', () => {
    const blockNode = getBlockNode();
    expect(isElem(blockNode)).toBeFalsy();
  });

  it('should return true, if node is element', () => {
    const elemNode = getFixtureElement();
    expect(isElem(elemNode)).toBeTruthy();
  });

  it('should return false, if element node has not name fixtureElem', () => {
    const elemNode = getFixtureElement('fixtureElem');
    expect(isElem(elemNode, 'failFixtureElem')).toBeFalsy();
  });

  it('should return false, if element node has  name fixtureElem', () => {
    const elemNode = getFixtureElement('fixtureElem');
    expect(isElem(elemNode, 'fixtureElem')).toBeTruthy();
  });
});

describe('getElemMods', () => {
  it('should return undefined, if elem has not mods', () => {
    const elemNode = getFixtureElement('fixtureElem');
    expect(getElemMods(elemNode)).toBeUndefined();
  });

  it('should return object mods', () => {
    const elemNode = getFixtureElementWithMods();
    expect(getElemMods(elemNode)).toEqual({ fixture: true });
  });
});

describe('hasBlock', () => {
  it('should return false, if block has not content', () => {
    const blockNode = getBlockNode();
    expect(hasBlock(blockNode, 'fixtureName')).toBeFalsy();
  });

  it('should return false, if block has not fixtureName block', () => {
    const blockNode = getFixtureBlockNodeWithBlock('subBlock');
    expect(hasBlock(blockNode, 'fixtureName')).toBeFalsy();
  });

  it('should return true, if block has fixtureName block', () => {
    const blockNode = getFixtureBlockNodeWithBlock('fixtureName');
    expect(hasBlock(blockNode, 'fixtureName')).toBeTruthy();
  });

  it('should return true, if block has fixtureName block among other blocks', () => {
    const blockNode = getFixtureBlockNodeWithBlocks('fixtureName');
    expect(hasBlock(blockNode, 'fixtureName')).toBeTruthy();
  });
});
