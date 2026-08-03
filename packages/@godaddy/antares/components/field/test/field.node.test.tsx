import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FieldGroupTrailingControlExample } from '../examples/trailing-control';
import { FieldGroupLeadingControlExample } from '../examples/leading-control';
import { FieldGroupIconAccessoriesExample } from '../examples/icon-accessories';

describe('@godaddy/antares', function antares() {
  describe('#FieldGroup', function fieldGroup() {
    describe('#LeadingControl', function leadingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupLeadingControlExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#TrailingControl', function trailingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupTrailingControlExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#IconAccessories', function iconAccessories() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupIconAccessoriesExample />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
