import assume from 'assume';
import { describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DateFieldBasicExample } from '../examples/basic.tsx';
import { DateFieldControlledExample } from '../examples/controlled.tsx';
import { DateFieldDisabledRequiredReadOnlyExample } from '../examples/disabled-required-readonly.tsx';
import { DateFieldFormExample } from '../examples/form.tsx';
import { DateFieldWithDefaultValueExample } from '../examples/with-default-value.tsx';
import { DateFieldWithErrorExample } from '../examples/with-error.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DateField', function dateField() {
    describe('#basic', function basic() {
      it('renders label and editable segments', async function renders() {
        const { locator, container } = await render(<DateFieldBasicExample />);

        assume(locator.getByText('Start date').element()).exists();
        assume(container.querySelectorAll('[data-type="month"]').length).is.at.least(1);
        assume(container.querySelectorAll('[data-type="day"]').length).is.at.least(1);
        assume(container.querySelectorAll('[data-type="year"]').length).is.at.least(1);
      });
    });

    describe('#withDefaultValue', function withDefaultValue() {
      it('populates segments from a CalendarDate default', async function defaults() {
        const { container } = await render(<DateFieldWithDefaultValueExample />);
        const text = container.textContent ?? '';

        assume(text).contains('2024');
        assume(text).contains('15');
      });
    });

    describe('#controlled', function controlled() {
      it('shows the controlled value as ISO string', async function shows() {
        const { locator } = await render(<DateFieldControlledExample />);

        assume(locator.getByText(/2024-03-15/).element()).exists();
      });
    });

    describe('#withError', function withError() {
      it('renders error message and data-invalid', async function invalid() {
        const { locator, container } = await render(<DateFieldWithErrorExample />);

        assume(locator.getByText('Please enter a valid date.').element()).exists();
        assume(container.querySelector('[data-invalid="true"]')).exists();
      });
    });

    describe('#disabledRequiredReadonly', function disabledRequiredReadonly() {
      it('renders disabled, required, and read-only states', async function states() {
        const { container } = await render(<DateFieldDisabledRequiredReadOnlyExample />);

        assume(container.querySelector('[data-disabled="true"]')).exists();
        assume(container.querySelector('[data-readonly="true"]')).exists();
        assume(container.querySelector('[data-required="true"]')).exists();
      });
    });

    describe('#keyboard', function keyboard() {
      it('arrow up increments the focused segment', async function arrowUp() {
        const { container } = await render(<DateFieldWithDefaultValueExample />);
        const monthSegment = container.querySelector<HTMLElement>('[data-type="month"]');

        assume(monthSegment).exists();
        monthSegment?.focus();
        await userEvent.keyboard('{ArrowUp}');

        // Default month is 03 (March); after ArrowUp should read 4 (April).
        assume(monthSegment?.textContent).contains('4');
      });
    });

    describe('#form', function form() {
      it('submits an ISO date string under the name prop', async function submits() {
        const { container, locator } = await render(<DateFieldFormExample />);
        const yearSegment = container.querySelector<HTMLElement>('[data-type="year"]');
        const monthSegment = container.querySelector<HTMLElement>('[data-type="month"]');
        const daySegment = container.querySelector<HTMLElement>('[data-type="day"]');

        assume(yearSegment).exists();
        assume(monthSegment).exists();
        assume(daySegment).exists();

        monthSegment?.focus();
        await userEvent.keyboard('03');
        daySegment?.focus();
        await userEvent.keyboard('15');
        yearSegment?.focus();
        await userEvent.keyboard('2024');

        await locator.getByRole('button', { name: 'Submit' }).click();

        assume(locator.getByText(/2024-03-15/).element()).exists();
      });
    });
  });
});
