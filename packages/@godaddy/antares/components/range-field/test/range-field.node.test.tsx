import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { RangeFieldControlledExample } from '../examples/controlled.tsx';
import { RangeFieldDefaultExample } from '../examples/default.tsx';
import { RangeFieldDisabledExample } from '../examples/disabled.tsx';
import { RangeFieldLabelsExample } from '../examples/labels.tsx';
import { RangeFieldMarkersExample } from '../examples/markers.tsx';
import { RangeFieldPlaygroundExample } from '../examples/range-field-playground.tsx';
import { RangeFieldRangeExample } from '../examples/range.tsx';
import { RangeFieldValueDisplayExample } from '../examples/value-display.tsx';

describe('@godaddy/antares', function antares() {
  describe('#RangeField', function rangeFieldTests() {
    describe('#examples', function examples() {
      it('renders the default example', function defaultExample() {
        expect(renderToString(<RangeFieldDefaultExample />)).toMatchSnapshot();
      });

      it('renders the controlled example', function controlledExample() {
        expect(renderToString(<RangeFieldControlledExample />)).toMatchSnapshot();
      });

      it('renders the disabled example', function disabledExample() {
        expect(renderToString(<RangeFieldDisabledExample />)).toMatchSnapshot();
      });

      it('renders the labels example', function labelsExample() {
        expect(renderToString(<RangeFieldLabelsExample />)).toMatchSnapshot();
      });

      it('renders the value display example', function valueDisplayExample() {
        expect(renderToString(<RangeFieldValueDisplayExample />)).toMatchSnapshot();
      });

      it('renders the markers example', function markersExample() {
        expect(renderToString(<RangeFieldMarkersExample />)).toMatchSnapshot();
      });

      it('renders the range example', function rangeExample() {
        expect(renderToString(<RangeFieldRangeExample />)).toMatchSnapshot();
      });
    });

    describe('#playground', function playground() {
      it('renders a negative scale', function negativeScale() {
        expect(
          renderToString(
            <RangeFieldPlaygroundExample
              label="Temperature"
              defaultValue={-20}
              minValue={-100}
              maxValue={100}
              step={20}
              valueLabel
              markers
            />
          )
        ).toMatchSnapshot();
      });

      it('renders multiple independently labelled values', function multipleValues() {
        expect(
          renderToString(
            <RangeFieldPlaygroundExample
              label="Thresholds"
              defaultValue={[20, 50, 80]}
              thumbLabels={['Low threshold', 'Target threshold', 'High threshold']}
              thumbNames={['low', 'target', 'high']}
            />
          )
        ).toMatchSnapshot();
      });

      it('renders independently supplied endpoint labels', function endpointLabels() {
        expect(
          renderToString(
            <>
              <RangeFieldPlaygroundExample label="Minimum only" minLabel={<span>Minimum</span>} />
              <RangeFieldPlaygroundExample label="Maximum only" maxLabel={<span>Maximum</span>} />
              <RangeFieldPlaygroundExample label="Numeric zero" minLabel={0} />
            </>
          )
        ).toMatchSnapshot();
      });

      it('omits endpoint labels without renderable content', function emptyEndpointLabels() {
        expect(
          renderToString(<RangeFieldPlaygroundExample label="No endpoint labels" minLabel="" maxLabel={false} />)
        ).toMatchSnapshot();
      });
    });
  });
});
