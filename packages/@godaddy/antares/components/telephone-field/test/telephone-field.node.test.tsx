import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TelephoneFieldBasicExample } from '../examples/basic';
import { TelephoneFieldControlledExample } from '../examples/controlled';
import { TelephoneFieldDisabledExample } from '../examples/disabled';
import { TelephoneFieldInvalidExample } from '../examples/invalid';
import { TelephoneFieldSizesExample } from '../examples/sizes';

describe('@godaddy/antares', function antares() {
  describe('#TelephoneField', function telephoneField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<TelephoneFieldBasicExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<TelephoneFieldControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<TelephoneFieldDisabledExample />);
        expect(result).toContain('data-disabled');
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<TelephoneFieldInvalidExample />);
        expect(result).toContain('data-invalid');
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<TelephoneFieldSizesExample />);
        expect(result).toContain('data-size="sm"');
        expect(result).toMatchSnapshot();
      });
    });
  });
});
