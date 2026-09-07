import { Label, TextArea, TextField } from '@godaddy/antares';

/**
 * TextArea inside TextField. The field styles it.
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
