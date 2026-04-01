import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldBasic(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}
