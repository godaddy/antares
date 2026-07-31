import { Switch } from '@godaddy/antares';

/**
 * When no label is provided, pass `aria-label` so the switch has an accessible name.
 * @title No Label
 * @order 5
 */
export function SwitchNoLabelExample() {
  return <Switch aria-label="Wi-Fi" />;
}
