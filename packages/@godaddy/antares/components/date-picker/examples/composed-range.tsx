import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  RangeCalendar,
  Text
} from '@godaddy/antares';

/**
 * Compose a DateRangePicker interior the same way: Label, Group, trigger, RangeCalendar.
 * @order 9
 */
export function ComposedRangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose your start and end dates</Text>
      <FieldError />
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}
