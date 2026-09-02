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
  Popover
} from '@godaddy/antares';

/**
 * An invalid picker showing a validation message via `isInvalid` and a `FieldError`.
 * @order 6
 */
export function WithErrorExample() {
  return (
    <DatePicker isInvalid>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
        </Button>
      </Group>
      <FieldError>Please choose a date</FieldError>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}
