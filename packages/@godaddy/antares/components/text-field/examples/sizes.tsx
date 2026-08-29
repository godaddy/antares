import { Flex, Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Size lives on Group (`md` or `sm`).
 * @title Sizes
 * @order 7
 */
export function TextFieldSizesExample() {
  return (
    <Flex direction="column" gap="md">
      <TextField>
        <Label>Email (md)</Label>
        <Group>
          <Input placeholder="you@example.com" />
        </Group>
      </TextField>
      <TextField>
        <Label>Email (sm)</Label>
        <Group size="sm">
          <Input placeholder="you@example.com" />
        </Group>
      </TextField>
    </Flex>
  );
}
