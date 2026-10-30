import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { I18nProvider } from 'react-aria-components';
import { preloadTestIcons, resetPointer } from '#test/utils/test-helpers.tsx';
import { MobileExample } from '../examples/mobile.tsx';
import { parseDate } from '@godaddy/antares/date';

const drawer = '[data-position="bottom"]:has(> [role="dialog"])';

describe('@godaddy/antares', function packageTests() {
  describe('#DatePicker mobile', function mobileTests() {
    beforeAll(preloadTestIcons);
    afterEach(async function reset() {
      await cleanup();
      vi.unstubAllGlobals();
      document.documentElement.style.fontSize = '';
      await page.viewport(1024, 768);
    });

    async function settle(dialog: Element) {
      await expect
        .poll(function entered() {
          return dialog.closest('[data-entering]');
        })
        .toBeNull();
    }

    it.each([false, true])(
      'selects in the %s range drawer and restores trigger focus',
      async function selection(range) {
        await page.viewport(320, 768);
        const screen = await render(<MobileExample range={range} />);
        const trigger = screen.getByRole('button', { name: /Calendar Event dates/ });
        await trigger.click();
        await expect.element(screen.getByRole('dialog', { name: /Event dates/ })).toBeVisible();
        expect(document.querySelector(drawer)).not.toBeNull();
        await settle(screen.getByRole('dialog').element());
        await screen.getByRole('button', { name: /September 15, 2026/ }).click();
        if (range) {
          await expect.element(screen.getByRole('dialog')).toBeVisible();
          await screen.getByRole('button', { name: /September 18, 2026/ }).click();
        }
        await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
        await expect
          .element(screen.getByLabelText('Selected dates'))
          .toHaveTextContent(range ? '2026-09-15/2026-09-18' : '2026-09-15');
        await expect.element(trigger).toHaveFocus();
      }
    );

    it('loads months in both directions without moving focus or committing a range', async function scrolling() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await resetPointer();
      const focused = document.activeElement;
      const start = parseDate('2026-09-01');
      for (const offset of [3, 6, 9, 6, 3, 0, -3, -6]) {
        const date = start.add({ months: offset });
        await expect
          .poll(function loaded() {
            return document.querySelector(`[data-calendar-month="${date}"]`);
          })
          .not.toBeNull();
        document.querySelector(`[data-calendar-month="${date}"]`)!.scrollIntoView({ block: 'start' });
        expect(document.activeElement).toBe(focused);
      }
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
      await screen.getByRole('button', { name: /March 12, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-03-12/2026-09-15');
    });

    it.each(['sm', 'lg'] as const)(
      'sizes off-screen months like rendered ones, size=%s',
      async function placeholders(size) {
        await page.viewport(320, 768);
        const screen = await render(<MobileExample size={size} keepOpen />);
        await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
        await settle(screen.getByRole('dialog').element());
        const heights = new Map<string, number[]>();
        for (const month of document.querySelectorAll('[data-calendar-month]')) {
          const body = month.lastElementChild as HTMLElement;
          const weeks = body.querySelectorAll('tbody tr').length || body.style.getPropertyValue('--weeks');
          heights.set(`${weeks}`, [...(heights.get(`${weeks}`) ?? []), body.getBoundingClientRect().height]);
        }
        for (const values of heights.values()) {
          expect(Math.max(...values) - Math.min(...values)).toBeLessThan(0.1);
        }
        expect(document.querySelectorAll('[role="dialog"] table').length).toBeLessThan(
          document.querySelectorAll('[data-calendar-month]').length
        );
      }
    );

    it('describes and pages through the rendered months like React Aria', async function rangeName() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      const calendar = document.querySelector<HTMLElement>('[role="dialog"] [role="application"]')!;
      const months = document.querySelectorAll('[data-calendar-month]');
      const [first, last] = [months[0], months[months.length - 1]].map(function month(element) {
        return element.querySelector('h2')!.textContent!.split(' ')[0];
      });
      expect(calendar.getAttribute('aria-label')).toMatch(new RegExp(`${first}.*${last}`));
      calendar.querySelector<HTMLButtonElement>('button[aria-label="Next"]')!.click();
      await expect.element(screen.getByRole('button', { name: /October 15, 2026/ })).toHaveFocus();
    });

    it('rounds range segments around unavailable dates', async function rangeBand() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen unavailable allowsNonContiguousRanges />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      await screen.getByRole('button', { name: /October 15, 2026/ }).click();
      // Scroll only the month list: Playwright's own scroll-into-view can also move the drawer's swipe
      // container, sliding the drawer off screen.
      const end = screen.getByRole('button', { name: /October 25, 2026/ });
      end.element().scrollIntoView({ block: 'nearest' });
      await end.click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-10-15/2026-10-25');
      const before = getComputedStyle(
        screen.getByRole('button', { name: /October 19, 2026/ }).element().parentElement!
      );
      const after = getComputedStyle(screen.getByRole('button', { name: /October 21, 2026/ }).element().parentElement!);
      expect(before.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(after.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(before.borderStartEndRadius).not.toBe('0px');
      expect(after.borderStartStartRadius).not.toBe('0px');
    });

    it('keeps the drawer, scroll, and focus while resizing and switches on the next opening', async function resize() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const dialog = screen.getByRole('dialog').element();
      await settle(dialog);
      const focused = document.activeElement;
      const month = document.querySelector('[data-calendar-month="2026-11-01"]') as HTMLElement;
      const viewport = month.parentElement!;
      month.scrollIntoView();
      await page.viewport(640, 768);
      expect(screen.getByRole('dialog').element()).toBe(dialog);
      expect(document.activeElement).toBe(focused);
      expect(month.getBoundingClientRect().top).toBeLessThan(viewport.getBoundingClientRect().bottom);
      expect(month.getBoundingClientRect().bottom).toBeGreaterThan(viewport.getBoundingClientRect().top);
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      expect(document.querySelector(drawer)).toBeNull();
      expect(screen.getByRole('grid').all()).toHaveLength(1);
    });

    it('supports the popover opt-out on a small viewport', async function popover() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample overlay="popover" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      expect(document.querySelector(drawer)).toBeNull();
      expect(screen.getByRole('grid').all()).toHaveLength(1);
    });

    it('navigates with the month and year controls', async function monthAndYear() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      await screen.getByRole('button', { name: 'Month' }).click();
      await screen.getByRole('option', { name: 'February', exact: true }).click();
      await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent('February');
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('1980');
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByRole('button', { name: /February 15, 1980/ })).toBeVisible();
      await expect.element(year).toHaveFocus();
    });

    it('limits months and header navigation to the date bounds', async function bounds() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample min="2026-03-01" max="2027-12-31" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('1980');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2026');
      await screen.getByRole('button', { name: 'Month' }).click();
      await screen.getByRole('option', { name: 'January', exact: true }).click();
      await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent('March');
      await expect
        .poll(function firstMonth() {
          return document.querySelector<HTMLElement>('[data-calendar-month]')!.dataset.calendarMonth;
        })
        .toBe('2026-03-01');
      const months = document.querySelectorAll<HTMLElement>('[data-calendar-month]');
      months[months.length - 1].scrollIntoView();
      await expect
        .poll(function loaded() {
          return document.querySelectorAll('[data-calendar-month]').length;
        })
        .toBeGreaterThan(months.length);
      await year.fill('2030');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2027');
    });

    it('limits header navigation to an unfinished range', async function pendingRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen unavailable />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('2028');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2026');
      await screen.getByRole('button', { name: /September 18, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-09-18');
      const months = document.querySelectorAll<HTMLElement>('[data-calendar-month]');
      months[months.length - 1].scrollIntoView();
      await expect
        .poll(function loaded() {
          return document.querySelectorAll('[data-calendar-month]').length;
        })
        .toBeGreaterThan(months.length);
    });

    it('updates month choices when navigating between Hebrew common and leap years', async function leapYear() {
      await page.viewport(320, 768);
      const screen = await render(
        <I18nProvider locale="en-US-u-ca-hebrew">
          <MobileExample />
        </I18nProvider>
      );
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('5786');
      await userEvent.keyboard('{Enter}');
      await screen.getByRole('button', { name: 'Month' }).click();
      expect(screen.getByRole('option').all()).toHaveLength(12);
      await userEvent.keyboard('{Escape}');
      await year.fill('5787');
      await userEvent.keyboard('{Enter}');
      await screen.getByRole('button', { name: 'Month' }).click();
      expect(screen.getByRole('option').all()).toHaveLength(13);
    });

    it('uses locale calendar dates with Gregorian bounds and values', async function localeCalendar() {
      await page.viewport(320, 768);
      const screen = await render(
        <I18nProvider locale="ar-SA-u-ca-islamic">
          <MobileExample min="2026-09-05" max="2026-11-15" />
        </I18nProvider>
      );
      await screen.getByRole('button', { name: /Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15');
    });

    it('moves keyboard focus into months outside the rendered window', async function keyboard() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      for (let step = 0; step < 6; step++) await userEvent.keyboard('{PageDown}');
      await expect.element(screen.getByRole('button', { name: /March 15, 2027/ })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2027-03-15');
    });

    it('reveals controlled focus changes without selecting', async function controlledFocus() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample keepOpen min="2026-09-01" focusedDate="2026-09-15" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const dialog = screen.getByRole('dialog').element();
      await settle(dialog);
      await screen.rerender(<MobileExample keepOpen min="2026-09-01" focusedDate="2028-09-15" />);
      await expect.element(screen.getByRole('button', { name: /September 15, 2028/ })).toHaveFocus();
      await expect.element(screen.getByRole('textbox', { name: 'Year' })).toHaveValue('2028');
      expect(document.querySelector('[data-calendar-month="2028-10-01"] table')).not.toBeNull();
      await screen.rerender(<MobileExample keepOpen min="2026-09-01" focusedDate="2026-11-15" />);
      await expect.element(screen.getByRole('button', { name: /November 15, 2026/ })).toHaveFocus();
      const cell = screen.getByRole('button', { name: /November 15, 2026/ }).element();
      const viewport = cell.closest('[data-calendar-month]')!.parentElement!;
      expect(cell.getBoundingClientRect().top).toBeGreaterThan(viewport.getBoundingClientRect().top - 1);
      expect(cell.getBoundingClientRect().bottom).toBeLessThan(viewport.getBoundingClientRect().bottom + 1);
      expect(screen.getByRole('dialog').element()).toBe(dialog);
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
    });

    it('preserves the visible month when completing a range', async function rangePosition() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle(screen.getByRole('dialog').element());
      const month = document.querySelector('[data-calendar-month="2026-09-01"]') as HTMLElement;
      const before = month.getBoundingClientRect().top;
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await screen.getByRole('button', { name: /September 25, 2026/ }).click();
      expect(Math.abs(month.getBoundingClientRect().top - before)).toBeLessThan(2);
      await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent('September');
    });

    it('hydrates at a narrow viewport and opens a drawer', async function hydrate() {
      await page.viewport(320, 768);
      vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
      const container = document.createElement('div');
      container.innerHTML = renderToString(<MobileExample />);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function mount() {
          root = hydrateRoot(container, <MobileExample />, { onRecoverableError });
        });
        await act(async function open() {
          await page.getByRole('button', { name: /Calendar Event dates/ }).click();
        });
        await expect.element(page.getByRole('dialog')).toBeVisible();
        expect(document.querySelector(drawer)).not.toBeNull();
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
      }
    });

    it('keeps enlarged right-to-left dates readable and selectable in a 320px drawer', async function enlargedText() {
      await page.viewport(320, 768);
      document.documentElement.style.fontSize = '200%';
      const screen = await render(
        <I18nProvider locale="ar-AE">
          <MobileExample />
        </I18nProvider>
      );
      await screen.getByRole('button', { name: /Event dates/ }).click();
      const dialog = screen.getByRole('dialog').element();
      await settle(dialog);
      expect(getComputedStyle(dialog).direction).toBe('rtl');
      const cell = document.querySelector<HTMLElement>('[data-calendar-month="2026-09-01"] [tabindex="0"]')!;
      const text = document.createRange();
      text.selectNodeContents(cell);
      expect(cell.getBoundingClientRect().width).toBeGreaterThan(text.getBoundingClientRect().width + 4);
      expect(cell.getBoundingClientRect().height).toBeGreaterThan(text.getBoundingClientRect().height);
      const viewport = cell.closest('[data-calendar-month]')!.parentElement!;
      expect(viewport.scrollWidth).toBeGreaterThan(viewport.clientWidth);
      expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
      for (const element of [viewport, ...dialog.querySelectorAll('header button, header input')]) {
        const rect = element.getBoundingClientRect();
        expect(rect.left).toBeGreaterThanOrEqual(dialog.getBoundingClientRect().left);
        expect(rect.right).toBeLessThanOrEqual(dialog.getBoundingClientRect().right);
      }
      await screen.getByRole('button', { name: cell.getAttribute('aria-label')!, exact: true }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15');
    });
  });
});
