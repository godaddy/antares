import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { set } from '#components/icon';
import { NumberFieldBasicExample } from '../examples/basic.tsx';
import { NumberFieldControlledExample } from '../examples/controlled.tsx';
import { NumberFieldInvalidExample } from '../examples/invalid.tsx';
import { NumberFieldDisabledExample } from '../examples/disabled.tsx';
import { NumberFieldHideStepperExample } from '../examples/hide-stepper.tsx';
import { NumberFieldValueScaleExample } from '../examples/value-scale.tsx';
import { NumberFieldFormatOptionsExample } from '../examples/format-options.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    // Preload the icons used by the checkbox component in case they are not already loaded
    set({
      minus: (
        <svg fill="none" height="24" width="24">
          <path d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5z" fill="#111" />
        </svg>
      ),
      plus: (
        <svg fill="none" height="24" width="24">
          <path
            d="M20 11.25h-7.25V4a.75.75 0 1 0-1.5 0v7.25H4a.75.75 0 1 0 0 1.5h7.25V20a.75.75 0 1 0 1.5 0v-7.25H20a.75.75 0 1 0 0-1.5z"
            fill="#111"
          />
        </svg>
      )
    });
  });

  describe('#NumberField', function numberFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<NumberFieldBasicExample />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<NumberFieldControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<NumberFieldInvalidExample />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<NumberFieldDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('hideStepper example', async function hideStepperRender() {
      const { container } = await render(<NumberFieldHideStepperExample />);
      await expect(container).toMatchScreenshot('hide-stepper');
    });

    it('valueScale example', async function valueScaleRender() {
      const { container } = await render(<NumberFieldValueScaleExample />);
      await expect(container).toMatchScreenshot('value-scale');
    });

    it('formatOptions example', async function formatOptionsRender() {
      const { container } = await render(<NumberFieldFormatOptionsExample />);
      await expect(container).toMatchScreenshot('format-options');
    });
  });
});
