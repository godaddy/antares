import{j as e}from"./iframe-Cobng3kW.js";import{u as s,M as r,A as l,a as i,S as o}from"./blocks-BEuLoQbf.js";import{S as a,P as d,a as m,C as p,D as h,M as x}from"./select.stories-Bbw1G-vt.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Do2wpqFt.js";import"./index-DCuVUat6.js";import"./index-CkzLLGzI.js";import"./Button-Cp5ygW0x.js";import"./Text-DjYeNfA9.js";import"./mergeProps-CqlBgEfY.js";import"./SSRProvider-CRxxJPAA.js";import"./clsx-B-dksMZM.js";import"./useObjectRef-DVUZfbLs.js";import"./Hidden-CxBKJg34.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DawZrH6r.js";import"./usePress-JDIfTqZI.js";import"./utils-DYHHIbWW.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-tB_4nUuW.js";import"./useHover-DgdCgDpP.js";import"./platform-D4ZP5NBb.js";import"./useFocusRing-BQbh0Wsj.js";import"./useFocusWithin-O7Ny1nb5.js";import"./FieldError-BD72VdPV.js";import"./SelectionManager-BIiiMolw.js";import"./keyboard-CzKtmrYs.js";import"./useEvent-CSjTnt7F.js";import"./FocusScope-B3aVYN8b.js";import"./context-BMNNJbem.js";import"./useControlledState--tfYuSYK.js";import"./Dialog-CLi8ayhn.js";import"./RSPContexts-24IILzY-.js";import"./OverlayArrow-D6zAXh7o.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-hidboFq7.js";import"./SelectionIndicator-Dv4BzcJK.js";import"./Overlay-L_2jMLU_.js";import"./PortalProvider-CbR0hdFW.js";import"./useLocalizedStringFormatter-Bzg8pIFp.js";import"./usePreventScroll-BFmiyPPa.js";import"./useLabels-Co8cMafA.js";import"./VisuallyHidden-C1pG2V7E.js";import"./useListState-ChU4fFuI.js";import"./useLabel-BJLzWaPE.js";import"./Form-BK9F45Ln.js";import"./useField-DEDE-Xxn.js";import"./index-BTxBXy7B.js";import"./index-DbwBwFQU.js";import"./index-BtlUOAdW.js";import"./index-BL_1z9-T.js";import"./index-DUcIuAlo.js";import"./index-Cblgnhv_.js";import"./index-D0MDYfGE.js";import"./slots-BlFL7XUI.js";import"./index-CxaQNeJr.js";import"./index-CLj43KZG.js";import"./index-awrPXsZT.js";import"./index-CfVKM-5I.js";import"./create-external-store-TtP3UJpK.js";import"./index-BMSPfXKm.js";import"./client-BYApItke.js";import"./index-BybZAvEO.js";const u=`import { Select, SelectItem } from '@godaddy/antares';

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
`,S=`import { useState } from 'react';
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
`,g=`import { Select, SelectItem } from '@godaddy/antares';

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
`,j=`import { Select, SelectItem } from '@godaddy/antares';

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
`;function c(n){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"select",children:"Select"}),`
`,e.jsx(t.p,{children:"Accessible dropdown component supporting single and multiple selection with keyboard navigation and validation"}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"static",children:"Static"}),`
`,e.jsx(i,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:u}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(t.h3,{id:"dynamic-items",children:"Dynamic Items"}),`
`,e.jsx(i,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:g}),`
`,e.jsx(t.h3,{id:"multiple-selection",children:"Multiple Selection"}),`
`,e.jsx(i,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:j}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"React Aria Components automatically adds data attributes for styling different states:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Select Container:"})," ",e.jsx(t.code,{children:"data-invalid"}),", ",e.jsx(t.code,{children:"data-disabled"}),", ",e.jsx(t.code,{children:"data-required"}),", ",e.jsx(t.code,{children:"data-focused"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Trigger Button:"})," ",e.jsx(t.code,{children:"data-pressed"}),", ",e.jsx(t.code,{children:"data-disabled"}),", ",e.jsx(t.code,{children:"data-focused"}),", ",e.jsx(t.code,{children:"aria-expanded"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Select Value:"})," ",e.jsx(t.code,{children:"data-placeholder"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Popover:"})," ",e.jsx(t.code,{children:"data-entering"}),", ",e.jsx(t.code,{children:"data-exiting"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"List Items:"})," ",e.jsx(t.code,{children:"data-hovered"}),", ",e.jsx(t.code,{children:"data-focused"}),", ",e.jsx(t.code,{children:"data-pressed"}),", ",e.jsx(t.code,{children:"data-selected"}),", ",e.jsx(t.code,{children:"data-disabled"}),", ",e.jsx(t.code,{children:"data-selection-mode"})]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`[data-selected] {
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
`,e.jsx(t.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(t.p,{children:["Individual child components can be styled by passing ",e.jsx(t.code,{children:"className"})," props:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`<Select label="Coffee">
  <SelectItem id="espresso" className="premium-option">
    Espresso
  </SelectItem>
  <SelectSection className="featured-section">
    <SelectHeader>Featured</SelectHeader>
    <SelectItem id="special">Special Blend</SelectItem>
  </SelectSection>
</Select>
`})}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Space/Enter"}),": Opens the popover and focuses the selected item"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Arrow Down/Up"}),": Navigate through options"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Home/End"}),": Jump to first/last option"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Escape"}),": Closes the popover"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tab"}),": Moves focus to the next focusable element"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Type to select"}),": Type characters to jump to matching options"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Space"})," (in multi-select): Toggle selection of focused item"]}),`
`]}),`
`,e.jsx(t.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(t.h3,{id:"selection-not-updating",children:"Selection Not Updating"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-jsx",children:`// ❌ Wrong: Using both value and defaultValue
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
`,e.jsx(t.h3,{id:"styling-overrides-not-applying",children:"Styling Overrides Not Applying"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`/* ❌ May not have enough specificity */
.item {
  background-color: red;
}

/* ✅ Use data attributes for higher specificity */
.my-select [data-selected] {
  background-color: red;
}
`})}),`
`,e.jsx(t.h3,{id:"keyboard-navigation-not-working",children:"Keyboard Navigation Not Working"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-css",children:`/* ❌ Don't remove focus outlines without replacement */
.button:focus {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
`})})]})}function ke(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(c,{...n})}):c(n)}export{ke as default};
