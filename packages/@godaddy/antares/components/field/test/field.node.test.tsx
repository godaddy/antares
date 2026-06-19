import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FieldGroupTrailingControl } from '../examples/trailing-control';
import { FieldGroupLeadingControl } from '../examples/leading-control';
import { FieldGroupIconAccessories } from '../examples/icon-accessories';

describe('@godaddy/antares', function antares() {
  describe('#FieldGroup', function fieldGroup() {
    describe('#LeadingControl', function leadingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupLeadingControl />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#TrailingControl', function trailingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupTrailingControl />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#IconAccessories', function iconAccessories() {
      it('renders', function renders() {
        const result = renderToString(<FieldGroupIconAccessories />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
