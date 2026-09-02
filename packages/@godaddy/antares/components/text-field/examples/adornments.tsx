import { Flex, Group, Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Fixed text before and after the input, such as currency. Leading and trailing content is
 * composed inside the `Group` and its position comes from source order.
 * @order 5
 */
export function AdornmentsExample() {
  return (
    <TextField>
      <Label>Amount</Label>
      <Group>
        <Flex as="span" alignItems="center" inlinePaddingStart="md">
          $
        </Flex>
        <Input placeholder="0.00" />
        <Flex as="span" alignItems="center" inlinePaddingEnd="md">
          .00
        </Flex>
      </Group>
      <Text slot="description">Compose fixed text before and after the input (e.g. currency).</Text>
    </TextField>
  );
}
