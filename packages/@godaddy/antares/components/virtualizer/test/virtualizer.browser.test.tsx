import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { RTLProvider } from '#utils/rtl-locale-provider.tsx';
import { CardGroupExample } from '../examples/card-group.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DynamicCollectionExample } from '../examples/dynamic-collection.tsx';
import { GridExample } from '../examples/grid.tsx';
import { SelectExample } from '../examples/select.tsx';
import { SSRFixtureExample } from '../examples/ssr-fixture.tsx';
import { VariableHeightExample } from '../examples/variable-height.tsx';

function isInsideScrollport(item: Element, scrollport: Element) {
  const itemRect = item.getBoundingClientRect();
  const viewportRect = scrollport.getBoundingClientRect();
  // Focused rows can remain slightly clipped while scrollIntoView settles.
  return itemRect.bottom > viewportRect.top - 1 && itemRect.top < viewportRect.bottom + 1;
}

// Requires the test-only Vite define for process.env.VIRT_ON.
// A shell variable alone does not enable virtualization inside real Chromium.
describe('@godaddy/antares', function packageTests() {
  describe('#Virtualizer', function virtualizerTests() {
    beforeAll(preloadTestIcons);
    beforeEach(resetHover);
    afterEach(async function reset() {
      await cleanup();
      vi.unstubAllGlobals();
    });

    it('bounds DOM rows and exposes full collection positions', { timeout: 30_000 }, async function boundedRows() {
      const screen = await render(<DefaultExample />);
      const listbox = screen.getByRole('listbox', { name: 'Large collection' });
      const first = screen.getByRole('option', { name: 'Item 1' });
      await expect.element(first).toBeVisible();
      await expect.poll(() => listbox.element().querySelectorAll('[role="option"]').length).toBeGreaterThan(0);
      expect(listbox.element().querySelectorAll('[role="option"]').length).toBeLessThan(200);
      await expect.element(first).toHaveAttribute('aria-posinset', '1');
      await expect.element(first).toHaveAttribute('aria-setsize', '10000');
      await first.click();
      await userEvent.keyboard('{PageDown}');
      await expect.poll(() => Number(document.activeElement?.getAttribute('aria-posinset'))).toBeGreaterThan(1);
      const nextPagePosition = Number(document.activeElement?.getAttribute('aria-posinset'));
      await expect.poll(() => isInsideScrollport(document.activeElement!, listbox.element())).toBe(true);
      await userEvent.keyboard('{PageUp}');
      await expect
        .poll(() => Number(document.activeElement?.getAttribute('aria-posinset')))
        .toBeLessThan(nextPagePosition);
      await userEvent.keyboard('{Home}');
      await expect.element(first).toHaveFocus();
      await userEvent.keyboard('{End}');
      const last = screen.getByRole('option', { name: 'Item 10000' });
      await expect.element(last).toBeVisible();
      await expect.element(last).toHaveFocus();
      await expect.poll(() => isInsideScrollport(last.element(), listbox.element())).toBe(true);
      expect(listbox.element().querySelectorAll('[role="option"]').length).toBeLessThan(200);
      await userEvent.keyboard('{Home}');
      await expect.element(first).toHaveFocus();
      await userEvent.keyboard('Item 9876');
      await expect.element(screen.getByRole('option', { name: 'Item 9876' })).toHaveFocus();
    });

    it('skips disabled items and preserves the collection Tab stop', async function disabledAndTabOrder() {
      const screen = await render(<SSRFixtureExample />);
      const first = screen.getByRole('option', { name: 'Item 1' });
      await first.click();
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(screen.getByRole('option', { name: 'Item 3' })).toHaveFocus();
      await userEvent.keyboard('{Tab}');
      await expect.element(screen.getByRole('button', { name: 'After collection' })).toHaveFocus();
      await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
      const listbox = screen.getByRole('listbox', { name: 'Small collection' }).element();
      await expect.poll(() => listbox.contains(document.activeElement)).toBe(true);
    });

    it('keeps focus connected while scrolling and selection after recycling', async function persistedState() {
      const screen = await render(<DefaultExample />);
      const listbox = screen.getByRole('listbox', { name: 'Large collection' }).element();
      const first = screen.getByRole('option', { name: 'Item 1' });
      await first.click();
      const focused = first.element();
      await expect.element(first).toHaveAttribute('aria-selected', 'true');
      listbox.scrollTo({ top: listbox.scrollHeight });
      const last = screen.getByRole('option', { name: 'Item 10000' });
      await expect.element(last).toBeVisible();
      expect(focused.isConnected).toBe(true);
      expect(document.activeElement).toBe(focused);
      // Move focus without selecting so the first row may now recycle.
      last.element().focus();
      await expect.element(last).toHaveFocus();
      await expect.element(first).not.toBeInTheDocument();
      listbox.scrollTo({ top: 0 });
      await expect.element(first).toBeVisible();
      await expect.element(first).toHaveAttribute('aria-selected', 'true');
    });

    it('measures wrapping rows again when the collection narrows', async function measuredRows() {
      const screen = await render(<VariableHeightExample />);
      const listbox = screen.getByRole('listbox', { name: 'Variable height collection' }).element();
      const first = screen.getByRole('option', { name: /^Item 1(?:\s|$)/ });
      const second = screen.getByRole('option', { name: /^Item 2(?:\s|$)/ });
      await expect.element(first).toBeVisible();
      const previousHeight = first.element().getBoundingClientRect().height;
      listbox.style.inlineSize = '220px';
      await expect.poll(() => first.element().getBoundingClientRect().height).toBeGreaterThan(previousHeight);
      await expect
        .poll(() => second.element().getBoundingClientRect().top)
        .toBeGreaterThanOrEqual(first.element().getBoundingClientRect().bottom - 1);
      first.element().focus();
      await userEvent.keyboard('{End}');
      await expect.element(screen.getByRole('option', { name: /^Item 1000(?:\s|$)/ })).toHaveFocus();
    });

    it('moves grid focus by geometric rows and columns', async function gridKeyboard() {
      const screen = await render(<GridExample />);
      const first = screen.getByRole('option', { name: 'Item 1' });
      await first.click();
      const firstRect = first.element().getBoundingClientRect();
      expect(firstRect.height).toBe(96);
      await userEvent.keyboard('{ArrowDown}');
      await expect.poll(() => document.activeElement?.getBoundingClientRect().top ?? 0).toBeGreaterThan(firstRect.top);
      expect(
        Math.abs((document.activeElement?.getBoundingClientRect().left ?? 0) - firstRect.left)
      ).toBeLessThanOrEqual(1);
      await userEvent.keyboard('{ArrowUp}');
      await expect.element(first).toHaveFocus();
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(screen.getByRole('option', { name: 'Item 2' })).toHaveFocus();
    });

    it('reflows grid columns when the collection narrows', async function resizeGrid() {
      const screen = await render(<GridExample />);
      const listbox = screen.getByRole('listbox', { name: 'Grid collection' }).element();
      const first = screen.getByRole('option', { name: 'Item 1' });
      const second = screen.getByRole('option', { name: 'Item 2' });
      await expect.element(first).toBeVisible();
      listbox.style.inlineSize = '220px';
      await expect
        .poll(() => second.element().getBoundingClientRect().top)
        .toBeGreaterThanOrEqual(first.element().getBoundingClientRect().bottom - 1);
      expect(listbox.scrollWidth).toBeLessThanOrEqual(listbox.clientWidth + 1);
      first.element().focus();
      listbox.style.inlineSize = '480px';
      await expect.element(first).toHaveFocus();
      await expect
        .poll(() => second.element().getBoundingClientRect().top)
        .toBe(first.element().getBoundingClientRect().top);
    });

    it('uses RTL keyboard direction from the locale provider', async function rtlGrid() {
      const screen = await render(
        <RTLProvider>
          <GridExample />
        </RTLProvider>
      );
      const first = screen.getByRole('option', { name: 'Item 1' });
      await first.click();
      await userEvent.keyboard('{ArrowLeft}');
      const second = screen.getByRole('option', { name: 'Item 2' });
      await expect.element(second).toHaveFocus();
      expect(second.element().getBoundingClientRect().left).toBeLessThan(first.element().getBoundingClientRect().left);
    });

    it('bounds CardGroup rows and moves focus by grid geometry', async function cardGroup() {
      const screen = await render(<CardGroupExample />);
      const group = screen.getByRole('grid', { name: 'Virtualized cards' });
      const first = screen.getByRole('row', { name: 'Card 1' });
      await expect.element(first).toBeVisible();
      await expect.poll(() => group.element().querySelectorAll('[role="row"]').length).toBeGreaterThan(0);
      expect(group.element().querySelectorAll('[role="row"]').length).toBeLessThan(100);
      await first.click();
      await expect.element(first).toHaveAttribute('aria-selected', 'true');
      await userEvent.keyboard('{ArrowRight}');
      await expect.element(screen.getByRole('row', { name: 'Card 2' })).toHaveFocus();
      await userEvent.keyboard('{End}');
      await expect.element(screen.getByRole('row', { name: 'Card 500' })).toHaveFocus();
      expect(group.element().querySelectorAll('[role="row"]').length).toBeLessThan(100);
    });

    it('updates an appended, filtered, emptied, and reset collection', async function dynamicCollection() {
      const screen = await render(<DynamicCollectionExample />);
      await screen.getByRole('button', { name: 'Append 100 items' }).click();
      await expect.element(screen.getByRole('status')).toMatchTextContent('1100 results');
      await screen.getByRole('textbox', { name: 'Filter items' }).fill('Item 1100');
      await expect.element(screen.getByRole('status')).toMatchTextContent('1 result');
      await expect.element(screen.getByRole('option', { name: 'Item 1100' })).toBeVisible();
      await screen.getByRole('button', { name: 'Clear collection' }).click();
      await expect.element(screen.getByText('No items', { exact: true })).toBeVisible();
      await expect.element(screen.getByRole('status')).toMatchTextContent('0 results');
      await screen.getByRole('button', { name: 'Reset collection' }).click();
      await screen.getByRole('textbox', { name: 'Filter items' }).fill('');
      await expect.element(screen.getByRole('status')).toMatchTextContent('1000 results');
      const first = screen.getByRole('option', { name: 'Item 1' });
      await expect.element(first).toBeVisible();
      await first.click();
      await expect.element(first).toHaveAttribute('aria-selected', 'true');
      await screen.getByRole('button', { name: 'Clear collection' }).click();
      await expect.element(screen.getByText('No items', { exact: true })).toBeVisible();
      await screen.getByRole('button', { name: 'Reset collection' }).click();
      await expect.element(first).toBeVisible();
      await expect.element(first).toHaveAttribute('aria-selected', 'false');
    });

    it('reveals offscreen selection and returns focus when Select closes', async function selectCollection() {
      await render(<SelectExample />);
      const trigger = page.getByRole('button', { name: /Choose an item/ });
      await trigger.click();
      await expect.element(page.getByRole('dialog', { name: 'Choose an item' })).toBeVisible();
      const listbox = page.getByRole('listbox', { name: /Available items/ });
      await expect
        .poll(() => isInsideScrollport(page.getByRole('option', { name: 'Item 9000' }).element(), listbox.element()))
        .toBe(true);
      await expect.element(page.getByRole('option', { name: 'Item 9000' })).toBeVisible();
      await expect.element(page.getByRole('option', { name: 'Item 9000' })).toHaveAttribute('aria-selected', 'true');
      await userEvent.keyboard('{End}{Enter}');
      await expect.element(trigger).toMatchTextContent('Item 10000');
      await expect.element(trigger).toHaveFocus();
      await trigger.click();
      await expect.element(page.getByRole('option', { name: 'Item 10000' })).toBeVisible();
      await expect
        .poll(() => isInsideScrollport(page.getByRole('option', { name: 'Item 10000' }).element(), listbox.element()))
        .toBe(true);
      await userEvent.keyboard('{Escape}');
      await expect.element(trigger).toHaveFocus();
    });

    it('hydrates without losing the collection or keyboard behavior', async function hydrateCollection() {
      vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
      const container = document.createElement('div');
      container.innerHTML = renderToString(<SSRFixtureExample />);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function hydrate() {
          root = hydrateRoot(container, <SSRFixtureExample />, { onRecoverableError });
        });
        const first = page.getByRole('option', { name: 'Item 1' });
        await expect.element(first).toBeVisible();
        await first.click();
        await userEvent.keyboard('{End}');
        await expect.element(page.getByRole('option', { name: 'Item 3' })).toHaveFocus();
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
      }
    });
  });
});
