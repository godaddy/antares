import assume from 'assume';
import { beforeAll, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { type DateValue, parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components';
import { set } from '#components/icon';
import { DateField } from '../src/index.tsx';
import { DateFieldFormExample } from '../examples/form.tsx';

function Wrap({ children }: { children: React.ReactNode }) {
  return <I18nProvider locale="en-US">{children}</I18nProvider>;
}

function isWeekend(date: DateValue) {
  const dayOfWeek = date.toDate('UTC').getUTCDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    set({
      calendar: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <rect height="16" stroke="#111" strokeWidth="2" width="18" x="3" y="4" />
        </svg>
      ),
      'chevron-down': (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="2" />
        </svg>
      ),
      'chevron-left': (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <path d="M15 18l-6-6 6-6" stroke="#111" strokeWidth="2" />
        </svg>
      ),
      'chevron-right': (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <path d="M9 18l6-6-6-6" stroke="#111" strokeWidth="2" />
        </svg>
      )
    });
  });

  describe('#DateField', function dateField() {
    describe('#prose mode (default)', function prose() {
      it('opens the calendar popover when the field is clicked', async function opens() {
        await render(
          <Wrap>
            <DateField label="Start" defaultValue={parseDate('2024-03-15')} />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /start/i }));
        const dialog = page.getByRole('dialog');
        assume(dialog.elements().length).is.at.least(1);
      });

      it('does not render editable segments', async function noSegments() {
        const { container } = await render(
          <Wrap>
            <DateField label="Start" defaultValue={parseDate('2024-03-15')} />
          </Wrap>
        );
        assume(container.querySelectorAll('[role="spinbutton"]').length).equals(0);
      });
    });

    describe('#keyboard mode (allowsKeyboardInput)', function keyboard() {
      it('renders editable segments', async function segments() {
        const { container } = await render(
          <Wrap>
            <DateField allowsKeyboardInput label="Start" defaultValue={parseDate('2024-03-15')} />
          </Wrap>
        );
        assume(container.querySelectorAll('[role="spinbutton"]').length).is.at.least(3);
      });

      it('opens the calendar from the icon trigger', async function iconOpens() {
        await render(
          <Wrap>
            <DateField allowsKeyboardInput label="Start" defaultValue={parseDate('2024-03-15')} />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /open calendar/i }));
        const dialog = page.getByRole('dialog');
        assume(dialog.elements().length).is.at.least(1);
      });
    });

    describe('#integration', function integration() {
      it('renders the error message when invalid', async function error() {
        const { container } = await render(
          <Wrap>
            <DateField label="Start" errorMessage="Please select a valid date." isInvalid />
          </Wrap>
        );
        assume(container.textContent ?? '').contains('Please select a valid date.');
      });

      it('disables the trigger when isDisabled', async function disabled() {
        const { container } = await render(
          <Wrap>
            <DateField label="Start" isDisabled defaultValue={parseDate('2024-03-15')} />
          </Wrap>
        );
        const trigger = container.querySelector('button');
        assume(trigger?.hasAttribute('disabled') || trigger?.getAttribute('data-disabled') !== null).is.true();
      });

      it('disables out-of-range days in the calendar', async function minMax() {
        await render(
          <Wrap>
            <DateField
              label="Q1"
              defaultValue={parseDate('2024-02-15')}
              minValue={parseDate('2024-02-10')}
              maxValue={parseDate('2024-02-20')}
            />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /q1/i }));
        const disabledCell = page.getByRole('button', { name: /february 5, 2024/i });
        assume(disabledCell.element().getAttribute('data-disabled')).equals('true');
      });

      it('marks unavailable days in the calendar', async function unavailable() {
        await render(
          <Wrap>
            <DateField label="Weekday" defaultValue={parseDate('2024-03-13')} isDateUnavailable={isWeekend} />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /weekday/i }));
        // The popover renders in a portal, so query the document, not the render container.
        assume(document.querySelectorAll('[data-unavailable]').length).is.at.least(1);
      });

      it('submits the value as an ISO string under the field name', async function form() {
        const { container } = await render(
          <Wrap>
            <DateFieldFormExample />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /submit/i }));
        assume(container.textContent ?? '').contains('2024-03-15');
      });
    });
  });
});
