import { DatePicker, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Bounding selectable dates with `minValue` / `maxValue`.
 * @title Min / Max
 * @order 5
 */
export function MinMaxExample() {
  return (
    <DatePicker minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')}>
      <Label>Booking date</Label>
    </DatePicker>
  );
}
