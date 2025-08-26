/* v8 ignore next */
import React from 'react';
import { ListBox, ListBoxItem } from '@bento/listbox';
import style from './listbox.module.css';

/**
 * Example component demonstrating ListBox with dynamic collections.
 *
 * @param {any} args - The component props including items array.
 * @returns {JSX.Element} The rendered ListBox with dynamic items.
 * @public
 */
export function DynamicCollectionExample({ items, ...args }: any) {
  return (
    <ListBox {...args} className={style.listbox} items={items}>
      {(item: any) => (
        <ListBoxItem key={item.id} textValue={item.name}>
          {item.name}
        </ListBoxItem>
      )}
    </ListBox>
  );
}

export default DynamicCollectionExample;
