import { useState } from 'react';
import { DatePicker } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

/**
 * Driving the value with `useState`.
 * @title Controlled
 * @order 3
 */
export function DatePickerControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));
  return <DatePicker label="Event date" value={value} onChange={setValue} />;
}
