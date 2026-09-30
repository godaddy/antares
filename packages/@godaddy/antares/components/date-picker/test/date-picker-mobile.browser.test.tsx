import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { parseDate } from '@godaddy/antares/date';
import { MobileExample } from '../examples/mobile.tsx';

describe('@godaddy/antares', function packageTests() {
  describe('#DatePicker mobile', function mobileTests() {
    afterEach(async function reset() {
      await cleanup();
      vi.unstubAllGlobals();
      document.documentElement.style.fontSize = '';
      await page.viewport(1024, 768);
    });

    it.each([
      false,
      true
    ])('selects in the %s range drawer and restores trigger focus', async function selection(range) {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range={range} />);
      const trigger = screen.getByRole('button', { name: /Calendar Event dates/ });
      await trigger.click();
      await expect.element(screen.getByRole('dialog', { name: /Event dates/ })).toBeVisible();
      expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).not.toBeNull();
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
    });

    it('keeps the container while open and switches on the next opening', async function breakpoint() {
      await page.viewport(639, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const dialog = screen.getByRole('dialog').element();
      await page.viewport(640, 768);
      expect(screen.getByRole('dialog').element()).toBe(dialog);
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).toBeNull();
      expect(screen.getByRole('grid').all()).toHaveLength(1);
    });

    it('preserves the visible month while resizing an open drawer', async function resizeScroll() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect
        .poll(function settled() {
          return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
        })
        .toBe('none');
      for (const [date, name] of [
        ['2026-10-01', 'October'],
        ['2026-11-01', 'November']
      ]) {
        const month = document.querySelector(`[data-calendar-month="${date}"]`) as HTMLElement;
        month.scrollIntoView();
        await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent(name);
      }
      const month = document.querySelector('[data-calendar-month="2026-11-01"]') as HTMLElement;
      const viewport = month.parentElement!;
      const offset = month.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
      await page.viewport(640, 768);
      await expect
        .poll(function anchored() {
          return Math.abs(month.getBoundingClientRect().top - viewport.getBoundingClientRect().top - offset);
        })
        .toBeLessThan(2);
    });

    it('supports the popover opt-out on a small viewport', async function popover() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample overlay="popover" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).toBeNull();
      expect(screen.getByRole('grid').all()).toHaveLength(1);
    });

    it('keeps a partial range while browsing another month', async function browseRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      const november = document.querySelector('[data-calendar-month="2026-11-01"]') as HTMLElement;
      november.scrollIntoView();
      await screen.getByRole('button', { name: /November 12, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-11-12');
    });

    it('uses explicit focus ahead of selection and supports distant year navigation', async function focus() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample selectedDate="2026-03-15" focusedDate="2026-12-10" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect.element(screen.getByRole('button', { name: /December 10, 2026/ })).toHaveFocus();
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('1980');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveFocus();
      await expect.element(screen.getByRole('button', { name: /December 1, 1980/ })).toBeVisible();
      expect(screen.getByRole('grid').all().length).toBeLessThanOrEqual(6);
    });

    it('browses 55 months in both directions with stable focus and bounded grids', async function longScroll() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect
        .poll(function settled() {
          return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
        })
        .toBe('none');
      const focused = document.activeElement;
      const viewport = document.querySelector('[data-calendar-month]')!.parentElement!;
      let month = parseDate('2026-09-01');
      for (const direction of [1, -1]) {
        for (let step = 0; step < 55; step++) {
          month = month.add({ months: direction });
          const target = viewport.querySelector(`[data-calendar-month="${month}"]`) as HTMLElement;
          expect(target).not.toBeNull();
          viewport.scrollTop += target.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
          await new Promise(function frames(resolve) {
            requestAnimationFrame(function nextFrame() {
              requestAnimationFrame(resolve);
            });
          });
          expect(screen.getByRole('grid').all().length).toBeLessThanOrEqual(6);
          await expect
            .poll(
              function offset() {
                return Math.abs(target.getBoundingClientRect().top - viewport.getBoundingClientRect().top);
              },
              { message: `Scroll anchor for ${month} in direction ${direction}` }
            )
            .toBeLessThan(2);
        }
      }
      expect(document.activeElement).toBe(focused);
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
    }, 30000);

    it('keeps an unfinished year edit when scrolling updates the header', async function editYear() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('198');
      for (const [date, name] of [
        ['2026-10-01', 'October'],
        ['2026-11-01', 'November'],
        ['2026-12-01', 'December'],
        ['2027-01-01', 'January']
      ]) {
        const month = document.querySelector(`[data-calendar-month="${date}"]`) as HTMLElement;
        month.scrollIntoView();
        await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent(name);
      }
      await expect.element(year).toHaveValue('198');
      await year.fill('1980');
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByRole('button', { name: /January 1, 1980/ })).toBeVisible();
      await expect.element(year).toHaveFocus();
    });

    it('moves keyboard focus across loaded months', async function keyboard() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      for (let step = 0; step < 12; step++) await userEvent.keyboard('{PageDown}');
      await expect.element(screen.getByRole('button', { name: /September 15, 2027/ })).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2027-09-15');
    });

    it('does not commit an unfinished range on background click or Escape', async function cancelRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range selectedDate="2026-09-05" />);
      const trigger = screen.getByRole('button', { name: /Calendar Event dates/ });
      await trigger.click();
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      const label = document.querySelector('[data-calendar-month="2026-09-01"]')!.firstElementChild as HTMLElement;
      label.click();
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
      await userEvent.keyboard('{Escape}');
      await expect.element(screen.getByRole('dialog')).not.toBeInTheDocument();
      await expect.element(trigger).toHaveTextContent(/Sep 5.*Sep 8/);
      await trigger.click();
      await screen.getByRole('button', { name: /September 18, 2026/ }).click();
      await expect.element(screen.getByRole('dialog')).toBeVisible();
      await screen.getByRole('button', { name: /September 19, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-18/2026-09-19');
    });

    it.each([
      false,
      true
    ])('respects bounds and noncontiguous range policy %s', async function bounds(allowsNonContiguousRanges) {
      await page.viewport(320, 768);
      const screen = await render(
        <MobileExample
          range
          min="2026-09-05"
          max="2026-11-15"
          unavailable
          allowsNonContiguousRanges={allowsNonContiguousRanges}
        />
      );
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect
        .element(screen.getByRole('button', { name: /September 3, 2026/ }))
        .toHaveAttribute('aria-disabled', 'true');
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await expect
        .element(screen.getByRole('button', { name: /September 20, 2026/ }))
        .toHaveAttribute('aria-disabled', 'true');
      if (allowsNonContiguousRanges) {
        const november = document.querySelector('[data-calendar-month="2026-11-01"]') as HTMLElement;
        november.scrollIntoView();
        await screen.getByRole('button', { name: /November 12, 2026/ }).click();
        await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-11-12');
      } else {
        await expect
          .element(screen.getByRole('button', { name: /September 21, 2026/ }))
          .toHaveAttribute('aria-disabled', 'true');
        await screen.getByRole('button', { name: /September 18, 2026/ }).click();
        await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15/2026-09-18');
      }
    });

    it.each([false, true])('starts from the selected value for range=%s', async function selectedFocus(range) {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range={range} selectedDate="2026-03-15" defaultFocusedDate="" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect.element(screen.getByRole('button', { name: /March 15, 2026/ })).toHaveFocus();
    });

    it('honors controlled open state when reopening during exit', async function controlledOpen() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample isOpen />);
      await expect.element(screen.getByRole('dialog')).toBeVisible();
      await screen.rerender(<MobileExample isOpen={false} />);
      await page.viewport(640, 768);
      await screen.rerender(<MobileExample isOpen />);
      await expect.element(screen.getByRole('dialog')).toBeVisible();
      expect(screen.getByRole('dialog').all()).toHaveLength(1);
      expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).toBeNull();
    });

    it.each([
      'closed',
      'defaultOpen',
      'controlled'
    ] as const)('hydrates a %s picker at a narrow viewport', async function hydrate(mode) {
      await page.viewport(320, 768);
      vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
      const props = { defaultOpen: mode === 'defaultOpen', isOpen: mode === 'controlled' ? true : undefined };
      const container = document.createElement('div');
      container.innerHTML = renderToString(<MobileExample {...props} />);
      document.body.append(container);
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function mount() {
          root = hydrateRoot(container, <MobileExample {...props} />, { onRecoverableError });
        });
        if (mode !== 'closed') {
          await expect.element(page.getByRole('dialog')).toBeVisible();
          expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).toBeNull();
          await act(async function close() {
            if (mode === 'controlled') root?.render(<MobileExample isOpen={false} />);
            else await userEvent.keyboard('{Escape}');
          });
          await act(async function finishExit() {
            await Promise.all(
              document.getAnimations().map(function finish(animation) {
                return animation.finished;
              })
            );
          });
          await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
        }
        await act(async function open() {
          if (mode === 'controlled') root?.render(<MobileExample isOpen />);
          else await page.getByRole('button', { name: /Calendar Event dates/ }).click();
        });
        await expect.element(page.getByRole('dialog')).toBeVisible();
        expect(page.getByRole('dialog').all()).toHaveLength(1);
        expect(document.querySelector('[data-placement="bottom"]:not([data-trigger])')).not.toBeNull();
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
      }
    });

    it('fits a 320px RTL viewport with enlarged text', async function rtl() {
      await page.viewport(320, 768);
      document.documentElement.style.fontSize = '200%';
      const screen = await render(<MobileExample locale="ar-AE" defaultOpen />);
      const dialog = screen.getByRole('dialog').element();
      for (const grid of screen.getByRole('grid').all()) {
        const rect = grid.element().getBoundingClientRect();
        expect(rect.left).toBeGreaterThanOrEqual(dialog.getBoundingClientRect().left);
        expect(rect.right).toBeLessThanOrEqual(dialog.getBoundingClientRect().right);
      }
      const viewport = document.querySelector('[data-calendar-month]')!.parentElement!;
      expect(viewport.scrollWidth).toBe(viewport.clientWidth);
    });

    it('cancels a pending range when reopened during the same drawer exit', async function reopenRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range isOpen />);
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await screen.rerender(<MobileExample range isOpen={false} />);
      await screen.rerender(<MobileExample range isOpen />);
      await screen.getByRole('button', { name: /September 18, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
      await screen.getByRole('button', { name: /September 19, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-18/2026-09-19');
    });

    it('clamps committed header years to the date bounds', async function yearBounds() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample min="2026-01-01" max="2027-12-31" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const year = screen.getByRole('textbox', { name: 'Year' });
      await year.fill('1980');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2026');
      await year.fill('2030');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2027');
    });

    it('reveals controlled focus changes without selecting', async function controlledFocus() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample focusedDate="2026-09-15" />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const dialog = screen.getByRole('dialog').element();
      await screen.rerender(<MobileExample focusedDate="2026-11-15" />);
      await expect.element(screen.getByRole('button', { name: /November 15, 2026/ })).toHaveFocus();
      await screen.rerender(<MobileExample focusedDate="1980-06-12" />);
      await expect.element(screen.getByRole('button', { name: /June 12, 1980/ })).toHaveFocus();
      expect(screen.getByRole('dialog').element()).toBe(dialog);
      await expect.element(screen.getByLabelText('Selected dates')).toBeEmptyDOMElement();
    });

    it('uses locale calendar dates with Gregorian bounds and values', async function localeCalendar() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample locale="ar-SA-u-ca-islamic" min="2026-09-05" max="2026-11-15" />);
      await screen.getByRole('button', { name: /Event dates/ }).click();
      await userEvent.keyboard('{Enter}');
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15');
    });

    it('preserves the visible month when completing a range', async function rangePosition() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      const month = document.querySelector('[data-calendar-month="2026-09-01"]') as HTMLElement;
      await expect
        .poll(function settled() {
          return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
        })
        .toBe('none');
      const before = month.getBoundingClientRect().top;
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await screen.getByRole('button', { name: /September 25, 2026/ }).click();
      expect(Math.abs(month.getBoundingClientRect().top - before)).toBeLessThan(2);
      await expect.element(screen.getByRole('button', { name: 'Month' })).toHaveTextContent('September');
    });

    it('does not close when shouldCloseOnSelect is false', async function stayOpen() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await expect.element(screen.getByRole('dialog')).toBeVisible();
      await expect.element(screen.getByLabelText('Selected dates')).toHaveTextContent('2026-09-15');
    });
  });
});
