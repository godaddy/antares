import { DatePicker, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Controlling the label format via `formatOptions` on DatePicker.
 * @order 4
 */
export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }}>
      <Label>Event date</Label>
    </DatePicker>
  );
}
