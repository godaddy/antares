import { Button, Group, Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Compose with `children` when you need a trailing control instead of `trailingText`.
 * @title Trailing control
 * @order 9
 */
export function TrailingControlExample() {
  return (
    <TextField>
      <Label>Search</Label>
      <Group>
        <Input placeholder="Type..." />
        <Button aria-label="Search" variant="control">
          Search
        </Button>
      </Group>
      <Text slot="description">Search by keyword</Text>
    </TextField>
  );
}
