import { useState } from 'react';
import { DatePicker, DatePickerCalendar, DatePickerControl, Label } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

/**
 * Driving the value with `useState`.
 * @title Controlled
 * @order 3
 */
export function ControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));

  return (
    <DatePicker value={value} onChange={setValue}>
      <Label>Event date</Label>
      <DatePickerControl />
      <DatePickerCalendar />
    </DatePicker>
  );
}
