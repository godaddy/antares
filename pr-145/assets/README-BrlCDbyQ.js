import{j as e}from"./iframe-COOHz61S.js";import{useMDXComponents as s}from"./index-DSxwjQyk.js";import{M as u,A as d,a as i,S as o}from"./blocks-ORDlmF0q.js";import{S as m,P as a,B as l,W as c,a as M,b as p}from"./menu.stories-DYWKTBey.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C8-rjpp1.js";import"./index-CL8R-hp8.js";import"./index-BgZMnLcl.js";import"./index-DrFu-skq.js";import"./index-BPG-qpUK.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-MlTjw36F.js";import"./Text-j77WVZst.js";import"./mergeProps-CvD8Zx5n.js";import"./SSRProvider-jcR4Waq-.js";import"./useObjectRef-C3TJRGct.js";import"./Hidden-oeRk8EQk.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DGqUpz7d.js";import"./usePress-Bw8MFNcz.js";import"./utils-C_h2oB66.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-CkqPFF9l.js";import"./useHover-dEkRfzcP.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CPiO8coH.js";import"./useFocusWithin-BvUr4i88.js";import"./index-D6dwtD9s.js";import"./index-eVYDjNFU.js";import"./index-DKm7JoLF.js";import"./slots-CENhnci_.js";import"./index-DQ7w3rrP.js";import"./index-CLj43KZG.js";import"./index-C2EW5X_P.js";import"./index-BCkOfvL8.js";import"./create-external-store-TtP3UJpK.js";import"./index-CXQj3_gB.js";import"./client-BqoTDaMW.js";import"./index-B7ppccnt.js";import"./Dialog-C2NncmSo.js";import"./RSPContexts-Djn19cAs.js";import"./OverlayArrow-DxXVrk1U.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-D-FVsBJP.js";import"./useControlledState-CMthoDkV.js";import"./context-7mla9mDj.js";import"./Collection-aYsAaF9z.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-CjhyETAY.js";import"./FocusScope-CpniISg5.js";import"./SelectionIndicator-BWP8s5ZC.js";import"./Overlay-pU_ld_80.js";import"./PortalProvider-CnAZGGgV.js";import"./useLocalizedStringFormatter-D0ZP0cqg.js";import"./usePreventScroll-DKGME6IJ.js";import"./useLabels-DXfc0GiF.js";import"./VisuallyHidden-0IQoiMlg.js";import"./index--hg9wOhy.js";const g=`import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

export function BasicExample() {
  return (
    <MenuTrigger>
      <Button>Actions</Button>
      <Menu>
        <MenuItem id="new">New File</MenuItem>
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="save">Save</MenuItem>
        <MenuItem id="save-as">Save As...</MenuItem>
        <MenuItem id="close">Close</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
`,h=`import { Button, Menu, MenuItem, MenuSeparator, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';

export function SubmenuExample() {
  return (
    <MenuTrigger>
      <Button>Edit</Button>
      <Menu>
        <MenuItem id="undo">Undo</MenuItem>
        <MenuItem id="redo">Redo</MenuItem>
        <MenuSeparator />
        <MenuItem id="cut">Cut</MenuItem>
        <MenuItem id="copy">Copy</MenuItem>
        <MenuItem id="paste">Paste</MenuItem>
        <MenuSeparator />
        <SubmenuTrigger>
          <MenuItem id="share">Share</MenuItem>
          <Menu>
            <MenuItem id="email">Email</MenuItem>
            <MenuItem id="sms">SMS</MenuItem>
            <MenuItem id="slack">Slack</MenuItem>
            <SubmenuTrigger>
              <MenuItem id="social">Social Media</MenuItem>
              <Menu>
                <MenuItem id="twitter">Twitter</MenuItem>
                <MenuItem id="facebook">Facebook</MenuItem>
                <MenuItem id="linkedin">LinkedIn</MenuItem>
              </Menu>
            </SubmenuTrigger>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  );
}
`,I=`import { Button, Menu, MenuItem, MenuSeparator, MenuTrigger } from '@godaddy/antares';
import type { Selection } from 'react-aria-components';
import { useState } from 'react';

export function SelectionExample() {
  const [selectedSingle, setSelectedSingle] = useState<Selection>(new Set(['left']));
  const [selectedMultiple, setSelectedMultiple] = useState<Selection>(new Set(['bold', 'italic']));

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MenuTrigger>
        <Button>Align (Single)</Button>
        <Menu selectionMode="single" selectedKeys={selectedSingle} onSelectionChange={setSelectedSingle}>
          <MenuItem id="left">Align Left</MenuItem>
          <MenuItem id="center">Align Center</MenuItem>
          <MenuItem id="right">Align Right</MenuItem>
          <MenuItem id="justify">Justify</MenuItem>
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button>Format (Multiple)</Button>
        <Menu selectionMode="multiple" selectedKeys={selectedMultiple} onSelectionChange={setSelectedMultiple}>
          <MenuItem id="bold">Bold</MenuItem>
          <MenuItem id="italic">Italic</MenuItem>
          <MenuItem id="underline">Underline</MenuItem>
          <MenuItem id="strikethrough">Strikethrough</MenuItem>
          <MenuSeparator />
          <MenuItem id="code">Code</MenuItem>
        </Menu>
      </MenuTrigger>
    </div>
  );
}
`,x=`import { Button, Menu, MenuHeader, MenuItem, MenuSection, MenuSeparator, MenuTrigger } from '@godaddy/antares';

export function SectionsExample() {
  return (
    <MenuTrigger>
      <Button>View</Button>
      <Menu>
        <MenuSection>
          <MenuHeader>Zoom</MenuHeader>
          <MenuItem id="zoom-in">Zoom In</MenuItem>
          <MenuItem id="zoom-out">Zoom Out</MenuItem>
          <MenuItem id="zoom-reset">Reset Zoom</MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection>
          <MenuHeader>Layout</MenuHeader>
          <MenuItem id="sidebar">Toggle Sidebar</MenuItem>
          <MenuItem id="panel">Toggle Panel</MenuItem>
          <MenuItem id="fullscreen">Fullscreen</MenuItem>
        </MenuSection>
        <MenuSeparator variant="partial" />
        <MenuSection>
          <MenuHeader>Appearance</MenuHeader>
          <MenuItem id="theme-light">Light Theme</MenuItem>
          <MenuItem id="theme-dark">Dark Theme</MenuItem>
          <MenuItem id="theme-auto">Auto</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  );
}
`;function r(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(u,{of:m,name:"Overview"}),`
`,e.jsx(n.h1,{id:"menu",children:"Menu"}),`
`,e.jsx(n.p,{children:"Accessible dropdown menu supporting keyboard navigation, nested submenus, and flexible item rendering"}),`
`,e.jsx(n.p,{children:"Accessible dropdown menu supporting keyboard navigation, nested submenus, single/multiple selection modes, and flexible item rendering with links and sections."}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(d,{of:a}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(i,{of:l,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:g}),`
`,e.jsx(n.h3,{id:"with-submenus",children:"With Submenus"}),`
`,e.jsx(i,{of:c,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:h}),`
`,e.jsx(n.h3,{id:"with-selection",children:"With Selection"}),`
`,e.jsx(i,{of:M,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:I}),`
`,e.jsx(n.h3,{id:"with-sections",children:"With Sections"}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:x}),`
`,e.jsx(n.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(n.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(n.p,{children:"React Aria Components automatically adds data attributes for styling different states:"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Menu Items:"})," ",e.jsx(n.code,{children:"data-hovered"}),", ",e.jsx(n.code,{children:"data-focused"}),", ",e.jsx(n.code,{children:"data-pressed"}),", ",e.jsx(n.code,{children:"data-selected"}),", ",e.jsx(n.code,{children:"data-disabled"})]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Popover:"})," ",e.jsx(n.code,{children:"data-entering"}),", ",e.jsx(n.code,{children:"data-exiting"})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`[data-selected] {
  background-color: #eff6ff;
  color: #1e40af;
}

[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

[data-entering] {
  animation: slideIn 0.2s ease-out;
}
`})}),`
`,e.jsx(n.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(n.p,{children:["Individual child components can be styled by passing ",e.jsx(n.code,{children:"className"})," props:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<Menu>
  <MenuItem id="special" className="premium-item">
    Premium Feature
  </MenuItem>
  <MenuSection className="featured-section">
    <MenuHeader>Featured</MenuHeader>
    <MenuItem id="new">What's New</MenuItem>
  </MenuSection>
</Menu>
`})}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Space/Enter"}),": Opens menu and activates items"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arrow Down/Up"}),": Navigate through items"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arrow Right"}),": Opens submenu"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arrow Left"}),": Closes submenu"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Home/End"}),": Jump to first/last item"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Escape"}),": Closes menu"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tab"}),": Closes menu and moves to next element"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type to select"}),": Type to jump to matching items"]}),`
`]}),`
`,e.jsx(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(n.h3,{id:"submenu-not-opening",children:"Submenu Not Opening"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// ❌ Wrong: MenuItem used directly
<MenuItem id="share">
  Share
  <Menu>
    <MenuItem id="email">Email</MenuItem>
  </Menu>
</MenuItem>

// ✅ Correct: SubmenuTrigger wrapping MenuItem and Menu
<SubmenuTrigger>
  <MenuItem id="share">Share</MenuItem>
  <Menu>
    <MenuItem id="email">Email</MenuItem>
  </Menu>
</SubmenuTrigger>
`})}),`
`,e.jsx(n.h3,{id:"selection-not-working",children:"Selection Not Working"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`// ❌ Wrong: Using both controlled and uncontrolled props
<Menu
  selectedKeys={selected}
  defaultSelectedKeys={['option1']}
  selectionMode="single"
>
  <MenuItem id="option1">Option 1</MenuItem>
</Menu>

// ✅ Controlled mode
<Menu
  selectionMode="single"
  selectedKeys={selected}
  onSelectionChange={setSelected}
>
  <MenuItem id="option1">Option 1</MenuItem>
</Menu>

// ✅ Uncontrolled mode
<Menu
  selectionMode="single"
  defaultSelectedKeys={['option1']}
>
  <MenuItem id="option1">Option 1</MenuItem>
</Menu>
`})}),`
`,e.jsx(n.h3,{id:"styling-not-applying",children:"Styling Not Applying"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* ❌ May not have enough specificity */
.item {
  background-color: red;
}

/* ✅ Use data attributes for higher specificity */
.my-menu [data-selected] {
  background-color: red;
}
`})})]})}function Te(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{Te as default};
