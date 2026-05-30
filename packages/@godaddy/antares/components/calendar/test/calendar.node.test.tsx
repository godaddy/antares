import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarDefaultRangeExample } from '../examples/default-range.tsx';
import { CalendarTodayDistinctExample } from '../examples/today-distinct.tsx';
import { CalendarWithMinMaxExample } from '../examples/with-min-max.tsx';
import { CalendarWithUnavailableDatesExample } from '../examples/with-unavailable-dates.tsx';

describe('@godaddy/antares', function antares() {
  describe('#Calendar', function calendar() {
    describe('#examples', function examples() {
      it('renders default example', function defaultExample() {
        const result = renderToString(<CalendarDefaultExample />);
        expect(result).toContain('2024');
      });

      it('renders default range example', function rangeExample() {
        const result = renderToString(<CalendarDefaultRangeExample />);
        expect(result).toContain('data-selected');
      });

      it('renders min/max example', function minMax() {
        const result = renderToString(<CalendarWithMinMaxExample />);
        expect(result).toMatchSnapshot();
      });

      it('renders unavailable dates example', function unavailable() {
        const result = renderToString(<CalendarWithUnavailableDatesExample />);
        expect(result).toContain('data-unavailable');
      });

      it('renders today-distinct example', function todayDistinct() {
        const result = renderToString(<CalendarTodayDistinctExample />);
        expect(result).toContain('data-today');
      });
    });
  });
});
