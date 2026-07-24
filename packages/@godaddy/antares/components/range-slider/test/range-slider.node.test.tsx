import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RangeSliderControlledExample } from '../examples/controlled.tsx';
import { RangeSliderDefaultExample } from '../examples/default.tsx';
import { RangeSliderDisabledExample } from '../examples/disabled.tsx';
import { RangeSliderFormExample } from '../examples/form.tsx';
import { RangeSliderLabelsExample } from '../examples/labels.tsx';
import { RangeSliderMarkersExample } from '../examples/markers.tsx';
import { RangeSliderPlaygroundExample } from '../examples/range-slider-playground.tsx';

describe('@godaddy/antares', function antares() {
  describe('#RangeSlider', function rangeSliderTests() {
    describe('#examples', function examples() {
      it('renders the default example', function defaultExample() {
        expect(renderToString(<RangeSliderDefaultExample />)).toMatchSnapshot();
      });

      it('renders the controlled example', function controlledExample() {
        expect(renderToString(<RangeSliderControlledExample />)).toMatchSnapshot();
      });

      it('renders the disabled example', function disabledExample() {
        expect(renderToString(<RangeSliderDisabledExample />)).toMatchSnapshot();
      });

      it('renders the labels example', function labelsExample() {
        expect(renderToString(<RangeSliderLabelsExample />)).toMatchSnapshot();
      });

      it('renders the markers example', function markersExample() {
        expect(renderToString(<RangeSliderMarkersExample />)).toMatchSnapshot();
      });

      it('renders the form example', function formExample() {
        expect(renderToString(<RangeSliderFormExample />)).toMatchSnapshot();
      });
    });

    describe('#playground', function playground() {
      it('renders a negative range', function negativeRange() {
        expect(
          renderToString(
            <RangeSliderPlaygroundExample
              label="Temperature range"
              defaultValue={[-60, 40]}
              minValue={-100}
              maxValue={100}
              step={20}
              markers
              valueLabel
              thumbLabels={['Minimum temperature', 'Maximum temperature']}
            />
          )
        ).toMatchSnapshot();
      });

      it('maps an independently supplied start name', function startName() {
        expect(
          renderToString(<RangeSliderPlaygroundExample thumbLabels={['Minimum', 'Maximum']} startName="minimum" />)
        ).toMatchSnapshot();
      });

      it('maps an independently supplied end name', function endName() {
        expect(
          renderToString(<RangeSliderPlaygroundExample thumbLabels={['Minimum', 'Maximum']} endName="maximum" />)
        ).toMatchSnapshot();
      });
    });
  });
});
