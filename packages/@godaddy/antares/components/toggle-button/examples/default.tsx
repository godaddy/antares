import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

/**
 * A `ToggleButton` toggles between selected and unselected. Wrap multiple inside a `ToggleButtonGroup` to link them with shared selection and keyboard navigation.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ToggleButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
}
