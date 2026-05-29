import { parseDate } from '@internationalized/date';
import assume from 'assume';
import { beforeAll, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { set } from '#components/icon';
import { Calendar, type DayIndicator } from '@godaddy/antares';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarDefaultRangeExample } from '../examples/default-range.tsx';
import { CalendarOutOfMonthDaysExample } from '../examples/out-of-month-days.tsx';
import { CalendarTodayDistinctExample } from '../examples/today-distinct.tsx';
import { CalendarWithDurationExample } from '../examples/with-duration.tsx';
import { CalendarWithIndicatorsExample } from '../examples/with-indicators.tsx';
import { CalendarWithMinMaxExample } from '../examples/with-min-max.tsx';
import { CalendarWithUnavailableDatesExample } from '../examples/with-unavailable-dates.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    set({
      'chevron-down': (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="2" fill="none" />
        </svg>
      ),
      alert: (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2z" stroke="#b22222" strokeWidth="2" />
        </svg>
      )
    });
  });

  describe('#Calendar', function calendar() {
    describe('#default', function defaultTests() {
      it('renders the default month with day cells', async function renders() {
        const { container } = await render(<CalendarDefaultExample />);
        const cells = container.querySelectorAll('[role="gridcell"]');
        assume(cells.length).is.at.least(28);
      });
    });

    describe('#header', function header() {
      it('changes the visible month when the Month Select changes', async function changesMonth() {
        await render(<CalendarDefaultExample />);
        const monthButton = page.getByRole('button', { name: /month/i });

        await userEvent.click(monthButton);
        const juneOption = page.getByRole('option', { name: 'June' });
        await userEvent.click(juneOption);

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const updated = page.getByRole('button', { name: /month/i });
        assume(updated.element().textContent ?? '').contains('June');
      });

      it('changes the visible year when the Year Select changes', async function changesYear() {
        await render(<CalendarDefaultExample />);
        const yearButton = page.getByRole('button', { name: /year/i });

        await userEvent.click(yearButton);
        const yearOption = page.getByRole('option', { name: '2025' });
        await userEvent.click(yearOption);

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const updated = page.getByRole('button', { name: /year/i });
        assume(updated.element().textContent ?? '').contains('2025');
      });

      it('limits the Year Select options to the configured min/max range', async function limitedYears() {
        await render(<CalendarWithMinMaxExample />);
        const yearButton = page.getByRole('button', { name: /year/i });

        await userEvent.click(yearButton);

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const options = document.querySelectorAll('[role="option"]');
        const labels = Array.from(options).map(function getLabel(option) {
          return (option.textContent ?? '').trim();
        });

        assume(labels.length).equals(1);
        assume(labels[0]).equals('2024');
      });
    });

    describe('#unavailableDates', function unavailableDates() {
      it('marks weekends as data-unavailable', async function unavailable() {
        const { container } = await render(<CalendarWithUnavailableDatesExample />);
        const unavailableCells = container.querySelectorAll('[data-unavailable]');
        assume(unavailableCells.length).is.at.least(4);
      });
    });

    describe('#minMax', function minMax() {
      it('disables days outside the [minValue, maxValue] range', async function disablesOutOfRange() {
        const { container } = await render(<CalendarWithMinMaxExample />);
        const monthButton = page.getByRole('button', { name: /month/i });

        await userEvent.click(monthButton);
        const januaryOption = page.getByRole('option', { name: 'January' });
        await userEvent.click(januaryOption);

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const disabled = container.querySelectorAll('[data-disabled]');
        assume(disabled.length).is.at.least(1);
      });
    });

    describe('#indicators', function indicators() {
      it('renders 1, 2, and 3 dots for the example days', async function variousDots() {
        const { container } = await render(<CalendarWithIndicatorsExample />);
        const successDots = container.querySelectorAll('[style*="color-feedback-success-strong"]');
        const warningDots = container.querySelectorAll('[style*="color-feedback-warning-strong"]');
        const criticalDots = container.querySelectorAll('[style*="color-feedback-critical-strong"]');

        // March-only: day 5 -> success x1; day 12 -> warning + info; day 18 -> critical + highlight + passive;
        // day 22 has 4 returned, sliced to first 3 (critical, highlight, info) — success is dropped.
        assume(successDots.length).equals(1); // day 5 only
        assume(warningDots.length).equals(1); // day 12
        assume(criticalDots.length).equals(2); // day 18 + day 22
      });

      it('slices to 3 indicators and warns in dev when the consumer returns more', async function slices() {
        const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(function noop() {
          // ignore
        });

        const { container } = await render(<OverflowIndicatorsExample />);
        const cellsWithDots = Array.from(container.querySelectorAll('[role="gridcell"]')).filter(
          function hasDots(cell) {
            return cell.querySelectorAll('[class*="indicator_"]').length > 0;
          }
        );
        const maxDotsInCell = cellsWithDots.length
          ? Math.max(
              ...cellsWithDots.map(function count(cell) {
                return cell.querySelectorAll('[class*="indicator_"]').length;
              })
            )
          : 0;
        assume(maxDotsInCell).is.at.most(3);
        assume(consoleWarn.mock.calls.length).is.above(0);

        consoleWarn.mockRestore();
      });

      it('exposes the indicator label to assistive tech via a hidden span', async function indicatorLabel() {
        const { container } = await render(<CalendarWithIndicatorsExample />);
        assume(container.textContent ?? '').contains('Available');
        assume(container.textContent ?? '').contains('Limited');
      });
    });
  });

  describe('#RangeCalendar', function rangeCalendar() {
    describe('#default', function defaultRange() {
      it('renders two side-by-side grids', async function twoGrids() {
        const { container } = await render(<CalendarDefaultRangeExample />);
        const grids = container.querySelectorAll('[role="grid"]');
        assume(grids.length).equals(2);
      });

      it('hides out-of-month days entirely (no day number rendered)', async function hidesOutOfMonth() {
        const { container } = await render(<CalendarDefaultRangeExample />);
        const outsideMonth = container.querySelectorAll('[data-outside-month]');
        assume(outsideMonth.length).is.at.least(1);
        for (const cell of Array.from(outsideMonth)) {
          assume((cell.textContent ?? '').trim()).equals('');
        }
      });
    });

    describe('#duration', function duration() {
      it('disables end candidates within minDuration and beyond maxDuration after a start click', async function constrains() {
        const { container } = await render(<CalendarWithDurationExample />);

        const day15 = container.querySelector<HTMLElement>('[role="gridcell"][data-today]')
          ?? container.querySelectorAll<HTMLElement>('[role="gridcell"]:not([data-outside-month])')[14];
        assume(day15).exists();
        await userEvent.click(day15 as HTMLElement);

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const unavailable = container.querySelectorAll('[data-unavailable]');
        assume(unavailable.length).is.at.least(2);
      });
    });

    describe('#todayDistinct', function todayDistinct() {
      it('renders today + selected + in-range states together', async function coexists() {
        const { container } = await render(<CalendarTodayDistinctExample />);
        const todayCell = container.querySelector('[data-today]');
        assume(todayCell).exists();

        const isSelected = todayCell?.hasAttribute('data-selected') ?? false;
        assume(isSelected).equals(true);
      });
    });
  });

  describe('#OutOfMonthRendering', function outOfMonthRendering() {
    it('renders out-of-month cells in single Calendar (with content) and hides them in Range', async function rendering() {
      const { container } = await render(<CalendarOutOfMonthDaysExample />);
      const grids = container.querySelectorAll('[role="grid"]');
      // grids[0] = single, grids[1] and grids[2] = first/second month of range.
      const singleOutside = grids[0].querySelectorAll('[data-outside-month]');
      const rangeOutside = Array.from(grids[1].querySelectorAll('[data-outside-month]')).concat(
        Array.from(grids[2].querySelectorAll('[data-outside-month]'))
      );

      assume(singleOutside.length).is.at.least(1);
      const singleHasContent = Array.from(singleOutside).some(function hasContent(cell) {
        return (cell.textContent ?? '').trim().length > 0;
      });
      assume(singleHasContent).equals(true);

      assume(rangeOutside.length).is.at.least(1);
      const rangeAllEmpty = rangeOutside.every(function isEmpty(cell) {
        return (cell.textContent ?? '').trim().length === 0;
      });
      assume(rangeAllEmpty).equals(true);
    });
  });
});

function OverflowIndicatorsExample() {
  function getDayIndicators(): DayIndicator[] {
    return [{ color: 'critical' }, { color: 'highlight' }, { color: 'info' }, { color: 'success' }];
  }

  return <Calendar aria-label="overflow" defaultValue={parseDate('2024-03-15')} getDayIndicators={getDayIndicators} />;
}
