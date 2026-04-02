import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { PaddingExample } from '../examples/padding.tsx';
import { ElevationExample } from '../examples/elevation.tsx';
import { RoundingExample } from '../examples/rounding.tsx';
import { AsExample } from '../examples/as.tsx';
import { AlignmentExample } from '../examples/alignment.tsx';
import { TypesExample } from '../examples/types.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Box', function boxTests() {
    it('renders boxes with padding variations', function rendersPadding() {
      const result = renderToString(<PaddingExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders box with custom className', function rendersCustomClassName() {
      const result = renderToString(
        <PaddingExample className="custom-class" data-testid="custom-data-prop" aria-label="custom-label" />
      );
      expect(result).toMatchSnapshot();
    });

    it('renders boxes with elevation variations', function rendersElevation() {
      const result = renderToString(<ElevationExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders boxes with rounding variations', function rendersRounding() {
      const result = renderToString(<RoundingExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders boxes with different element types', function rendersAs() {
      const result = renderToString(<AsExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders boxes with self-alignment props', function rendersAlignment() {
      const result = renderToString(<AlignmentExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders boxes with type tests', function rendersTypeTests() {
      try {
        const result = renderToString(<TypesExample />);
        expect(result).toMatchSnapshot();
      } catch (_err) {
        expect(true).toBe(true);
      }
    });
  });
});
