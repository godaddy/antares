import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

/**
 * Disable the entire group with `isDisabled` on the container, or disable individual items with `isDisabled` on specific `ToggleButton` elements.
 * @title Disabled States
 * @order 4
 */
export function DisabledExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <label>Disabled group</label>
      <ToggleButtonGroup aria-label="Disabled group" isDisabled defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <label>Individual disabled item</label>
      <ToggleButtonGroup aria-label="Individual disabled" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week" isDisabled>
          Week
        </ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  );
}
