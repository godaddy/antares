import { type DateValue, parseDate } from '@internationalized/date';
import { Calendar } from '@godaddy/antares';

export function CalendarWithUnavailableDatesExample() {
  function isWeekend(date: DateValue) {
    const dayOfWeek = date.toDate('UTC').getUTCDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  return (
    <Calendar
      aria-label="Weekday only"
      defaultValue={parseDate('2024-03-13')}
      isDateUnavailable={isWeekend}
    />
  );
}
