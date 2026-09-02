import { Button, Calendar, Content, DatePicker, DatePickerValue, Group, Icon, Label, Popover } from '@godaddy/antares';

/**
 * A disabled picker via `isDisabled`.
 * @order 7
 */
export function DisabledExample() {
  return (
    <DatePicker isDisabled>
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
