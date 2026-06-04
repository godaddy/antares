import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { I18nProvider } from 'react-aria-components';
import { set } from '#components/icon';
import { DateRangeFieldKeyboardInputExample } from '../examples/keyboard-input.tsx';
import { DateRangeFieldWithErrorExample } from '../examples/with-error.tsx';
import { DateRangeFieldWithMinMaxExample } from '../examples/with-min-max.tsx';

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

  describe('#DateRangeField', function dateRangeFieldTests() {
    it('default prose range example', async function defaultRender() {
      const { container } = await render(
        <Wrap>
          <DateRangeFieldWithMinMaxExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('default-range');
    });

    it('keyboard-input example', async function keyboardRender() {
      const { container } = await render(
        <Wrap>
          <DateRangeFieldKeyboardInputExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('keyboard-input');
    });

    it('with-error example', async function errorRender() {
      const { container } = await render(
        <Wrap>
          <DateRangeFieldWithErrorExample />
        </Wrap>
      );
      await expect(container).toMatchScreenshot('with-error');
    });
  });
});
