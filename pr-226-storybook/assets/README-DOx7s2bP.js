import{i as e}from"./preload-helper-BHzX1IX3.js";import{y as t}from"./iframe-ESKKn5PL.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-CYTnMiMC.js";import{t as c}from"./mdx-react-shim-VpIEcyhl.js";import{Controlled as l,DynamicItems as u,Multiple as d,Props as f,Static as p,n as m,t as h}from"./select.stories-CllJt1pg.js";var g,_=e((()=>{g=`import { Select, SelectItem } from '@godaddy/antares';

export function SelectStaticExample() {
  return (
    <Select aria-label="Coffee drinks">
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
`})),v,y=e((()=>{v=`import { useState } from 'react';
import { Box, Flex, Select, SelectItem } from '@godaddy/antares';

export function SelectControlledExample() {
  const [selectedKey, setSelectedKey] = useState<string>('latte');

  return (
    <Flex direction="column" gap="md">
      <Select
        aria-label="Coffee drinks"
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(key as string)}
      >
        <SelectItem id="espresso">Espresso</SelectItem>
        <SelectItem id="latte">Latte</SelectItem>
        <SelectItem id="cappuccino">Cappuccino</SelectItem>
        <SelectItem id="americano">Americano</SelectItem>
        <SelectItem id="mocha">Mocha</SelectItem>
      </Select>

      <Box padding="md" elevation="card" rounding="lg">
        <strong>Selected:</strong> {selectedKey}
      </Box>
    </Flex>
  );
}
`})),b,x=e((()=>{b=`import { Select, SelectItem } from '@godaddy/antares';

const items = [
  { id: '1', name: 'Espresso', category: 'Classic' },
  { id: '2', name: 'Latte', category: 'Classic' },
  { id: '3', name: 'Cappuccino', category: 'Classic' },
  { id: '4', name: 'Americano', category: 'Classic' },
  { id: '5', name: 'Mocha', category: 'Specialty' },
  { id: '6', name: 'Macchiato', category: 'Specialty' },
  { id: '7', name: 'Cold Brew', category: 'Cold' }
];

export function SelectDynamicExample() {
  return (
    <Select aria-label="Coffee drinks" items={items}>
      {function renderItem(item) {
        return (
          <SelectItem id={item.id} textValue={item.name}>
            {item.name} ({item.category})
          </SelectItem>
        );
      }}
    </Select>
  );
}
`})),S,C=e((()=>{S=`import { Select, SelectItem } from '@godaddy/antares';

export function SelectMultipleExample() {
  return (
    <Select aria-label="Coffee drinks" selectionMode="multiple">
      <SelectItem id="espresso">Espresso</SelectItem>
      <SelectItem id="latte">Latte</SelectItem>
      <SelectItem id="cappuccino">Cappuccino</SelectItem>
      <SelectItem id="americano">Americano</SelectItem>
      <SelectItem id="mocha">Mocha</SelectItem>
    </Select>
  );
}
`}));function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:m,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`select`,children:`Select`}),`
`,(0,E.jsx)(t.p,{children:`Accessible dropdown component supporting single and multiple selection with keyboard navigation and validation`}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(a,{of:f}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`static`,children:`Static`}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:g}),`
`,(0,E.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,E.jsx)(i,{of:l,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:v}),`
`,(0,E.jsx)(t.h3,{id:`dynamic-items`,children:`Dynamic Items`}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:b}),`
`,(0,E.jsx)(t.h3,{id:`multiple-selection`,children:`Multiple Selection`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:S}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,E.jsx)(t.p,{children:`React Aria Components automatically adds data attributes for styling different states:`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Select Container:`}),` `,(0,E.jsx)(t.code,{children:`data-invalid`}),`, `,(0,E.jsx)(t.code,{children:`data-disabled`}),`, `,(0,E.jsx)(t.code,{children:`data-required`}),`, `,(0,E.jsx)(t.code,{children:`data-focused`})]}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Trigger Button:`}),` `,(0,E.jsx)(t.code,{children:`data-pressed`}),`, `,(0,E.jsx)(t.code,{children:`data-disabled`}),`, `,(0,E.jsx)(t.code,{children:`data-focused`}),`, `,(0,E.jsx)(t.code,{children:`aria-expanded`})]}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Select Value:`}),` `,(0,E.jsx)(t.code,{children:`data-placeholder`})]}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Popover:`}),` `,(0,E.jsx)(t.code,{children:`data-entering`}),`, `,(0,E.jsx)(t.code,{children:`data-exiting`})]}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`List Items:`}),` `,(0,E.jsx)(t.code,{children:`data-hovered`}),`, `,(0,E.jsx)(t.code,{children:`data-focused`}),`, `,(0,E.jsx)(t.code,{children:`data-pressed`}),`, `,(0,E.jsx)(t.code,{children:`data-selected`}),`, `,(0,E.jsx)(t.code,{children:`data-disabled`}),`, `,(0,E.jsx)(t.code,{children:`data-selection-mode`})]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-css`,children:`[data-selected] {
  background-color: #eff6ff;
  font-weight: 600;
}

[data-invalid] .button {
  border-color: #dc2626;
}

[aria-expanded="true"] {
  border-color: #3b82f6;
}
`})}),`
`,(0,E.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,E.jsxs)(t.p,{children:[`Individual child components can be styled by passing `,(0,E.jsx)(t.code,{children:`className`}),` props:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-jsx`,children:`<Select label="Coffee">
  <SelectItem id="espresso" className="premium-option">
    Espresso
  </SelectItem>
  <SelectSection className="featured-section">
    <SelectHeader>Featured</SelectHeader>
    <SelectItem id="special">Special Blend</SelectItem>
  </SelectSection>
</Select>
`})}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Space/Enter`}),`: Opens the popover and focuses the selected item`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Arrow Down/Up`}),`: Navigate through options`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Home/End`}),`: Jump to first/last option`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Escape`}),`: Closes the popover`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Tab`}),`: Moves focus to the next focusable element`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Type to select`}),`: Type characters to jump to matching options`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Space`}),` (in multi-select): Toggle selection of focused item`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,E.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
<Select value={value} defaultValue="espresso">
  <SelectItem id="espresso">Espresso</SelectItem>
</Select>

// ✅ Controlled mode
<Select value={value} onChange={setValue}>
  <SelectItem id="espresso">Espresso</SelectItem>
</Select>

// ✅ Uncontrolled mode
<Select defaultValue="espresso">
  <SelectItem id="espresso">Espresso</SelectItem>
</Select>
`})}),`
`,(0,E.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.item {
  background-color: red;
}

/* ✅ Use data attributes for higher specificity */
.my-select [data-selected] {
  background-color: red;
}
`})}),`
`,(0,E.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
.button:focus {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
`})})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),_(),y(),x(),C(),h()}))();export{T as default};