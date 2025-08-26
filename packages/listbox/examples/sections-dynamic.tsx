/* v8 ignore next */
import React from 'react';
import { ListBox, ListBoxItem, ListBoxSection, Header, Collection } from '@bento/listbox';
import style from './listbox.module.css';

/**
 * Example component demonstrating ListBox with dynamic sections.
 *
 * @param {any} args - The component props including categories array.
 * @returns {JSX.Element} The rendered ListBox with dynamic sections.
 * @public
 */
export function SectionsDynamicExample({ categories, ...args }: any) {
  return (
    <ListBox {...args} className={style.listbox} items={categories}>
      {(category: any) => (
        <ListBoxSection key={category.id}>
          <Header>{category.name}</Header>
          <Collection items={category.items}>
            {(item: { id: string; name: string }) => (
              <ListBoxItem key={item.id} textValue={item.name}>
                {item.name}
              </ListBoxItem>
            )}
          </Collection>
        </ListBoxSection>
      )}
    </ListBox>
  );
}

export default SectionsDynamicExample;
