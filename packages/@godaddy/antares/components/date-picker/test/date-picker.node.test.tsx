import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { RangeExample } from '../examples/range.tsx';
import { MinMaxExample } from '../examples/min-max.tsx';
import { FormatOptionsExample } from '../examples/format-options.tsx';
import { ComposedExample } from '../examples/composed.tsx';
import { ComposedRangeExample } from '../examples/composed-range.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DatePicker', function datePicker() {
    it('renders default example', function defaultExample() {
      const html = renderToString(<DefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders range example', function range() {
      const html = renderToString(<RangeExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders min-max example', function minMax() {
      const html = renderToString(<MinMaxExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders format-options example', function formatOptions() {
      const html = renderToString(<FormatOptionsExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders composed example', function composed() {
      const html = renderToString(<ComposedExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders composed range example', function composedRange() {
      const html = renderToString(<ComposedRangeExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
