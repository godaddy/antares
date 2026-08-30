import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default';
import { SelectControlledExample } from '../examples/controlled';
import { ComposedExample } from '../examples/composed';
import { ComposedStateExample } from '../examples/composed-state';
import { SelectDisabledExample } from '../examples/disabled';
import { SelectFormExample } from '../examples/form';
import { SelectInvalidExample } from '../examples/invalid';
import { SelectMultipleExample } from '../examples/multiple';
import { SelectSizesExample } from '../examples/sizes';
import { CustomOptionExample } from '../examples/custom-option';

describe('@godaddy/antares', function antares() {
  describe('#Select', function select() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<SelectControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders composed example', function composed() {
        const result = renderToString(<ComposedExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders composed state example', function composedState() {
        const result = renderToString(<ComposedStateExample />);
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

      it('renders sizes example', function sizes() {
        const result = renderToString(<SelectSizesExample />);
        expect(result).toContain('data-size="sm"');
        expect(result).toMatchSnapshot();
      });

      it('renders custom option components', function customOption() {
        const result = renderToString(<CustomOptionExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
