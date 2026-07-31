import { ListBox, ListBoxItem } from '@godaddy/antares';

/**
 * Single selection with static children. Use `aria-label` to give the listbox an accessible name.
 * @order 1
 */
export function DefaultExample() {
  return (
    <ListBox aria-label="Coffee" selectionMode="single">
      <ListBoxItem id="espresso">Espresso</ListBoxItem>
      <ListBoxItem id="latte">Latte</ListBoxItem>
      <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
      <ListBoxItem id="americano">Americano</ListBoxItem>
      <ListBoxItem id="mocha">Mocha</ListBoxItem>
    </ListBox>
  );
}
