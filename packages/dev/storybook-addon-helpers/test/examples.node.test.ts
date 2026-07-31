import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { discoverExamples, discoverExamplesForReadme, findExamplesGetter } from '../src/examples.ts';

const FIXTURE_DIR = path.join(__dirname, 'fixtures/examples-fixture');

describe('examples', function examplesTests() {
  describe('discoverExamples', function discoverExamplesTests() {
    it('orders by @order then unordered alphabetically, deriving titles and story names', async function ordering() {
      const descriptors = await discoverExamples({ dir: FIXTURE_DIR });

      expect(descriptors.map((d) => ({ storyName: d.storyName, title: d.title, order: d.order }))).toEqual([
        { storyName: 'Default', title: 'Basic Usage', order: 1 },
        { storyName: 'Primary', title: 'Primary', order: 2 },
        { storyName: 'IconOnly', title: 'Icon Only', order: 3 },
        { storyName: 'Alpha', title: 'Alpha', order: undefined }
      ]);
    });

    it('captures export name, import path, and JSDoc description', async function fields() {
      const descriptors = await discoverExamples({ dir: FIXTURE_DIR });
      const primary = descriptors.find((d) => d.storyName === 'Primary');

      expect(primary).toMatchObject({
        componentExportName: 'PrimaryExample',
        importPath: './examples/primary.tsx',
        description: 'The primary action.'
      });
      expect(primary?.filePath).toContain(path.join('examples', 'primary.tsx'));
    });

    it('strips the metadata JSDoc from the displayed source', async function strippedSource() {
      const descriptors = await discoverExamples({ dir: FIXTURE_DIR });
      const primary = descriptors.find((d) => d.storyName === 'Primary');

      expect(primary?.source).toContain('export function PrimaryExample');
      expect(primary?.source).not.toContain('@order');
      expect(primary?.source).not.toContain('The primary action.');
    });

    it('skips @ignore, -playground, and files that export no function', async function exclusions() {
      const names = (await discoverExamples({ dir: FIXTURE_DIR })).map((d) => d.storyName);

      expect(names).not.toContain('Ignored');
      expect(names).not.toContain('WidgetPlayground');
      expect(names).not.toContain('Placeholder');
    });

    it('honors an examples folder override', async function override() {
      const descriptors = await discoverExamples({ dir: FIXTURE_DIR, examplesDir: 'examples/' });
      expect(descriptors.length).toBeGreaterThan(0);
    });

    it('returns an empty list when the folder is missing', async function missing() {
      expect(await discoverExamples({ dir: path.join(FIXTURE_DIR, 'does-not-exist') })).toEqual([]);
    });
  });

  describe('findExamplesGetter', function findExamplesGetterTests() {
    it('finds the first getExamples export and its folder argument', function first() {
      const code = `export const meta = 1;\nexport const examples = getExamples('./cases');`;
      expect(findExamplesGetter(code, 'x.stories.tsx')).toEqual({ exportName: 'examples', examplesDir: './cases' });
    });

    it('matches a specific export name and reports a missing argument as undefined', function named() {
      const code = `export const a = getExamples('./a');\nexport const bb = getExamples();`;
      expect(findExamplesGetter(code, 'x.stories.tsx', 'bb')).toEqual({ exportName: 'bb', examplesDir: undefined });
    });

    it('returns undefined when no export is a getExamples call', function none() {
      const code = `export const examples = somethingElse();\nconst local = getExamples('./x');`;
      expect(findExamplesGetter(code, 'x.stories.tsx')).toBeUndefined();
    });

    it('treats a non-string-literal argument as no folder', function nonLiteral() {
      const code = `const dir = './x';\nexport const examples = getExamples(dir);`;
      expect(findExamplesGetter(code, 'x.stories.tsx')).toEqual({ exportName: 'examples', examplesDir: undefined });
    });

    it('ignores non-identifier (destructured) exports', function destructured() {
      const code = `export const [first] = getExamples('./x');`;
      expect(findExamplesGetter(code, 'x.stories.tsx')).toBeUndefined();
    });
  });

  describe('discoverExamplesForReadme', function discoverExamplesForReadmeTests() {
    it('resolves the folder via of={Stories.<name>} and the colocated stories file', async function resolves() {
      const result = await discoverExamplesForReadme({
        readmePath: path.join(FIXTURE_DIR, 'README.mdx'),
        exportName: 'examples'
      });

      expect(result.storiesPath).toBe(path.join(FIXTURE_DIR, 'widget.stories.tsx'));
      expect(result.descriptors.map((d) => d.storyName)).toContain('Default');
    });

    it('returns nothing when the export name is unknown', async function unknown() {
      const result = await discoverExamplesForReadme({
        readmePath: path.join(FIXTURE_DIR, 'README.mdx'),
        exportName: 'missing'
      });
      expect(result).toEqual({ descriptors: [], storiesPath: '' });
    });

    it('returns nothing when there is no colocated stories file', async function noStories() {
      const result = await discoverExamplesForReadme({
        readmePath: path.join(__dirname, 'fixtures/no-examples/README.mdx')
      });
      expect(result).toEqual({ descriptors: [], storiesPath: '' });
    });

    it('returns nothing when the README directory does not exist', async function missingDir() {
      const result = await discoverExamplesForReadme({
        readmePath: path.join(__dirname, 'fixtures/does-not-exist/README.mdx')
      });
      expect(result).toEqual({ descriptors: [], storiesPath: '' });
    });
  });
});
