import { Group, Label, TextArea, TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Compose a `TextArea` instead of an `Input` for multiline entry.
 * @order 6
 */
export function MultilineExample({ value }: Pick<TextFieldProps, 'value'> = {}) {
  return (
    <TextField value={value}>
      <Label>Comment</Label>
      <Group>
        <TextArea placeholder="Enter your comment" />
      </Group>
    </TextField>
  );
}
