import { Button, DatePicker, DatePickerCalendar, Flex, Label } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

/**
 * `size` sets the label, trigger, and calendar. Without it, the picker follows the surrounding
 * size scope.
 * @title Sizes
 * @order 10
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      {SIZES.map(function picker(size) {
        return (
          <DatePicker key={size} size={size}>
            <Label>Event date ({size})</Label>
            <Button slot="trigger" />
            <DatePickerCalendar />
          </DatePicker>
        );
      })}
    </Flex>
  );
}
