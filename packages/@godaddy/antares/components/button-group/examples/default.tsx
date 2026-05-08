import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <ButtonGroup aria-label="View" defaultSelectedKeys={['day']} selectionMode="single">
      <ButtonGroupItem id="day">Day</ButtonGroupItem>
      <ButtonGroupItem id="week">Week</ButtonGroupItem>
      <ButtonGroupItem id="month">Month</ButtonGroupItem>
    </ButtonGroup>
  );
}
