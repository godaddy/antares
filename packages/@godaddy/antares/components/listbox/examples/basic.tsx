import { ListBox, ListBoxItem, type ListBoxProps } from '@godaddy/antares';

export function ListBoxBasic(props: Omit<ListBoxProps<object>, 'children' | 'aria-label'> = {}) {
  return (
    <ListBox aria-label="Coffee" selectionMode="single" {...props}>
      <ListBoxItem id="espresso">Espresso</ListBoxItem>
      <ListBoxItem id="latte">Latte</ListBoxItem>
      <ListBoxItem id="cappuccino">Cappuccino</ListBoxItem>
      <ListBoxItem id="americano">Americano</ListBoxItem>
      <ListBoxItem id="mocha">Mocha</ListBoxItem>
    </ListBox>
  );
}
