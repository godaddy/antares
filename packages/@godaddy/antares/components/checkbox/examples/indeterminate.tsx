import { Checkbox } from '@godaddy/antares';

/**
 * Checkboxes can display an indeterminate state (neither checked nor unchecked), with the use of the `isIndeterminate` prop, commonly used for "select all" functionality when some but not all child items are selected.
 * @title Indeterminate
 * @order 2
 */
export function CheckboxIndeterminateExample() {
  return <Checkbox isIndeterminate>Option 1</Checkbox>;
}
