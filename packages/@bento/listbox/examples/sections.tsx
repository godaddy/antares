/* v8 ignore next */
import React from 'react';
import { ListBox, ListBoxItem, ListBoxSection, Header } from '@bento/listbox';
import style from './listbox.module.css';

/**
 * Example component demonstrating ListBox with static sections.
 *
 * @param {any} args - The component props.
 * @returns {JSX.Element} The rendered ListBox with sectioned items.
 * @public
 */
export function SectionsExample(args: any) {
  return (
    <ListBox {...args} className={style.listbox}>
      <ListBoxSection>
        <Header>Main Dishes</Header>
        <ListBoxItem>Chicken Teriyaki</ListBoxItem>
        <ListBoxItem>Salmon Bento</ListBoxItem>
      </ListBoxSection>
      <ListBoxSection>
        <Header>Side Dishes</Header>
        <ListBoxItem>Pickled Vegetables</ListBoxItem>
        <ListBoxItem>Edamame</ListBoxItem>
      </ListBoxSection>
    </ListBox>
  );
}
