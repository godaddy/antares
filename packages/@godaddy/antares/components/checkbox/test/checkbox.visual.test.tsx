import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { GroupExample } from '../examples/group.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { RequiredExample } from '../examples/required.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { InvalidExample } from '../examples/invalid.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  beforeEach(resetHover);

  describe('#Checkbox', function checkboxTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<DefaultExample />);
      await page.getByRole('document').hover({ position: { x: 100, y: 100 } });
      await expect(container).toMatchScreenshot('basic');
    });

    it('indeterminate example', async function indeterminateRender() {
      const { container } = await render(<IndeterminateExample />);
      await expect(container).toMatchScreenshot('indeterminate');
    });

    it('group example', async function groupRender() {
      const { container } = await render(<GroupExample />);
      await expect(container).toMatchScreenshot('group');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<ControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('required example', async function requiredRender() {
      const { container } = await render(<RequiredExample />);
      await expect(container).toMatchScreenshot('required');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<InvalidExample />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('error example with selected option', async function errorRenderWithSelectedOption() {
      const { container } = await render(<InvalidExample />);

      await page.getByRole('checkbox', { name: 'Blue' }).click({ force: true });
      await expect(container).toMatchScreenshot('error-selected');
    });
  });
});
