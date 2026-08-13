import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Tabs', function tabsTests() {
    it('selects a tab and shows its panel', async function selectsTab() {
      const user = userEvent.setup();
      await render(<DefaultExample />);

      await expect.element(page.getByRole('tablist', { name: 'Account settings' })).toBeVisible();

      await user.click(page.getByRole('tab', { name: 'Billing' }));

      await expect.element(page.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
      await expect.element(page.getByRole('tabpanel')).toHaveTextContent('Billing settings');
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
      const tabs = Array.from(viewport.querySelectorAll<HTMLElement>('[role="tab"]'));
      const next = page.getByRole('button', { name: 'Scroll next tabs' });
      const viewportLeft = viewport.getBoundingClientRect().left;
      const expectedNext = tabs[1]!.getBoundingClientRect().left - viewportLeft;

      await user.click(next);

      await expect.poll(() => viewport.scrollLeft).toBeCloseTo(expectedNext, 0);
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
