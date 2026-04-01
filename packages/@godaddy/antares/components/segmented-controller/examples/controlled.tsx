import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState('week');

  return (
    <>
      <SegmentedController aria-label="View" value={selected} onSelectionChange={setSelected}>
        <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
      </SegmentedController>
      <p>Current selection: {selected}</p>
    </>
  );
}
