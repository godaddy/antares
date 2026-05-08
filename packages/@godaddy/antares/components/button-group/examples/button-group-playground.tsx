import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';

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
    <ButtonGroup
      aria-label="View"
      size={size}
      selectionMode={selectionMode}
      isDisabled={isDisabled}
      disallowEmptySelection={disallowEmptySelection}
      defaultSelectedKeys={['day']}
    >
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week">Week</ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
      <ButtonGroupItem id="year">Year</ButtonGroupItem>
    </ButtonGroup>
  );
}
