import { type CalendarDate, parseDate } from '@internationalized/date';
import { useState } from 'react';
import { DateRangeField, Text } from '@godaddy/antares';

type Range = { start: CalendarDate; end: CalendarDate } | null;

export function DateRangeFieldControlledExample() {
  const [value, setValue] = useState<Range>({
    start: parseDate('2024-03-15'),
    end: parseDate('2024-03-20')
  });

  return (
    <>
      <DateRangeField label="Trip dates" value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value ? `${value.start.toString()} – ${value.end.toString()}` : '(empty)'}
      </Text>
    </>
  );
}
