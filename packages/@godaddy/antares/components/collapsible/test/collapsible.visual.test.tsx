import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { WithStatusExample } from '../examples/with-status.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { LongContentExample } from '../examples/long-content.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  beforeEach(async function resetViewport() {
    await page.viewport(800, 1000);
  });
  describe('#Collapsible', function collapsibleTests() {
    it.each([
      ['default-closed', <DefaultExample />],
      ['default-open', <DefaultExample defaultExpanded />],
      ['with-status', <WithStatusExample />],
      ['disabled-closed', <DisabledExample />],
      ['disabled-open', <DisabledExample defaultExpanded />]
    ] as const)('%s example', async function exampleScreenshot(name, example) {
      const { container } = await render(example);

      await expect(container).toMatchScreenshot(name);
    });
    it('wraps a long title on a narrow screen', async function narrowScreenshot() {
      await page.viewport(320, 1000);

      const { container } = await render(<LongContentExample />);

      await expect(container).toMatchScreenshot('narrow-long-content');
    });

    it('shows keyboard focus on the complete summary', async function focusScreenshot() {
      const { container } = await render(<DefaultExample />);

      await userEvent.tab();

      await expect.element(page.getByRole('button', { name: 'Advanced settings' })).toHaveFocus();
      await expect(container).toMatchScreenshot('keyboard-focus');
    });

    it('keeps the indicator undecorated on hover', async function hoverScreenshot() {
      const { container } = await render(<DefaultExample />);

      await page.getByRole('button', { name: 'Advanced settings' }).hover();

      await expect(container).toMatchScreenshot('indicator-hover');
    });
  });
});
