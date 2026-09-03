import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AdornmentsExample } from '../examples/adornments';
import { ControlsExample } from '../examples/controls';
import { DefaultExample } from '../examples/default';
import { DisabledExample } from '../examples/disabled';
import { InvalidExample } from '../examples/invalid';
import { MultilineExample } from '../examples/multiline';
import { SizesExample } from '../examples/sizes';
import { TelephoneFieldExample } from '../examples/telephone-field';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
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

      it('renders adornments example', function adornments() {
        const result = renderToString(<AdornmentsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiline example', function multiline() {
        const result = renderToString(<MultilineExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controls example', function controls() {
        expect(renderToString(<ControlsExample />)).toMatchSnapshot();
      });

      it('renders telephone field example', function telephoneField() {
        expect(renderToString(<TelephoneFieldExample />)).toMatchSnapshot();
      });
    });
  });
});
