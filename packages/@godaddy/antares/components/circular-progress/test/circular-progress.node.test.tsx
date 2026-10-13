import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressTests() {
    it('renders indeterminate progress', function rendersIndeterminate() {
      expect(renderToString(<IndeterminateExample />)).toMatchSnapshot();
    });

    it('renders indeterminate progress with a supplied value', function rendersIndeterminateWithValue() {
      expect(renderToString(<IndeterminateExample value={60} aria-valuetext="60 files" />)).toMatchSnapshot();
    });

    it('renders the default circular progress', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders in different sizes', function rendersSizes() {
      const result = renderToString(<SizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders with different emphasis variants', function rendersEmphasis() {
      const result = renderToString(<EmphasisExample />);
      expect(result).toMatchSnapshot();
    });
  });
});
