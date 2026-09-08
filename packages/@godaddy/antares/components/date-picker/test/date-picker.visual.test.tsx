import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { RangeExample } from '../examples/range.tsx';
import { WithErrorExample } from '../examples/with-error.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { MinMaxExample } from '../examples/min-max.tsx';
import { FormatOptionsExample } from '../examples/format-options.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);

  describe('#DatePicker', function datePicker() {
    it('with value', async function withValue() {
      const { container } = await render(<ControlledExample />);
      await expect(container).toMatchScreenshot('date-picker-value');
    });

    it('range', async function range() {
      const { container } = await render(<RangeExample />);
      await expect(container).toMatchScreenshot('date-range-picker');
    });

    it('error', async function error() {
      const { container } = await render(<WithErrorExample />);
      await expect(container).toMatchScreenshot('date-picker-error');
    });

    it('disabled', async function disabled() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('date-picker-disabled');
    });

    it('min-max', async function minMax() {
      const { container } = await render(<MinMaxExample />);
      await expect(container).toMatchScreenshot('date-picker-min-max');
    });

    it('format-options', async function formatOptions() {
      const { container } = await render(<FormatOptionsExample />);
      await expect(container).toMatchScreenshot('date-picker-format-options');
    });
  });
});
