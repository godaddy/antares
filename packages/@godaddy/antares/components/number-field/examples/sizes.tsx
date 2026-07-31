import { Flex, NumberField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes.
 * @order 8
 */
export function NumberFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <NumberField label="Quantity (md)" placeholder="0" minValue={0} maxValue={100} />
      <NumberField label="Quantity (sm)" placeholder="0" minValue={0} maxValue={100} size="sm" />
    </Flex>
  );
}
