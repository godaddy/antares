import { Button, Calendar, Content, DatePicker, DatePickerValue, Group, Icon, Label, Popover } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

/**
 * Bounding selectable dates with `minValue` / `maxValue`.
 * @order 5
 */
export function MinMaxExample() {
  return (
    <DatePicker minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')}>
      <Label>Booking date</Label>
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
