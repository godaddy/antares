import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-CdiC1iam.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DpQ4n8sJ.js";import{t as c}from"./mdx-react-shim-CS7Sz8tJ.js";import{Basic as l,Props as u,WithSections as d,WithSelection as f,WithSubmenus as p,n as m,t as h}from"./menu.stories-CMYx-_I0.js";var g,_=e((()=>{g=`import { Button, Menu, MenuItem, MenuTrigger } from '@godaddy/antares';

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
`})),v,y=e((()=>{v=`import { Button, Menu, MenuItem, MenuSeparator, MenuTrigger, SubmenuTrigger } from '@godaddy/antares';

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
`})),b,x=e((()=>{b=`import { Button, Menu, MenuItem, MenuSeparator, MenuTrigger } from '@godaddy/antares';
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
`})),S,C=e((()=>{S=`import { Button, Menu, MenuHeader, MenuItem, MenuSection, MenuSeparator, MenuTrigger } from '@godaddy/antares';

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
`}));function w(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:m,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`menu`,children:`Menu`}),`
`,(0,E.jsx)(t.p,{children:`Accessible dropdown menu supporting keyboard navigation, nested submenus, and flexible item rendering`}),`
`,(0,E.jsx)(t.p,{children:`Accessible dropdown menu supporting keyboard navigation, nested submenus, single/multiple selection modes, and flexible item rendering with links and sections.`}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsx)(a,{of:u}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,E.jsx)(i,{of:l,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:g}),`
`,(0,E.jsx)(t.h3,{id:`with-submenus`,children:`With Submenus`}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:v}),`
`,(0,E.jsx)(t.h3,{id:`with-selection`,children:`With Selection`}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:b}),`
`,(0,E.jsx)(t.h3,{id:`with-sections`,children:`With Sections`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{language:`tsx`,code:S}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,E.jsx)(t.p,{children:`React Aria Components automatically adds data attributes for styling different states:`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Menu Items:`}),` `,(0,E.jsx)(t.code,{children:`data-hovered`}),`, `,(0,E.jsx)(t.code,{children:`data-focused`}),`, `,(0,E.jsx)(t.code,{children:`data-pressed`}),`, `,(0,E.jsx)(t.code,{children:`data-selected`}),`, `,(0,E.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.strong,{children:`Popover:`}),` `,(0,E.jsx)(t.code,{children:`data-entering`}),`, `,(0,E.jsx)(t.code,{children:`data-exiting`})]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-css`,children:`[data-selected] {
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
`,(0,E.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,E.jsxs)(t.p,{children:[`Individual child components can be styled by passing `,(0,E.jsx)(t.code,{children:`className`}),` props:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-jsx`,children:`<Menu>
  <MenuItem id="special" className="premium-item">
    Premium Feature
  </MenuItem>
  <MenuSection className="featured-section">
    <MenuHeader>Featured</MenuHeader>
    <MenuItem id="new">What's New</MenuItem>
  </MenuSection>
</Menu>
`})}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Space/Enter`}),`: Opens menu and activates items`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Arrow Down/Up`}),`: Navigate through items`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Arrow Right`}),`: Opens submenu`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Arrow Left`}),`: Closes submenu`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Home/End`}),`: Jump to first/last item`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Escape`}),`: Closes menu`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Tab`}),`: Closes menu and moves to next element`]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.strong,{children:`Type to select`}),`: Type to jump to matching items`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,E.jsx)(t.h3,{id:`submenu-not-opening`,children:`Submenu Not Opening`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: MenuItem used directly
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
`,(0,E.jsx)(t.h3,{id:`selection-not-working`,children:`Selection Not Working`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both controlled and uncontrolled props
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
`,(0,E.jsx)(t.h3,{id:`styling-not-applying`,children:`Styling Not Applying`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.item {
  background-color: red;
}

/* ✅ Use data attributes for higher specificity */
.my-menu [data-selected] {
  background-color: red;
}
`})})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),_(),y(),x(),C(),h()}))();export{T as default};