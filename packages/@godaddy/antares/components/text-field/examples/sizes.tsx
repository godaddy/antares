import { Button, Flex, Group, Icon, Input, Label, TextField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes, plain and with an icon plus control button.
 * Set `size` on `TextField` so the input and `Button slot="control"` share the same size.
 * @title Sizes
 * @order 7
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Email (md)</Label>
        <Input placeholder="you@example.com" />
      </TextField>
      <TextField size="sm">
        <Label>Email (sm)</Label>
        <Input placeholder="you@example.com" />
      </TextField>

      <TextField>
        <Label>Email with icon (md)</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="md">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
            Verify
          </Button>
        </Group>
      </TextField>

      <TextField size="sm">
        <Label>Email with icon (sm)</Label>
        <Group>
          <Flex as="span" alignItems="center" inlinePaddingStart="sm">
            <Icon icon="star" />
          </Flex>
          <Input placeholder="Email" />
          <Button aria-label="Verify email address" slot="control">
            Verify
          </Button>
        </Group>
      </TextField>
    </Flex>
  );
}
