import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Tooltip', function tooltipTests() {
    it('open tooltip', async function openTooltip() {
      const originalViewport = { width: window.innerWidth, height: window.innerHeight };
      await page.viewport(320, 120);
      const { getByRole, unmount } = await render(
        <DefaultExample tooltipTriggerProps={{ defaultOpen: true }} tooltipProps={{ placement: 'bottom' }} />
      );

      try {
        const tooltip = getByRole('tooltip');
        await expect.element(tooltip).toBeVisible();
        await expect
          .element(tooltip)
          .toHaveStyle({ backgroundColor: 'rgb(17, 17, 17)', padding: '8px 16px', opacity: '1' });
        await expect.element(getByRole('button', { name: 'Hover me' })).toBeVisible();

        // Capture both the trigger and the arrow beyond the panel's bounds.
        await expect(document.body).toMatchScreenshot('open');
      } finally {
        await unmount();
        await page.viewport(originalViewport.width, originalViewport.height);
      }
    });
  });
});
