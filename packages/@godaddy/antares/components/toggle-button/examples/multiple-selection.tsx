import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <ToggleButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">Italic</ToggleButton>
      <ToggleButton id="underline">Underline</ToggleButton>
    </ToggleButtonGroup>
  );
}
