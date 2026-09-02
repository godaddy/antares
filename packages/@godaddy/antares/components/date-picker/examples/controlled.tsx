import { useState } from 'react';
import { Button, Calendar, Content, DatePicker, DatePickerValue, Group, Icon, Label, Popover } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

/**
 * Driving the value with `useState`.
 * @order 3
 */
export function ControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));

  return (
    <DatePicker value={value} onChange={setValue}>
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
