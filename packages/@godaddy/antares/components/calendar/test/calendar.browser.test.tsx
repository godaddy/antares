import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { CalendarWithValueExample } from '../examples/with-value.tsx';
import { RangeCalendarExample } from '../examples/range.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Calendar', function calendar() {
    it('selects a day on click and reflects it as selected', async function selects() {
      const { getByRole } = await render(<CalendarWithValueExample />);
      const day20 = getByRole('button', { name: /March 20/ });
      await userEvent.click(day20);
      await expect.element(day20).toHaveAttribute('data-selected', 'true');
    });

    it('jumps to a month via the month dropdown', async function monthSelect() {
      const { getByRole } = await render(<CalendarWithValueExample />);
      await userEvent.click(getByRole('button', { name: /Month/ }));
      await userEvent.click(getByRole('option', { name: /January/ }));
      await expect.element(getByRole('button', { name: /Month/ })).toHaveTextContent(/January/);
    });

    it('jumps to a year typed into the year input', async function yearInput() {
      const { getByRole } = await render(<CalendarWithValueExample />);
      const year = getByRole('textbox', { name: /Year/ });
      await userEvent.fill(year, '2030');
      await userEvent.keyboard('{Enter}');
      await expect.element(year).toHaveValue('2030');
    });

    it('range calendar shows two months by default', async function twoMonths() {
      const screen = await render(<RangeCalendarExample />);
      const monthSelects = screen.getByRole('button', { name: 'Month' }).all();
      expect(monthSelects.length).toBe(2);
      await expect.element(monthSelects[0]).toHaveTextContent('March');
      await expect.element(monthSelects[1]).toHaveTextContent('April');
    });

    it('range calendar pages by the full visible range', async function navRange() {
      const screen = await render(<RangeCalendarExample />);
      // RAC also mounts a client-only hidden "Next" button; the real, focusable one is first.
      const [nextButton] = screen.getByRole('button', { name: 'Next' }).all();
      await userEvent.click(nextButton);
      const monthSelects = screen.getByRole('button', { name: 'Month' }).all();
      await expect.element(monthSelects[0]).toHaveTextContent('May');
      await expect.element(monthSelects[1]).toHaveTextContent('June');
    });

    it('editing the second month keeps the two months contiguous', async function anchor() {
      const screen = await render(<RangeCalendarExample />);
      const monthSelects = screen.getByRole('button', { name: 'Month' }).all();
      await userEvent.click(monthSelects[1]);
      await userEvent.click(screen.getByRole('option', { name: 'December' }));
      const updated = screen.getByRole('button', { name: 'Month' }).all();
      await expect.element(updated[0]).toHaveTextContent('November');
      await expect.element(updated[1]).toHaveTextContent('December');
    });
  });
});
