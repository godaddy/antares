import assume from 'assume';
import { beforeAll, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { set } from '#components/icon';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarDefaultRangeExample } from '../examples/default-range.tsx';
import { CalendarTodayDistinctExample } from '../examples/today-distinct.tsx';
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
      'chevron-left': (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" stroke="#111" strokeWidth="2" fill="none" />
        </svg>
      ),
      'chevron-right': (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" stroke="#111" strokeWidth="2" fill="none" />
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

      it('changes the visible year when the Year input changes', async function changesYear() {
        const { container } = await render(<CalendarDefaultExample />);
        const yearInput = page.getByRole('textbox', { name: /year/i });

        await userEvent.tripleClick(yearInput);
        await userEvent.keyboard('2025');
        await userEvent.keyboard('{Enter}');

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const yearEl = container.querySelector('input[aria-label="Year"]') as HTMLInputElement | null;
        assume(yearEl?.value ?? '').contains('2025');
      });

      it('clamps the Year input to the configured min/max range', async function limitedYears() {
        const { container } = await render(<CalendarWithMinMaxExample />);
        const yearInput = page.getByRole('textbox', { name: /year/i });

        await userEvent.tripleClick(yearInput);
        await userEvent.keyboard('2099');
        await userEvent.keyboard('{Enter}');

        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const yearEl = container.querySelector('input[aria-label="Year"]') as HTMLInputElement | null;
        assume(yearEl?.value ?? '').equals('2024');
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
  });

  describe('#RangeCalendar', function rangeCalendar() {
    describe('#default', function defaultRange() {
      it('renders two side-by-side grids', async function twoGrids() {
        const { container } = await render(<CalendarDefaultRangeExample />);
        const grids = container.querySelectorAll('[role="grid"]');
        assume(grids.length).equals(2);
      });

      it('renders out-of-month days with day numbers in both grids', async function rendersOutsideMonth() {
        const { container } = await render(<CalendarDefaultRangeExample />);
        const outsideMonth = container.querySelectorAll('[data-outside-month]');
        assume(outsideMonth.length).is.at.least(1);
        const someHaveContent = Array.from(outsideMonth).some(function hasContent(cell) {
          return (cell.textContent ?? '').trim().length > 0;
        });
        assume(someHaveContent).equals(true);
      });

      it('keeps grids and header dropdowns stable when hovering across months during in-progress range pick', async function hoverStable() {
        // Regression: RAC's pickers read state.focusedDate, which highlightDate moves on hover.
        // Our header pins display to state.visibleRange.start so dropdowns track the GRID, not focus.
        const { container } = await render(<CalendarDefaultRangeExample />);

        const day14 = page.getByRole('button', { name: /Thursday, March 14/ });
        await userEvent.click(day14);
        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const day20 = page.getByRole('button', { name: /Saturday, April 20/ });
        await userEvent.hover(day20);
        await new Promise(function wait(resolve) {
          setTimeout(resolve, 100);
        });

        const grids = container.querySelectorAll('[role="grid"]');
        const leftGrid = grids[0];
        const rightGrid = grids[1];
        assume(!!leftGrid?.querySelector('[aria-label*="Friday, March 15"]')).equals(true);
        assume(!!rightGrid?.querySelector('[aria-label*="Monday, April 15"]')).equals(true);

        const monthButtons = Array.from(container.querySelectorAll('button[aria-haspopup="listbox"]'));
        assume(monthButtons[0]?.textContent ?? '').contains('March');
        assume(monthButtons[1]?.textContent ?? '').contains('April');
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
});
