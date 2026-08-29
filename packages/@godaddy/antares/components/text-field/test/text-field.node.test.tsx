import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { AdornmentsExample } from '../examples/adornments';
import { DefaultExample } from '../examples/default';
import { DisabledExample } from '../examples/disabled';
import { IconAccessoriesExample } from '../examples/icon-accessories';
import { InvalidExample } from '../examples/invalid';
import { LeadingControlExample } from '../examples/leading-control';
import { MultilineExample } from '../examples/multiline';
import { SizesExample } from '../examples/sizes';
import { TrailingControlExample } from '../examples/trailing-control';
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
        expect(result).toContain('data-invalid');
        expect(result).toMatchSnapshot();
      });

      it('renders disabled example', function disabled() {
        const result = renderToString(<DisabledExample />);
        expect(result).toContain('data-disabled');
        expect(result).toMatchSnapshot();
      });

      it('renders adornments example', function adornments() {
        const result = renderToString(<AdornmentsExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders multiline example', function multiline() {
        const result = renderToString(<MultilineExample />);
        expect(result).toContain('textarea');
        expect(result).toMatchSnapshot();
      });

      it('renders sizes example', function sizes() {
        const result = renderToString(<SizesExample />);
        expect(result).toContain('data-size="sm"');
        expect(result).toMatchSnapshot();
      });

      it('renders leading control example', function leadingControl() {
        expect(renderToString(<LeadingControlExample />)).toMatchSnapshot();
      });

      it('renders trailing control example', function trailingControl() {
        expect(renderToString(<TrailingControlExample />)).toMatchSnapshot();
      });

      it('renders icon accessories example', function iconAccessories() {
        expect(renderToString(<IconAccessoriesExample />)).toMatchSnapshot();
      });

      it('renders telephone field example', function telephoneField() {
        expect(renderToString(<TelephoneFieldExample />)).toMatchSnapshot();
      });
    });
  });
});
