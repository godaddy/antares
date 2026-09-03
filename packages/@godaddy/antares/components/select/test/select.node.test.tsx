import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default';
import { ControlledExample } from '../examples/controlled';
import { ComposedExample } from '../examples/composed';
import { DisabledExample } from '../examples/disabled';
import { FormExample } from '../examples/form';
import { InvalidExample } from '../examples/invalid';
import { MultipleExample } from '../examples/multiple';
import { SizesExample } from '../examples/sizes';

describe('@godaddy/antares', function antares() {
  describe('#Select', function select() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders controlled example', function controlled() {
        const result = renderToString(<ControlledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders composed example', function composed() {
        const result = renderToString(<ComposedExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<DisabledExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<InvalidExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiple example', function multiple() {
        const result = renderToString(<MultipleExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders form example', function form() {
        const result = renderToString(<FormExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
