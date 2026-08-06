import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ControlledExample } from '../examples/controlled.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { LabelsExample } from '../examples/labels.tsx';
import { MarkersExample } from '../examples/markers.tsx';
import { PlaygroundExample } from '../examples/range-field-playground.tsx';
import { RangeExample } from '../examples/range.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';

describe('@godaddy/antares', function antares() {
  describe('#RangeField', function rangeFieldTests() {
    describe('#examples', function examples() {
      it('renders the default example', function defaultExample() {
        expect(renderToString(<DefaultExample />)).toMatchSnapshot();
      });

      it('renders the controlled example', function controlledExample() {
        expect(renderToString(<ControlledExample />)).toMatchSnapshot();
      });

      it('renders the disabled example', function disabledExample() {
        expect(renderToString(<DisabledExample />)).toMatchSnapshot();
      });

      it('renders the labels example', function labelsExample() {
        expect(renderToString(<LabelsExample />)).toMatchSnapshot();
      });

      it('renders the value display example', function valueDisplayExample() {
        expect(renderToString(<ValueDisplayExample />)).toMatchSnapshot();
      });

      it('renders the markers example', function markersExample() {
        expect(renderToString(<MarkersExample />)).toMatchSnapshot();
      });

      it('renders the range example', function rangeExample() {
        expect(renderToString(<RangeExample />)).toMatchSnapshot();
      });
    });

    describe('#playground', function playground() {
      it('renders a negative scale', function negativeScale() {
        expect(
          renderToString(
            <PlaygroundExample
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
            <PlaygroundExample
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
              <PlaygroundExample label="Minimum only" minLabel={<span>Minimum</span>} />
              <PlaygroundExample label="Maximum only" maxLabel={<span>Maximum</span>} />
              <PlaygroundExample label="Numeric zero" minLabel={0} />
            </>
          )
        ).toMatchSnapshot();
      });

      it('omits endpoint labels without renderable content', function emptyEndpointLabels() {
        expect(
          renderToString(<PlaygroundExample label="No endpoint labels" minLabel="" maxLabel={false} />)
        ).toMatchSnapshot();
      });
    });
  });
});
