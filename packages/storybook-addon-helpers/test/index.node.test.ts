import { describe, it, vi } from 'vitest';
import { experimental_indexers, viteFinal } from '../src/index.ts';
import { generateCSFPlugin } from '../src/plugin.ts';

describe('index.ts', function coverageTests() {
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
