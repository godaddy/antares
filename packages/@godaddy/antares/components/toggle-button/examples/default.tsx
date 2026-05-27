import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
