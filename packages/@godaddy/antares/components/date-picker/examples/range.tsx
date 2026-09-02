import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
  Group,
  Icon,
  Label,
  Popover,
  RangeCalendar
} from '@godaddy/antares';

/**
 * A start/end range picker.
 * @order 2
 */
export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue />
        </Button>
      </Group>
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}
