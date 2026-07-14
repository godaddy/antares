import { describe, expect, it, vi } from 'vitest';

vi.mock('../src/storybook/plugin.ts', () => ({
  generateCSFPlugin: vi.fn(() => ({ name: 'bento-storybook-addon-helpers' }))
}));

import { viteFinal } from '../src/index.ts';
import { generateCSFPlugin } from '../src/storybook/plugin.ts';

describe('viteFinal docsDefaults forwarding', function viteFinalDefaults() {
  it('reads docsDefaults from preset options and forwards them to the plugin', async function forwards() {
    const docsDefaults = { categories: { Events: [/^on/] } };
    const config: Record<string, unknown> = {};

    await (viteFinal as any)(config, { docsDefaults });

    expect(generateCSFPlugin).toHaveBeenCalledWith(expect.any(RegExp), docsDefaults);
    expect(config.plugins).toHaveLength(1);
  });

  it('passes undefined when no docsDefaults are configured', async function noDefaults() {
    const config: Record<string, unknown> = {};

    await (viteFinal as any)(config, {});

    expect(generateCSFPlugin).toHaveBeenCalledWith(expect.any(RegExp), undefined);
  });
});
