import { Flex, Label, NumberField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @order 8
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField minValue={0} maxValue={100}>
        <Label>Quantity (md)</Label>
      </NumberField>
      <NumberField minValue={0} maxValue={100} size="sm">
        <Label>Quantity (sm)</Label>
      </NumberField>
    </Flex>
  );
}
