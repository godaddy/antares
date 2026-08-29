import { TextField } from '@godaddy/antares';

/**
 * Use `leadingText` and `trailingText` for fixed text before and after the input, such as currency.
 * @order 5
 */
export function AdornmentsExample() {
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
