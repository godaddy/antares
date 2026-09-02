import { Button, Flex, Group, Input, Label, NumberField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @order 8
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField minValue={0} maxValue={100}>
        <Label>Quantity (md)</Label>
        <Group>
          <Button slot="decrement" />
          <Input placeholder="0" />
          <Button slot="increment" />
        </Group>
      </NumberField>
      <NumberField minValue={0} maxValue={100} size="sm">
        <Label>Quantity (sm)</Label>
        <Group>
          <Button slot="decrement" />
          <Input placeholder="0" />
          <Button slot="increment" />
        </Group>
      </NumberField>
    </Flex>
  );
}
