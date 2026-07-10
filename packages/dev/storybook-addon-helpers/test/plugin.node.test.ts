import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/storybook/csf-transformer.ts', () => ({
  csfTransformer: vi.fn().mockResolvedValue('mocked-csf-output')
}));

import { generateCSFPlugin } from '../src/storybook/plugin.ts';
import { csfTransformer } from '../src/storybook/csf-transformer.ts';

describe('generateCSFPlugin', function pluginTests() {
  it('should return a plugin with the correct name', function testPluginName() {
    const plugin = generateCSFPlugin(/\.stories\.tsx$/);
    expect(plugin.name).toBe('bento-storybook-addon-helpers');
  });

  it('should call addWatchFile and csfTransformer when filename matches', async function testMatchingFile() {
    const plugin = generateCSFPlugin(/\.stories\.tsx$/);
    const addWatchFile = vi.fn();
    const result = await (plugin.load as Function).call({ addWatchFile }, 'button.stories.tsx');

    expect(addWatchFile).toHaveBeenCalledWith('button.stories.tsx');
    expect(csfTransformer).toHaveBeenCalledWith({ filePath: 'button.stories.tsx', defaults: undefined });
    expect(result).toBe('mocked-csf-output');
  });

  it('forwards docsDefaults to csfTransformer', async function testForwardsDefaults() {
    const defaults = { categories: { Events: [/^on/] } };
    const plugin = generateCSFPlugin(/\.stories\.tsx$/, defaults);
    const addWatchFile = vi.fn();
    await (plugin.load as Function).call({ addWatchFile }, 'button.stories.tsx');

    expect(csfTransformer).toHaveBeenCalledWith({ filePath: 'button.stories.tsx', defaults });
  });

  it('should return null when filename does not match', async function testNonMatchingFile() {
    const plugin = generateCSFPlugin(/\.stories\.tsx$/);
    const addWatchFile = vi.fn();
    const result = await (plugin.load as Function).call({ addWatchFile }, 'button.tsx');

    expect(addWatchFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
