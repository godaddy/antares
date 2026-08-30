import { Button, Group, Input, Label, Text, TextField } from '@godaddy/antares';

/**
 * Compose with `children` when you need a leading control instead of `leadingText`.
 * @title Leading control
 * @order 8
 */
export function LeadingControlExample() {
  return (
    <TextField>
      <Label>Phone</Label>
      <Group>
        <Button aria-label="Country code" variant="control">
          Click Me
        </Button>
        <Input placeholder="Enter your phone number" />
      </Group>
      <Text slot="description">Enter your phone number</Text>
    </TextField>
  );
}
