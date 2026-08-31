import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  Text
} from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Compose the interior out of Antares components when the default layout is not enough.
 * DatePicker renders your children as-is instead of building its own layout.
 * @order 8
 */
export function ComposedExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose the event date</Text>
      <FieldError />
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}
