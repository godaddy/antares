import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons } from '../../../utils/test-helpers.tsx';
import { TelephoneFieldBasicExample } from '../examples/basic.tsx';
import { TelephoneFieldControlledExample } from '../examples/controlled.tsx';
import { TelephoneFieldDisabledExample } from '../examples/disabled.tsx';
import { TelephoneFieldInvalidExample } from '../examples/invalid.tsx';
import { TelephoneFieldSizesExample } from '../examples/sizes.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#TelephoneField', function telephoneFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<TelephoneFieldBasicExample />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<TelephoneFieldControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('disabled example', async function disabledRender() {
      const { container } = await render(<TelephoneFieldDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('invalid example', async function invalidRender() {
      const { container } = await render(<TelephoneFieldInvalidExample />);
      await expect(container).toMatchScreenshot('invalid');
    });

    it('sizes example', async function sizesRender() {
      const { container } = await render(<TelephoneFieldSizesExample />);
      await expect(container).toMatchScreenshot('sizes');
    });
  });
});
