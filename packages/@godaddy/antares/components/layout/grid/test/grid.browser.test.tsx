import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
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
  });
});
