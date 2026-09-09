import { Button, DatePicker, DatePickerCalendar, Flex, Group, Label } from '@godaddy/antares';

/**
 * Every part a DatePicker styles: the label, a composed `Group`, and the trigger face the field
 * fills. The second picker is disabled, so its trigger and its control affix are disabled with it.
 * @ignore
 */
export function InteriorExample() {
  return (
    <Flex direction="column" gap="md">
      <DatePicker>
        <Label>Event date</Label>
        <Button slot="trigger" />
        <DatePickerCalendar />
      </DatePicker>

      <DatePicker isDisabled>
        <Label>Event date</Label>
        <Group>
          <Button slot="trigger" />
          <Button slot="control">Clear</Button>
        </Group>
        <DatePickerCalendar />
      </DatePicker>
    </Flex>
  );
}
