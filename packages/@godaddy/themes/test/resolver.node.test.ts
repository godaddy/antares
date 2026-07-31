import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { parser } from '../scripts/resolver.js';

const fixtures = resolve(import.meta.dirname, 'fixtures');

describe('resolver', function resolverSuite() {
  describe('plain token files', function plainTokenSuite() {
    it('parses a flat token file and returns all tokens', async function parsesFlat() {
      const { sets } = await parser(resolve(fixtures, 'flat.json'));
      expect(sets['color-primary']).toEqual({ $type: 'color', $value: 'blue' });
      expect(sets['size-sm']).toEqual({ $type: 'dimension', $value: '8px' });
    });
  });

  describe('resolver files with inline tokens', function inlineSuite() {
    it('extracts inline tokens from sources', async function extractsInline() {
      const { sets } = await parser(resolve(fixtures, 'inline-only.json'));
      expect(sets['font-size-md']).toEqual({ $type: 'dimension', $value: '1rem' });
      expect(sets['font-size-lg']).toEqual({ $type: 'dimension', $value: '1.25rem' });
    });
  });

  describe('$ref resolution', function refSuite() {
    it('follows $ref to load external token files', async function followsRef() {
      const { sets } = await parser(resolve(fixtures, 'with-ref.json'));
      expect(sets['brand-blue']).toEqual({ $type: 'color', $value: 'royalblue' });
      expect(sets['color-action']).toEqual({ $type: 'color', $value: '{brand-blue}' });
    });

    it('recursively resolves nested resolvers', async function resolvesNested() {
      const { sets } = await parser(resolve(fixtures, 'nested/parent-resolver.json'));
      expect(sets['base-token']).toEqual({ $type: 'color', $value: 'red' });
      expect(sets['child-token']).toEqual({ $type: 'color', $value: 'green' });
    });
  });

  describe('source merging', function mergingSuite() {
    it('later sources override earlier ones for the same token name', async function laterOverrides() {
      const { sets } = await parser(resolve(fixtures, 'override.json'));
      expect(sets['shared'].$value).toBe('second');
    });
  });

  describe('edge cases', function edgeCaseSuite() {
    it('returns empty sets when resolutionOrder references a missing set', async function missingSet() {
      const { sets } = await parser(resolve(fixtures, 'bad-set.json'));
      expect(Object.keys(sets)).toHaveLength(0);
    });

    it('throws on invalid file path', async function invalidPath() {
      await expect(parser(resolve(fixtures, 'nonexistent.json'))).rejects.toThrow();
    });
  });
});
