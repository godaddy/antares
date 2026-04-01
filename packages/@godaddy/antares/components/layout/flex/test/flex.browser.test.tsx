import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { DirectionExample } from '../examples/direction.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Flex', function flexTests() {
    it('renders the default flex in the browser', async function rendersDefault() {
      const { getByText } = await render(<DefaultExample />);
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
      expect(getByText('Item 3')).toBeInTheDocument();
    });

    it('renders flex with direction variations in the browser', async function rendersDirection() {
      const { getByText } = await render(<DirectionExample />);
      expect(getByText('Row (default)')).toBeInTheDocument();
      expect(getByText('Column')).toBeInTheDocument();
      expect(getByText('Row Reverse')).toBeInTheDocument();
    });

    it('renders flex with alignment in the browser', async function rendersAlignment() {
      const { getByText } = await render(<AlignmentExample />);
      expect(getByText('justifyContent: space-between')).toBeInTheDocument();
      expect(getByText('justifyContent: center')).toBeInTheDocument();
      expect(getByText('alignItems: center (with varying heights)')).toBeInTheDocument();
    });
  });
});
