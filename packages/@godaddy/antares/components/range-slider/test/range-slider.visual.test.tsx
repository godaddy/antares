import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { RangeSliderControlledExample } from '../examples/controlled.tsx';
import { RangeSliderDefaultExample } from '../examples/default.tsx';
import { RangeSliderDisabledExample } from '../examples/disabled.tsx';
import { RangeSliderFormExample } from '../examples/form.tsx';
import { RangeSliderLabelsExample } from '../examples/labels.tsx';
import { RangeSliderMarkersExample } from '../examples/markers.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#RangeSlider', function rangeSliderTests() {
    it('default example', async function defaultExample() {
      const { container } = await render(<RangeSliderDefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('controlled example', async function controlledExample() {
      const { container } = await render(<RangeSliderControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('disabled example', async function disabledExample() {
      const { container } = await render(<RangeSliderDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('labels example', async function labelsExample() {
      const { container } = await render(<RangeSliderLabelsExample />);
      await expect(container).toMatchScreenshot('labels');
    });

    it('markers example', async function markersExample() {
      const { container } = await render(<RangeSliderMarkersExample />);
      await expect(container).toMatchScreenshot('markers');
    });

    it('form example', async function formExample() {
      const { container } = await render(<RangeSliderFormExample />);
      await expect(container).toMatchScreenshot('form');
    });
  });
});
