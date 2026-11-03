import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it, vi } from 'vitest';
import { createRef } from 'react';
import assume from 'assume';
import { Button } from '#components/button';
import { Menu, MenuItem, MenuTrigger, Separator, SeparatorContext } from '#components/menu';
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
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import './menu.types.tsx';

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

    it.each([true, false])(
      'moves the Playground checkmark with single selection when showGroups=%s',
      async function playgroundSingleSelection(showGroups) {
        const user = userEvent.setup();
        await render(<PlaygroundExample showGroups={showGroups} />);

        await user.click(page.getByRole('button', { name: 'Menu Playground' }));
        const date = await waitForElement(page.getByRole('menuitemradio', { name: 'Sort by Date' }));
        const name = page.getByRole('menuitemradio', { name: 'Sort by Name' });
        assume(date.getAttribute('aria-checked')).equals('true');
        assume(date.querySelector('svg')).is.not.equal(null);
        assume(name.element().querySelector('svg')).equals(null);

        await user.click(name);
        await vi.waitFor(async function menuClosed() {
          assume(await page.getByRole('menu').query()).equals(null);
        });
        await user.click(page.getByRole('button', { name: 'Menu Playground' }));

        const selectedName = await waitForElement(name);
        const unselectedDate = page.getByRole('menuitemradio', { name: 'Sort by Date' }).element();
        assume(selectedName.getAttribute('aria-checked')).equals('true');
        assume(selectedName.querySelector('svg')).is.not.equal(null);
        assume(unselectedDate.getAttribute('aria-checked')).equals('false');
        assume(unselectedDate.querySelector('svg')).equals(null);
      }
    );

    it.each([
      { singleSelection: false, showGroups: true },
      { singleSelection: false, showGroups: false },
      { singleSelection: true, showGroups: true },
      { singleSelection: true, showGroups: false }
    ])(
      'keeps Playground checkbox state consistent with multiple selection for %j',
      async function playgroundMultipleSelection({ singleSelection, showGroups }) {
        const user = userEvent.setup();
        await render(<PlaygroundExample singleSelection={singleSelection} multipleSelection showGroups={showGroups} />);

        await user.click(page.getByRole('button', { name: 'Menu Playground' }));
        const name = page.getByRole('menuitemcheckbox', { name: 'Name', exact: true });
        const nameElement = await waitForElement(name);
        const date = page.getByRole('menuitemcheckbox', { name: 'Date Modified' }).element();
        const size = page.getByRole('menuitemcheckbox', { name: 'Size', exact: true });
        assume(nameElement.getAttribute('aria-checked')).equals('true');
        assume(nameElement.querySelector('[aria-hidden="true"][data-selected]')).is.not.equal(null);
        assume(date.getAttribute('aria-checked')).equals('true');
        assume(date.querySelector('[aria-hidden="true"][data-selected]')).is.not.equal(null);
        assume(size.element().getAttribute('aria-checked')).equals('false');
        assume(size.element().querySelector('[aria-hidden="true"]:not(svg)')).is.not.equal(null);
        assume(size.element().querySelector('[aria-hidden="true"][data-selected]')).equals(null);

        await user.click(size);
        assume(size.element().getAttribute('aria-checked')).equals('true');
        assume(size.element().querySelector('[aria-hidden="true"][data-selected]')).is.not.equal(null);

        await user.click(name);
        assume(name.element().getAttribute('aria-checked')).equals('false');
        assume(name.element().querySelector('[aria-hidden="true"][data-selected]')).equals(null);
        assume(size.element().getAttribute('aria-checked')).equals('true');
        assume(date.getAttribute('aria-checked')).equals('true');
      }
    );

    it.each([true, false])(
      'uses plain Playground actions when selection is disabled and showGroups=%s',
      async function playgroundNoSelection(showGroups) {
        const user = userEvent.setup();
        await render(<PlaygroundExample singleSelection={false} multipleSelection={false} showGroups={showGroups} />);

        await user.click(page.getByRole('button', { name: 'Menu Playground' }));
        const name = page.getByRole('menuitem', { name: 'Name', exact: true });
        const nameElement = await waitForElement(name);
        assume(nameElement.getAttribute('aria-checked')).equals(null);
        assume(nameElement.querySelector('[aria-hidden="true"]')).equals(null);
        assume(nameElement.querySelector('svg')).equals(null);

        await user.click(name);
        await vi.waitFor(async function menuClosed() {
          assume(await page.getByRole('menu').query()).equals(null);
        });
      }
    );

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

    it('keeps a styled separator and consumer class in the menu collection', async function separatorCollection() {
      await render(
        <Menu aria-label="Edit">
          <MenuItem id="copy">Copy</MenuItem>
          <Separator className="custom-separator" />
          <MenuItem id="paste">Paste</MenuItem>
        </Menu>
      );

      const separator = await waitForElement(page.getByRole('separator'));
      assume(separator.tagName).equals('DIV');
      assume(separator.classList.contains('custom-separator')).equals(true);
      assume(separator.getBoundingClientRect().height).is.above(0);
      assume(getComputedStyle(separator).borderTopStyle).equals('solid');
      assume(await page.getByRole('menuitem', { name: 'Paste' }).query()).is.not.equal(null);
    });

    it('merges separator context defaults with local props and refs', async function separatorContext() {
      const contextRef = createRef<HTMLHRElement>();
      const localRef = createRef<HTMLHRElement>();
      await render(
        <SeparatorContext.Provider
          value={{
            ref: contextRef,
            id: 'context-separator',
            className: 'context-separator',
            orientation: 'vertical',
            style: { marginTop: 5, opacity: 0.5 }
          }}
        >
          <Separator
            ref={localRef}
            id="local-separator"
            className="local-separator"
            orientation="horizontal"
            style={{ opacity: 0.75 }}
          />
        </SeparatorContext.Provider>
      );

      const separator = await waitForElement(page.getByRole('separator'));
      assume(contextRef.current).equals(separator);
      assume(localRef.current).equals(separator);
      assume(separator.id).equals('local-separator');
      assume(separator.classList.contains('context-separator')).equals(true);
      assume(separator.classList.contains('local-separator')).equals(true);
      assume(separator.getAttribute('aria-orientation')).is.not.equal('vertical');
      assume(getComputedStyle(separator).marginTop).equals('5px');
      assume(getComputedStyle(separator).opacity).equals('0.75');
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
