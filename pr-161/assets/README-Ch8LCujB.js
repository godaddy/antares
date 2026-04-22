import{j as e}from"./iframe-D1ffrKFu.js";import{useMDXComponents as s}from"./index-B7Lx40or.js";import{M as u,A as d,a as i,S as o}from"./blocks-DaRZYqHF.js";import{S as m,P as a,B as l,W as c,a as M,b as p}from"./menu.stories-DkOEwHEB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cz8KgIep.js";import"./index-DC1oEnzR.js";import"./index-D91JL73M.js";import"./index-DrFu-skq.js";import"./index-BbUvCD9w.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-BsrDOxBB.js";import"./Text-CYik-koF.js";import"./mergeProps-BFkBPHEy.js";import"./SSRProvider-5SE_QYD0.js";import"./useObjectRef-FUzBHnK5.js";import"./Hidden-Ds9aLZls.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DjoWph75.js";import"./usePress-CJ8xRG1Q.js";import"./utils-CI_GmkcR.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-BLSsIPav.js";import"./useHover-B4f6Gwa8.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-BDrIvBmB.js";import"./useFocusWithin-_h8ZI5Z0.js";import"./index-LHoSfUJf.js";import"./index-2sLDUdqB.js";import"./index-C8lvV3V9.js";import"./slots-0Wmv7Gqa.js";import"./index-Dft_e07c.js";import"./index-CLj43KZG.js";import"./index-DC3wLLlB.js";import"./index-Dikb04ab.js";import"./create-external-store-TtP3UJpK.js";import"./index-DfEThKL1.js";import"./client-CezRlg0L.js";import"./index-DqPRp8Zx.js";import"./Dialog-CBecE4-h.js";import"./RSPContexts-CRcpoVPv.js";import"./OverlayArrow-I_e55obL.js";import"./number-CB4zbwAz.js";import"./useOverlayTriggerState-4kPObwin.js";import"./useControlledState-BF2iBaHH.js";import"./context-9ff_JYXl.js";import"./Collection-C0F-AcYk.js";import"./keyboard-BlyT3oQC.js";import"./useEvent-E7D6iNJR.js";import"./FocusScope-DrwSTH2b.js";import"./SelectionIndicator-BcCpcsBa.js";import"./Overlay-BqC_3RBX.js";import"./PortalProvider-BERmTsfN.js";import"./useLocalizedStringFormatter-BhGiL0le.js";import"./usePreventScroll-C1LBVEDV.js";import"./useLabels-B74qCCle.js";import"./VisuallyHidden-CIqv432h.js";import"./index-CFR0wif_.js";const g=`import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

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
