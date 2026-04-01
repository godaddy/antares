import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { ColumnsExample } from '../examples/columns.tsx';
import { GapExample } from '../examples/gap.tsx';
import { AreasExample } from '../examples/areas.tsx';
import { ResponsiveExample } from '../examples/responsive.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { FormExample } from '../examples/form.tsx';

describe('@godaddy/uxcore', function uxcore() {
  describe('#Grid', function gridTests() {
    it('renders the default grid', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders grid with column variations', function rendersColumns() {
      const result = renderToString(<ColumnsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders grid with gap variations', function rendersGap() {
      const result = renderToString(<GapExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders grid with named areas', function rendersAreas() {
      const result = renderToString(<AreasExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders responsive grid', function rendersResponsive() {
      const result = renderToString(<ResponsiveExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders grid with alignment', function rendersAlignment() {
      const result = renderToString(<AlignmentExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders form layout', function rendersForm() {
      const result = renderToString(<FormExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders the grid with custom className', function customClassName() {
      const result = renderToString(<DefaultExample className="custom-class" />);
      expect(result).toMatchSnapshot();
    });
  });
});
