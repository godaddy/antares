import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { InvalidExample } from '../examples/invalid.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { AdornmentsExample } from '../examples/adornments.tsx';
import { MultilineExample } from '../examples/multiline.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { IconAccessoriesExample } from '../examples/icon-accessories.tsx';
import { LeadingControlExample } from '../examples/leading-control.tsx';
import { TrailingControlExample } from '../examples/trailing-control.tsx';
import { TelephoneFieldExample } from '../examples/telephone-field.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#TextField', function textFieldTests() {
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

    it('adornments example', async function adornmentsRender() {
      const { container } = await render(<AdornmentsExample />);
      await expect(container).toMatchScreenshot('adornments');
    });

    it('multiline example', async function multilineRender() {
      const { container } = await render(<MultilineExample />);
      await expect(container).toMatchScreenshot('multiline');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });

    it('leading control example', async function leadingControlRender() {
      const { container } = await render(<LeadingControlExample />);
      await expect(container).toMatchScreenshot('leading-control');
    });

    it('trailing control example', async function trailingControlRender() {
      const { container } = await render(<TrailingControlExample />);
      await expect(container).toMatchScreenshot('trailing-control');
    });

    it('icon accessories example', async function iconAccessoriesRender() {
      const { container } = await render(<IconAccessoriesExample />);
      await expect(container).toMatchScreenshot('icon-accessories');
    });

    it('telephone field example', async function telephoneFieldRender() {
      const { container } = await render(<TelephoneFieldExample />);
      await expect(container).toMatchScreenshot('telephone-field');
    });
  });
});
