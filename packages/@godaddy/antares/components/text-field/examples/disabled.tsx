import { TextField } from '@godaddy/antares';

/**
 * Use `isDisabled` to prevent input.
 * @order 4
 */
export function TextFieldDisabledExample() {
  return <TextField label="Name" placeholder="Enter your name" defaultValue="Disabled value" isDisabled />;
}
