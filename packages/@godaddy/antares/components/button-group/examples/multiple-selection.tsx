import { ButtonGroup, ButtonGroupItem } from '@godaddy/antares';

export function MultipleSelectionExample() {
  return (
    <ButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ButtonGroupItem id="bold">Bold</ButtonGroupItem>
      <ButtonGroupItem id="italic">Italic</ButtonGroupItem>
      <ButtonGroupItem id="underline">Underline</ButtonGroupItem>
    </ButtonGroup>
  );
}
