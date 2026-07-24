import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { RangeFieldControlledExample } from '../examples/controlled.tsx';
import { RangeFieldDefaultExample } from '../examples/default.tsx';
import { RangeFieldDisabledExample } from '../examples/disabled.tsx';
import { RangeFieldLabelsExample } from '../examples/labels.tsx';
import { RangeFieldMarkersExample } from '../examples/markers.tsx';
import { RangeFieldRangeExample } from '../examples/range.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#RangeField', function rangeFieldTests() {
    it('default example', async function defaultExample() {
      const { container } = await render(<RangeFieldDefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('controlled example', async function controlledExample() {
      const { container } = await render(<RangeFieldControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('disabled example', async function disabledExample() {
      const { container } = await render(<RangeFieldDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('labels example', async function labelsExample() {
      const { container } = await render(<RangeFieldLabelsExample />);
      await expect(container).toMatchScreenshot('labels');
    });

    it('markers example', async function markersExample() {
      const { container } = await render(<RangeFieldMarkersExample />);
      await expect(container).toMatchScreenshot('markers');
    });

    it('range example', async function rangeExample() {
      const { container } = await render(<RangeFieldRangeExample />);
      await expect(container).toMatchScreenshot('range');
    });
  });
});
