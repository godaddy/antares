import { type DateValue, parseDate } from '@internationalized/date';
import { DateRangeField } from '@godaddy/antares';

export function DateRangeFieldWithUnavailableDatesExample() {
  function isWeekend(date: DateValue) {
    const dayOfWeek = date.toDate('UTC').getUTCDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  return (
    <DateRangeField
      label="Weekdays only"
      defaultValue={{ start: parseDate('2024-03-13'), end: parseDate('2024-03-15') }}
      isDateUnavailable={isWeekend}
    />
  );
}
