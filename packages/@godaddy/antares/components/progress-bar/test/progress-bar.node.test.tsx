import { expect, describe, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { WithoutValueLabelExample } from '../examples/without-value-label.tsx';
import { WithoutLabelExample } from '../examples/without-label.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';
import { ValueOnlyExample } from '../examples/value-only.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { NestedExample } from '../examples/nested.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressBar', function progressBarTests() {
    it('renders a label without visible value text', function rendersWithoutValueLabel() {
      expect(renderToString(<WithoutValueLabelExample />)).toMatchSnapshot();
    });

    it('renders only the track', function rendersWithoutLabel() {
      expect(renderToString(<WithoutLabelExample />)).toMatchSnapshot();
    });

    it('renders custom value text without a visible label', function rendersValueOnly() {
      expect(renderToString(<ValueOnlyExample valueContent="3 of 5 files" />)).toMatchSnapshot();
    });

    it('renders formatted value text without a visible label', function rendersFormattedValueOnly() {
      expect(renderToString(<ValueOnlyExample />)).toMatchSnapshot();
    });

    it('renders formatted, static, and state-based value labels', function rendersValueDisplay() {
      expect(renderToString(<ValueDisplayExample />)).toMatchSnapshot();
    });

    it('renders indeterminate progress', function rendersIndeterminate() {
      expect(renderToString(<IndeterminateExample />)).toMatchSnapshot();
    });

    it('renders indeterminate progress with a supplied value', function rendersIndeterminateWithValue() {
      expect(renderToString(<IndeterminateExample value={60} aria-valuetext="60 files" />)).toMatchSnapshot();
    });

    it('renders wrapped composition', function rendersComposition() {
      expect(renderToString(<CompositionExample />)).toMatchSnapshot();
    });

    it('renders nested composition', function rendersNested() {
      expect(renderToString(<NestedExample />)).toMatchSnapshot();
    });

    it('renders the default progress bar', function rendersDefault() {
      const result = renderToString(<DefaultExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders progress bars in different sizes', function rendersSizes() {
      const result = renderToString(<SizesExample />);
      expect(result).toMatchSnapshot();
    });

    it('renders progress bars with different statuses', function rendersStatuses() {
      const result = renderToString(<StatusesExample />);
      expect(result).toMatchSnapshot();
    });
  });
});
