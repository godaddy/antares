import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { ManillaExample } from '../examples/manilla.tsx';
import { PlaygroundExample } from '../examples/tabs-playground.tsx';

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

    it('requires activation after focus in manual mode', async function manualActivation() {
      const user = userEvent.setup();
      await render(<PlaygroundExample keyboardActivation="manual" />);
      const account = page.getByRole('tab', { name: 'Account' });
      const billing = page.getByRole('tab', { name: 'Billing' });

      await user.click(account);
      await user.keyboard('{ArrowRight}');

      await expect.element(billing).toHaveFocus();
      await expect.element(account).toHaveAttribute('aria-selected', 'true');
      await expect.element(billing).toHaveAttribute('aria-selected', 'false');

      await user.keyboard('{Enter}');

      await expect.element(billing).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing');
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

      const billing = page.getByRole('tab', { name: 'Billing' });
      await expect.element(billing).toHaveAttribute('data-focus-visible', 'true');

      const tabStyle = getComputedStyle(billing.element());
      expect(tabStyle.outlineStyle).toBe('solid');
      expect(tabStyle.outlineWidth).toBe('2px');
      expect(tabStyle.outlineOffset).toBe('-2px');
    });

    it('uses the chosen intents while an unselected tab is pressed', async function pressedStyles() {
      const user = userEvent.setup();
      await render(<PlaygroundExample keyboardActivation="manual" />);
      const account = page.getByRole('tab', { name: 'Account' });
      const billing = page.getByRole('tab', { name: 'Billing' });

      await user.click(account);
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Space>}');

      await expect.element(billing).toHaveAttribute('data-pressed', 'true');
      expect(getComputedStyle(billing.element()).borderBottomColor).toBe('rgb(27, 219, 219)');
      await user.keyboard('{/Space}');
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

    it('shows a not-allowed cursor for disabled tabs', async function disabledCursor() {
      await render(<DisabledExample />);
      const disabled = page.getByRole('tab', { name: 'Billing' });

      await expect.poll(() => getComputedStyle(disabled.element()).cursor).toBe('not-allowed');
    });

    it('shows a pointer cursor for enabled tabs', async function enabledCursor() {
      await render(<DefaultExample />);
      await expect
        .poll(() => getComputedStyle(page.getByRole('tab', { name: 'Account' }).element()).cursor)
        .toBe('pointer');
    });
  });
});
