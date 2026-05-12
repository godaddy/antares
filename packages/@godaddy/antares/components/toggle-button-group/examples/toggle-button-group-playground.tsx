import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export interface PlaygroundExampleProps {
  size?: 'sm' | 'md';
  selectionMode?: 'single' | 'multiple';
  isDisabled?: boolean;
  disallowEmptySelection?: boolean;
}

export function PlaygroundExample({
  size = 'md',
  selectionMode = 'single',
  isDisabled = false,
  disallowEmptySelection = false
}: PlaygroundExampleProps) {
  return (
    <ToggleButtonGroup
      aria-label="View"
      size={size}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      disallowEmptySelection={disallowEmptySelection}
      defaultSelectedKeys={['day']}
    >
      <ToggleButton id="day">Day</ToggleButton>
      <ToggleButton id="week">Week</ToggleButton>
      <ToggleButton id="month">Month</ToggleButton>
      <ToggleButton id="year">Year</ToggleButton>
    </ToggleButtonGroup>
  );
}
