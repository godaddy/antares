import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { SlotsExample } from '../examples/slots.tsx';
import { CompositionExample } from '../examples/composition.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressTests() {
    it('renders composed slots', function rendersSlots() {
      expect(renderToString(<SlotsExample />)).toMatchSnapshot();
    });

    it('renders descriptions and wrapped parts', function rendersComposition() {
      expect(renderToString(<CompositionExample />)).toMatchSnapshot();
    });

    it('renders a named track without optional parts', function rendersTrackOnly() {
      expect(
        renderToString(<CompositionExample showLabel={false} showValue={false} showDescription={false} />)
      ).toMatchSnapshot();
    });

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

    it('renders with different status variants', function rendersStatuses() {
      const result = renderToString(<StatusesExample />);
      expect(result).toMatchSnapshot();
    });
  });
});
