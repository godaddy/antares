import { ListBox, ListBoxItem } from '@godaddy/antares';

export function ListBoxBasic() {
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
