import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TextFieldAdornmentsExample } from '../examples/adornments';
import { DefaultExample } from '../examples/default';
import { TextFieldDisabledExample } from '../examples/disabled';
import { TextFieldIconAccessoriesExample } from '../examples/icon-accessories';
import { TextFieldInvalidExample } from '../examples/invalid';
import { TextFieldLeadingControlExample } from '../examples/leading-control';
import { TextFieldMultilineExample } from '../examples/multiline';
import { TextFieldSizesExample } from '../examples/sizes';
import { TextFieldTrailingControlExample } from '../examples/trailing-control';

describe('@godaddy/antares', function antares() {
  describe('#TextField', function textField() {
    describe('#examples', function examples() {
      it('renders basic example', function basic() {
        const result = renderToString(<DefaultExample />);
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

      it('renders sizes example', function sizes() {
        const result = renderToString(<TextFieldSizesExample />);
        expect(result).toContain('data-size="sm"');
        expect(result).toMatchSnapshot();
      });

      it('renders leading control example', function leadingControl() {
        expect(renderToString(<TextFieldLeadingControlExample />)).toMatchSnapshot();
      });

      it('renders trailing control example', function trailingControl() {
        expect(renderToString(<TextFieldTrailingControlExample />)).toMatchSnapshot();
      });

      it('renders icon accessories example', function iconAccessories() {
        expect(renderToString(<TextFieldIconAccessoriesExample />)).toMatchSnapshot();
      });
    });
  });
});
