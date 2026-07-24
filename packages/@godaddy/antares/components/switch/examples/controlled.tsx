import { Switch } from '@godaddy/antares';
import { useState } from 'react';

export function SwitchControlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Switch isSelected={isSelected} onChange={setIsSelected}>
      Wi-Fi
    </Switch>
  );
}
