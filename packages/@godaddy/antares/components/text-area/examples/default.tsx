import { Label, TextArea, TextField } from '@godaddy/antares';

/**
 * TextArea inside TextField. Field injects chrome.
 * @order 1
 */
export function DefaultExample() {
  return (
    <TextField>
      <Label>Comment</Label>
      <TextArea placeholder="Enter your comment" />
    </TextField>
  );
}
