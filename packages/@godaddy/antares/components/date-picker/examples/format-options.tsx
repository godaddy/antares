import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Controlling the trigger's label format via `formatOptions`.
 * @order 4
 */
export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }}>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}
