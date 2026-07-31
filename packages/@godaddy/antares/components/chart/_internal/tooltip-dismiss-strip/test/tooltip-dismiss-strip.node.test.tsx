import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TooltipDismissStrip', function tooltipDismissStripTests() {
    describe('#basic', function basicTests() {
      it('renders default example', function defaultSnapshot() {
        const result = renderToString(<DefaultExample />);
        expect(result).toMatchSnapshot();
      });

      it('omits strip when width is zero', function zeroWidth() {
        const result = renderToString(<DefaultExample width={0} />);
        expect(result).toMatchSnapshot();
        expect(result).not.toContain('data-tooltip-dismiss-strip');
      });
    });
  });
});
