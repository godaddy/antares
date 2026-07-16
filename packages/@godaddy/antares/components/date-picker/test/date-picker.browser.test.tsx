import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DatePickerDefaultExample } from '../examples/default.tsx';
import { DatePickerControlledExample } from '../examples/controlled.tsx';
import { DatePickerWithErrorExample } from '../examples/with-error.tsx';
import { DateRangePickerExample } from '../examples/range.tsx';
import { DatePickerDisabledExample } from '../examples/disabled.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DatePicker', function datePicker() {
    it('opens the calendar popover when the field is pressed', async function opens() {
      const { getByRole } = await render(<DatePickerDefaultExample />);
      await userEvent.click(getByRole('button'));
      await expect.element(getByRole('grid')).toBeVisible();
    });

    it('opens the range calendar popover when the field is pressed', async function opensRange() {
      const screen = await render(<DateRangePickerExample />);
      await userEvent.click(screen.getByRole('button'));
      const grids = screen.getByRole('grid').all();
      expect(grids.length).toBe(2);
      await expect.element(grids[0]).toBeVisible();
    });

    it('does not open the popover when the trigger is disabled', async function disabled() {
      const { getByRole, container } = await render(<DatePickerDisabledExample />);
      await expect.element(getByRole('button')).toBeDisabled();
      await userEvent.click(getByRole('button'), { force: true });
      expect(container.querySelector('[role="grid"]')).toBeNull();
    });

    it('selecting a day updates the trigger label', async function select() {
      const { getByRole } = await render(<DatePickerControlledExample />);
      await userEvent.click(getByRole('button'));
      await userEvent.click(getByRole('button', { name: /March 20/ }));
      await expect.element(getByRole('button')).toHaveTextContent(/Mar 20/);
    });

    it('renders an error message when invalid', async function error() {
      const { getByText } = await render(<DatePickerWithErrorExample />);
      await expect.element(getByText('Please choose a date')).toBeVisible();
    });
  });
});
