import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { AccountMenuExample } from '../examples/account-menu.tsx';
import { BottomSheetExample } from '../examples/bottom-sheet.tsx';
import { ComplexExample } from '../examples/complex.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { LinksExample } from '../examples/links.tsx';
import { MultipleSelectionExample } from '../examples/multiple-selection.tsx';
import { OpenFromDialogExample } from '../examples/open-from-dialog.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { SingleSelectionExample } from '../examples/single-selection.tsx';
import { SubmenuExample } from '../examples/submenu.tsx';
import { TitleAndGroupsExample } from '../examples/sections.tsx';

type User = ReturnType<typeof userEvent.setup>;

async function openMenuWithKeyboard(user: User, triggerName: string) {
  const trigger = page.getByRole('button', { name: triggerName });
  await user.tab();
  await expect.element(trigger).toHaveFocus();
  await user.keyboard('{Enter}');
  await expect.element(page.getByRole('menu')).toBeVisible();
}

describe('@godaddy/antares', function antares() {
  describe('#Menu', function menuTests() {
    it('opens from the keyboard and restores focus after Escape', async function openAndDismiss() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      const trigger = page.getByRole('button', { name: 'Actions' });
      const menu = page.getByRole('menu', { name: 'Actions' });
      await openMenuWithKeyboard(user, 'Actions');
      await expect.element(page.getByRole('menuitem', { name: 'New file' })).toHaveFocus();

      await user.keyboard('{Escape}');

      await expect.element(menu).not.toBeInTheDocument();
      await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect.element(trigger).toHaveFocus();
    });

    it('navigates and activates an action with the keyboard', async function keyboardNavigation() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      await openMenuWithKeyboard(user, 'Actions');

      const newFile = page.getByRole('menuitem', { name: 'New file' });
      const open = page.getByRole('menuitem', { name: 'Open…' });
      const saveAs = page.getByRole('menuitem', { name: 'Save as…' });

      await user.keyboard('{End}');
      await expect.element(saveAs).toHaveFocus();
      await user.keyboard('{Home}');
      await expect.element(newFile).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      await expect.element(open).toHaveFocus();
      await user.keyboard('{ArrowUp}');
      await expect.element(newFile).toHaveFocus();
      await user.keyboard('s');
      await expect.element(page.getByRole('menuitem', { name: 'Save', exact: true })).toHaveFocus();
      await user.keyboard('{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    });

    it('opens, backs out of, and selects from a submenu with the keyboard', async function submenuNavigation() {
      const user = userEvent.setup();
      await render(<SubmenuExample />);
      await openMenuWithKeyboard(user, 'Share');

      const share = page.getByRole('menuitem', { name: 'Share' });
      const email = page.getByRole('menuitem', { name: 'Email' });
      await user.keyboard('{ArrowDown}{ArrowDown}');
      await expect.element(share).toHaveFocus();
      await user.keyboard('{ArrowRight}');
      await expect.element(email).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      await expect.element(email).not.toBeInTheDocument();
      await expect.element(share).toHaveFocus();
      await user.keyboard('{ArrowRight}{ArrowDown}{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    });

    it('skips disabled items and keeps a single selection after reopening', async function singleSelection() {
      const user = userEvent.setup();
      await render(<SingleSelectionExample />);
      await openMenuWithKeyboard(user, 'View');

      const trigger = page.getByRole('button', { name: 'View' });
      const rulers = page.getByRole('menuitemradio', { name: 'Rulers' });
      const guides = page.getByRole('menuitem', { name: 'Guides' });
      const menu = page.getByRole('menu');
      await expect.element(rulers).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      await expect.element(guides).toHaveFocus();
      await user.keyboard('{ArrowRight}');

      const layout = page.getByRole('menuitemradio', { name: 'Layout' });
      const columns = page.getByRole('menuitemradio', { name: 'Columns' });
      await expect.element(layout).toHaveFocus();
      await expect.element(layout).toHaveAttribute('aria-checked', 'true');
      await user.keyboard('{ArrowDown}{Enter}');
      await expect.element(menu).not.toBeInTheDocument();
      await expect.element(trigger).toHaveFocus();

      await user.keyboard('{Enter}');
      await expect.element(menu).toBeVisible();
      await expect.element(rulers).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      await expect.element(guides).toHaveFocus();
      await user.keyboard('{ArrowRight}');
      await expect.element(columns).toHaveFocus();
      await expect.element(columns).toHaveAttribute('aria-checked', 'true');
      await expect.element(layout).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles checkboxes through nested menus with the keyboard', async function multipleSelection() {
      const user = userEvent.setup();
      await render(<MultipleSelectionExample />);
      await openMenuWithKeyboard(user, 'Columns');

      const size = page.getByRole('menuitemcheckbox', { name: 'Size' });
      await user.keyboard('{ArrowDown}{ArrowDown}');
      await expect.element(size).toHaveFocus();
      await user.keyboard(' ');
      await expect.element(size).toHaveAttribute('aria-checked', 'true');
      await user.keyboard('{ArrowDown}{ArrowRight}');

      const owner = page.getByRole('menuitemcheckbox', { name: 'Owner' });
      const tags = page.getByRole('menuitem', { name: 'Tags' });
      await expect.element(owner).toHaveFocus();
      await expect.element(owner).toHaveAttribute('aria-checked', 'true');
      await user.keyboard(' ');
      await expect.element(owner).toHaveAttribute('aria-checked', 'false');
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowRight}');

      const draft = page.getByRole('menuitemcheckbox', { name: 'Draft' });
      await expect.element(page.getByRole('menu', { name: 'Tags' })).toBeVisible();
      await user.keyboard('{ArrowDown}');
      await expect.element(draft).toHaveFocus();
      await user.keyboard(' ');
      await expect.element(draft).toHaveAttribute('aria-checked', 'true');
      await expect.element(page.getByRole('menu', { name: 'Tags' })).toBeVisible();
      await user.keyboard('{Escape}');
      await expect.element(page.getByRole('menu', { name: 'Tags' })).not.toBeInTheDocument();
      await expect.element(tags).toHaveFocus();
    });

    it('moves between grouped actions without focusing section headings', async function groupedNavigation() {
      const user = userEvent.setup();
      await render(<TitleAndGroupsExample />);
      await openMenuWithKeyboard(user, 'Publish');

      const youtube = page.getByRole('menuitem', { name: 'YouTube…' });
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      await expect.element(youtube).toHaveFocus();
      await user.keyboard('{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    });

    it('uses typeahead to reach a link in the menu', async function linkNavigation() {
      const user = userEvent.setup();
      await render(<LinksExample />);
      await openMenuWithKeyboard(user, 'Links');

      const documentation = page.getByRole('menuitem', { name: 'Documentation' });
      await user.keyboard('d');
      await expect.element(documentation).toHaveFocus();
      await expect.element(documentation).toHaveAttribute('href', 'https://example.com/docs');
    });

    it('opens an account menu and chooses an item with the keyboard', async function accountMenu() {
      const user = userEvent.setup();
      await render(<AccountMenuExample />);
      await openMenuWithKeyboard(user, 'Account');

      const profile = page.getByRole('menuitem', { name: 'Profile' });
      await expect.element(profile).toHaveFocus();
      await user.keyboard('{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: 'Account' })).toHaveFocus();
    });

    it('tabs to and toggles the account theme switch with the keyboard', async function accountTheme() {
      const user = userEvent.setup();
      await render(<AccountMenuExample />);

      const trigger = page.getByRole('button', { name: 'Account' });
      await user.tab();
      await expect.element(trigger).toHaveFocus();
      await user.keyboard('{ArrowDown}');
      await expect.element(page.getByRole('menu', { name: 'Account' })).toBeVisible();
      await expect.element(page.getByRole('menuitem', { name: 'Profile' })).toHaveFocus();

      const darkTheme = page.getByRole('switch', { name: 'Dark theme' });
      await user.keyboard('{Shift>}{Tab}{/Shift}');
      await expect.element(darkTheme).toHaveFocus();
      await user.keyboard(' ');
      await expect.element(darkTheme).toBeChecked();
      await user.keyboard(' ');
      await expect.element(darkTheme).not.toBeChecked();
      await expect.element(page.getByRole('menu', { name: 'Account' })).toBeVisible();
    });

    it('closes the bottom sheet after a menu action', async function bottomSheet() {
      const user = userEvent.setup();
      await render(<BottomSheetExample />);
      await openMenuWithKeyboard(user, 'Open menu');

      await user.tab();
      await user.tab();
      await expect.element(page.getByRole('menuitem', { name: 'Profile' })).toHaveFocus();
      await user.keyboard('{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
    });

    it('leaves a dialog open after choosing a menu action with the keyboard', async function openFromDialog() {
      const user = userEvent.setup();
      await render(<OpenFromDialogExample />);

      await user.tab();
      await user.keyboard('{Enter}');
      const dialog = page.getByRole('dialog', { name: 'Edit file' });
      await expect.element(dialog).toBeVisible();
      await user.keyboard('{Tab}{Tab}{Enter}');
      await expect.element(page.getByRole('menu')).toBeVisible();
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{Enter}');

      await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
      await expect.element(dialog).toBeVisible();
    });

    it('uses typeahead to open a composed submenu with the keyboard', async function composedSubmenu() {
      const user = userEvent.setup();
      await render(<ComplexExample />);
      await openMenuWithKeyboard(user, 'Complex menu');

      const notifications = page.getByRole('menuitem', { name: 'Notifications' });
      await user.keyboard('notifications');
      await expect.element(notifications).toHaveFocus();
      await user.keyboard('{ArrowRight}');

      await expect.element(page.getByRole('menuitemcheckbox', { name: 'Email' })).toHaveFocus();
    });

    it.each([true, false])(
      'keeps single selection in the playground when showGroups=%s',
      async function playgroundSingleSelection(showGroups) {
        const user = userEvent.setup();
        await render(<PlaygroundExample showGroups={showGroups} />);
        await openMenuWithKeyboard(user, 'Menu Playground');

        const trigger = page.getByRole('button', { name: 'Menu Playground' });
        const date = page.getByRole('menuitemradio', { name: 'Sort by Date' });
        const name = page.getByRole('menuitemradio', { name: 'Sort by Name' });
        const menu = page.getByRole('menu');
        await expect.element(date).toHaveFocus();
        await user.keyboard('{ArrowDown}{Enter}');
        await expect.element(menu).not.toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();
        await user.keyboard('{Enter}');
        await expect.element(menu).toBeVisible();

        await expect.element(name).toHaveAttribute('aria-checked', 'true');
        await expect.element(date).toHaveAttribute('aria-checked', 'false');
      }
    );

    it.each([
      { singleSelection: true, showGroups: true },
      { singleSelection: true, showGroups: false },
      { singleSelection: false, showGroups: true },
      { singleSelection: false, showGroups: false }
    ])(
      'toggles playground checkboxes with config %j',
      async function playgroundMultipleSelection({ singleSelection, showGroups }) {
        const user = userEvent.setup();
        await render(<PlaygroundExample singleSelection={singleSelection} multipleSelection showGroups={showGroups} />);
        await openMenuWithKeyboard(user, 'Menu Playground');

        const name = page.getByRole('menuitemcheckbox', { name: 'Name', exact: true });
        await user.keyboard(' ');
        await expect.element(name).toHaveAttribute('aria-checked', 'false');
        await user.keyboard(' ');
        await expect.element(name).toHaveAttribute('aria-checked', 'true');
      }
    );

    it.each([true, false])(
      'activates plain playground actions when showGroups=%s and selection is disabled',
      async function playgroundNoSelection(showGroups) {
        const user = userEvent.setup();
        await render(<PlaygroundExample singleSelection={false} multipleSelection={false} showGroups={showGroups} />);
        await openMenuWithKeyboard(user, 'Menu Playground');

        await expect.element(page.getByRole('menuitem', { name: 'Name', exact: true })).toHaveFocus();
        await user.keyboard('{Enter}');

        await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
      }
    );
  });
});
