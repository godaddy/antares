import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Button as RACButton, ProgressBar as RACProgressBar } from 'react-aria-components';
import { resetHover } from '../../../../utils/test-helpers.tsx';
import { Grid } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { ColumnsExample } from '../examples/columns.tsx';
import { AreasExample } from '../examples/areas.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Grid', function gridTests() {
    it('renders the default grid in the browser', async function rendersDefault() {
      const { getByText } = await render(<DefaultExample />);
      expect(getByText('Item 1')).toBeInTheDocument();
      expect(getByText('Item 2')).toBeInTheDocument();
      expect(getByText('Item 3')).toBeInTheDocument();
    });

    it('renders grid with column variations in the browser', async function rendersColumns() {
      const { getByText } = await render(<ColumnsExample />);
      expect(getByText('columns: repeat(2, 1fr)')).toBeInTheDocument();
      expect(getByText('columns: 1fr 2fr 1fr')).toBeInTheDocument();
      expect(getByText('columns: auto 1fr auto')).toBeInTheDocument();
    });

    it('renders grid with named areas in the browser', async function rendersAreas() {
      const { getByText } = await render(<AreasExample />);
      expect(getByText('Header')).toBeInTheDocument();
      expect(getByText('Sidebar')).toBeInTheDocument();
      expect(getByText('Main Content')).toBeInTheDocument();
      expect(getByText('Footer')).toBeInTheDocument();
    });

    it('composes className and style for a host element', async function composesHost() {
      const { getByText } = await render(
        <Grid as="span" className="custom" columns="1fr 1fr" style={{ opacity: 0.5 }}>
          Cell
        </Grid>
      );

      const span = getByText('Cell');
      expect(span).toHaveClass('custom');
      expect(span.element().getAttribute('style')).toContain('grid-template-columns');
      expect(span).toHaveStyle({ opacity: '0.5' });
    });

    it('preserves grid base class on interaction', async function preservesGridClass() {
      const { getByRole } = await render(
        <Grid
          as={RACButton}
          className={function getClassName({ isHovered }) {
            return isHovered ? 'hover' : 'idle';
          }}
        >
          Hover me
        </Grid>
      );

      const button = getByRole('button');
      expect(button).toHaveClass('idle');

      await userEvent.hover(button);
      expect(button).toHaveClass('hover');

      await resetHover();
    });

    it('preserves grid style when progress changes', async function preservesGridStyle() {
      const { getByRole, rerender } = await render(
        <Grid
          as={RACProgressBar}
          aria-label="Loading"
          isIndeterminate
          columns="1fr 1fr"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );

      const progressbar = getByRole('progressbar');
      expect(progressbar.element().getAttribute('style')).toContain('grid-template-columns');
      expect(progressbar).toHaveStyle({ opacity: '0.5' });

      await rerender(
        <Grid
          as={RACProgressBar}
          aria-label="Loading"
          value={50}
          columns="1fr 1fr"
          style={function getStyle({ defaultStyle, isIndeterminate }) {
            return { ...defaultStyle, opacity: isIndeterminate ? 0.5 : 1 };
          }}
        />
      );
      expect(progressbar.element().getAttribute('style')).toContain('grid-template-columns');
      expect(progressbar).toHaveStyle({ opacity: '1' });
    });
  });
});
