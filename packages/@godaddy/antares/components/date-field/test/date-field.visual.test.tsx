import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DateFieldBasicExample } from '../examples/basic.tsx';
import { DateFieldControlledExample } from '../examples/controlled.tsx';
import { DateFieldDisabledRequiredReadOnlyExample } from '../examples/disabled-required-readonly.tsx';
import { DateFieldFormExample } from '../examples/form.tsx';
import { DateFieldMinMaxExample } from '../examples/min-max.tsx';
import { DateFieldWithDefaultValueExample } from '../examples/with-default-value.tsx';
import { DateFieldWithDescriptionExample } from '../examples/with-description.tsx';
import { DateFieldWithErrorExample } from '../examples/with-error.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DateField', function dateFieldTests() {
    it('basic example', async function basicRender() {
      const { container } = await render(<DateFieldBasicExample />);
      await expect(container).toMatchScreenshot('basic');
    });

    it('controlled example', async function controlledRender() {
      const { container } = await render(<DateFieldControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('default example', async function defaultRender() {
      const { container } = await render(<DateFieldWithDefaultValueExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('with-description example', async function withDescriptionRender() {
      const { container } = await render(<DateFieldWithDescriptionExample />);
      await expect(container).toMatchScreenshot('with-description');
    });

    it('with-error example', async function withErrorRender() {
      const { container } = await render(<DateFieldWithErrorExample />);
      await expect(container).toMatchScreenshot('with-error');
    });

    it('min-max example', async function minMaxRender() {
      const { container } = await render(<DateFieldMinMaxExample />);
      await expect(container).toMatchScreenshot('min-max');
    });

    it('disabled-required-readonly example', async function disabledRender() {
      const { container } = await render(<DateFieldDisabledRequiredReadOnlyExample />);
      await expect(container).toMatchScreenshot('disabled-required-readonly');
    });

    it('form example', async function formRender() {
      const { container } = await render(<DateFieldFormExample />);
      await expect(container).toMatchScreenshot('form');
    });
  });
});
