import { parseDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { CalendarDefaultExample } from '../examples/default.tsx';
import { CalendarDefaultRangeExample } from '../examples/default-range.tsx';
import { CalendarOutOfMonthDaysExample } from '../examples/out-of-month-days.tsx';
import { CalendarTodayDistinctExample } from '../examples/today-distinct.tsx';
import { CalendarWithDurationExample } from '../examples/with-duration.tsx';
import { CalendarWithIndicatorsExample } from '../examples/with-indicators.tsx';
import { CalendarWithMinMaxExample } from '../examples/with-min-max.tsx';
import { CalendarWithUnavailableDatesExample } from '../examples/with-unavailable-dates.tsx';
import { DEFAULT_YEAR_PADDING, getYearRange } from '../src/get-year-range';

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

      it('renders indicators example', function indicators() {
        const result = renderToString(<CalendarWithIndicatorsExample />);
        expect(result).toContain('color-feedback-success-strong');
      });

      it('renders today-distinct example', function todayDistinct() {
        const result = renderToString(<CalendarTodayDistinctExample />);
        expect(result).toContain('data-today');
      });

      it('renders out-of-month-days example', function outOfMonth() {
        const result = renderToString(<CalendarOutOfMonthDaysExample />);
        expect(result).toContain('data-outside-month');
      });

      it('renders with-duration example', function withDuration() {
        const result = renderToString(<CalendarWithDurationExample />);
        expect(result).toContain('2024');
      });
    });
  });

  describe('#getYearRange', function getYearRangeTests() {
    const today = parseDate('2024-06-15');

    it('returns today.year ± DEFAULT_YEAR_PADDING when no bounds set', function defaultRange() {
      const years = getYearRange(undefined, undefined, today);
      expect(years).toHaveLength(DEFAULT_YEAR_PADDING * 2 + 1);
      expect(years[0]).toBe(today.year - DEFAULT_YEAR_PADDING);
      expect(years[years.length - 1]).toBe(today.year + DEFAULT_YEAR_PADDING);
    });

    it('returns inclusive year span when both bounds set', function bothBounds() {
      const years = getYearRange(parseDate('2020-01-01'), parseDate('2025-12-31'), today);
      expect(years).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
    });

    it('uses today.year as upper bound when only minValue set', function onlyMin() {
      const years = getYearRange(parseDate('2022-01-01'), undefined, today);
      expect(years).toEqual([2022, 2023, 2024]);
    });

    it('uses today.year as lower bound when only maxValue set', function onlyMax() {
      const years = getYearRange(undefined, parseDate('2026-12-31'), today);
      expect(years).toEqual([2024, 2025, 2026]);
    });

    it('returns [today.year] when minValue.year > maxValue.year', function inverted() {
      const years = getYearRange(parseDate('2030-01-01'), parseDate('2020-01-01'), today);
      expect(years).toEqual([2024]);
    });

    it('treats null and undefined as unset', function nulls() {
      const years = getYearRange(null, null, today);
      expect(years).toHaveLength(DEFAULT_YEAR_PADDING * 2 + 1);
    });
  });
});
