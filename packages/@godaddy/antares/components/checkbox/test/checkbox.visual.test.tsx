import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { preloadTestIcons } from '../../../utils/test-icons.tsx';
import { CheckboxBasic } from '../examples/basic.tsx';
import { CheckboxIndeterminate } from '../examples/indeterminate.tsx';
import { CheckboxGroupBasic } from '../examples/group.tsx';
import { CheckboxGroupControlled } from '../examples/controlled.tsx';
import { CheckboxGroupRequired } from '../examples/required.tsx';
import { CheckboxGroupDisabled } from '../examples/disabled.tsx';
import { CheckboxGroupInvalid } from '../examples/invalid.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  beforeEach(async function removeHover() {
    await page.getByRole('document').hover({ position: { x: 0, y: 0 } });
  });

  describe('#Checkbox', function checkboxTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<CheckboxBasic />);
      await page.getByRole('document').hover({ position: { x: 100, y: 100 } });
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
