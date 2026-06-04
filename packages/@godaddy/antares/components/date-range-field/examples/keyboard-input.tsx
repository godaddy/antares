import { parseDate } from '@internationalized/date';
import { DateRangeField } from '@godaddy/antares';

export function DateRangeFieldKeyboardInputExample() {
  return (
    <DateRangeField
      allowsKeyboardInput
      label="Trip dates"
      defaultValue={{ start: parseDate('2024-03-15'), end: parseDate('2024-03-20') }}
    />
  );
}
