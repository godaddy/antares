import { Group, Input, Label, TextField } from '@godaddy/antares';

/**
 * Input fills a Group inside TextField. Field injects chrome.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Email</Label>
      <Group>
        <Input placeholder="you@example.com" />
      </Group>
    </TextField>
  );
}
