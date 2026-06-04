import assume from 'assume';
import { beforeAll, describe, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components';
import { set } from '#components/icon';
import { DateField } from '../src/index.tsx';

function Wrap({ children }: { children: React.ReactNode }) {
  return <I18nProvider locale="en-US">{children}</I18nProvider>;
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
  });
});
