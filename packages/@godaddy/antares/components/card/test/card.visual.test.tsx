import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { CornerActionsExample } from '../examples/corner-actions.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { LayoutExample } from '../examples/layout.tsx';
import { MediaExample } from '../examples/media.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';

/**
 * Playwright clips element screenshots that overflow the iframe. Grow the
 * viewport to the example's box so the capture matches the full layout.
 */
async function matchUnclippedScreenshot(container: HTMLElement, name: string) {
  const { width, height } = container.getBoundingClientRect();
  await page.viewport(Math.max(1, Math.ceil(width)), Math.max(1, Math.ceil(height)));
  await expect(container).toMatchScreenshot(name);
}

describe('@godaddy/antares', function packageTests() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Card', function cardVisualTests() {
    it('renders multiline text around corner actions', async function cornerActions() {
      const { container } = await render(<CornerActionsExample />);
      await matchUnclippedScreenshot(container, 'corner-actions');
    });

    it('renders selectable cards with top-end selection indicators', async function selection() {
      const { container } = await render(<MultipleSelectionExample />);
      await matchUnclippedScreenshot(container, 'multiple-selection');
    });

    it('renders disabled links and rows', async function disabled() {
      const { container } = await render(<DisabledExample />);
      await matchUnclippedScreenshot(container, 'disabled');
    });

    it('renders inset, full bleed, standalone and custom media', async function media() {
      const { container } = await render(<MediaExample />);
      await matchUnclippedScreenshot(container, 'media');
    });

    it('renders responsive layout and intrinsic card heights', async function layout() {
      const { container } = await render(<LayoutExample />);
      await matchUnclippedScreenshot(container, 'layout');
    });
  });
});
