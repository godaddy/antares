import { Flex, Group, Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Put fixed text before and after the input, such as currency.
 * @order 5
 */
export function TextFieldAdornmentsExample() {
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
      <Text slot="description">Fixed text before and after the input (e.g. currency).</Text>
    </TextField>
  );
}
