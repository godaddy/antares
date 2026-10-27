import { beforeEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Tooltip', function tooltipTests() {
    it('open tooltip', async function openTooltip() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function visible() {
        await expect.element(getByRole('tooltip')).toBeVisible();
      });

      await new Promise(function settleTransition(resolve) {
        setTimeout(resolve, 200);
      });

      await expect(getByRole('tooltip').element()).toMatchScreenshot('open');
    });
  });
});
