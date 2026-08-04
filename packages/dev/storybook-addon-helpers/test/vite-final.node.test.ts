import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/storybook/plugin.ts', () => ({
  generateCSFPlugin: vi.fn(() => ({ name: 'bento-storybook-addon-helpers' }))
}));

vi.mock('../src/storybook/examples-plugin.ts', () => ({
  generateExamplesPlugin: vi.fn(() => ({ name: 'bento-storybook-addon-helpers-examples' }))
}));

import { viteFinal } from '../src/index.ts';
import { generateCSFPlugin } from '../src/storybook/plugin.ts';
import { generateExamplesPlugin } from '../src/storybook/examples-plugin.ts';

describe('viteFinal docsDefaults forwarding', function viteFinalDefaults() {
  it('reads docsDefaults from preset options and forwards them to the plugin', async function forwards() {
    const docsDefaults = { categories: { Events: [/^on/] } };
    const config: Record<string, unknown> = {};

    await (viteFinal as any)(config, { docsDefaults });

    expect(generateCSFPlugin).toHaveBeenCalledWith(expect.any(RegExp), docsDefaults);
    expect(generateExamplesPlugin).toHaveBeenCalledWith(expect.any(RegExp));
    expect(config.plugins).toHaveLength(2);
  });

  it('passes undefined when no docsDefaults are configured', async function noDefaults() {
    const config: Record<string, unknown> = {};

    await (viteFinal as any)(config, {});

    expect(generateCSFPlugin).toHaveBeenCalledWith(expect.any(RegExp), undefined);
  });
});
