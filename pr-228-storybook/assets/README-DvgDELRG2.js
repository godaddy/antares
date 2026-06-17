import{i as e}from"./preload-helper-Bhqo2ki1.js";import{y as t}from"./iframe-BTeWf0uz.js";import{S as n,c as r,n as i,s as a,u as o}from"./blocks-BjCSi_3o.js";import{t as s}from"./mdx-react-shim-BV120-oW.js";import{Props as c,n as l,t as u}from"./listbox.stories-DfoqpXm5.js";var d,f=e((()=>{d=`/* v8 ignore next */
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
`})),p,m=e((()=>{p=`/* v8 ignore next */
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
`})),h,g=e((()=>{h=`/* v8 ignore next */
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
`})),_,v=e((()=>{_=`/* v8 ignore next */
import React from 'react';
import { ListBox, ListBoxItem, ListBoxSection, Header, Collection } from '@bento/listbox';
import { useProps } from '@bento/use-props';
import style from './listbox.module.css';

//
// Slot namespace layout:
//
// \`\`\`
// bento-list                 (ListBox)
// ├── main-dishes            (ListBoxSection)
// │   ├── header             (Header)
// │   ├── chicken-teriyaki   (ListBoxItem)
// │   └── salmon-bento       (ListBoxItem)
// └── side-dishes            (ListBoxSection)
//     ├── header             (Header)
//     ├── pickled-vegetables (ListBoxItem)
//     └── edamame            (ListBoxItem)
// \`\`\`
//
// This example demonstrates several slot override patterns:
// 1. \`side-dishes.header\` – Custom header component with enhanced styling
// 2. \`side-dishes.pickled-vegetables\` – Override specific item in specific section
// 3. \`main-dishes\` – Override entire section styling
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
`}));function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{of:l,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`listbox`,children:`ListBox`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/listbox`}),` package provides a flexible, accessible listbox primitive that supports both controlled and uncontrolled selection modes. Built on React Aria for interaction fidelity and designed for composition within higher-level components like Select, Combobox, and Menu.`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-shell`,children:`npm install --save @bento/listbox
`})}),`
`,(0,x.jsx)(t.h2,{id:`component-structure`,children:`Component Structure`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`@bento/listbox`}),` package exports five main components:`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`ListBox`}),`: The main container component that manages selection state, keyboard navigation, and accessibility`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`ListBoxItem`}),`: Individual selectable items within the listbox`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`ListBoxSection`}),`: Optional grouping component for organizing options into sections`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Header`}),`: Accessible heading for a `,(0,x.jsx)(t.code,{children:`ListBoxSection`}),`, forwards props and refs for full styling control`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.strong,{children:`Collection`}),`: Utility for rendering nested dynamic data inside a `,(0,x.jsx)(t.code,{children:`ListBoxSection`}),` (or other collection-aware context).`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The following properties are available on the `,(0,x.jsx)(t.code,{children:`ListBox`}),` component:`]}),`
`,(0,x.jsx)(i,{of:c}),`
`,(0,x.jsx)(t.h2,{id:`static-items`,children:`Static Items`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:d}),`
`,(0,x.jsx)(t.h2,{id:`sections`,children:`Sections`}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`ListBoxSection`}),` to group related options. Use `,(0,x.jsx)(t.code,{children:`Header`}),` inside a `,(0,x.jsx)(t.code,{children:`ListBoxSection`}),` to render an accessible heading for the group. It automatically links the heading to the section via `,(0,x.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`<Header>`}),` component accepts standard DOM props and a `,(0,x.jsx)(t.code,{children:`slot`}),` prop for Bento’s slot system, enabling fine-grained overrides in composite components.`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:p}),`
`,(0,x.jsx)(t.h2,{id:`dynamic-collections`,children:`Dynamic Collections`}),`
`,(0,x.jsxs)(t.p,{children:[`For dynamic data, use the `,(0,x.jsx)(t.code,{children:`items`}),` prop with a render function. The ListBox component follows different patterns depending on how it's used:`]}),`
`,(0,x.jsxs)(t.h3,{id:`when-items-prop-is-provided`,children:[`When `,(0,x.jsx)(t.code,{children:`items`}),` prop is provided`]}),`
`,(0,x.jsxs)(t.p,{children:[`When you provide an `,(0,x.jsx)(t.code,{children:`items`}),` prop, the `,(0,x.jsx)(t.code,{children:`children`}),` function receives `,(0,x.jsx)(t.strong,{children:`individual items`}),` for React Aria compatibility:`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h}),`
`,(0,x.jsxs)(t.p,{children:[`In this pattern, `,(0,x.jsx)(t.code,{children:`children`}),` is called for each item in the `,(0,x.jsx)(t.code,{children:`items`}),` array, receiving the individual item data to render `,(0,x.jsx)(t.code,{children:`ListBoxItem`}),` components.`]}),`
`,(0,x.jsxs)(t.h3,{id:`when-no-items-prop-is-provided`,children:[`When no `,(0,x.jsx)(t.code,{children:`items`}),` prop is provided`]}),`
`,(0,x.jsxs)(t.p,{children:[`When you don't provide an `,(0,x.jsx)(t.code,{children:`items`}),` prop but use `,(0,x.jsx)(t.code,{children:`children`}),` as a function, it follows `,(0,x.jsx)(t.strong,{children:`Bento's render prop pattern`}),` and receives an object with render props:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<ListBox aria-label="Custom ListBox">
  {({ isEmpty, isFocused, state, items }) => (
    isEmpty ? (
      <div>No items available</div>
    ) : (
      // Render items normally using static children or other logic
      <ListBoxItem>Static Item</ListBoxItem>
    )
  )}
</ListBox>
`})}),`
`,(0,x.jsx)(t.p,{children:`This pattern provides access to the ListBox's state, focus status, and other render props following Bento's consistent render prop API.`}),`
`,(0,x.jsx)(t.h3,{id:`nested-collections-with-sections`,children:`Nested Collections with Sections`}),`
`,(0,x.jsxs)(t.p,{children:[`You can also render nested data inside a section using the exported `,(0,x.jsx)(t.code,{children:`Collection`}),` component:`]}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsx)(t.p,{children:`The ListBox components provide extensive customization options through data attributes, slots, render props, and standard CSS styling. This section covers all available approaches to customize the appearance and behavior.`}),`
`,(0,x.jsx)(t.h3,{id:`styling-with-data-attributes`,children:`Styling with Data Attributes`}),`
`,(0,x.jsx)(t.p,{children:`All ListBox components expose their internal state through data attributes,
enabling CSS-based styling without JavaScript. This follows Bento's design
philosophy of returning styling control to CSS.`}),`
`,(0,x.jsx)(t.h4,{id:`listbox-container-attributes`,children:`ListBox Container Attributes`}),`
`,(0,x.jsxs)(t.p,{children:[`The main `,(0,x.jsx)(t.code,{children:`ListBox`}),` component exposes these data attributes:`]}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.th,{children:`Attribute`}),(0,x.jsx)(t.th,{children:`Description`}),(0,x.jsx)(t.th,{children:`Example Values`})]})}),(0,x.jsxs)(t.tbody,{children:[(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-empty`})}),(0,x.jsx)(t.td,{children:`Applied when the listbox contains no items`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-focused`})}),(0,x.jsx)(t.td,{children:`Applied when the listbox is focused`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-focus-visible`})}),(0,x.jsx)(t.td,{children:`Applied when the listbox has keyboard focus`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-layout`})}),(0,x.jsx)(t.td,{children:`The layout type`}),(0,x.jsx)(t.td,{children:`"stack"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-orientation`})}),(0,x.jsx)(t.td,{children:`The primary orientation`}),(0,x.jsx)(t.td,{children:`"vertical" / "horizontal"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-selection-mode`})}),(0,x.jsx)(t.td,{children:`The selection mode`}),(0,x.jsx)(t.td,{children:`"none" / "single" / "multiple"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-selection-behavior`})}),(0,x.jsx)(t.td,{children:`How selection behaves`}),(0,x.jsx)(t.td,{children:`"toggle" / "replace"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-allows-tab-navigation`})}),(0,x.jsx)(t.td,{children:`Whether tab navigation is enabled`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-focus-wrap`})}),(0,x.jsx)(t.td,{children:`Whether focus wraps around the collection`}),(0,x.jsx)(t.td,{children:`"true"`})]})]})]}),`
`,(0,x.jsx)(t.h4,{id:`listboxitem-attributes`,children:`ListBoxItem Attributes`}),`
`,(0,x.jsxs)(t.p,{children:[`Individual `,(0,x.jsx)(t.code,{children:`ListBoxItem`}),` components expose these data attributes:`]}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.th,{children:`Attribute`}),(0,x.jsx)(t.th,{children:`Description`}),(0,x.jsx)(t.th,{children:`Example Values`})]})}),(0,x.jsxs)(t.tbody,{children:[(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-selected`})}),(0,x.jsx)(t.td,{children:`Applied when the item is selected`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-disabled`})}),(0,x.jsx)(t.td,{children:`Applied when the item is disabled`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-hovered`})}),(0,x.jsx)(t.td,{children:`Applied when the item is being hovered`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-focused`})}),(0,x.jsx)(t.td,{children:`Applied when the item is focused`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-focus-visible`})}),(0,x.jsx)(t.td,{children:`Applied when the item has keyboard focus`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-pressed`})}),(0,x.jsx)(t.td,{children:`Applied when the item is being pressed`}),(0,x.jsx)(t.td,{children:`"true"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-level`})}),(0,x.jsx)(t.td,{children:`The nesting level (useful for indentation)`}),(0,x.jsx)(t.td,{children:`"0" / "1" / "2"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-selection-mode`})}),(0,x.jsx)(t.td,{children:`Inherited selection mode`}),(0,x.jsx)(t.td,{children:`"none" / "single" / "multiple"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-selection-behavior`})}),(0,x.jsx)(t.td,{children:`Inherited selection behavior`}),(0,x.jsx)(t.td,{children:`"toggle" / "replace"`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-text-value`})}),(0,x.jsx)(t.td,{children:`The computed text value for the item`}),(0,x.jsx)(t.td,{children:`"Item text"`})]})]})]}),`
`,(0,x.jsx)(t.h4,{id:`listboxsection-attributes`,children:`ListBoxSection Attributes`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`ListBoxSection`}),` component exposes:`]}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.th,{children:`Attribute`}),(0,x.jsx)(t.th,{children:`Description`}),(0,x.jsx)(t.th,{children:`Example Values`})]})}),(0,x.jsx)(t.tbody,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.td,{children:(0,x.jsx)(t.code,{children:`data-level`})}),(0,x.jsx)(t.td,{children:`The nesting level of the section`}),(0,x.jsx)(t.td,{children:`"0" / "1" / "2"`})]})})]}),`
`,(0,x.jsx)(t.h4,{id:`css-styling-examples`,children:`CSS Styling Examples`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-css`,children:`/* Basic item styling */
[role="option"] {
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

/* Selected items */
[role="option"][data-selected] {
  background: Highlight;
  color: HighlightText;
}

/* Hovered items */
[role="option"][data-hovered] {
  background: color-mix(in srgb, Highlight 10%, transparent);
}

/* Disabled items */
[role="option"][data-disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Focused items (keyboard navigation) */
[role="option"][data-focus-visible] {
  outline: 2px solid Highlight;
  outline-offset: -2px;
}

/* Combined states */
[role="option"][data-selected][data-hovered] {
  background: color-mix(in srgb, Highlight 90%, white);
}

/* Empty state styling */
.listbox[data-empty] {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

/* Section headers */
.section-header {
  font-weight: 600;
  font-size: 0.875rem;
  color: #64748b;
  padding: 6px 12px;
  margin-bottom: 4px;
}
`})}),`
`,(0,x.jsx)(t.h3,{id:`slots-system`,children:`Slots System`}),`
`,(0,x.jsxs)(t.p,{children:[`The components use Bento's `,(0,x.jsx)(t.code,{children:`@bento/slots`}),` package for fine-grained component overrides. Slots allow you to replace or wrap specific parts of the component tree with custom implementations.`]}),`
`,(0,x.jsx)(t.h4,{id:`basic-slot-usage`,children:`Basic Slot Usage`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_}),`
`,(0,x.jsx)(t.h4,{id:`advanced-slot-patterns`,children:`Advanced Slot Patterns`}),`
`,(0,x.jsx)(t.p,{children:`You can target specific items or sections using hierarchical slot names:`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`// Override a specific section header
const slots = {
  'my-listbox.fruits.header': ({ original, props }) => (
    <Header {...props}>🍎 {original}</Header>
  ),

  // Override a specific item in a specific section
  'my-listbox.fruits.apple': ({ original }) => (
    <div className="special-item">⭐ {original}</div>
  ),

  // Override an entire section
  'my-listbox.vegetables': ({ original }) => (
    <div className="veggie-section">{original}</div>
  )
};

<ListBox slot="my-listbox" slots={slots}>
  <ListBoxSection slot="fruits">
    <Header slot="header">Fruits</Header>
    <ListBoxItem slot="apple">Apple</ListBoxItem>
    <ListBoxItem slot="orange">Orange</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection slot="vegetables">
    <Header slot="header">Vegetables</Header>
    <ListBoxItem slot="carrot">Carrot</ListBoxItem>
  </ListBoxSection>
</ListBox>
`})}),`
`,(0,x.jsx)(t.h3,{id:`render-props`,children:`Render Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`ListBoxItem`}),` component supports render prop patterns for dynamic content based on interaction state:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`// ListBoxItem render prop with interaction state
<ListBoxItem>
  {({ isSelected, isHovered, isDisabled }) => (
    <div className={\`item \${isSelected ? 'selected' : ''}\`}>
      {isHovered && '👆 '}
      My Item
      {isSelected && ' ✓'}
    </div>
  )}
</ListBoxItem>
`})}),`
`,(0,x.jsxs)(t.p,{children:[`For ListBox-level render props, use the `,(0,x.jsx)(t.code,{children:`renderEmptyState`}),` prop to customize empty state display:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<ListBox
  items={items}
  renderEmptyState={({ isEmpty, isFocused, state, items }) => (
    <div className="empty-state">
      {isFocused ? 'No items found (focused)' : 'No items available'}
    </div>
  )}
>
  {(item: any) => (
    <ListBoxItem key={item.id} textValue={item.name}>
      {item.name}
    </ListBoxItem>
  )}
</ListBox>
`})}),`
`,(0,x.jsx)(t.h3,{id:`empty-state-customization`,children:`Empty State Customization`}),`
`,(0,x.jsx)(t.p,{children:`Customize the appearance when no items are present:`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<ListBox
  renderEmptyState={({ isEmpty, isFocused }) => (
    <div className="empty-state">
      <span>📭</span>
      <p>No items to display</p>
      {isFocused && <p>Start typing to search...</p>}
    </div>
  )}
>
  {/* Items when present */}
</ListBox>
`})}),`
`,(0,x.jsx)(t.h3,{id:`accessibility-customization`,children:`Accessibility Customization`}),`
`,(0,x.jsx)(t.p,{children:`All components support standard ARIA attributes for enhanced accessibility:`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<ListBox
  aria-label="Food menu"
  aria-describedby="menu-description"
>
  <ListBoxSection aria-label="Main courses">
    <Header>Main Dishes</Header>
    <ListBoxItem aria-label="Chicken teriyaki with rice">
      Chicken Teriyaki
    </ListBoxItem>
  </ListBoxSection>
</ListBox>
`})}),`
`,(0,x.jsx)(t.h3,{id:`css-in-js-and-styled-components`,children:`CSS-in-JS and Styled Components`}),`
`,(0,x.jsx)(t.p,{children:`The data attributes work seamlessly with CSS-in-JS libraries:`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`// Styled Components
const StyledListBox = styled.div\`
  &[data-focused] {
    box-shadow: 0 0 0 2px blue;
  }

  [role="option"][data-selected] {
    background: \${props => props.theme.primary};
  }
\`;

// Emotion
const listboxStyles = css\`
  &[data-empty] {
    opacity: 0.5;
  }
\`;
`})}),`
`,(0,x.jsx)(t.h3,{id:`animation-and-transitions`,children:`Animation and Transitions`}),`
`,(0,x.jsx)(t.p,{children:`Data attributes enable smooth state transitions:`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-css`,children:`[role="option"] {
  transition: all 0.2s ease-in-out;
  transform: translateY(0);
}

[role="option"][data-hovered] {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

[role="option"][data-pressed] {
  transform: translateY(0);
  transition-duration: 0.1s;
}
`})})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),s(),o(),u(),f(),m(),g(),v()}))();export{b as default};