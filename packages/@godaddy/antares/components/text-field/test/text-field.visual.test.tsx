import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { TextFieldControlledExample } from '../examples/controlled.tsx';
import { TextFieldInvalidExample } from '../examples/invalid.tsx';
import { TextFieldDisabledExample } from '../examples/disabled.tsx';
import { TextFieldAdornmentsExample } from '../examples/adornments.tsx';
import { TextFieldMultilineExample } from '../examples/multiline.tsx';
import { TextFieldSizesExample } from '../examples/sizes.tsx';
import { TextFieldIconAccessoriesExample } from '../examples/icon-accessories.tsx';
import { TextFieldLeadingControlExample } from '../examples/leading-control.tsx';
import { TextFieldTrailingControlExample } from '../examples/trailing-control.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#TextField', function textFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<DefaultExample />);
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

    it('sizes example', async function sizesRender() {
      const { container } = await render(<TextFieldSizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('leading control example', async function leadingControlRender() {
      const { container } = await render(<TextFieldLeadingControlExample />);
      await expect(container).toMatchScreenshot('leading-control');
    });

    it('trailing control example', async function trailingControlRender() {
      const { container } = await render(<TextFieldTrailingControlExample />);
      await expect(container).toMatchScreenshot('trailing-control');
    });

    it('icon accessories example', async function iconAccessoriesRender() {
      const { container } = await render(<TextFieldIconAccessoriesExample />);
      await expect(container).toMatchScreenshot('icon-accessories');
    });

    it('invalid trailing control example', async function invalidTrailingRender() {
      const { container } = await render(<TextFieldTrailingControlExample isInvalid />);
      await expect(container).toMatchScreenshot('trailing-invalid');
    });

    it('small size icon accessories example', async function sizeSmRender() {
      const { container } = await render(<TextFieldIconAccessoriesExample size="sm" />);
      await expect(container).toMatchScreenshot('size-sm');
    });
  });
});
