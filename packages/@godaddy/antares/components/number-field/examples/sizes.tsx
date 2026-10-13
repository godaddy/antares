import { Button, Flex, Group, Input, Label, NumberField } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

/**
 * `size` sets the label, input, and steppers. Without it, the field follows the surrounding size
 * scope.
 * @title Sizes
 * @order 8
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      {SIZES.map(function field(size) {
        return (
          <NumberField key={size} minValue={0} maxValue={100} size={size}>
            <Label>Quantity ({size})</Label>
            <Group>
              <Button slot="decrement" />
              <Input />
              <Button slot="increment" />
            </Group>
          </NumberField>
        );
      })}
    </Flex>
  );
}
