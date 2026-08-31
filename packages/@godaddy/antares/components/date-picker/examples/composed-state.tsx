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
 * Pass a function when the interior needs the DatePicker state. It receives `isOpen`
 * and the rest of the render props.
 * @order 10
 */
export function ComposedStateExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      {function renderInterior({ isOpen }) {
        return (
          <>
            <Label>Event date</Label>
            <Group alignItems="center">
              <Button variant="trigger">
                <Icon icon="calendar" />
                <DatePickerValue />
              </Button>
            </Group>
            <Text slot="description">{isOpen ? 'Use the arrow keys to browse' : 'Choose the event date'}</Text>
            <FieldError />
            <Popover hideArrow>
              <Content>
                <Calendar />
              </Content>
            </Popover>
          </>
        );
      }}
    </DatePicker>
  );
}
