import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { set } from '#components/icon';
import { CheckboxBasic } from '../examples/basic.tsx';
import { CheckboxIndeterminate } from '../examples/indeterminate.tsx';
import { CheckboxGroupBasic } from '../examples/group.tsx';
import { CheckboxGroupControlled } from '../examples/controlled.tsx';
import { CheckboxGroupRequired } from '../examples/required.tsx';
import { CheckboxGroupDisabled } from '../examples/disabled.tsx';
import { CheckboxGroupInvalid } from '../examples/invalid.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    // Preload the icons used by the checkbox component in case they are not already loaded
    set({
      minus: (
        <svg fill="none" height="24" width="24">
          <path d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5z" fill="#111" />
        </svg>
      ),
      checkmark: (
        <svg fill="none" height="24" width="24">
          <path
            d="M9 18.25a.748.748 0 0 1-.53-.22l-5-5a.75.75 0 0 1 1.06-1.06L9 16.44 19.47 5.97a.75.75 0 0 1 1.06 1.06l-11 11a.748.748 0 0 1-.53.22z"
            fill="#111"
          />
        </svg>
      )
    });
  });

  describe('#Checkbox', function checkboxTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<CheckboxBasic />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('indeterminate example', async function indeterminateRender() {
      const { container } = await render(<CheckboxIndeterminate />);
      await expect(container).toMatchScreenshot('indeterminate');
    });

    it('group example', async function groupRender() {
      const { container } = await render(<CheckboxGroupBasic />);
      await expect(container).toMatchScreenshot('group');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<CheckboxGroupControlled />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('required example', async function requiredRender() {
      const { container } = await render(<CheckboxGroupRequired />);
      await expect(container).toMatchScreenshot('required');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<CheckboxGroupDisabled />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<CheckboxGroupInvalid />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('error example with selected option', async function errorRenderWithSelectedOption() {
      const { container } = await render(<CheckboxGroupInvalid />);

      await page.getByRole('checkbox', { name: 'Blue' }).click({ force: true });
      await expect(container).toMatchScreenshot('error-selected');
    });
  });
});
