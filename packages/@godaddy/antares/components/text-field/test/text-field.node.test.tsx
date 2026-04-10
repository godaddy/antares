import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TextFieldAdornmentsExample } from '../examples/adornments';
import { TextFieldBasic } from '../examples/basic';
import { TextFieldDisabledExample } from '../examples/disabled';
import { TextFieldInvalidExample } from '../examples/invalid';
import { TextFieldMultilineExample } from '../examples/multiline';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<TextFieldBasic />);
        expect(result).toMatchSnapshot();
      });

      it('renders invalid example', function invalid() {
        const result = renderToString(<TextFieldInvalidExample />);
        expect(result).toContain('data-invalid');
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<TextFieldDisabledExample />);
        expect(result).toContain('data-disabled');
        expect(result).toMatchSnapshot();
      });

      it('renders adornments example', function adornments() {
        const result = renderToString(<TextFieldAdornmentsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiline example', function multiline() {
        const result = renderToString(<TextFieldMultilineExample />);
        expect(result).toContain('textarea');
        expect(result).toMatchSnapshot();
      });
    });
  });
});
