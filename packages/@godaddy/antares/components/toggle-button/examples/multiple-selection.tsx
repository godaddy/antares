import { ToggleButtonGroup, ToggleButton } from '@godaddy/antares';

/**
 * Use `selectionMode="multiple"` to allow more than one item to be active at a time.
 * @order 2
 */
export function MultipleSelectionExample() {
  return (
    <ToggleButtonGroup aria-label="Text formatting" selectionMode="multiple" defaultSelectedKeys={['bold']}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">Italic</ToggleButton>
      <ToggleButton id="underline">Underline</ToggleButton>
    </ToggleButtonGroup>
  );
}
