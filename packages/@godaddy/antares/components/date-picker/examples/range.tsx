import { DateRangePicker, DateRangePickerCalendar, DateRangePickerControl, Label } from '@godaddy/antares';

/**
 * A start/end range picker.
 * @title Range
 * @order 2
 */
export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <DateRangePickerControl />
      <DateRangePickerCalendar />
    </DateRangePicker>
  );
}
