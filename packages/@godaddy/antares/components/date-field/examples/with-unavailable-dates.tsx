import { type DateValue, parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldWithUnavailableDatesExample() {
  function isWeekend(date: DateValue) {
    const dayOfWeek = date.toDate('UTC').getUTCDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  return (
    <DateField label="Weekday only" defaultValue={parseDate('2024-03-13')} isDateUnavailable={isWeekend} />
  );
}
