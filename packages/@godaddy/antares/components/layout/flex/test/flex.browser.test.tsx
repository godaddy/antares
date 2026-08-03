import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Button as RACButton, ProgressBar as RACProgressBar } from 'react-aria-components';
import { resetHover } from '../../../../utils/test-helpers.tsx';
import { Flex } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { DirectionExample } from '../examples/direction.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';

describe('@godaddy/antares', function antares() {
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

    it('composes className and style for a host element', async function composesHost() {
      const { getByText } = await render(
        <Flex as="span" direction="column" className="custom" gap="md" style={{ opacity: 0.5 }}>
          Item
        </Flex>
      );

      const span = getByText('Item');
      expect(span).toHaveClass('custom');
      expect(span.element().getAttribute('style')).toContain('gap');
      expect(span).toHaveStyle({ opacity: '0.5' });
    });

    it('preserves flex base classes on interaction', async function preservesFlexClasses() {
      const { getByRole } = await render(
        <Flex
          as={RACButton}
          direction="column"
          className={function getClassName({ isHovered }) {
            return isHovered ? 'hover' : 'idle';
          }}
        >
          Hover me
        </Flex>
      );

      const button = getByRole('button');
      expect(button).toHaveClass('idle');

      await userEvent.hover(button);
      expect(button).toHaveClass('hover');

      await resetHover();
    });

    it('preserves layout style when progress changes', async function preservesFlexStyle() {
      const { getByRole, rerender } = await render(
        <Flex
          as={RACProgressBar}
          aria-label="Loading"
          isIndeterminate
          gap="md"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar.element().getAttribute('style')).toContain('gap');
      expect(progressbar).toHaveStyle({ opacity: '0.5' });

      await rerender(
        <Flex
          as={RACProgressBar}
          aria-label="Loading"
          value={50}
          gap="md"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );
      expect(progressbar.element().getAttribute('style')).toContain('gap');
      expect(progressbar).toHaveStyle({ opacity: '1' });
    });
  });
});
