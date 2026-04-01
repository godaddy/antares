import { TextField } from '@godaddy/antares';

export function TextFieldAdornmentsExample() {
  return (
    <TextField
      description="Use leadingText and trailingText to show fixed text before and after the input (e.g. currency)."
      label="Amount"
      leadingText="$"
      placeholder="0.00"
      trailingText=".00"
    />
  );
}
