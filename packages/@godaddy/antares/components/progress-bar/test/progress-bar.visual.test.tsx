import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { WithoutValueLabelExample } from '../examples/without-value-label.tsx';
import { WithoutLabelExample } from '../examples/without-label.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#ProgressBar', function progressBarVisualTests() {
    it.each([
      ['default', DefaultExample],
      ['sizes', SizesExample],
      ['statuses', StatusesExample],
      ['indeterminate', IndeterminateExample],
      ['without-value', WithoutValueLabelExample],
      ['track-only', WithoutLabelExample],
      ['value-display', ValueDisplayExample]
    ] as const)('%s example', async function exampleRender(name, Example) {
      const { container } = await render(<Example />);
      await expect(container).toMatchScreenshot(name);
    });
  });
});
