import { Button, Flex, Heading, Input, Label, SizeProvider, Text, TextField, TextLockup } from '@godaddy/antares';

/**
 * A scope sizes everything inside it: text, controls, and default spacing. A component's own
 * `size` still wins.
 * @order 1
 */
export function DefaultExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <TextLockup>
          <Heading slot="title" level={2}>
            Billing
          </Heading>
          <Text slot="body">Manage your payment methods.</Text>
        </TextLockup>

        <TextField>
          <Label>Email</Label>
          <Input />
          <Text slot="description">We'll send receipts here.</Text>
        </TextField>

        <Flex gap="sm" alignItems="center">
          <Button variant="primary">Update payment method</Button>
          <Button variant="primary" size="md">
            Contact support
          </Button>
        </Flex>
      </Flex>
    </SizeProvider>
  );
}
