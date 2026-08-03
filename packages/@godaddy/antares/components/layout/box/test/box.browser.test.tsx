import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Button as RACButton, ProgressBar as RACProgressBar } from 'react-aria-components';
import { resetHover } from '../../../../utils/test-helpers.tsx';
import { Box } from '@godaddy/antares';
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

    it('composes className and style for a host element', async function composesHost() {
      const { getByText } = await render(
        <Box as="span" className="custom" padding="md" style={{ opacity: 0.5 }}>
          Save
        </Box>
      );

      const span = getByText('Save');
      expect(span).toHaveClass('custom');
      expect(span.element().getAttribute('style')).toContain('padding');
      expect(span).toHaveStyle({ opacity: '0.5' });
    });

    it('composes a function className and re-evaluates on interaction', async function composesFunctionClassName() {
      const { getByRole } = await render(
        <Box
          as={RACButton}
          className={function getClassName({ isHovered }) {
            return isHovered ? 'hover' : 'idle';
          }}
        >
          Hover me
        </Box>
      );

      const button = getByRole('button');
      expect(button).toHaveClass('idle');

      await userEvent.hover(button);
      expect(button).toHaveClass('hover');

      await resetHover();
    });

    it('merges a function style and re-evaluates when progress changes', async function mergesFunctionStyle() {
      const { getByRole, rerender } = await render(
        <Box
          as={RACProgressBar}
          aria-label="Loading"
          isIndeterminate
          padding="md"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar.element().getAttribute('style')).toContain('padding');
      expect(progressbar).toHaveStyle({ opacity: '0.5' });

      await rerender(
        <Box
          as={RACProgressBar}
          aria-label="Loading"
          value={50}
          padding="md"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );
      expect(progressbar.element().getAttribute('style')).toContain('padding');
      expect(progressbar).toHaveStyle({ opacity: '1' });
    });
  });
});
