import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { InvalidExample } from '../examples/invalid.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { HideStepperExample } from '../examples/hide-stepper.tsx';
import { ValueScaleExample } from '../examples/value-scale.tsx';
import { FormatOptionsExample } from '../examples/format-options.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { TextSteppersExample } from '../examples/text-steppers.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#NumberField', function numberFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<DefaultExample />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<ControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<InvalidExample />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('hideStepper example', async function hideStepperRender() {
      const { container } = await render(<HideStepperExample />);
      await expect(container).toMatchScreenshot('hide-stepper');
    });

    it('valueScale example', async function valueScaleRender() {
      const { container } = await render(<ValueScaleExample />);
      await expect(container).toMatchScreenshot('value-scale');
    });

    it('formatOptions example', async function formatOptionsRender() {
      const { container } = await render(<FormatOptionsExample />);
      await expect(container).toMatchScreenshot('format-options');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('text steppers example', async function textSteppersRender() {
      const { container } = await render(<TextSteppersExample />);
      await expect(container).toMatchScreenshot('text-steppers');
    });
  });
});
