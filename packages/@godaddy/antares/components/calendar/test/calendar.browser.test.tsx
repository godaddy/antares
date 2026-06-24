import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { CalendarWithValueExample } from '../examples/with-value.tsx';

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
  });
});
