import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { ManillaExample } from '../examples/manilla.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Tabs', function tabsTests() {
    it('exposes tablist, tab, and panel roles with linked ARIA relationships', async function ariaRelationships() {
      await render(<DefaultExample />);

      const tablist = page.getByRole('tablist', { name: 'Account settings' });
      await expect.element(tablist).toBeVisible();
      const tabs = document.querySelectorAll<HTMLElement>('[role="tab"]');
      const panels = document.querySelectorAll<HTMLElement>('[role="tabpanel"]');

      expect(tabs).toHaveLength(3);
      expect(panels).toHaveLength(1);
      const selectedTab = document.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
      const selectedPanel = panels[0];
      expect(selectedTab?.getAttribute('aria-controls')).toBe(selectedPanel?.id);
      expect(selectedPanel?.getAttribute('aria-labelledby')).toBe(selectedTab?.id);
    });

    it('selects the first tab initially and exposes only its panel', async function initialSelection() {
      await render(<DefaultExample />);

      await expect.element(page.getByRole('tab', { name: 'Account' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Account settings');
      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'false');
    });

    it('selects a tab and shows its panel', async function selectsTab() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      await expect.element(page.getByRole('tablist', { name: 'Account settings' })).toBeVisible();

      await user.click(page.getByRole('tab', { name: 'Billing' }));

      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing settings');
    });

    it('starts with and updates controlled selection', async function controlledSelection() {
      const user = userEvent.setup();
      await render(<ControlledExample />);

      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByText('Current selection: billing')).toBeVisible();
      await user.click(page.getByRole('tab', { name: 'Security' }));
      await expect.element(page.getByText('Current selection: security')).toBeVisible();
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Security settings');
    });

    it('activates tabs automatically with ArrowRight', async function automaticActivation() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      await user.click(page.getByRole('tab', { name: 'Account' }));

      await user.keyboard('{ArrowRight}');

      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing settings');
    });

    it('supports Arrow, Home, and End navigation', async function keyboardNavigation() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      await user.click(page.getByRole('tab', { name: 'Billing' }));

      await user.keyboard('{Home}');
      await expect.element(page.getByRole('tab', { name: 'Account' })).toHaveFocus();
      await user.keyboard('{End}');
      await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveFocus();
      await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');
    });

    it('skips disabled tabs and exposes disabled semantics', async function disabledNavigation() {
      const user = userEvent.setup();
      await render(<DisabledExample />);
      const disabled = page.getByRole('tab', { name: 'Billing' });

      await expect.element(disabled).toHaveAttribute('aria-disabled', 'true');
      await user.click(page.getByRole('tab', { name: 'Account' }));
      await user.keyboard('{ArrowRight}');
      await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveFocus();
      await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveAttribute('aria-selected', 'true');
    });

    it('exposes focus-visible state for keyboard focus', async function focusVisibleState() {
      const user = userEvent.setup();
      await render(<DefaultExample />);
      await user.click(page.getByRole('tab', { name: 'Account' }));
      await user.keyboard('{ArrowRight}');

      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('data-focus-visible', 'true');
    });

    it('does not focus disabled tabs with Tab navigation', async function disabledTabNotFocusable() {
      const user = userEvent.setup();
      await render(<DisabledExample />);
      await user.click(page.getByRole('tab', { name: 'Account' }));
      await user.keyboard('{ArrowRight}');

      await expect.element(page.getByRole('tab', { name: 'Security' })).toHaveFocus();
      await expect.element(page.getByRole('tab', { name: 'Billing' })).not.toHaveFocus();
    });

    it('renders the Manilla variant with the same tab semantics', async function manillaSemantics() {
      await render(<ManillaExample />);

      await expect.element(page.getByRole('tablist', { name: 'Documents' })).toBeVisible();
      await expect.element(page.getByRole('tab', { name: 'Recent' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Recent documents');
    });

    it('does not render overflow controls when all tabs fit', async function noOverflowControls() {
      await render(<DefaultExample />);

      await expect.element(page.getByRole('button', { name: 'Previous tabs' })).not.toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
    });

    it('shows both controls when tabs overflow', async function showsOverflowControls() {
      await render(<OverflowExample />);

      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeDisabled();
    });

    it('moves the conveyor when next is pressed', async function movesNextTab() {
      const user = userEvent.setup();
      await render(<OverflowExample />);
      const viewport = document.querySelector('[class*="viewport"]');
      if (!viewport) throw new Error('Tabs viewport not found');
      const next = page.getByRole('button', { name: 'Scroll next tabs' });
      const initialScrollLeft = viewport.scrollLeft;

      await user.click(next);

      await expect.poll(() => viewport.scrollLeft).not.toBe(initialScrollLeft);
      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).not.toBeDisabled();
    });

    it('moves the conveyor back when previous is pressed', async function movesPreviousTab() {
      const user = userEvent.setup();
      await render(<OverflowExample />);
      const viewport = document.querySelector('[class*="viewport"]');
      if (!viewport) throw new Error('Tabs viewport not found');

      await user.click(page.getByRole('button', { name: 'Scroll next tabs' }));
      await user.click(page.getByRole('button', { name: 'Scroll next tabs' }));
      await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);
      const positionBeforePrevious = viewport.scrollLeft;

      await user.click(page.getByRole('button', { name: 'Scroll previous tabs' }));
      await expect.poll(() => viewport.scrollLeft).toBeLessThan(positionBeforePrevious);
    });

    it('shows a not-allowed cursor for disabled tabs', async function disabledCursor() {
      await render(<DisabledExample />);
      const disabled = page.getByRole('tab', { name: 'Billing' });

      await expect.poll(() => getComputedStyle(disabled.element()).cursor).toBe('not-allowed');
    });

    it('disables next at the end and enables previous after manual scrolling', async function overflowEndState() {
      await render(<OverflowExample />);
      const viewport = document.querySelector('[class*="viewport"]');
      if (!viewport) throw new Error('Tabs viewport not found');
      viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
      viewport.dispatchEvent(new Event('scroll'));

      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).not.toBeDisabled();
    });

    it('updates both overflow controls after native scrolling to the middle', async function nativeScrollState() {
      await render(<OverflowExample />);
      const viewport = document.querySelector('[class*="viewport"]');
      if (!viewport) throw new Error('Tabs viewport not found');
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      viewport.dispatchEvent(new Event('scroll'));

      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).not.toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeDisabled();
    });

    it('shows overflow controls after the available width becomes smaller', async function overflowAfterResize() {
      await render(<OverflowExample maxWidth="1000px" />);
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeInTheDocument();

      const root = page.getByRole('tablist').element().closest('[data-design]');
      if (!(root instanceof HTMLElement)) throw new Error('Tabs root not found');
      root.style.width = '320px';
      root.style.maxWidth = '320px';

      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeVisible();
    });

    it('hides overflow controls after the available width becomes larger', async function overflowAfterGrow() {
      await render(<OverflowExample />);
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeVisible();

      const root = page.getByRole('tablist').element().closest('[data-design]');
      if (!(root instanceof HTMLElement)) throw new Error('Tabs root not found');
      root.style.width = '1000px';
      root.style.maxWidth = '1000px';

      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeInTheDocument();
    });

    it('scrolls toward the logical next tabs in RTL', async function rtlScrollDirection() {
      const user = userEvent.setup();
      await render(<RTLExample />);
      const viewport = document.querySelector('[class*="viewport"]');
      if (!viewport) throw new Error('Tabs viewport not found');
      const initialScrollLeft = viewport.scrollLeft;

      await user.click(page.getByRole('button', { name: 'Scroll next tabs' }));

      await expect.poll(() => viewport.scrollLeft).not.toBe(initialScrollLeft);
    });
  });
});
