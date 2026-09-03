import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { DisabledExample } from '../examples/disabled';
import { FormatOptionsExample } from '../examples/format-options';
import { HideStepperExample } from '../examples/hide-stepper';
import { InvalidExample } from '../examples/invalid';
import { SizesExample } from '../examples/sizes';
import { ValueScaleExample } from '../examples/value-scale';
import { TextSteppersExample } from '../examples/text-steppers';

describe('@godaddy/antares', function antares() {
  describe('#NumberField', function numberField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<ControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<InvalidExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<DisabledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders hideStepper example', function hideStepper() {
        const result = renderToString(<HideStepperExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders valueScale example', function valueScale() {
        const result = renderToString(<ValueScaleExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders formatOptions example', function formatOptions() {
        const result = renderToString(<FormatOptionsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders text steppers example', function textSteppers() {
        expect(renderToString(<TextSteppersExample />)).toMatchSnapshot();
      });
    });
  });
});
