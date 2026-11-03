import { createRef } from 'react';
import { Menu, MenuGroup, MenuItem } from '#components/menu';

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [{ id: 'one', label: 'One' }];
const menuRef = createRef<HTMLDivElement>();
const incompatibleRef = createRef<HTMLButtonElement>();

// Checked by typecheck; this file is not a runtime test or Storybook example.
const typeChecks = [
  <Menu key="inferred-menu" aria-label="Inferred items" items={items} ref={menuRef}>
    {function renderItem(item) {
      // @ts-expect-error - Inference must preserve Item rather than widening to any.
      const invalidLabel: number = item.label;

      return (
        <MenuItem id={item.id} textValue={item.label}>
          {invalidLabel}
        </MenuItem>
      );
    }}
  </Menu>,
  <Menu<Item> key="explicit-menu" aria-label="Explicit items" items={items} ref={menuRef}>
    {function renderItem(item) {
      return <MenuItem id={item.id}>{item.label}</MenuItem>;
    }}
  </Menu>,
  <MenuGroup key="inferred-group" items={items} ref={menuRef}>
    {function renderItem(item) {
      // @ts-expect-error - Inference must preserve Item rather than widening to any.
      const invalidLabel: number = item.label;

      return (
        <MenuItem id={item.id} textValue={item.label}>
          {invalidLabel}
        </MenuItem>
      );
    }}
  </MenuGroup>,
  <MenuGroup<Item> key="explicit-group" items={items} ref={menuRef}>
    {function renderItem(item) {
      return <MenuItem id={item.id}>{item.label}</MenuItem>;
    }}
  </MenuGroup>,
  // @ts-expect-error - Menu forwards its ref to an HTMLDivElement.
  <Menu key="invalid-menu-ref" ref={incompatibleRef} />,
  // @ts-expect-error - MenuGroup forwards its ref to an HTMLDivElement.
  <MenuGroup key="invalid-group-ref" ref={incompatibleRef} />
];

void typeChecks;
