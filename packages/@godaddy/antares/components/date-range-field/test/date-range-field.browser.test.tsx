import assume from 'assume';
import { beforeAll, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { parseDate } from '@internationalized/date';
import { type FormEvent, useState } from 'react';
import { I18nProvider } from 'react-aria-components';
import { set } from '#components/icon';
import { DateRangeField } from '../src/index.tsx';

const RANGE = { start: parseDate('2024-03-15'), end: parseDate('2024-03-20') };

function Wrap({ children }: { children: React.ReactNode }) {
  return <I18nProvider locale="en-US">{children}</I18nProvider>;
}

function RangeForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`${data.get('from')}..${data.get('to')}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <DateRangeField label="Trip" startName="from" endName="to" defaultValue={RANGE} />
      <button type="submit">Submit</button>
      {submitted !== null && <span data-testid="result">{submitted}</span>}
    </form>
  );
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

  describe('#DateRangeField', function dateRangeField() {
    describe('#prose mode (default)', function prose() {
      it('opens the range calendar when the field is clicked', async function opens() {
        await render(
          <Wrap>
            <DateRangeField label="Trip" defaultValue={RANGE} />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /trip/i }));
        assume(page.getByRole('dialog').elements().length).is.at.least(1);
        // RangeCalendar renders two month grids.
        assume(document.querySelectorAll('[role="grid"]').length).is.at.least(2);
      });

      it('does not render editable segments', async function noSegments() {
        const { container } = await render(
          <Wrap>
            <DateRangeField label="Trip" defaultValue={RANGE} />
          </Wrap>
        );
        assume(container.querySelectorAll('[role="spinbutton"]').length).equals(0);
      });

      it('submits start and end as ISO strings', async function form() {
        await render(
          <Wrap>
            <RangeForm />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /submit/i }));
        assume(page.getByTestId('result').element().textContent).equals('2024-03-15..2024-03-20');
      });
    });

    describe('#keyboard mode (allowsKeyboardInput)', function keyboard() {
      it('renders editable start and end segments', async function segments() {
        const { container } = await render(
          <Wrap>
            <DateRangeField allowsKeyboardInput label="Trip" defaultValue={RANGE} />
          </Wrap>
        );
        assume(container.querySelectorAll('[role="spinbutton"]').length).is.at.least(6);
      });

      it('opens the range calendar from the icon trigger', async function iconOpens() {
        await render(
          <Wrap>
            <DateRangeField allowsKeyboardInput label="Trip" defaultValue={RANGE} />
          </Wrap>
        );
        await userEvent.click(page.getByRole('button', { name: /open calendar/i }));
        assume(page.getByRole('dialog').elements().length).is.at.least(1);
      });
    });
  });
});
