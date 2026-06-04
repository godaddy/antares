import { parseDate } from '@internationalized/date';
import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { I18nProvider } from 'react-aria-components';
import { set } from '#components/icon';
import { DateField } from '../src/index.tsx';
import { DateFieldBasicExample } from '../examples/basic.tsx';
import { DateFieldKeyboardInputExample } from '../examples/keyboard-input.tsx';
import { DateFieldWithErrorExample } from '../examples/with-error.tsx';

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
      alert: (
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <path d="M12 2L2 22h20L12 2z" stroke="#b22222" strokeWidth="2" />
        </svg>
      )
    });
  });

  describe('#DateField', function dateFieldTests() {
    it('default prose example', async function defaultRender() {
      const { container } = await render(
        <Wrap>
          <DateFieldBasicExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('default');
    });

    it('keyboard-input example', async function keyboardRender() {
      const { container } = await render(
        <Wrap>
          <DateFieldKeyboardInputExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('keyboard-input');
    });

    it('with-error example', async function errorRender() {
      const { container } = await render(
        <Wrap>
          <DateFieldWithErrorExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('with-error');
    });

    it('disabled state', async function disabledRender() {
      const { container } = await render(
        <Wrap>
          <DateField label="Start date" isDisabled defaultValue={parseDate('2024-03-15')} />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('disabled');
    });
  });
});
