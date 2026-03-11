/* v8 ignore next */
import React from 'react';
import { ListBox, ListBoxItem, ListBoxSection, Header, Collection } from '@bento/listbox';
import { useProps } from '@bento/use-props';
import style from './listbox.module.css';

//
// Slot namespace layout:
//
// ```
// bento-list                 (ListBox)
// ├── main-dishes            (ListBoxSection)
// │   ├── header             (Header)
// │   ├── chicken-teriyaki   (ListBoxItem)
// │   └── salmon-bento       (ListBoxItem)
// └── side-dishes            (ListBoxSection)
//     ├── header             (Header)
//     ├── pickled-vegetables (ListBoxItem)
//     └── edamame            (ListBoxItem)
// ```
//
// This example demonstrates several slot override patterns:
// 1. `side-dishes.header` – Custom header component with enhanced styling
// 2. `side-dishes.pickled-vegetables` – Override specific item in specific section
// 3. `main-dishes` – Override entire section styling
//

/**
 * Example component demonstrating ListBox with dynamic sections and slot overrides.
 *
 * @param {any} args - The component props including categories and slots.
 * @returns {JSX.Element} The rendered ListBox with slotted dynamic sections.
 * @public
 */
export function SlotsDynamicSectionsExample({ categories, ...args }: any) {
  const {
    items: argItems,
    slots: argSlots = {},
    ...rest
  } = args as {
    items?: Iterable<unknown>;
    slots?: Record<string, any>;
  } & Record<string, unknown>;

  const { apply } = useProps(rest);

  //
  // Default slot overrides for demo - these show different override patterns
  //
  const demoSlots: Record<string, any> = {
    //
    // Override a header in a specific section with custom styling
    //
    'side-dishes.header': ({ props, original }: { props: Record<string, any>; original: React.ReactNode }) => (
      <Header {...props}>🥢 {original}</Header>
    ),

    //
    // Override another specific item with custom content
    //
    'side-dishes.pickled-vegetables': ({ original }: { original: React.ReactNode }) => (
      <div style={{ backgroundColor: '#4ade80', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>
        🥒 {original} (Traditional)
      </div>
    ),

    //
    // Override an entire section with custom wrapper
    //
    'main-dishes': ({ original }: { original: React.ReactNode }) => (
      <div style={{ border: '2px dashed #f59e0b', padding: '8px', borderRadius: '6px' }}>{original}</div>
    )
  };

  //
  // Merge provided slots with demo slots (provided slots take precedence)
  //
  const mergedSlots = { ...demoSlots, ...argSlots };

  return (
    <ListBox
      {...apply({ className: style.listbox })}
      // Only set items if caller didn't already supply one
      items={argItems ?? categories}
      slot="bento-list"
      slots={mergedSlots}
    >
      {(category: any) => (
        <ListBoxSection key={category.id} slot={category.id}>
          <Header slot="header">{category.name}</Header>
          <Collection items={category.items}>
            {(item: { id: string; name: string }) => (
              <ListBoxItem key={item.id} textValue={item.name} slot={item.id}>
                {item.name}
              </ListBoxItem>
            )}
          </Collection>
        </ListBoxSection>
      )}
    </ListBox>
  );
}
