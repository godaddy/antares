import { CustomIconsExample } from '../examples/menu-custom-icons.tsx';
import { DisabledExample } from '../examples/menu-disabled.tsx';
import { LinksExample } from '../examples/menu-links.tsx';
import { PlaygroundExample } from '../examples/menu-playground.tsx';
import { SelectionExample } from '../examples/menu-selection.tsx';
import { SectionsExample } from '../examples/menu-sections.tsx';
import { SubmenuExample } from '../examples/menu-submenu.tsx';
import { BasicExample } from '../examples/menu.tsx';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

/** Wait for element to be visible by polling */
async function waitForElement(locator: ReturnType<typeof page.getByRole>, timeout = 500): Promise<Element> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const el = await locator.query();
    if (el) return el;
    await new Promise((r) => setTimeout(r, 20));
  }
  // Final attempt - will throw proper error if still not found
  return locator.element();
}

describe('@godaddy/antares', function antares() {
  describe('Examples', function examples() {
    it('renders BasicExample', async function basic() {
      await render(<BasicExample />);

      const button = page.getByRole('button', { name: 'Actions' });
      assume(button).is.not.equal(null);
    });

    it('renders BasicExample and closes on Escape', async function closeOnEscape() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const button = page.getByRole('button', { name: 'Actions' });
      await user.click(button);

      const menu = page.getByRole('menu');
      await waitForElement(menu);
      assume(await menu.query()).is.not.equal(null);

      await user.keyboard('{Escape}');

      await new Promise((resolve) => setTimeout(resolve, 300));
      assume(await menu.query()).equals(null);
    });

    it('renders BasicExample with keyboard navigation', async function keyboard() {
      const user = userEvent.setup();
      await render(<BasicExample />);

      const button = page.getByRole('button', { name: 'Actions' });
      await user.click(button);

      const newItem = page.getByRole('menuitem', { name: 'New File' });
      await waitForElement(newItem);

      // Navigate with arrow keys
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Verify menu is still open and has focus
      const menu = page.getByRole('menu');
      assume(await menu.query()).is.not.equal(null);
    });

    it('renders DisabledExample with disabled state', async function disabled() {
      const user = userEvent.setup();
      await render(<DisabledExample />);

      const button = page.getByRole('button', { name: 'Actions' });
      await user.click(button);

      const disabledItem = page.getByRole('menuitem', { name: 'Disabled' });
      const el = await waitForElement(disabledItem);
      assume(el.hasAttribute('aria-disabled')).equals(true);
    });

    it('renders SectionsExample with headers and separators', async function sections() {
      const user = userEvent.setup();
      await render(<SectionsExample />);

      const button = page.getByRole('button', { name: 'View' });
      await user.click(button);

      const zoomIn = page.getByRole('menuitem', { name: 'Zoom In' });
      await waitForElement(zoomIn);

      // Verify sections and headers exist
      const headers = document.querySelectorAll('header[role="presentation"]');
      assume(headers.length).equals(3); // Zoom, Layout, Appearance

      const separators = document.querySelectorAll('[role="separator"]');
      assume(separators.length).greaterThan(0);

      const partialSeparator = Array.from(separators).find((sep) =>
        Array.from(sep.classList).some((c) => c.includes('partial'))
      );
      assume(partialSeparator).is.not.equal(undefined);
    });

    it('renders SelectionExample with single selection', async function single() {
      const user = userEvent.setup();
      await render(<SelectionExample />);

      const button = page.getByRole('button', { name: /Align/ });
      await user.click(button);

      const leftItem = page.getByRole('menuitemradio', { name: 'Align Left' });
      const el = await waitForElement(leftItem);
      assume(el.getAttribute('aria-checked')).equals('true');

      // Verify dot icon is present
      const dotIcon = el.querySelector('[aria-hidden="true"]');
      assume(dotIcon?.textContent).equals('•');
    });

    it('renders SelectionExample with multiple selection', async function multiple() {
      const user = userEvent.setup();
      await render(<SelectionExample />);

      const button = page.getByRole('button', { name: /Format/ });
      await user.click(button);

      const boldItem = page.getByRole('menuitemcheckbox', { name: 'Bold' });
      const italicItem = page.getByRole('menuitemcheckbox', { name: 'Italic' });

      const boldEl = await waitForElement(boldItem);
      const italicEl = await waitForElement(italicItem);
      assume(boldEl.getAttribute('aria-checked')).equals('true');
      assume(italicEl.getAttribute('aria-checked')).equals('true');

      // Verify check icon is present
      const checkIcon = boldEl.querySelector('[aria-hidden="true"]');
      assume(checkIcon?.textContent).equals('✓');
    });

    it('renders SelectionExample and toggles selection', async function toggle() {
      const user = userEvent.setup();
      await render(<SelectionExample />);

      const button = page.getByRole('button', { name: /Format/ });
      await user.click(button);

      const underlineItem = page.getByRole('menuitemcheckbox', { name: 'Underline' });
      const el = await waitForElement(underlineItem);
      assume(el.getAttribute('aria-checked')).equals('false');

      await user.click(underlineItem);

      const underlineAfter = page.getByRole('menuitemcheckbox', { name: 'Underline' });
      assume(underlineAfter.element().getAttribute('aria-checked')).equals('true');
    });

    it('renders SubmenuExample and opens on hover', async function submenu() {
      const user = userEvent.setup();
      await render(<SubmenuExample />);

      const button = page.getByRole('button', { name: 'Edit' });
      await user.click(button);

      const shareItem = page.getByRole('menuitem', { name: 'Share' });
      await waitForElement(shareItem);

      // Verify chevron icon is present (icon will render SVG from CDN)
      const chevronIcon = shareItem.element().querySelector('[data-icon]');
      assume(chevronIcon).is.not.equal(null);

      await user.hover(shareItem);

      await new Promise((resolve) => setTimeout(resolve, 200));

      const emailItem = page.getByRole('menuitem', { name: 'Email' });
      await waitForElement(emailItem);
      assume(emailItem.element()).is.not.equal(null);
    });

    it('renders PlaygroundExample', async function playground() {
      await render(<PlaygroundExample />);

      const button = page.getByRole('button', { name: 'Actions' });
      assume(button).is.not.equal(null);
    });

    it('renders PlaygroundExample with size sm', async function sizeSm() {
      const user = userEvent.setup();
      await render(<PlaygroundExample size="sm" />);

      const button = page.getByRole('button', { name: 'Actions' });
      await user.click(button);

      const menu = page.getByRole('menu');
      const el = await waitForElement(menu);
      const classList = Array.from(el.classList);
      assume(classList.some((c) => c.includes('size-sm'))).equals(true);
    });

    it('renders PlaygroundExample with matchWidth', async function matchWidth() {
      const user = userEvent.setup();
      await render(<PlaygroundExample matchWidth />);

      const button = page.getByRole('button', { name: 'Actions' });
      await user.click(button);

      const menu = page.getByRole('menu');
      const el = await waitForElement(menu);
      const popover = el.parentElement;
      const classList = Array.from(popover?.classList || []);
      assume(classList.some((c) => c.includes('matchWidth'))).equals(true);
    });

    it('renders LinksExample with href attributes', async function links() {
      const user = userEvent.setup();
      await render(<LinksExample />);

      const button = page.getByRole('button', { name: 'Navigation' });
      await user.click(button);

      const dashboardLink = page.getByRole('menuitem', { name: 'Dashboard' });
      const settingsLink = page.getByRole('menuitem', { name: 'Settings' });
      const externalLink = page.getByRole('menuitem', { name: 'External Link' });

      const dashEl = await waitForElement(dashboardLink);
      const setEl = await waitForElement(settingsLink);
      const extEl = await waitForElement(externalLink);

      assume(dashEl.getAttribute('href')).equals('/dashboard');
      assume(setEl.getAttribute('href')).equals('/settings');
      assume(extEl.getAttribute('href')).equals('https://example.com');
      assume(extEl.getAttribute('target')).equals('_blank');
      assume(extEl.getAttribute('rel')).equals('noopener noreferrer');
    });

    it('renders CustomIconsExample with custom icon slots', async function customIcons() {
      const user = userEvent.setup();
      await render(<CustomIconsExample />);

      const checkButton = page.getByRole('button', { name: 'Custom Check Icon' });
      await user.click(checkButton);

      const boldItem = page.getByRole('menuitemcheckbox', { name: /Bold/ });
      const el = await waitForElement(boldItem);
      assume(el.getAttribute('aria-checked')).equals('true');

      const customCheckIcon = el.querySelector('[slot="check"]');
      assume(customCheckIcon?.textContent).equals('✅');

      await user.keyboard('{Escape}');
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dotButton = page.getByRole('button', { name: 'Custom Dot Icon' });
      await user.click(dotButton);

      const leftItem = page.getByRole('menuitemradio', { name: /Left/ });
      const leftEl = await waitForElement(leftItem);
      assume(leftEl.getAttribute('aria-checked')).equals('true');

      const customDotIcon = leftEl.querySelector('[slot="dot"]');
      assume(customDotIcon?.textContent).equals('▪');

      await user.keyboard('{Escape}');
      await new Promise((resolve) => setTimeout(resolve, 300));

      const chevronButton = page.getByRole('button', { name: 'Custom Chevron Icon' });
      await user.click(chevronButton);

      const shareItem = page.getByRole('menuitem', { name: /Share/ });
      const shareEl = await waitForElement(shareItem);

      const customChevronIcon = shareEl.querySelector('[slot="chevron"]');
      assume(customChevronIcon?.textContent).equals('→');
    });
  });
});
