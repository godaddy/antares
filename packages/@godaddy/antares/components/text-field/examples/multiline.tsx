import { Group, Label, TextArea, TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Use TextArea instead of Input for multiline text.
 * @order 6
 */
export function TextFieldMultilineExample(props: TextFieldProps) {
  return (
    <TextField {...props}>
      <Label>Comment</Label>
      <Group>
        <TextArea placeholder="Enter your comment" />
      </Group>
    </TextField>
  );
}
