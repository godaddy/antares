import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DateFieldDisabledRequiredReadOnlyExample } from '../examples/disabled-required-readonly.tsx';
import { DateFieldWithDefaultValueExample } from '../examples/with-default-value.tsx';
import { DateFieldWithErrorExample } from '../examples/with-error.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DateField', function dateFieldTests() {
    it('default example', async function defaultRender() {
      const { container } = await render(<DateFieldWithDefaultValueExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('with-error example', async function withErrorRender() {
      const { container } = await render(<DateFieldWithErrorExample />);
      await expect(container).toMatchScreenshot('with-error');
    });

    it('disabled-required-readonly example', async function disabledRender() {
      const { container } = await render(<DateFieldDisabledRequiredReadOnlyExample />);
      await expect(container).toMatchScreenshot('disabled-required-readonly');
    });
  });
});
