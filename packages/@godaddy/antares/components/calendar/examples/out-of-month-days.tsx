import { parseDate } from '@internationalized/date';
import { Calendar, Flex, RangeCalendar, Text } from '@godaddy/antares';

export function CalendarOutOfMonthDaysExample() {
  return (
    <Flex direction="row" gap="lg" alignItems="flex-start">
      <Flex direction="column" gap="sm">
        <Text>
          <strong>Single (40% opacity)</strong>
        </Text>
        <Calendar aria-label="Single" defaultValue={parseDate('2024-03-15')} />
      </Flex>
      <Flex direction="column" gap="sm">
        <Text>
          <strong>Range (hidden)</strong>
        </Text>
        <RangeCalendar
          aria-label="Range"
          defaultValue={{ start: parseDate('2024-03-05'), end: parseDate('2024-03-12') }}
        />
      </Flex>
    </Flex>
  );
}
