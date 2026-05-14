import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { BasicExample } from '../examples/basic.tsx';

describe('@godaddy/antares', function antares() {
  describe('#TooltipDismissStrip', function tooltipDismissStripTests() {
    describe('#basic', function basicTests() {
      it('renders basic example', function basicSnapshot() {
        const result = renderToString(<BasicExample />);
        expect(result).toMatchSnapshot();
      });

      it('omits strip when width is zero', function zeroWidth() {
        const result = renderToString(<BasicExample width={0} />);
        expect(result).toMatchSnapshot();
        expect(result).not.toContain('data-tooltip-dismiss-strip');
      });
    });
  });
});
