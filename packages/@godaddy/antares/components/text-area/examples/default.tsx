import { Group, Label, TextArea, TextField } from '@godaddy/antares';

/**
 * TextArea fills a Group inside TextField. Field injects chrome.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <Group>
        <TextArea placeholder="Enter your comment" />
      </Group>
    </TextField>
  );
}
