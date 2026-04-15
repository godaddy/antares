import{j as e}from"./iframe-6GaXOUaT.js";import{useMDXComponents as r}from"./index-Cf9r2Gk8.js";import{M as d,A as a,S as i}from"./blocks-6xSex4GH.js";import{S as l,P as c}from"./listbox.stories-D9TuYLct.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";import"./listbox-item-CcRi_x0l.js";import"./Collection-D4gn1lMD.js";import"./mergeProps-DIoepj2e.js";import"./clsx-CgyFOmLt.js";import"./DOMFunctions-DY9RYDsQ.js";import"./useFocusRing-CEGxrnOL.js";import"./useFocusWithin-Qx4aKUdm.js";import"./platform-BULRNHlZ.js";import"./keyboard-BlyT3oQC.js";import"./useFocusable-DZQjtpTF.js";import"./useObjectRef-GZJVnHfU.js";import"./FocusScope-VoVYMqej.js";import"./context-45Edcitn.js";import"./useControlledState-B9NBlRKo.js";import"./slots-BRJ0SIrG.js";import"./index-U4fMboO0.js";import"./index-CLj43KZG.js";import"./index-BPiTBM6K.js";import"./index-C1FmEf8O.js";import"./useListState-CKUnIhJP.js";import"./filterDOMProps-BNnC3YgW.js";import"./useLabel-_TylngYe.js";const h=`/* v8 ignore next */
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
`,x=`/* v8 ignore next */
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
`,s=`/* v8 ignore next */
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
`,p=`/* v8 ignore next */
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
`;function o(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:l,name:"Overview"}),`
`,e.jsx(n.h1,{id:"listbox",children:"ListBox"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/listbox"})," package provides a flexible, accessible listbox primitive that supports both controlled and uncontrolled selection modes. Built on React Aria for interaction fidelity and designed for composition within higher-level components like Select, Combobox, and Menu."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-shell",children:`npm install --save @bento/listbox
`})}),`
`,e.jsx(n.h2,{id:"component-structure",children:"Component Structure"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@bento/listbox"})," package exports five main components:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ListBox"}),": The main container component that manages selection state, keyboard navigation, and accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ListBoxItem"}),": Individual selectable items within the listbox"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ListBoxSection"}),": Optional grouping component for organizing options into sections"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Header"}),": Accessible heading for a ",e.jsx(n.code,{children:"ListBoxSection"}),", forwards props and refs for full styling control"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Collection"}),": Utility for rendering nested dynamic data inside a ",e.jsx(n.code,{children:"ListBoxSection"})," (or other collection-aware context)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:["The following properties are available on the ",e.jsx(n.code,{children:"ListBox"})," component:"]}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"static-items",children:"Static Items"}),`
`,e.jsx(i,{language:"tsx",code:h}),`
`,e.jsx(n.h2,{id:"sections",children:"Sections"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"ListBoxSection"})," to group related options. Use ",e.jsx(n.code,{children:"Header"})," inside a ",e.jsx(n.code,{children:"ListBoxSection"})," to render an accessible heading for the group. It automatically links the heading to the section via ",e.jsx(n.code,{children:"aria-labelledby"}),"."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<Header>"})," component accepts standard DOM props and a ",e.jsx(n.code,{children:"slot"})," prop for Bento’s slot system, enabling fine-grained overrides in composite components."]}),`
`,e.jsx(i,{language:"tsx",code:x}),`
`,e.jsx(n.h2,{id:"dynamic-collections",children:"Dynamic Collections"}),`
`,e.jsxs(n.p,{children:["For dynamic data, use the ",e.jsx(n.code,{children:"items"})," prop with a render function. The ListBox component follows different patterns depending on how it's used:"]}),`
`,e.jsxs(n.h3,{id:"when-items-prop-is-provided",children:["When ",e.jsx(n.code,{children:"items"})," prop is provided"]}),`
`,e.jsxs(n.p,{children:["When you provide an ",e.jsx(n.code,{children:"items"})," prop, the ",e.jsx(n.code,{children:"children"})," function receives ",e.jsx(n.strong,{children:"individual items"})," for React Aria compatibility:"]}),`
`,e.jsx(i,{language:"tsx",code:s}),`
`,e.jsxs(n.p,{children:["In this pattern, ",e.jsx(n.code,{children:"children"})," is called for each item in the ",e.jsx(n.code,{children:"items"})," array, receiving the individual item data to render ",e.jsx(n.code,{children:"ListBoxItem"})," components."]}),`
`,e.jsxs(n.h3,{id:"when-no-items-prop-is-provided",children:["When no ",e.jsx(n.code,{children:"items"})," prop is provided"]}),`
`,e.jsxs(n.p,{children:["When you don't provide an ",e.jsx(n.code,{children:"items"})," prop but use ",e.jsx(n.code,{children:"children"})," as a function, it follows ",e.jsx(n.strong,{children:"Bento's render prop pattern"})," and receives an object with render props:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ListBox aria-label="Custom ListBox">
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
`,e.jsx(n.p,{children:"This pattern provides access to the ListBox's state, focus status, and other render props following Bento's consistent render prop API."}),`
`,e.jsx(n.h3,{id:"nested-collections-with-sections",children:"Nested Collections with Sections"}),`
`,e.jsxs(n.p,{children:["You can also render nested data inside a section using the exported ",e.jsx(n.code,{children:"Collection"})," component:"]}),`
`,e.jsx(i,{language:"tsx",code:s}),`
`,e.jsx(n.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(n.p,{children:"The ListBox components provide extensive customization options through data attributes, slots, render props, and standard CSS styling. This section covers all available approaches to customize the appearance and behavior."}),`
`,e.jsx(n.h3,{id:"styling-with-data-attributes",children:"Styling with Data Attributes"}),`
`,e.jsx(n.p,{children:`All ListBox components expose their internal state through data attributes,
enabling CSS-based styling without JavaScript. This follows Bento's design
philosophy of returning styling control to CSS.`}),`
`,e.jsx(n.h4,{id:"listbox-container-attributes",children:"ListBox Container Attributes"}),`
`,e.jsxs(n.p,{children:["The main ",e.jsx(n.code,{children:"ListBox"})," component exposes these data attributes:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-empty"})}),e.jsx(n.td,{children:"Applied when the listbox contains no items"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focused"})}),e.jsx(n.td,{children:"Applied when the listbox is focused"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-visible"})}),e.jsx(n.td,{children:"Applied when the listbox has keyboard focus"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-layout"})}),e.jsx(n.td,{children:"The layout type"}),e.jsx(n.td,{children:'"stack"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-orientation"})}),e.jsx(n.td,{children:"The primary orientation"}),e.jsx(n.td,{children:'"vertical" / "horizontal"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-selection-mode"})}),e.jsx(n.td,{children:"The selection mode"}),e.jsx(n.td,{children:'"none" / "single" / "multiple"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-selection-behavior"})}),e.jsx(n.td,{children:"How selection behaves"}),e.jsx(n.td,{children:'"toggle" / "replace"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-allows-tab-navigation"})}),e.jsx(n.td,{children:"Whether tab navigation is enabled"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-wrap"})}),e.jsx(n.td,{children:"Whether focus wraps around the collection"}),e.jsx(n.td,{children:'"true"'})]})]})]}),`
`,e.jsx(n.h4,{id:"listboxitem-attributes",children:"ListBoxItem Attributes"}),`
`,e.jsxs(n.p,{children:["Individual ",e.jsx(n.code,{children:"ListBoxItem"})," components expose these data attributes:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-selected"})}),e.jsx(n.td,{children:"Applied when the item is selected"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-disabled"})}),e.jsx(n.td,{children:"Applied when the item is disabled"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-hovered"})}),e.jsx(n.td,{children:"Applied when the item is being hovered"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focused"})}),e.jsx(n.td,{children:"Applied when the item is focused"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-focus-visible"})}),e.jsx(n.td,{children:"Applied when the item has keyboard focus"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-pressed"})}),e.jsx(n.td,{children:"Applied when the item is being pressed"}),e.jsx(n.td,{children:'"true"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-level"})}),e.jsx(n.td,{children:"The nesting level (useful for indentation)"}),e.jsx(n.td,{children:'"0" / "1" / "2"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-selection-mode"})}),e.jsx(n.td,{children:"Inherited selection mode"}),e.jsx(n.td,{children:'"none" / "single" / "multiple"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-selection-behavior"})}),e.jsx(n.td,{children:"Inherited selection behavior"}),e.jsx(n.td,{children:'"toggle" / "replace"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-text-value"})}),e.jsx(n.td,{children:"The computed text value for the item"}),e.jsx(n.td,{children:'"Item text"'})]})]})]}),`
`,e.jsx(n.h4,{id:"listboxsection-attributes",children:"ListBoxSection Attributes"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ListBoxSection"})," component exposes:"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Attribute"}),e.jsx(n.th,{children:"Description"}),e.jsx(n.th,{children:"Example Values"})]})}),e.jsx(n.tbody,{children:e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"data-level"})}),e.jsx(n.td,{children:"The nesting level of the section"}),e.jsx(n.td,{children:'"0" / "1" / "2"'})]})})]}),`
`,e.jsx(n.h4,{id:"css-styling-examples",children:"CSS Styling Examples"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Basic item styling */
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
`,e.jsx(n.h3,{id:"slots-system",children:"Slots System"}),`
`,e.jsxs(n.p,{children:["The components use Bento's ",e.jsx(n.code,{children:"@bento/slots"})," package for fine-grained component overrides. Slots allow you to replace or wrap specific parts of the component tree with custom implementations."]}),`
`,e.jsx(n.h4,{id:"basic-slot-usage",children:"Basic Slot Usage"}),`
`,e.jsx(i,{language:"tsx",code:p}),`
`,e.jsx(n.h4,{id:"advanced-slot-patterns",children:"Advanced Slot Patterns"}),`
`,e.jsx(n.p,{children:"You can target specific items or sections using hierarchical slot names:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Override a specific section header
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
`,e.jsx(n.h3,{id:"render-props",children:"Render Props"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"ListBoxItem"})," component supports render prop patterns for dynamic content based on interaction state:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// ListBoxItem render prop with interaction state
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
`,e.jsxs(n.p,{children:["For ListBox-level render props, use the ",e.jsx(n.code,{children:"renderEmptyState"})," prop to customize empty state display:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ListBox
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
`,e.jsx(n.h3,{id:"empty-state-customization",children:"Empty State Customization"}),`
`,e.jsx(n.p,{children:"Customize the appearance when no items are present:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ListBox
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
`,e.jsx(n.h3,{id:"accessibility-customization",children:"Accessibility Customization"}),`
`,e.jsx(n.p,{children:"All components support standard ARIA attributes for enhanced accessibility:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<ListBox
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
`,e.jsx(n.h3,{id:"css-in-js-and-styled-components",children:"CSS-in-JS and Styled Components"}),`
`,e.jsx(n.p,{children:"The data attributes work seamlessly with CSS-in-JS libraries:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Styled Components
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
`,e.jsx(n.h3,{id:"animation-and-transitions",children:"Animation and Transitions"}),`
`,e.jsx(n.p,{children:"Data attributes enable smooth state transitions:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`[role="option"] {
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
`})})]})}function Y(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{Y as default};
