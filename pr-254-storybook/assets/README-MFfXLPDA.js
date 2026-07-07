import{i as e}from"./preload-helper-C8Zz4tJD.js";import{y as t}from"./iframe-D4aDDb8B.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-B5gIrTPJ.js";import{t as c}from"./mdx-react-shim-BPnzSFZf.js";import{Controlled as l,Default as u,DismissOnBlur as d,FocusScope as f,Props as p,SidebarNav as m,Vertical as h,n as g,t as _}from"./inline-drawer.stories-CcSXCXSc.js";var v,y=e((()=>{v=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <InlineDrawer>
      <InlineDrawerTrigger>Toggle details</InlineDrawerTrigger>
      <InlineDrawerPanel>
        <Text>Collapsible content goes here.</Text>
      </InlineDrawerPanel>
    </InlineDrawer>
  );
}
`})),b,x=e((()=>{b=`import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Button, Text } from '@godaddy/antares';

export function ControlledExample() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button variant="primary" onPress={() => setExpanded(!expanded)}>
        {expanded ? 'Collapse' : 'Expand'}
      </Button>
      <Text>Expanded: {String(expanded)}</Text>
      <InlineDrawer isExpanded={expanded} onExpandedChange={setExpanded}>
        <InlineDrawerTrigger>Details</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Text>Controlled panel content.</Text>
        </InlineDrawerPanel>
      </InlineDrawer>
    </>
  );
}
`})),S,C=e((()=>{S=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

export function SidebarNavExample() {
  return (
    <Flex direction="row" style={{ height: 300, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" defaultExpanded minSize={48} maxSize={220}>
        <InlineDrawerTrigger>Menu</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex as="nav" direction="column" gap="sm" padding="sm">
            <Text>Home</Text>
            <Text>Settings</Text>
            <Text>Profile</Text>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
`})),w,T=e((()=>{w=`import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text, Button } from '@godaddy/antares';

export function DismissOnBlurExample() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Flex direction="row" gap="md" style={{ height: 200 }}>
      <InlineDrawer
        placement="left"
        isExpanded={expanded}
        onExpandedChange={setExpanded}
        shouldDismissOnBlur
        maxSize={220}
      >
        <InlineDrawerTrigger>Panel</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex direction="column" gap="sm" padding="sm">
            <Text>Focus here, then Tab out.</Text>
            <Button variant="secondary" onPress={() => undefined}>
              Inside button
            </Button>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" direction="column" gap="sm" style={{ flex: 1 }}>
        <Text>Outside content</Text>
        <Button variant="secondary" onPress={() => undefined}>
          Outside button
        </Button>
        <Button variant="primary" onPress={() => setExpanded(true)}>
          Re-expand
        </Button>
      </Flex>
    </Flex>
  );
}
`})),E,D=e((()=>{E=`import { useState } from 'react';
import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, FocusScope, Flex, Text, Button } from '@godaddy/antares';

export function FocusScopeExample() {
  const [expanded, setExpanded] = useState(true);

  return (
    <Flex direction="row" style={{ height: 200, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="left" isExpanded={expanded} onExpandedChange={setExpanded} maxSize={220}>
        <InlineDrawerTrigger>Sidebar</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <FocusScope contain={expanded} restoreFocus>
            <Flex direction="column" gap="sm" padding="sm">
              <Text>Focus is trapped when expanded.</Text>
              <Button variant="secondary" onPress={() => undefined}>
                Action A
              </Button>
              <Button variant="secondary" onPress={() => undefined}>
                Action B
              </Button>
            </Flex>
          </FocusScope>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content. Tab cannot reach here while sidebar is expanded.</Text>
        <Button variant="primary" onPress={() => setExpanded(true)}>
          Open sidebar
        </Button>
      </Flex>
    </Flex>
  );
}
`})),O,k=e((()=>{O=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

export function VerticalExample() {
  return (
    <Flex direction="column" style={{ height: 400, border: '1px solid var(--bd-base)' }}>
      <InlineDrawer placement="top" defaultExpanded minSize={32} maxSize={120}>
        <InlineDrawerTrigger>Header</InlineDrawerTrigger>
        <InlineDrawerPanel>
          <Flex padding="sm">
            <Text>Top drawer content, collapses vertically.</Text>
          </Flex>
        </InlineDrawerPanel>
      </InlineDrawer>
      <Flex padding="md" style={{ flex: 1 }}>
        <Text>Main content area</Text>
      </Flex>
    </Flex>
  );
}
`}));function A(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(o,{of:g,name:`Overview`}),`
`,(0,M.jsx)(t.h1,{id:`inlinedrawer`,children:`InlineDrawer`}),`
`,(0,M.jsx)(t.p,{children:`An in-flow collapsible panel that expands and collapses along one axis, supporting sidebar navigation and persistent collapsed content.`}),`
`,(0,M.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsx)(t.li,{children:`In-flow collapsible panel with CSS transitions`}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`minSize`}),` keeps collapsed content visible (sidebar nav pattern)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`shouldDismissOnBlur`}),` with portal-aware focus detection`]}),`
`,(0,M.jsx)(t.li,{children:`Controlled and uncontrolled modes`}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`hidden="until-found"`}),` for browser find-in-page support`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`prefers-reduced-motion`}),` support`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,M.jsx)(t.pre,{children:(0,M.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,M.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,M.jsx)(a,{of:p}),`
`,(0,M.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,M.jsx)(t.h3,{id:`basic-usage`,children:`Basic Usage`}),`
`,(0,M.jsx)(t.p,{children:`The panel toggles when the trigger is pressed, pushing adjacent content as it expands.`}),`
`,(0,M.jsx)(i,{of:u,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:v}),`
`,(0,M.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,M.jsxs)(t.p,{children:[`Use `,(0,M.jsx)(t.code,{children:`isExpanded`}),` and `,(0,M.jsx)(t.code,{children:`onExpandedChange`}),` to drive state externally, e.g. from a button outside the drawer.`]}),`
`,(0,M.jsx)(i,{of:l,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:b}),`
`,(0,M.jsx)(t.h3,{id:`sidebar-navigation`,children:`Sidebar Navigation`}),`
`,(0,M.jsxs)(t.p,{children:[`Combine `,(0,M.jsx)(t.code,{children:`minSize`}),` and `,(0,M.jsx)(t.code,{children:`maxSize`}),` to create a sidebar that collapses to an icon strip instead of disappearing completely.`]}),`
`,(0,M.jsx)(i,{of:m,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:S}),`
`,(0,M.jsx)(t.h3,{id:`vertical-placement`,children:`Vertical Placement`}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`placement="top"`}),` or `,(0,M.jsx)(t.code,{children:`"bottom"`}),` to collapse vertically instead of horizontally.`]}),`
`,(0,M.jsx)(i,{of:h,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:O}),`
`,(0,M.jsx)(t.h3,{id:`dismiss-on-blur`,children:`Dismiss on Blur`}),`
`,(0,M.jsxs)(t.p,{children:[`Set `,(0,M.jsx)(t.code,{children:`shouldDismissOnBlur`}),` to auto-collapse when focus leaves the drawer. Tab from the inside button to the outside button to see it collapse. Focus moving to browser chrome (address bar, devtools) does not trigger collapse.`]}),`
`,(0,M.jsx)(i,{of:d,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:w}),`
`,(0,M.jsx)(t.h3,{id:`focus-scope`,children:`Focus Scope`}),`
`,(0,M.jsxs)(t.p,{children:[`Wrap panel content in `,(0,M.jsx)(t.code,{children:`<FocusScope>`}),` to trap focus while expanded. Tab cycles between Action A and Action B without escaping to main content. Use `,(0,M.jsx)(t.code,{children:`contain={isExpanded}`}),` so trapping only applies when open.`]}),`
`,(0,M.jsx)(i,{of:f,inline:!0}),`
`,(0,M.jsx)(r,{language:`tsx`,code:E}),`
`,(0,M.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,M.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,M.jsxs)(t.table,{children:[(0,M.jsx)(t.thead,{children:(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.th,{children:`Key`}),(0,M.jsx)(t.th,{children:`Action`})]})}),(0,M.jsxs)(t.tbody,{children:[(0,M.jsxs)(t.tr,{children:[(0,M.jsxs)(t.td,{children:[(0,M.jsx)(t.code,{children:`Enter`}),` / `,(0,M.jsx)(t.code,{children:`Space`})]}),(0,M.jsx)(t.td,{children:`Toggle the drawer via the trigger button`})]}),(0,M.jsxs)(t.tr,{children:[(0,M.jsx)(t.td,{children:(0,M.jsx)(t.code,{children:`Tab`})}),(0,M.jsxs)(t.td,{children:[`Move focus into/out of the panel (or trapped when using `,(0,M.jsx)(t.code,{children:`FocusScope`}),`)`]})]})]})]}),`
`,(0,M.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`aria-expanded`}),` on the trigger button reflects panel state (via RAC Disclosure)`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`aria-controls`}),` links the trigger to the panel`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`hidden="until-found"`}),` on collapsed panels (browser find-in-page support)`]}),`
`,(0,M.jsxs)(t.li,{children:[`Panels with `,(0,M.jsx)(t.code,{children:`minSize`}),` override `,(0,M.jsx)(t.code,{children:`aria-hidden`}),` to keep collapsed content accessible`]}),`
`]}),`
`,(0,M.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,M.jsxs)(t.ul,{children:[`
`,(0,M.jsxs)(t.li,{children:[`Use `,(0,M.jsx)(t.code,{children:`minSize`}),` + `,(0,M.jsx)(t.code,{children:`maxSize`}),` for sidebar patterns where collapsed content stays visible.`]}),`
`,(0,M.jsxs)(t.li,{children:[(0,M.jsx)(t.code,{children:`FocusScope`}),` is opt-in. Don't combine `,(0,M.jsx)(t.code,{children:`contain={true}`}),` with `,(0,M.jsx)(t.code,{children:`shouldDismissOnBlur`}),` (trapped focus can't leave to trigger blur).`]}),`
`,(0,M.jsxs)(t.li,{children:[`Collapsed panels use `,(0,M.jsx)(t.code,{children:`hidden="until-found"`}),` for browser find-in-page support. Panels with `,(0,M.jsx)(t.code,{children:`minSize`}),` override this to keep content visible.`]}),`
`,(0,M.jsx)(t.li,{children:`Don't nest InlineDrawers.`}),`
`]})]})}function j(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,M.jsx)(t,{...e,children:(0,M.jsx)(A,{...e})}):A(e)}var M;e((()=>{M=t(),c(),s(),_(),y(),x(),C(),T(),D(),k()}))();export{j as default};