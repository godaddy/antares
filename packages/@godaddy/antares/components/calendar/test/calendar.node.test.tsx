import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarWithValueExample } from '../examples/with-value.tsx';
import { RangeCalendarExample } from '../examples/range.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Calendar', function calendar() {
    it('renders default example', function defaultExample() {
      const html = renderToString(<CalendarDefaultExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders calendar with a default value', function withValue() {
      const html = renderToString(<CalendarWithValueExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders range calendar', function range() {
      const html = renderToString(<RangeCalendarExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
