import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DatePickerBasicExample } from '../examples/basic.tsx';
import { DatePickerControlledExample } from '../examples/controlled.tsx';
import { DatePickerWithErrorExample } from '../examples/with-error.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DatePicker', function datePicker() {
    it('opens the calendar popover when the field is pressed', async function opens() {
      const { getByRole } = await render(<DatePickerBasicExample />);
      await userEvent.click(getByRole('button'));
      await expect.element(getByRole('grid')).toBeVisible();
    });

    it('selecting a day updates the trigger label', async function select() {
      const { getByRole } = await render(<DatePickerControlledExample />);
      await userEvent.click(getByRole('button'));
      await userEvent.click(getByRole('button', { name: /March 20/ }));
      await expect.element(getByRole('button')).toHaveTextContent(/March 20/);
    });

    it('renders an error message when invalid', async function error() {
      const { getByText } = await render(<DatePickerWithErrorExample />);
      await expect.element(getByText('Please choose a date')).toBeVisible();
    });
  });
});
