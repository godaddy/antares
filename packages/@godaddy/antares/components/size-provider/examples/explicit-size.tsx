import { Flex, Input, Label, SizeProvider, Text, TextField } from '@godaddy/antares';

/**
 * A component's own `size` wins for that component and every part inside it, such as a field's
 * label and description. Its siblings keep following the scope.
 * @order 5
 */
export function ExplicitSizeExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <TextField>
          <Label>Coupon code</Label>
          <Input />
          <Text slot="description">Follows the scope.</Text>
        </TextField>

        <TextField size="lg">
          <Label>Domain name</Label>
          <Input />
          <Text slot="description">Sized by the field.</Text>
        </TextField>
      </Flex>
    </SizeProvider>
  );
}
