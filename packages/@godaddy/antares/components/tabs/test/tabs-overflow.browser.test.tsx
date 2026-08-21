import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';
import { DefaultExample } from '../examples/default.tsx';
import { OverflowExample } from '../examples/overflow.tsx';
import { RTLExample } from '../examples/rtl.tsx';

function getViewport(tablistName: string): HTMLDivElement {
  const tablist = page.getByRole('tablist', { name: tablistName }).element();
  const viewport = tablist.parentElement;
  if (!(viewport instanceof HTMLDivElement)) throw new Error('Tabs viewport not found');
  return viewport;
}

function isFullyVisible(viewport: HTMLDivElement, tab: HTMLElement): boolean {
  const viewportRect = viewport.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  return tabRect.left >= viewportRect.left - 1 && tabRect.right <= viewportRect.right + 1;
}

function getRoot(tablistName: string): HTMLElement {
  const tablist = page.getByRole('tablist', { name: tablistName }).element();
  const root = tablist.closest('[data-design]');
  if (!(root instanceof HTMLElement)) throw new Error('Tabs root not found');
  return root;
}

function getLogicalTarget(viewport: HTMLDivElement, action: 'next' | 'previous', isRTL = false): HTMLElement {
  const tabs = Array.from(viewport.querySelectorAll<HTMLElement>('[role="tab"]'));
  const viewportRect = viewport.getBoundingClientRect();
  const target =
    action === 'next'
      ? tabs.find(function findNextTab(tab) {
          const tabRect = tab.getBoundingClientRect();
          return isRTL ? tabRect.right < viewportRect.right - 1 : tabRect.left > viewportRect.left + 1;
        })
      : tabs.findLast(function findPreviousTab(tab) {
          const tabRect = tab.getBoundingClientRect();
          return isRTL ? tabRect.right > viewportRect.right + 1 : tabRect.left < viewportRect.left - 1;
        });
  if (!target) throw new Error(`No logical ${action} tab is offscreen`);
  return target;
}

describe('@godaddy/antares', function antares() {
  describe('#Tabs overflow', function overflowTests() {
    it('reveals the nearest logical next tab and reaches the LTR end', async function ltrNextBoundary() {
      const user = userEvent.setup();
      await render(<OverflowExample />);
      const viewport = getViewport('Product settings');
      const target = getLogicalTarget(viewport, 'next');

      await user.click(page.getByRole('button', { name: 'Scroll next tabs' }));

      await expect.poll(() => isFullyVisible(viewport, target)).toBe(true);
      viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
      viewport.dispatchEvent(new Event('scroll'));
      await expect.poll(() => viewport.scrollLeft).toBe(viewport.scrollWidth - viewport.clientWidth);
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).not.toBeDisabled();
    });

    it('reveals the nearest logical previous tab after scrolling from the LTR end', async function ltrPreviousBoundary() {
      const user = userEvent.setup();
      await render(<OverflowExample />);
      const viewport = getViewport('Product settings');
      viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
      viewport.dispatchEvent(new Event('scroll'));
      await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);
      const target = getLogicalTarget(viewport, 'previous');

      await user.click(page.getByRole('button', { name: 'Scroll previous tabs' }));

      await expect.poll(() => isFullyVisible(viewport, target)).toBe(true);
    });

    it('keeps overflow state correct while resizing from the scrolled end', async function resizeFromEnd() {
      await render(<OverflowExample />);
      const viewport = getViewport('Product settings');
      viewport.scrollLeft = viewport.scrollWidth - viewport.clientWidth;
      viewport.dispatchEvent(new Event('scroll'));
      await expect.poll(() => viewport.scrollLeft).toBeGreaterThan(0);

      const root = getRoot('Product settings');
      root.style.width = '1000px';
      root.style.maxWidth = '1000px';

      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeInTheDocument();
    });

    it('updates controls when the available width shrinks and grows', async function resizeOverflow() {
      await render(<OverflowExample maxWidth="1000px" />);
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeInTheDocument();
      const root = getRoot('Product settings');
      root.style.width = '320px';
      root.style.maxWidth = '320px';
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeVisible();

      root.style.width = '1000px';
      root.style.maxWidth = '1000px';
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).not.toBeInTheDocument();
    });

    it('moves to logical next and previous tabs with RTL terminal states', async function rtlLogicalBoundaries() {
      const user = userEvent.setup();
      await render(<RTLExample />);
      const viewport = getViewport('Product settings');
      const nextTarget = getLogicalTarget(viewport, 'next', true);

      await user.click(page.getByRole('button', { name: 'Scroll next tabs' }));

      await expect.poll(() => isFullyVisible(viewport, nextTarget)).toBe(true);
      viewport.scrollLeft = -(viewport.scrollWidth - viewport.clientWidth);
      viewport.dispatchEvent(new Event('scroll'));
      await expect
        .poll(() => Math.abs(viewport.scrollLeft))
        .toBeGreaterThanOrEqual(viewport.scrollWidth - viewport.clientWidth - 2);
      await expect.element(page.getByRole('button', { name: 'Scroll next tabs' })).toBeDisabled();
      await expect.element(page.getByRole('button', { name: 'Scroll previous tabs' })).not.toBeDisabled();
      const previousTarget = getLogicalTarget(viewport, 'previous', true);

      await user.click(page.getByRole('button', { name: 'Scroll previous tabs' }));

      await expect.poll(() => isFullyVisible(viewport, previousTarget)).toBe(true);
    });

    it('scrolls focused selected tabs into view with ArrowRight and End', async function keyboardVisibility() {
      const user = userEvent.setup();
      await render(<OverflowExample />);
      const viewport = getViewport('Product settings');
      const overview = page.getByRole('tab', { name: 'Overview' });
      const availability = page.getByRole('tab', { name: 'Availability' });
      const notifications = page.getByRole('tab', { name: 'Notifications' });

      await user.click(overview);
      await user.keyboard('{ArrowRight}');
      await expect.element(availability).toHaveFocus();
      await expect.element(availability).toHaveAttribute('aria-selected', 'true');
      const availabilityElement = availability.element();
      if (!(availabilityElement instanceof HTMLElement)) throw new Error('Availability tab not found');
      await expect.poll(() => isFullyVisible(viewport, availabilityElement)).toBe(true);
      await user.keyboard('{End}');
      await expect.element(notifications).toHaveFocus();
      await expect.element(notifications).toHaveAttribute('aria-selected', 'true');
      const notificationsElement = notifications.element();
      if (!(notificationsElement instanceof HTMLElement)) throw new Error('Notifications tab not found');
      await expect.poll(() => isFullyVisible(viewport, notificationsElement)).toBe(true);
    });

    it('does not render overflow controls when all tabs fit', async function noOverflowControls() {
      await render(<DefaultExample />);
      await expect.element(page.getByRole('button', { name: 'Previous tabs' })).not.toBeInTheDocument();
      await expect.element(page.getByRole('button', { name: 'Next tabs' })).not.toBeInTheDocument();
    });
  });
});
