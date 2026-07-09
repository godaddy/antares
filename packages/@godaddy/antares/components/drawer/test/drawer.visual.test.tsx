import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import assume from 'assume';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';

const PLACEMENTS = ['left', 'right', 'top', 'bottom'] as const;

// Open the drawer, wait past the 0.2s slide transition, then screenshot the panel.
async function settle() {
  await new Promise(function wait(r) {
    setTimeout(r, 400);
  });
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Drawer', function drawerTests() {
    it.each(PLACEMENTS)('renders %s placement', async function placement(p) {
      const { getByRole } = await render(<PlacementsExample />);

      await getByRole('button', { name: `Open ${p}` }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await settle();

      const panel = document.querySelector('[data-placement]') as HTMLElement;
      await expect(panel).toMatchScreenshot(`placement-${p}`);
    });

    it('renders bottom sheet with close button', async function bottomSheet() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await settle();

      const panel = document.querySelector('[data-placement]') as HTMLElement;
      await expect(panel).toMatchScreenshot('bottom-sheet');
    });
  });
});
