import { ToggleButtonGroup, ToggleButton, Flex } from '@godaddy/antares';

/**
 * Two sizes are available: `sm` and `md` (default).
 * @order 5
 */
export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ToggleButtonGroup aria-label="Size sm" size="sm" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup aria-label="Size md" size="md" defaultSelectedKeys={['day']} selectionMode="single">
        <ToggleButton id="day">Day</ToggleButton>
        <ToggleButton id="week">Week</ToggleButton>
        <ToggleButton id="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  );
}
