import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import assume from 'assume';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { PlacementsExample } from '../examples/placements.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { NestedExample } from '../examples/nested.tsx';
import { NestedPopoverExample } from '../examples/nested-popover.tsx';

const PLACEMENTS = ['left', 'right', 'top', 'bottom'] as const;

// Open the drawer, wait past the scroll-driven slide, then screenshot.
async function settle() {
  await new Promise(function wait(r) {
    setTimeout(r, 800);
  });
}

// Include the viewport so the screenshot shows which edge the drawer slid from.
function getOverlay(): HTMLElement {
  const overlay = document.querySelector('[data-position]');
  if (!overlay) throw new Error('Expected drawer overlay to exist');
  return overlay as HTMLElement;
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Drawer', function drawerTests() {
    it('renders nested drawers with both layers open', async function nestedDrawers() {
      const { getByRole } = await render(<NestedExample />);

      await getByRole('button', { name: 'Open settings' }).click();
      await expect.element(getByRole('dialog', { name: 'Settings' })).toHaveFocus();
      await getByRole('button', { name: 'Account' }).click();
      await expect.element(getByRole('dialog', { name: 'Account' })).toHaveFocus();
      await settle();

      await expect(document.body).toMatchScreenshot('nested-drawers');
    });

    it('renders a nested popover above its drawer', async function nestedPopover() {
      const { getByRole } = await render(<NestedPopoverExample />);

      await getByRole('button', { name: 'Open drawer' }).click();
      await expect.element(getByRole('dialog', { name: 'Nested popover' })).toHaveFocus();
      await getByRole('button', { name: 'Open popover' }).click();
      await expect.element(getByRole('dialog', { name: 'Popover' })).toBeVisible();
      await settle();

      await expect(document.body).toMatchScreenshot('nested-popover');
    });

    it.each(PLACEMENTS)('renders %s placement', async function placement(p) {
      const { getByRole } = await render(<PlacementsExample />);

      await getByRole('button', { name: `Open ${p}` }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await settle();

      await expect(getOverlay()).toMatchScreenshot(`placement-${p}`);
    });

    it('renders bottom sheet with close button', async function bottomSheet() {
      const { getByRole } = await render(<BottomSheetExample />);

      await getByRole('button', { name: 'Open bottom sheet' }).click();
      await vi.waitFor(async function open() {
        assume(getByRole('dialog').query()).is.not.equal(null);
      });
      await settle();

      await expect(getOverlay()).toMatchScreenshot('bottom-sheet');
    });
  });
});
