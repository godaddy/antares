import { getLocalTimeZone, today } from '@internationalized/date';
import { RangeCalendar } from '@godaddy/antares';

export function CalendarTodayDistinctExample() {
  const now = today(getLocalTimeZone());
  return (
    <RangeCalendar
      aria-label="Today inside selected range"
      defaultValue={{ start: now.subtract({ days: 3 }), end: now.add({ days: 3 }) }}
    />
  );
}
