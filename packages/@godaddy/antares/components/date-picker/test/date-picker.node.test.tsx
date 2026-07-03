import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DatePickerDefaultExample } from '../examples/default.tsx';
import { DateRangePickerExample } from '../examples/range.tsx';

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
  });
});
