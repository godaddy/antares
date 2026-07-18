import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { SwitchControlled } from '../examples/controlled.tsx';
import { SwitchDefault } from '../examples/default.tsx';
import { SwitchDisabled } from '../examples/disabled.tsx';
import { SwitchLabelPosition } from '../examples/label-position.tsx';
import { SwitchNoLabel } from '../examples/no-label.tsx';
import { SwitchSelected } from '../examples/selected.tsx';
import { SwitchSizes } from '../examples/sizes.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Switch', function switchTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<SwitchDefault />);
      await expect(container).toMatchScreenshot('default');
    });

    it('selected example', async function selectedRender() {
      const { container } = await render(<SwitchSelected />);
      await expect(container).toMatchScreenshot('selected');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SwitchSizes />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('label position example', async function labelPositionRender() {
      const { container } = await render(<SwitchLabelPosition />);
      await expect(container).toMatchScreenshot('label-position');
    });

    it('no label example', async function noLabelRender() {
      const { container } = await render(<SwitchNoLabel />);
      await expect(container).toMatchScreenshot('no-label');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<SwitchDisabled />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<SwitchControlled />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('keyboard focus state', async function focusRender() {
      const { container } = await render(<SwitchDefault />);
      await userEvent.keyboard('{Tab}');
      await expect(container).toMatchScreenshot('focus');
    });
  });
});
