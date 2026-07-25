import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import assume from 'assume';
import { preloadTestIcons, resetHover } from '../../../utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { GroupsExample } from '../examples/groups.tsx';
import { SelectionExample } from '../examples/selection.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';

// Let the popover open/position transitions settle before capturing.
async function settle(ms = 300) {
  await new Promise(function wait(r) {
    setTimeout(r, ms);
  });
}

// The menu renders in a Popover portal (hideArrow -> [data-noarrow]); grab the
// last one so submenu screenshots capture the nested popover.
function getMenuOverlay(): HTMLElement {
  const overlays = document.querySelectorAll('[data-noarrow]');
  const overlay = overlays[overlays.length - 1];
  if (!overlay) throw new Error('Expected menu popover to exist');
  return overlay as HTMLElement;
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#Menu', function menuTests() {
    it('basic (open)', async function basicOpen() {
      const { getByRole } = await render(<DefaultExample />);
      await getByRole('button', { name: 'Actions' }).click();
      await vi.waitFor(function open() {
        assume(getByRole('menu').query()).is.not.equal(null);
      });
      await settle();
      await expect(getMenuOverlay()).toMatchScreenshot('basic');
    });

    it('groups (open)', async function groupsOpen() {
      const { getByRole } = await render(<GroupsExample />);
      await getByRole('button', { name: 'View' }).click();
      await vi.waitFor(function open() {
        assume(getByRole('menu').query()).is.not.equal(null);
      });
      await settle();
      await expect(getMenuOverlay()).toMatchScreenshot('groups');
    });

    it('selection (open)', async function selectionOpen() {
      const { getByRole } = await render(<SelectionExample />);
      await getByRole('button', { name: 'Columns' }).click();
      await vi.waitFor(function open() {
        assume(getByRole('menu').query()).is.not.equal(null);
      });
      await settle();
      await expect(getMenuOverlay()).toMatchScreenshot('selection');
    });

    it('submenu (open)', async function submenuOpen() {
      const user = userEvent.setup();
      const { getByRole } = await render(<SubmenuExample />);
      await getByRole('button', { name: 'Share' }).click();
      await vi.waitFor(function open() {
        assume(getByRole('menuitem', { name: 'Resources' }).query()).is.not.equal(null);
      });
      await user.hover(page.getByRole('menuitem', { name: 'Resources' }));
      await settle();
      // Both popovers are open; capture the whole viewport to show the nesting.
      await expect(document.body).toMatchScreenshot('submenu');
    });

    it('sizes', async function sizes() {
      const { container } = await render(<SizesExample />);
      await settle();
      await expect(container).toMatchScreenshot('sizes');
    });
  });
});
