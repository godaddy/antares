/* v8 ignore next */
import { ListBox, ListBoxItem } from '@bento/listbox';
import style from './listbox.module.css';

/**
 * Example component demonstrating basic ListBox usage.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered ListBox with static items.
 * @public
 */
export function BasicListBoxExample(args: any) {
  return (
    <ListBox {...args} className={style.listbox}>
      <ListBoxItem>Chicken Teriyaki</ListBoxItem>
      <ListBoxItem>Salmon Bento</ListBoxItem>
      <ListBoxItem>Beef Bowl</ListBoxItem>
    </ListBox>
  );
}
