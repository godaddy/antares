import { RTLDirectionExample } from '../examples/rtl-direction.tsx';
import { XAxisExample } from '../examples/x-axis.tsx';
import { YAxisExample } from '../examples/y-axis.tsx';
import { render } from 'vitest-browser-react';
import { describe, it } from 'vitest';
import assume from 'assume';

describe('@godaddy/uxcore', function uxcore() {
  describe('#AxisTitle', function axisTitleTests() {
    describe('#x-axis', function xAxisTests() {
      it('renders x-axis title', async function requiredProps() {
        const { locator } = await render(<XAxisExample />);
        const element = locator.getByText('Month').element();

        assume(element).exists();
        assume(element.className).includes('xAxis');
      });
    });

    describe('#y-axis', function yAxisTests() {
      it('renders y-axis title', async function requiredProps() {
        const { locator } = await render(<YAxisExample />);
        const element = locator.getByText('Temperature (°F)').element();

        assume(element).exists();
        assume(element.className).includes('yAxis');
      });
    });

    describe('#rtl-direction', function rtlDirectionTests() {
      it('renders rtl direction example with dir="rtl" on y-axis title', async function rtlDirAttr() {
        const { container } = await render(<RTLDirectionExample />);
        const group = container.querySelector('[role="group"][aria-label="y axis title"]');

        assume(group).exists();
        assume(group?.getAttribute('dir')).equals('rtl');
      });
    });
  });
});
