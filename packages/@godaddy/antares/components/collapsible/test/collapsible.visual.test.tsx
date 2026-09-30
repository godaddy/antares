import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { WithStatusExample } from '../examples/with-status.tsx';
import { DisabledExample } from '../examples/disabled.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Collapsible', function collapsibleTests() {
    it.each([
      ['default', <DefaultExample />],
      ['controlled', <ControlledExample />],
      ['with-status', <WithStatusExample />],
      ['disabled', <DisabledExample />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);

      await expect(container).toMatchScreenshot(name);
    });
  });
});
