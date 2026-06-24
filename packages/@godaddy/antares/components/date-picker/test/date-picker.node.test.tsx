import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DatePickerBasicExample } from '../examples/basic.tsx';
import { DateRangePickerExample } from '../examples/range.tsx';

describe('@godaddy/antares', function antares() {
  describe('#DatePicker', function datePicker() {
    it('renders basic example', function basic() {
      const html = renderToString(<DatePickerBasicExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders range example', function range() {
      const html = renderToString(<DateRangePickerExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
