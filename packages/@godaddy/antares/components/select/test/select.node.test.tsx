import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SelectBasic } from '../examples/basic';
import { SelectControlledExample } from '../examples/controlled';
import { SelectDisabledExample } from '../examples/disabled';
import { SelectFormExample } from '../examples/form';
import { SelectInvalidExample } from '../examples/invalid';
import { SelectMultipleExample } from '../examples/multiple';

describe('@godaddy/antares', function antares() {
  describe('#Select', function select() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<SelectBasic />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<SelectControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<SelectDisabledExample />);
        expect(result).toContain('data-disabled');
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<SelectInvalidExample />);
        expect(result).toContain('data-invalid');
        expect(result).toMatchSnapshot();
      });

      it('renders multiple example', function multiple() {
        const result = renderToString(<SelectMultipleExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders form example', function form() {
        const result = renderToString(<SelectFormExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
