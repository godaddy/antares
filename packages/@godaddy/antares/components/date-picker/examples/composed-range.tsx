import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
  Group,
  Icon,
  Label,
  Popover,
  RangeCalendar,
  Text
} from '@godaddy/antares';

/**
 * Compose a DateRangePicker interior the same way.
 * @title Composed range
 * @order 9
 */
export function ComposedRangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group alignItems="center">
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose your start and end dates</Text>
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}
