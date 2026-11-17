import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { consumerBudgetKey, consumerCases, discoverPublicApi } from '../bundle-discovery.ts';

const temporaryDirectories: string[] = [];
afterEach(async function cleanFixtures() {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

/** Builds the package files needed to exercise public export resolution. */
async function fixture(exports: Record<string, unknown>, files: Record<string, string>) {
  const root = await mkdtemp(join(tmpdir(), 'bundle-export-patterns-'));
  temporaryDirectories.push(root);
  await writeFile(join(root, 'package.json'), JSON.stringify({ name: '@fixture/ui', type: 'module', exports }));
  for (const [path, source] of Object.entries(files)) {
    await mkdir(dirname(join(root, path)), { recursive: true });
    await writeFile(join(root, path), source);
  }
  return discoverPublicApi(root, [{ name: '@fixture/ui', root }]);
}

describe('package export patterns', function exportPatternTests() {
  it('discovers nested paths captured by one export wildcard', async function discoversNestedPaths() {
    const entries = await fixture(
      { './*': './dist/*.mjs' },
      {
        'dist/Root.mjs': 'export const Root = 1;',
        'dist/nested/Child.mjs': 'export const Child = 2;',
        'dist/nested/Child.mjs.map': '{}'
      }
    );
    expect(entries.map(({ from, exports }) => ({ from, exports }))).toEqual([
      { from: '@fixture/ui/nested/Child', exports: ['Child'] },
      { from: '@fixture/ui/Root', exports: ['Root'] }
    ]);
  });

  it('honors explicit targets and null exclusions before wildcard targets', async function honorsExplicitOverrides() {
    const entries = await fixture(
      { './*': './dist/*.mjs', './Root': './overrides/root.mjs', './Hidden': null },
      {
        'dist/Root.mjs': 'export const Wrong = 1;',
        'dist/Hidden.mjs': 'export const Hidden = 2;',
        'overrides/root.mjs': 'export const Correct = 3;'
      }
    );
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      from: '@fixture/ui/Root',
      target: 'overrides/root.mjs',
      exports: ['Correct']
    });
  });

  it('treats target prefixes literally and includes dotfiles matched by an export', async function discoversLiteralPaths() {
    const entries = await fixture(
      { './*': './dist[production]/*.mjs' },
      { 'dist[production]/.nested/Hidden.mjs': 'export const Hidden = 1;' }
    );
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      from: '@fixture/ui/.nested/Hidden',
      target: 'dist[production]/.nested/Hidden.mjs',
      exports: ['Hidden']
    });
  });

  it.each([null, { browser: null, import: './dist/internal/*.mjs' }])(
    'excludes nested imports covered by a more specific blocked pattern (%j)',
    async function honorsNullPatterns(target) {
      const entries = await fixture(
        { './*': './dist/*.mjs', './internal/*': target },
        {
          'dist/Public.mjs': 'export const Public = 1;',
          'dist/internal/Secret.mjs': 'export const Secret = 2;',
          'dist/internal/nested/Hidden.mjs': 'export const Hidden = 3;'
        }
      );
      expect(entries.map((entry) => entry.from)).toEqual(['@fixture/ui/Public']);
    }
  );

  it.each([false, true])(
    'selects the longest pattern prefix and suffix regardless of declaration order (reversed: %s)',
    async function selectsSpecificPatterns(reversed) {
      const patterns = [
        ['./*', './dist/*.mjs'],
        ['./feature/*', './specific/*.mjs'],
        ['./feature/*.mjs', './extension/*.mjs']
      ];
      const entries = await fixture(Object.fromEntries(reversed ? patterns.reverse() : patterns), {
        'dist/feature/Choice.mjs': 'export const Wrong = 1;',
        'dist/feature/Mode.mjs.mjs': 'export const Wrong = 2;',
        'specific/Choice.mjs': 'export const Prefix = 3;',
        'specific/Mode.mjs.mjs': 'export const Wrong = 4;',
        'extension/Mode.mjs': 'export const Suffix = 5;'
      });
      expect(entries.map(({ from, target, exports }) => ({ from, target, exports }))).toEqual([
        { from: '@fixture/ui/feature/Choice', target: 'specific/Choice.mjs', exports: ['Prefix'] },
        { from: '@fixture/ui/feature/Mode.mjs', target: 'extension/Mode.mjs', exports: ['Suffix'] }
      ]);
    }
  );

  it('expands the selected nested browser production condition', async function selectsNestedConditions() {
    const entries = await fixture(
      {
        './*': {
          browser: { production: './dist/*.mjs', default: './fallback/*.mjs' },
          import: './other/*.mjs'
        }
      },
      { 'dist/nested/Browser.mjs': 'export const Browser = 1;' }
    );
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({
      from: '@fixture/ui/nested/Browser',
      target: 'dist/nested/Browser.mjs',
      exports: ['Browser']
    });
  });
});

describe('package export conditions', function exportConditionTests() {
  it.each([
    { name: 'browser null before import', target: { browser: null, import: './dist/Entry.mjs' } },
    {
      name: 'nested null before default and sibling import',
      target: { browser: { production: null, default: './dist/Entry.mjs' }, import: './dist/Entry.mjs' }
    },
    { name: 'null with a types fallback', target: { browser: null, types: './dist/Entry.d.ts' } },
    { name: 'array containing only null', target: [null] },
    {
      name: 'array containing a nested null and an inapplicable condition',
      target: [{ browser: null }, { node: './dist/Entry.mjs' }]
    },
    { name: 'empty array with a types fallback', target: { browser: [], types: './dist/Entry.d.ts' } }
  ])('excludes a blocked export: $name', async function excludesBlockedConditions({ target }) {
    const entries = await fixture(
      { './Entry': target },
      { 'dist/Entry.mjs': 'export const Entry = 1;', 'dist/Entry.d.ts': 'export declare const Entry: number;' }
    );
    expect(entries).toEqual([]);
  });

  it.each([
    [null, './dist/Entry.mjs'],
    [{ browser: { production: null, default: './dist/Wrong.mjs' } }, './dist/Entry.mjs']
  ])('uses a later array alternative after a blocked target (%j)', async function selectsArrayFallback(...target) {
    const entries = await fixture(
      { './Entry': target },
      { 'dist/Entry.mjs': 'export const Entry = 1;', 'dist/Wrong.mjs': 'export const Wrong = 2;' }
    );
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ target: 'dist/Entry.mjs', exports: ['Entry'] });
  });

  it('tries the next condition when a nested condition does not apply', async function skipsInapplicableConditions() {
    const entries = await fixture(
      { './Entry': { browser: { node: './dist/Wrong.mjs' }, import: './dist/Entry.mjs' } },
      { 'dist/Entry.mjs': 'export const Entry = 1;', 'dist/Wrong.mjs': 'export const Wrong = 2;' }
    );
    expect(entries).toHaveLength(1);
    expect(entries[0]).toMatchObject({ target: 'dist/Entry.mjs', exports: ['Entry'] });
  });

  it.each([{ types: './dist/Entry.d.ts' }, { browser: [{ node: './dist/Wrong.mjs' }], types: './dist/Entry.d.ts' }])(
    'catalogues types when no runtime condition applies (%j)',
    async function catalogsTypes(target) {
      const entries = await fixture(
        { './Entry': target },
        { 'dist/Entry.d.ts': 'export declare const Entry: number;' }
      );
      expect(entries).toHaveLength(1);
      expect(entries[0]).toMatchObject({
        from: '@fixture/ui/Entry',
        target: 'dist/Entry.d.ts',
        kind: 'types',
        reason: 'Type declarations; no browser runtime.'
      });
    }
  );
});

describe('consumer budget keys', function consumerBudgetKeyTests() {
  it('keeps readable budget keys separate from hashed case IDs', function separatesPublicBudgetKeys() {
    const cases = consumerCases([
      {
        package: '@fixture/ui',
        from: '@fixture/ui',
        target: 'dist/index.mjs',
        kind: 'javascript',
        exports: ['Button']
      }
    ]);

    expect(cases.map(({ budgetKey }) => budgetKey)).toEqual(['entry:@fixture/ui', 'export:@fixture/ui#Button']);
    expect(cases.map(({ target }) => target)).toEqual(['dist/index.mjs', 'dist/index.mjs']);
    expect(cases.map(({ id }) => id)).toEqual([
      expect.stringMatching(/^auto-entry-fixture-ui-[a-f0-9]{12}$/),
      expect.stringMatching(/^auto-export-fixture-ui-Button-[a-f0-9]{12}$/)
    ]);
  });

  it('escapes budget-key delimiters in import paths and export names', function escapesDelimiters() {
    expect(consumerBudgetKey({ scope: 'export', from: '@fixture/ui#docs', names: ['Button%#Menu'] })).toBe(
      'export:@fixture/ui%23docs#Button%25%23Menu'
    );
  });
});
