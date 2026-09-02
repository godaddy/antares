import { Button, Calendar, Content, DatePicker, DatePickerValue, Group, Icon, Label, Popover } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Controlling the label by passing `formatOptions` to `DatePickerValue`.
 * @order 4
 */
export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue formatOptions={{ dateStyle: 'short' }} />
        </Button>
      </Group>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}
