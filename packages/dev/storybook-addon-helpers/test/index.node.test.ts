import { describe, expect, it, vi } from 'vitest';
import { experimental_indexers, processPropsDoc, toStorybookArgTypes, viteFinal } from '../src/index.ts';
import type { DocsOptions, PropDoc, PropsDoc, StorybookDocs } from '../src/index.ts';
import { generateCSFPlugin } from '../src/plugin.ts';

describe('index.ts', function coverageTests() {
  it('exports docs model, processor, and Storybook adapter from the root', function exportsDocsHelpers() {
    const props = [{ name: 'label', type: 'string', required: true }] satisfies PropDoc[];
    const docs = { name: 'Thing', props } satisfies PropsDoc;
    const options = { order: ['label'] } as const satisfies DocsOptions<{ label: string }>;

    const processed = processPropsDoc(docs, options);
    const storybookDocs = toStorybookArgTypes(processed) satisfies StorybookDocs;

    expect(processed.props.map((prop) => prop.name)).toEqual(['label']);
    expect(Object.keys(storybookDocs.argTypes)).toEqual(['label']);
  });

  it('should load index.ts and plugin.ts without throwing', async function testCoverage() {
    // index
    (experimental_indexers as any)();
    (experimental_indexers as any)([]);
    (viteFinal as any)({});

    // plugin
    vi.mock('../src/csf-transformer.ts', () => ({
      csfTransformer: vi.fn().mockReturnValue('mocked-code')
    }));
    const mockContext = { addWatchFile: vi.fn() };
    const plugin = generateCSFPlugin(/\.stories\.tsx$/);
    await (plugin.load as any)?.call(mockContext, 'test.stories.tsx');

    vi.restoreAllMocks();
  });
});
