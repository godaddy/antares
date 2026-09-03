import { DatePicker, DatePickerControl, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Controlling the label format via `formatOptions` on `DatePickerControl`.
 * @order 4
 */
export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <DatePickerControl formatOptions={{ dateStyle: 'short' }} />
    </DatePicker>
  );
}
