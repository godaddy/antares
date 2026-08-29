import { TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Use `multiline` to render a textarea.
 * @order 6
 */
export function MultilineExample(props: TextFieldProps) {
  return <TextField label="Comment" placeholder="Enter your comment" multiline {...props} />;
}
