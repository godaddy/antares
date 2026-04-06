import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { PaddingExample } from '../examples/padding.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Box', function boxTests() {
    it('renders boxes with padding in the browser', async function rendersPadding() {
      const { getByText } = await render(<PaddingExample />);
      expect(getByText('Padding: md')).toBeInTheDocument();
      expect(getByText('Block Padding: lg')).toBeInTheDocument();
      expect(getByText('Inline Padding: xl')).toBeInTheDocument();
    });

    it('renders boxes with alignment in the browser', async function rendersAlignment() {
      const { getByText } = await render(<AlignmentExample />);
      expect(getByText('align-self: start')).toBeInTheDocument();
      expect(getByText('align-self: center')).toBeInTheDocument();
      expect(getByText('align-self: end')).toBeInTheDocument();
    });
  });
});
