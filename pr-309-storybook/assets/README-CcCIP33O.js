import{i as e}from"./preload-helper-CUucOUc4.js";import{F as t}from"./iframe-Rks4wJ2w.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DVSv0W7a.js";import{t as c}from"./mdx-react-shim-DZZq5eZC.js";import{Controlled as l,Default as u,Disabled as d,Manilla as f,Overflow as p,Props as m,RTL as h,n as g,t as _}from"./tabs.stories-lft9kuiN.js";function v(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{of:g,name:`Overview`}),`
`,(0,b.jsx)(t.h1,{id:`tabs`,children:`Tabs`}),`
`,(0,b.jsx)(t.p,{children:`Tabs organize peer sections of content and let users switch between them without leaving the page.`}),`
`,(0,b.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`Accessible Tabs semantics powered by React Aria Components.`}),`
`,(0,b.jsx)(t.li,{children:`Underline and Manilla visual treatments.`}),`
`,(0,b.jsx)(t.li,{children:`Controlled and uncontrolled selection.`}),`
`,(0,b.jsx)(t.li,{children:`Automatic horizontal overflow controls that move one tab at a time.`}),`
`,(0,b.jsx)(t.li,{children:`Localized labels for the automatic overflow controls.`}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,b.jsx)(t.pre,{children:(0,b.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,b.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,b.jsx)(t.p,{children:`Switch between peer sections of content on the same page.`}),`
`,(0,b.jsx)(i,{of:u,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <Tabs overflowLabels={{ previous: 'Previous tabs', next: 'Next tabs' }}>
      <TabList aria-label="Account settings">
        <Tab id="account">Account</Tab>
        <Tab id="billing">Billing</Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="account">Account settings</TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
        <TabPanel id="security">Security settings</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,b.jsx)(t.p,{children:`Control the selected panel from application state.`}),`
`,(0,b.jsx)(i,{of:l,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selectedKey, setSelectedKey] = useState('billing');

  return (
    <>
      <Tabs
        overflowLabels={{ previous: 'Previous tabs', next: 'Next tabs' }}
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(String(key))}
      >
        <TabList aria-label="Account settings">
          <Tab id="account">Account</Tab>
          <Tab id="billing">Billing</Tab>
          <Tab id="security">Security</Tab>
        </TabList>
        <TabPanels>
          <TabPanel id="account">Account settings</TabPanel>
          <TabPanel id="billing">Billing settings</TabPanel>
          <TabPanel id="security">Security settings</TabPanel>
        </TabPanels>
      </Tabs>
      <p>Current selection: {selectedKey}</p>
    </>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,b.jsx)(t.p,{children:`Disable a section while keeping the remaining sections available.`}),`
`,(0,b.jsx)(i,{of:d,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Tabs overflowLabels={{ previous: 'Previous tabs', next: 'Next tabs' }}>
      <TabList aria-label="Account settings">
        <Tab id="account">Account</Tab>
        <Tab id="billing" isDisabled>
          Billing
        </Tab>
        <Tab id="security">Security</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="account">Account settings</TabPanel>
        <TabPanel id="billing">Billing settings</TabPanel>
        <TabPanel id="security">Security settings</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`manilla`,children:`Manilla`}),`
`,(0,b.jsx)(t.p,{children:`Use the folder-style Manilla treatment for document-oriented sections.`}),`
`,(0,b.jsx)(i,{of:f,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

export function ManillaExample() {
  return (
    <Tabs overflowLabels={{ previous: 'Previous tabs', next: 'Next tabs' }} design="manilla">
      <TabList aria-label="Documents">
        <Tab id="recent">Recent</Tab>
        <Tab id="shared">Shared</Tab>
        <Tab id="archived">Archived</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="recent">Recent documents</TabPanel>
        <TabPanel id="shared">Shared documents</TabPanel>
        <TabPanel id="archived">Archived documents</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`overflow`,children:`Overflow`}),`
`,(0,b.jsx)(t.p,{children:`When the tab strip is narrower than its content, the group adds controls that move one tab at a time.`}),`
`,(0,b.jsx)(i,{of:p,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@godaddy/antares';

export function OverflowExample({ maxWidth = '320px' }: { maxWidth?: string }) {
  return (
    <Tabs
      overflowLabels={{ previous: 'Scroll previous tabs', next: 'Scroll next tabs' }}
      style={{ width: maxWidth, maxWidth }}
    >
      <TabList aria-label="Product settings">
        <Tab id="overview">Overview</Tab>
        <Tab id="availability">Availability</Tab>
        <Tab id="shipping">Shipping</Tab>
        <Tab id="returns">Returns</Tab>
        <Tab id="notifications">Notifications</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="overview">Overview</TabPanel>
        <TabPanel id="availability">Availability</TabPanel>
        <TabPanel id="shipping">Shipping</TabPanel>
        <TabPanel id="returns">Returns</TabPanel>
        <TabPanel id="notifications">Notifications</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h3,{id:`rtl`,children:`RTL`}),`
`,(0,b.jsx)(t.p,{children:`Overflow controls follow the logical reading direction.`}),`
`,(0,b.jsx)(i,{of:h,inline:!0}),`
`,(0,b.jsx)(r,{code:`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { OverflowExample } from './overflow.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <OverflowExample />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,b.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(t.p,{children:[`Tabs require an accessible label on `,(0,b.jsx)(t.code,{children:`TabList`}),`. Use the keyboard to move between tabs with the arrow keys. Disabled tabs are skipped. Use `,(0,b.jsx)(t.code,{children:`keyboardActivation="manual"`}),` when focus should move independently of selection.`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`overflowLabels.previous`}),` and `,(0,b.jsx)(t.code,{children:`overflowLabels.next`}),` are required because the overflow controls are interactive and must be announced with localized action labels. These labels should describe the logical direction (e.g., "Previous tabs" and "Next tabs") rather than physical directions like "left" or "right", as the component automatically handles RTL layouts.`]}),`
`,(0,b.jsxs)(t.p,{children:[(0,b.jsx)(t.code,{children:`TabList`}),` must be rendered inside `,(0,b.jsx)(t.code,{children:`Tabs`}),` and must provide `,(0,b.jsx)(t.code,{children:`aria-label`}),` or `,(0,b.jsx)(t.code,{children:`aria-labelledby`}),`. Give each `,(0,b.jsx)(t.code,{children:`Tab`}),` and its corresponding `,(0,b.jsx)(t.code,{children:`TabPanel`}),` the same `,(0,b.jsx)(t.code,{children:`id`}),`; React Aria uses that key to build their accessible relationship.`]}),`
`,(0,b.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,b.jsx)(t.p,{children:`The component exposes state through data attributes:`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`Tabs`}),`: `,(0,b.jsx)(t.code,{children:`data-design="underline"`}),` or `,(0,b.jsx)(t.code,{children:`data-design="manilla"`}),`.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`Tab`}),`: `,(0,b.jsx)(t.code,{children:`data-selected`}),`, `,(0,b.jsx)(t.code,{children:`data-hovered`}),`, `,(0,b.jsx)(t.code,{children:`data-pressed`}),`, `,(0,b.jsx)(t.code,{children:`data-focus-visible`}),`, and `,(0,b.jsx)(t.code,{children:`data-disabled`}),`.`]}),`
`,(0,b.jsxs)(t.li,{children:[(0,b.jsx)(t.code,{children:`TabPanel`}),`: `,(0,b.jsx)(t.code,{children:`data-inert`}),` when a force-mounted inactive panel is not interactive.`]}),`
`]}),`
`,(0,b.jsxs)(t.p,{children:[`Use these attributes to extend styling without replacing the accessibility behavior supplied by React Aria Components. You can also use render props in `,(0,b.jsx)(t.code,{children:`className`}),` to style based on state (e.g., `,(0,b.jsx)(t.code,{children:`className={({ isSelected }) => isSelected ? 'active' : ''}`}),`).`]}),`
`,(0,b.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,b.jsxs)(t.ul,{children:[`
`,(0,b.jsx)(t.li,{children:`Use Tabs for peer panels on the same page and URL.`}),`
`,(0,b.jsx)(t.li,{children:`Keep the number of tabs small enough for users to understand the available sections.`}),`
`,(0,b.jsx)(t.li,{children:`Do not use Tabs for primary application navigation or route changes.`}),`
`,(0,b.jsxs)(t.li,{children:[`Do not render a standalone `,(0,b.jsx)(t.code,{children:`Tab`}),`; compose it inside `,(0,b.jsx)(t.code,{children:`Tabs`}),` and `,(0,b.jsx)(t.code,{children:`TabList`}),`.`]}),`
`]}),`
`,(0,b.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,b.jsx)(a,{of:m})]})}function y(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,b.jsx)(t,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;e((()=>{b=t(),c(),s(),_()}))();export{y as default};