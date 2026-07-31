import { Switch } from '@godaddy/antares';
import { useState } from 'react';

/**
 * Manage switch state programmatically with `isSelected` and `onChange`.
 * @order 7
 */
export function SwitchControlledExample() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Switch isSelected={isSelected} onChange={setIsSelected}>
      Wi-Fi
    </Switch>
  );
}
