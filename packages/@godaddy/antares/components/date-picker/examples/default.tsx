import { Button, Calendar, Content, DatePicker, DatePickerValue, Group, Icon, Label, Popover } from '@godaddy/antares';

/**
 * A single date picker.
 * @order 1
 */
export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
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
