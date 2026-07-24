import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SliderControlledExample } from '../examples/controlled.tsx';
import { SliderDefaultExample } from '../examples/default.tsx';
import { SliderDisabledExample } from '../examples/disabled.tsx';
import { SliderLabelsExample } from '../examples/labels.tsx';
import { SliderMarkersExample } from '../examples/markers.tsx';
import { SliderPlaygroundExample } from '../examples/slider-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Slider', function sliderTests() {
    describe('#examples', function examples() {
      it('renders the default example', function defaultExample() {
        expect(renderToString(<SliderDefaultExample />)).toMatchSnapshot();
      });

      it('renders the controlled example', function controlledExample() {
        expect(renderToString(<SliderControlledExample />)).toMatchSnapshot();
      });

      it('renders the disabled example', function disabledExample() {
        expect(renderToString(<SliderDisabledExample />)).toMatchSnapshot();
      });

      it('renders the labels example', function labelsExample() {
        expect(renderToString(<SliderLabelsExample />)).toMatchSnapshot();
      });

      it('renders the markers example', function markersExample() {
        expect(renderToString(<SliderMarkersExample />)).toMatchSnapshot();
      });
    });

    it('renders a configured negative value through the playground', function playground() {
      expect(
        renderToString(
          <SliderPlaygroundExample
            label="Temperature"
            defaultValue={-20}
            minValue={-100}
            maxValue={100}
            step={20}
            markers
            valueLabel
          />
        )
      ).toMatchSnapshot();
    });
  });
});
