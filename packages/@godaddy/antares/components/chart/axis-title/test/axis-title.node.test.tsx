import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { RTLDirectionExample } from '../examples/rtl-direction.tsx';
import { XAxisExample } from '../examples/x-axis.tsx';
import { YAxisExample } from '../examples/y-axis.tsx';

describe('@godaddy/antares', function antares() {
  describe('#AxisTitle', function axisTitleTests() {
    describe('#x-axis', function xAxisTests() {
      it('renders x-axis example', function xAxisSnapshot() {
        const result = renderToString(<XAxisExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#y-axis', function yAxisTests() {
      it('renders y-axis example', function yAxisSnapshot() {
        const result = renderToString(<YAxisExample />);
        expect(result).toMatchSnapshot();
      });
    });

    describe('#rtl-direction', function rtlDirectionTests() {
      it('renders rtl direction example', function rtlSnapshot() {
        const result = renderToString(<RTLDirectionExample />);
        expect(result).toMatchSnapshot();
      });

      it('sets dir="rtl" on axis title elements', function rtlDirAttr() {
        const result = renderToString(<RTLDirectionExample />);
        expect(result).toContain('dir="rtl"');
      });
    });
  });
});
