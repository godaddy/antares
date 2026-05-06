import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TextFieldBasic } from '../examples/basic.tsx';
import { TextFieldControlledExample } from '../examples/controlled.tsx';
import { TextFieldInvalidExample } from '../examples/invalid.tsx';
import { TextFieldDisabledExample } from '../examples/disabled.tsx';
import { TextFieldAdornmentsExample } from '../examples/adornments.tsx';
import { TextFieldMultilineExample } from '../examples/multiline.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<TextFieldBasic />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<TextFieldControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<TextFieldInvalidExample />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<TextFieldDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('adornments example', async function adornmentsRender() {
      const { container } = await render(<TextFieldAdornmentsExample />);
      await expect(container).toMatchScreenshot('adornments');
    });

    it('multiline example', async function multilineRender() {
      const { container } = await render(<TextFieldMultilineExample />);
      await expect(container).toMatchScreenshot('multiline');
    });
  });
});
