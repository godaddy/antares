import { beforeEach, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { resetHover } from '../../../utils/test-helpers.tsx';
import { SliderControlledExample } from '../examples/controlled.tsx';
import { SliderDefaultExample } from '../examples/default.tsx';
import { SliderDisabledExample } from '../examples/disabled.tsx';
import { SliderLabelsExample } from '../examples/labels.tsx';
import { SliderMarkersExample } from '../examples/markers.tsx';

describe('@godaddy/antares', function antares() {
  beforeEach(resetHover);

  describe('#Slider', function sliderTests() {
    it('default example', async function defaultExample() {
      const { container } = await render(<SliderDefaultExample />);
      await expect(container).toMatchScreenshot('default');
    });

    it('controlled example', async function controlledExample() {
      const { container } = await render(<SliderControlledExample />);
      await expect(container).toMatchScreenshot('controlled');
    });

    it('disabled example', async function disabledExample() {
      const { container } = await render(<SliderDisabledExample />);
      await expect(container).toMatchScreenshot('disabled');
    });

    it('labels example', async function labelsExample() {
      const { container } = await render(<SliderLabelsExample />);
      await expect(container).toMatchScreenshot('labels');
    });

    it('markers example', async function markersExample() {
      const { container } = await render(<SliderMarkersExample />);
      await expect(container).toMatchScreenshot('markers');
    });
  });
});
