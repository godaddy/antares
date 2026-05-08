import { ButtonGroup, ButtonGroupItem, Flex } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="md" alignItems="start">
      <ButtonGroup aria-label="Size sm" size="sm" defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>

      <ButtonGroup aria-label="Size md" size="md" defaultSelectedKeys={['day']} selectionMode="single">
        <ButtonGroupItem id="day">Day</ButtonGroupItem>
        <ButtonGroupItem id="week">Week</ButtonGroupItem>
        <ButtonGroupItem id="month">Month</ButtonGroupItem>
      </ButtonGroup>
    </Flex>
  );
}
