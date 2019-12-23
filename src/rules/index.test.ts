import { collectRulesData, mergeRulesData, validation } from '.';
import { getBlockNode } from '../../tests/fixtures/bemaot.fixtures';
import { fixtureRules } from '../../tests/fixtures/rules.fixtures';
import { FIXTURE_ERROR } from '../../tests/fixtures/rule.fixtures';
import { RulesDataBuffer } from '../types/RulesDataBuffer';

describe('collectRulesData', () => {
  const blockNode = getBlockNode();

  it('should return empty object, if rules array empty', () => {
    expect(collectRulesData(blockNode, [], [])).toEqual({});
  });

  it('should return RulesDataBuffer object, if getDataForRule return data object', () => {
    const rulesDataBuffer: RulesDataBuffer = {
      FIXTURE_ERROR_CODE: [{ fixtureData: true }],
    };

    expect(collectRulesData(blockNode, [], fixtureRules)).toEqual(
      rulesDataBuffer,
    );
  });
});

describe('mergeRulesData', () => {
  it('should return empty object, if arguments empty objects', () => {
    expect(mergeRulesData({}, {}, {})).toEqual({});
  });

  it('should return common rulesDataBuffer from many RulesDataBuffer arguments', () => {
    const rulesDataBuffer01: RulesDataBuffer = {
      FIXTURE_ERROR_CODE: [{ fixtureData01: true }],
    };

    const rulesDataBuffer02: RulesDataBuffer = {
      FIXTURE_ERROR_CODE: [{ fixtureData02: true }],
    };

    const rulesDataBuffer03: RulesDataBuffer = {
      FIXTURE_ERROR_CODE3: [{ fixtureData03: true }],
    };

    const rulesDataBuffer: RulesDataBuffer = {
      FIXTURE_ERROR_CODE: [{ fixtureData01: true }, { fixtureData02: true }],
      FIXTURE_ERROR_CODE3: [{ fixtureData03: true }],
    };

    expect(
      mergeRulesData(rulesDataBuffer01, rulesDataBuffer02, rulesDataBuffer03),
    ).toEqual(rulesDataBuffer);
  });
});

describe('validation', () => {
  const rulesDataBuffer: RulesDataBuffer = {};

  it('should return empty array, if not rules', () => {
    expect(validation(rulesDataBuffer, [])).toEqual([]);
  });

  it('should return errors array, if rule return error', () => {
    expect(validation(rulesDataBuffer, fixtureRules)).toEqual([FIXTURE_ERROR]);
  });
});
