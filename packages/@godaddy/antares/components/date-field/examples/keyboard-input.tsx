import { parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldKeyboardInputExample() {
  return <DateField allowsKeyboardInput label="Start date" defaultValue={parseDate('2024-03-15')} />;
}
