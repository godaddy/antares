import { ListBox, ListBoxItem, type ListBoxProps } from '@godaddy/antares';

/** Props for the ListBox playground example. */
export interface PlaygroundExampleProps extends Pick<ListBoxProps<object>, 'aria-label' | 'selectionMode'> {}

export function PlaygroundExample({
  'aria-label': ariaLabel = 'Coffee',
  selectionMode = 'single'
}: PlaygroundExampleProps) {
  return (
    <ListBox aria-label={ariaLabel} selectionMode={selectionMode}>
      <ListBoxItem id="espresso">Espresso</ListBoxItem>
      <ListBoxItem id="latte">Latte</ListBoxItem>
      <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
      <ListBoxItem id="americano">Americano</ListBoxItem>
      <ListBoxItem id="mocha">Mocha</ListBoxItem>
    </ListBox>
  );
}
