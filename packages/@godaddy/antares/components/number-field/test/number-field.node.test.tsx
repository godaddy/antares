import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { NumberFieldBasicExample } from '../examples/basic';
import { NumberFieldControlledExample } from '../examples/controlled';
import { NumberFieldDisabledExample } from '../examples/disabled';
import { NumberFieldFormatOptionsExample } from '../examples/format-options';
import { NumberFieldHideStepperExample } from '../examples/hide-stepper';
import { NumberFieldInvalidExample } from '../examples/invalid';
import { NumberFieldValueScaleExample } from '../examples/value-scale';

describe('@godaddy/uxcore', function uxcore() {
  describe('#NumberField', function numberField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<NumberFieldBasicExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<NumberFieldControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<NumberFieldInvalidExample />);
        expect(result).toContain('data-invalid');
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<NumberFieldDisabledExample />);
        expect(result).toContain('data-disabled');
        expect(result).toMatchSnapshot();
      });

      it('renders hideStepper example', function hideStepper() {
        const result = renderToString(<NumberFieldHideStepperExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders valueScale example', function valueScale() {
        const result = renderToString(<NumberFieldValueScaleExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders formatOptions example', function formatOptions() {
        const result = renderToString(<NumberFieldFormatOptionsExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
