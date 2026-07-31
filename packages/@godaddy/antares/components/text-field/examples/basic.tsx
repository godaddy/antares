import { TextField, type TextFieldProps } from '@godaddy/antares';

/**
 * Minimal usage with label and placeholder.
 * @title Basic
 * @order 1
 */
export function TextFieldBasic(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}
