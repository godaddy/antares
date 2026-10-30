import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import assume from 'assume';
import { Button } from '#components/button';
import { Menu, MenuItem, MenuTrigger } from '#components/menu';
import { Popover } from '#components/popover';
import { DefaultExample } from '../examples/default.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { TitleAndGroupsExample } from '../examples/sections.tsx';
import { AccountMenuExample } from '../examples/avatar.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { LinksExample } from '../examples/links.tsx';
import { OpenFromDialogExample } from '../examples/open-from-dialog.tsx';
import { ComplexExample } from '../examples/complex.tsx';

/** Wait for an element to appear by polling. */
async function waitForElement(locator: ReturnType<typeof page.getByRole>, timeout = 800): Promise<Element> {
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

      await user.keyboard('{ArrowDown}');
      assume(await page.getByRole('menu').query()).is.not.equal(null);
    });

    it('opens a submenu without selecting a row', async function submenuHover() {
      const user = userEvent.setup();
      await render(<SubmenuExample />);

      await user.click(page.getByRole('button', { name: 'Share' }));
      const shareItem = page.getByRole('menuitem', { name: 'Share' });
      await waitForElement(shareItem);

      await user.hover(shareItem);
      await settle(300);

      const email = page.getByRole('menuitem', { name: 'Email' });
      const el = await waitForElement(email);
      assume(el.getAttribute('aria-checked')).equals(null);
      assume(document.querySelectorAll('[role="menu"]').length).equals(2);
    });

    it('selects a row in the menu and a row in the submenu', async function singleSelection() {
      const user = userEvent.setup();
      await render(<SingleSelectionExample />);

      await user.click(page.getByRole('button', { name: 'View' }));
      const selected = page.getByRole('menuitemradio', { name: 'Rulers' });
      const el = await waitForElement(selected);
      assume(el.getAttribute('aria-checked')).equals('true');
      assume(page.getByRole('menuitemradio', { name: 'Comments' }).element().getAttribute('aria-disabled')).equals(
        'true'
      );

      const guides = page.getByRole('menuitem', { name: 'Guides' });
      await user.hover(guides);
      await settle(300);

      const layout = page.getByRole('menuitemradio', { name: 'Layout' });
      const layoutEl = await waitForElement(layout);
      assume(layoutEl.getAttribute('aria-checked')).equals('true');

      await user.click(page.getByRole('menuitemradio', { name: 'Columns' }));
      await settle();
      await user.click(page.getByRole('button', { name: 'View' }));
      await user.hover(page.getByRole('menuitem', { name: 'Guides' }));
      await settle(300);
      const next = await waitForElement(page.getByRole('menuitemradio', { name: 'Columns' }));
      assume(next.getAttribute('aria-checked')).equals('true');
      assume(page.getByRole('menuitemradio', { name: 'Rulers' }).element().getAttribute('aria-checked')).equals('true');
    });

    it('renders a label from a render function', async function renderFunctionLabel() {
      const user = userEvent.setup();
      await render(
        <MenuTrigger>
          <Button>Edit</Button>
          <Popover aria-label="Menu">
            <Menu aria-label="Edit" selectionMode="single" defaultSelectedKeys={['cut']}>
              <MenuItem id="cut" textValue="Cut">
                {({ isSelected }) => (isSelected ? 'Cut, selected' : 'Cut')}
              </MenuItem>
            </Menu>
          </Popover>
        </MenuTrigger>
      );

      await user.click(page.getByRole('button', { name: 'Edit' }));
      const item = await waitForElement(page.getByRole('menuitemradio', { name: 'Cut, selected' }));
      assume(item.getAttribute('aria-checked')).equals('true');
    });

    it('toggles checkboxes on every level', async function toggleCheckbox() {
      const user = userEvent.setup();
      await render(<MultipleSelectionExample />);

      await user.click(page.getByRole('button', { name: 'Columns' }));
      const menu = page.getByRole('menu', { name: 'Columns' });
      await waitForElement(menu);
      const columnsLabel = menu.getByText('Columns').element();
      assume(columnsLabel.textContent).equals('Columns');
      assume(columnsLabel.getAttribute('role')).equals('presentation');

      const sizeItem = page.getByRole('menuitemcheckbox', { name: 'Size' });
      const el = await waitForElement(sizeItem);
      assume(el.getAttribute('aria-checked')).equals('false');
      assume(el.querySelector('[aria-hidden="true"]:not(svg)')).is.not.equal(null);
      assume(el.querySelector('svg')).is.not.equal(null);

      await user.click(sizeItem);
      assume(page.getByRole('menuitemcheckbox', { name: 'Size' }).element().getAttribute('aria-checked')).equals(
        'true'
      );

      await user.hover(page.getByRole('menuitem', { name: 'Details' }));
      await settle(300);
      const detailsItem = page.getByRole('menuitem', { name: 'Details' }).element();
      assume(detailsItem.getAttribute('role')).equals('menuitem');
      assume(detailsItem.querySelector('[data-indeterminate]')).is.not.equal(null);
      const owner = await waitForElement(page.getByRole('menuitemcheckbox', { name: 'Owner' }));
      assume(owner.getAttribute('aria-checked')).equals('true');

      await user.hover(page.getByRole('menuitem', { name: 'Tags' }));
      await settle(300);
      const draft = page.getByRole('menuitemcheckbox', { name: 'Draft' });
      const draftEl = await waitForElement(draft);
      assume(draftEl.getAttribute('aria-checked')).equals('false');
      await user.click(draft);
      assume(page.getByRole('menuitemcheckbox', { name: 'Draft' }).element().getAttribute('aria-checked')).equals(
        'true'
      );
      assume(document.querySelectorAll('[role="menu"]').length).equals(3);
    });

    it('renders section labels as presentational headings', async function sections() {
      const user = userEvent.setup();
      await render(<TitleAndGroupsExample />);

      await user.click(page.getByRole('button', { name: 'Publish' }));
      const label = await waitForElement(page.getByText('Export').first());
      assume(label.tagName).equals('H3');
      assume(label.getAttribute('role')).equals('presentation');
      assume(await page.getByRole('heading', { name: 'Export' }).query()).equals(null);
      assume(await page.getByRole('separator').query()).is.not.equal(null);
      assume(await page.getByRole('menuitem', { name: 'YouTube…' }).query()).is.not.equal(null);
      const heading = page.getByRole('heading', { name: 'Menu Title' }).element();
      assume(heading.getAttribute('role')).equals(null);
    });

    it('opens an account menu from an avatar', async function avatar() {
      const user = userEvent.setup();
      await render(<AccountMenuExample />);

      await user.click(page.getByRole('button', { name: 'Account' }));
      await waitForElement(page.getByRole('menuitem', { name: 'Profile' }));
      assume(document.body.textContent).contains('John Doe');
      assume(document.body.textContent).contains('john@example.com');
      const photo = document.querySelector('img');
      assume(photo?.getAttribute('src')).contains('placehold.co');
      assume(photo?.closest('[data-shape]')?.getAttribute('data-shape')).equals('square');
      assume(document.querySelector('[data-card]')).equals(null);
      assume(await page.getByRole('switch', { name: 'Dark theme' }).query()).is.not.equal(null);
      assume(await page.getByRole('menuitem', { name: 'Logout' }).query()).is.not.equal(null);
      assume(await page.getByRole('separator').query()).is.not.equal(null);
    });

    it('closes the bottom sheet after an item is chosen', async function bottomSheet() {
      const user = userEvent.setup();
      await render(<BottomSheetExample />);

      await user.click(page.getByRole('button', { name: 'Open menu' }));
      const profile = page.getByRole('menuitem', { name: 'Profile' });
      await waitForElement(profile);

      await user.click(profile);
      await vi.waitFor(async function drawerClosed() {
        assume(await profile.query()).equals(null);
      });
    });

    it('renders menu rows as links', async function links() {
      const user = userEvent.setup();
      await render(<LinksExample />);

      await user.click(page.getByRole('button', { name: 'Links' }));
      const docs = await waitForElement(page.getByRole('menuitem', { name: 'Documentation' }));
      assume(docs.getAttribute('href')).equals('https://example.com/docs');
      assume(docs.tagName).equals('A');
    });

    it('opens a menu inside a dialog and leaves the dialog open', async function openFromDialog() {
      const user = userEvent.setup();
      await render(<OpenFromDialogExample />);

      await user.click(page.getByRole('button', { name: 'Open dialog' }));
      await waitForElement(page.getByRole('dialog', { name: 'Edit file' }));

      await user.click(page.getByRole('button', { name: 'Open menu' }));
      const item = await waitForElement(page.getByRole('menuitem', { name: 'Export' }));
      assume(await page.getByRole('dialog', { name: 'Edit file' }).query()).is.not.equal(null);

      await user.click(item);
      await settle();
      assume(await page.getByRole('menuitem', { name: 'Export' }).query()).equals(null);
      assume(await page.getByRole('dialog', { name: 'Edit file' }).query()).is.not.equal(null);
    });

    it('opens a submenu from a grouped menu with icons', async function complex() {
      const user = userEvent.setup();
      await render(<ComplexExample />);

      await user.click(page.getByRole('button', { name: 'Complex menu' }));
      const docs = await waitForElement(page.getByRole('menuitem', { name: 'Documentation' }));
      assume(docs.getAttribute('href')).equals('https://example.com/docs');
      assume(page.getByRole('menuitem', { name: 'API' }).element().getAttribute('aria-disabled')).equals('true');

      await user.hover(page.getByRole('menuitem', { name: 'Theme' }));
      await settle(300);
      const system = await waitForElement(page.getByRole('menuitemradio', { name: 'System' }));
      assume(system.getAttribute('aria-checked')).equals('true');

      await user.hover(page.getByRole('menuitem', { name: 'Notifications' }));
      await settle(300);
      const push = await waitForElement(page.getByRole('menuitemcheckbox', { name: 'Push' }));
      assume(push.getAttribute('aria-checked')).equals('false');
      await user.click(push);
      assume(page.getByRole('menuitemcheckbox', { name: 'Push' }).element().getAttribute('aria-checked')).equals(
        'true'
      );
    });
  });
});
