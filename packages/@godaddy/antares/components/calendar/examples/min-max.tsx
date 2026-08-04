import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Bounding selectable dates.
 * @title Min / Max
 * @order 4
 */
export function CalendarMinMaxExample() {
  return (
    <Calendar
      aria-label="Booking date"
      defaultValue={parseDate('2024-03-15')}
      minValue={parseDate('2024-03-05')}
      maxValue={parseDate('2024-03-25')}
    />
  );
}
