import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FieldFrameTrailingControl } from '../examples/trailing-control';
import { FieldFrameLeadingControl } from '../examples/leading-control';
import { FieldFrameIconAccessories } from '../examples/icon-accessories';

describe('@godaddy/uxcore', function uxcore() {
  describe('#FieldFrame', function fieldFrame() {
    describe('#LeadingControl', function leadingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldFrameLeadingControl />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#TrailingControl', function trailingControl() {
      it('renders', function renders() {
        const result = renderToString(<FieldFrameTrailingControl />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#IconAccessories', function iconAccessories() {
      it('renders', function renders() {
        const result = renderToString(<FieldFrameIconAccessories />);
        expect(result).toMatchSnapshot();
      });
    });
  });
});
