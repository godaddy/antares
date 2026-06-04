import { parseDate } from '@internationalized/date';
import { DateRangeField } from '@godaddy/antares';

export function DateRangeFieldWithMinMaxExample() {
  return (
    <DateRangeField
      label="Q1 2024"
      defaultValue={{ start: parseDate('2024-02-05'), end: parseDate('2024-02-15') }}
      minValue={parseDate('2024-01-01')}
      maxValue={parseDate('2024-03-31')}
    />
  );
}
