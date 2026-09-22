import { Button, Flex, Group, Icon, Input, Label, Text, TextField } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

/**
 * `size` sets the label, input, description, and any control composed inside, here a
 * `Button slot="control"`. Without it, the field follows the surrounding size scope.
 * @title Sizes
 * @order 7
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      {SIZES.map(function field(size) {
        return (
          <TextField key={size} size={size}>
            <Label>Email ({size})</Label>
            <Group>
              <Flex as="span" alignItems="center" inlinePaddingStart="md">
                <Icon icon="star" />
              </Flex>
              <Input placeholder="you@example.com" />
              <Button aria-label="Verify email address" slot="control">
                Verify
              </Button>
            </Group>
            <Text slot="description">We'll send receipts here.</Text>
          </TextField>
        );
      })}
    </Flex>
  );
}
