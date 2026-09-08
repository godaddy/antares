import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DefaultExample } from '../examples/default.tsx';
import { RangeExample } from '../examples/range.tsx';
import { MinMaxExample } from '../examples/min-max.tsx';
import { FormatOptionsExample } from '../examples/format-options.tsx';
import { ComposedExample } from '../examples/composed.tsx';
import { ComposedRangeExample } from '../examples/composed-range.tsx';
import { InteriorExample } from '../examples/interior.tsx';

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

    describe('#interior', function interior() {
      const html = renderToString(<InteriorExample />);

      it('fills the trigger face with the trigger chrome', function trigger() {
        expect(html).toMatch(/<button[^>]*class="trigger button trigger md"/);
        expect(html).toContain('data-icon="calendar"');
      });

      it('disables the trigger and a control button with the field', function disabledControl() {
        expect(html).toMatch(/<button[^>]*class="trigger button trigger md"[^>]*disabled=""/);
        expect(html).toMatch(/<button[^>]*class="control button control md"[^>]*disabled=""/);
      });
    });
  });
});
