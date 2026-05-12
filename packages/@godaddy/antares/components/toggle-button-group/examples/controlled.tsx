import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['week']));

  return (
    <>
      <ToggleButtonGroup
        aria-label="View"
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={(keys) => setSelected(keys as Set<string>)}
      >
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
      <p>Current selection: {Array.from(selected).join(', ')}</p>
    </>
  );
}
