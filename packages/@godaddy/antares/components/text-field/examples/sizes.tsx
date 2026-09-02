import { Flex, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Compare the supported `md` and `sm` visual sizes. Set `size` on `TextField`; a composed `Group` inherits it.
 * @title Sizes
 * @order 7
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Email (md)</Label>
        <Group>
          <Input placeholder="you@example.com" />
        </Group>
      </TextField>
      <TextField size="sm">
        <Label>Email (sm)</Label>
        <Group>
          <Input placeholder="you@example.com" />
        </Group>
      </TextField>
    </Flex>
  );
}
