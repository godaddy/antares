import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DatePickerDefaultExample } from '../examples/default.tsx';
import { DateRangePickerExample } from '../examples/range.tsx';
import { DatePickerMinMaxExample } from '../examples/min-max.tsx';
import { DatePickerFormatOptionsExample } from '../examples/format-options.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DatePicker', function datePicker() {
    it('renders default example', function defaultExample() {
      const html = renderToString(<DatePickerDefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders range example', function range() {
      const html = renderToString(<DateRangePickerExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders min-max example', function minMax() {
      const html = renderToString(<DatePickerMinMaxExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders format-options example', function formatOptions() {
      const html = renderToString(<DatePickerFormatOptionsExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
