import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';
import { DefaultExample } from '../examples/default.tsx';
import { GroupsExample } from '../examples/groups.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { RichContentExample } from '../examples/rich-content.tsx';

/** Wait for an element to appear by polling. */
async function waitForElement(locator: ReturnType<typeof page.getByRole>, timeout = 500): Promise<Element> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const el = await locator.query();
    if (el) return el;
    await new Promise((r) => setTimeout(r, 20));
  }
  return locator.element();
}

const settle = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

describe('@godaddy/antares', function antares() {
  describe('#Menu', function menuTests() {
    it('opens on trigger click and closes on Escape', async function openClose() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      await user.click(page.getByRole('button', { name: 'Actions' }));
      const menu = page.getByRole('menu');
      await waitForElement(menu);
      assume(await menu.query()).is.not.equal(null);

      await user.keyboard('{Escape}');
      await settle();
      assume(await menu.query()).equals(null);
    });

    it('navigates items with the keyboard', async function keyboardNav() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      await user.click(page.getByRole('button', { name: 'Actions' }));
      await waitForElement(page.getByRole('menuitem', { name: 'New file' }));

      await user.keyboard('{ArrowDown}{ArrowDown}');
      assume(await page.getByRole('menu').query()).is.not.equal(null);
    });

    it('toggles a checkbox item in a multi-select group', async function toggleCheckbox() {
      const user = userEvent.setup();
      await render(<GroupsExample />);

      await user.click(page.getByRole('button', { name: 'View' }));
      const sizeItem = page.getByRole('menuitemcheckbox', { name: 'Size' });
      const el = await waitForElement(sizeItem);
      assume(el.getAttribute('aria-checked')).equals('false');

      await user.click(sizeItem);
      assume(page.getByRole('menuitemcheckbox', { name: 'Size' }).element().getAttribute('aria-checked')).equals(
        'true'
      );
    });

    it('exposes disabled and link items', async function disabledAndLinks() {
      const user = userEvent.setup();
      await render(<GroupsExample />);

      await user.click(page.getByRole('button', { name: 'View' }));

      const archive = page.getByRole('menuitem', { name: 'Archive (unavailable)' });
      const archiveEl = await waitForElement(archive);
      assume(archiveEl.getAttribute('aria-disabled')).equals('true');

      const docs = page.getByRole('menuitem', { name: 'Documentation' });
      const docsEl = await waitForElement(docs);
      assume(docsEl.getAttribute('href')).equals('https://example.com');
      assume(docsEl.getAttribute('target')).equals('_blank');
    });

    it('opens a submenu on hover', async function submenuHover() {
      const user = userEvent.setup();
      await render(<SubmenuExample />);

      await user.click(page.getByRole('button', { name: 'Share' }));
      const resourcesItem = page.getByRole('menuitem', { name: 'Resources' });
      await waitForElement(resourcesItem);

      await user.hover(resourcesItem);
      await settle(200);

      const file = page.getByRole('menuitem', { name: 'File' });
      await waitForElement(file);
      assume(await file.query()).is.not.equal(null);
    });

    it('flips the chevron trigger via aria-expanded', async function chevronFlip() {
      const user = userEvent.setup();
      await render(<ControlledExample />);

      const button = page.getByRole('button', { name: 'Options' });
      assume(button.element().getAttribute('aria-expanded')).equals('false');

      await user.click(button);
      await waitForElement(page.getByRole('menu'));
      assume(page.getByRole('button', { name: 'Options' }).element().getAttribute('aria-expanded')).equals('true');
    });

    it('seeds an multi-select group', async function uncontrolledDefaults() {
      const user = userEvent.setup();
      await render(<MultipleSelectionExample />);

      await user.click(page.getByRole('button', { name: 'Columns' }));
      const name = page.getByRole('menuitemcheckbox', { name: 'Name' });
      const el = await waitForElement(name);
      assume(el.getAttribute('aria-checked')).equals('true');
    });

    it('marks the selected item in a single-select group via aria-checked', async function singleSelect() {
      const user = userEvent.setup();
      await render(<SingleSelectionExample />);

      await user.click(page.getByRole('button', { name: 'Sort by' }));
      const recent = page.getByRole('menuitemradio', { name: 'Most recent' });
      const el = await waitForElement(recent);
      assume(el.getAttribute('aria-checked')).equals('true');

      const name = page.getByRole('menuitemradio', { name: 'Name' });
      assume(name.element().getAttribute('aria-checked')).equals('false');
    });

    it('reflects the sm size via data-size', async function sizeSm() {
      const user = userEvent.setup();
      await render(<PlaygroundExample size="sm" />);

      await user.click(page.getByRole('button', { name: 'Format' }));
      const menu = page.getByRole('menu');
      const el = await waitForElement(menu);
      assume(el.getAttribute('data-size')).equals('sm');
    });

    it('renders a standalone menu inside a bottom sheet and acts on selection', async function bottomSheet() {
      const user = userEvent.setup();
      await render(<BottomSheetExample />);

      await user.click(page.getByRole('button', { name: 'Open menu' }));
      const profile = page.getByRole('menuitem', { name: 'Profile' });
      await waitForElement(profile);
      assume(await profile.query()).is.not.equal(null);

      await user.click(profile);
      await settle();
      assume(await page.getByRole('menuitem', { name: 'Profile' }).query()).equals(null);
    });

    it('opens a calendar popover from an item and closes it on selection', async function richContent() {
      const user = userEvent.setup();
      await render(<RichContentExample />);

      await user.click(page.getByRole('button', { name: 'Schedule' }));
      const pick = page.getByRole('menuitem', { name: 'Pick a date' });
      await waitForElement(pick);

      await user.click(pick);
      await settle();

      // The menu closed and the calendar popover took its place.
      assume(await page.getByRole('menu').query()).equals(null);
      const day = page.getByRole('button', { name: /March 20, 2024/ });
      await waitForElement(day);

      await user.click(day);
      await settle();

      // Picking a day closes the popover and updates the summary text.
      assume(await page.getByRole('button', { name: /March 20, 2024/ }).query()).equals(null);
      assume(document.body.textContent).contains('Publishing on 2024-03-20');
    });
  });
});
