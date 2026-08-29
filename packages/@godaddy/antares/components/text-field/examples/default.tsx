import { TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Minimal usage with label and placeholder.
 * @order 1
 */
export function DefaultExample(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}
