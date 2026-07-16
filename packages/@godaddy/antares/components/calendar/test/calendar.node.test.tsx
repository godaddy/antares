import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarWithValueExample } from '../examples/with-value.tsx';
import { RangeCalendarExample } from '../examples/range.tsx';
import { CalendarMinMaxExample } from '../examples/min-max.tsx';
import { CalendarUnavailableExample } from '../examples/unavailable.tsx';
import { CalendarDisabledExample } from '../examples/disabled.tsx';

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

    it('renders min-max example', function minMax() {
      const html = renderToString(<CalendarMinMaxExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders unavailable example', function unavailable() {
      const html = renderToString(<CalendarUnavailableExample />);
      expect(html).toMatchSnapshot();
    });

    it('renders disabled example', function disabled() {
      const html = renderToString(<CalendarDisabledExample />);
      expect(html).toMatchSnapshot();
    });
  });
});
