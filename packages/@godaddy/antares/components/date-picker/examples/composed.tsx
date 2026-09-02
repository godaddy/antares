import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
  Group,
  Icon,
  Label,
  Popover,
  Text
} from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Compose the interior when the default layout is not enough.
 * @title Composed
 * @order 8
 */
export function ComposedExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose the event date</Text>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}
