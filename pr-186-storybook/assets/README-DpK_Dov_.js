import{j as e}from"./iframe-ClWTPl5x.js";import{u as s,M as o,A as l,a as i,S as t}from"./blocks-DG6eLz6l.js";import{S as d,P as c,D as p,C as x,a as h,V as m,b as u,F as g}from"./inline-drawer.stories-DLyaR9G8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GsngMiyr.js";import"./index-DUACdkfR.js";import"./index-BbqJLgpW.js";import"./index-DlFv1E6m.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Text-BH8NBewb.js";import"./mergeProps-BJpXx4bB.js";import"./SSRProvider-CfbBhIjL.js";import"./useObjectRef-Bmub13Bc.js";import"./Button-JYLAdiGx.js";import"./useButton-Ii2SQuDq.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-DEJIEQ8h.js";import"./useEffectEvent-BVbYnPFx.js";import"./useGlobalListeners-BnImAHxc.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BR_Y-GQi.js";import"./platform-DTNzKOdA.js";import"./usePress-D6HH4oj5.js";import"./Hidden-DuHvqV4_.js";import"./useFocusRing-CqVf9l6b.js";import"./useFocusWithin-CrR9OGu2.js";import"./useEvent-BTGLQadx.js";import"./useControlledState-dyoyjkUJ.js";import"./Heading-DUfbtQE4.js";import"./index-C-Rv7Pva.js";import"./index-BDKdxbl8.js";import"./index-D8m644f2.js";import"./index-2bjkk-qr.js";import"./slots-C-wNTvaf.js";import"./index-Ckd9fOVu.js";import"./index-CLj43KZG.js";import"./index-DzS4bbTN.js";import"./index-B3IMV5iP.js";import"./create-external-store-TtP3UJpK.js";import"./index-KhMAmn8o.js";import"./client-DYqE1Xvq.js";import"./index-BcDzO8sH.js";import"./index-CIRxvt8Z.js";import"./index-iqTyB0XZ.js";import"./FocusScope-nc0k0ZO2.js";const j=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Text } from '@godaddy/antares';

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
`,w=`import { useState } from 'react';
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
`,D=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

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
`,f=`import { useState } from 'react';
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
`,b=`import { useState } from 'react';
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
`,I=`import { InlineDrawer, InlineDrawerTrigger, InlineDrawerPanel, Flex, Text } from '@godaddy/antares';

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
`;function a(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"inlinedrawer",children:"InlineDrawer"}),`
`,e.jsx(n.p,{children:"An in-flow collapsible panel that expands and collapses along one axis, supporting sidebar navigation and persistent collapsed content."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"In-flow collapsible panel with CSS transitions"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"minSize"})," keeps collapsed content visible (sidebar nav pattern)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"shouldDismissOnBlur"})," with portal-aware focus detection"]}),`
`,e.jsx(n.li,{children:"Controlled and uncontrolled modes"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'hidden="until-found"'})," for browser find-in-page support"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"prefers-reduced-motion"})," support"]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.p,{children:"The panel toggles when the trigger is pressed, pushing adjacent content as it expands."}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:j}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"isExpanded"})," and ",e.jsx(n.code,{children:"onExpandedChange"})," to drive state externally, e.g. from a button outside the drawer."]}),`
`,e.jsx(i,{of:x,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:w}),`
`,e.jsx(n.h3,{id:"sidebar-navigation",children:"Sidebar Navigation"}),`
`,e.jsxs(n.p,{children:["Combine ",e.jsx(n.code,{children:"minSize"})," and ",e.jsx(n.code,{children:"maxSize"})," to create a sidebar that collapses to an icon strip instead of disappearing completely."]}),`
`,e.jsx(i,{of:h,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:D}),`
`,e.jsx(n.h3,{id:"vertical-placement",children:"Vertical Placement"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:'placement="top"'})," or ",e.jsx(n.code,{children:'"bottom"'})," to collapse vertically instead of horizontally."]}),`
`,e.jsx(i,{of:m,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:I}),`
`,e.jsx(n.h3,{id:"dismiss-on-blur",children:"Dismiss on Blur"}),`
`,e.jsxs(n.p,{children:["Set ",e.jsx(n.code,{children:"shouldDismissOnBlur"})," to auto-collapse when focus leaves the drawer. Tab from the inside button to the outside button to see it collapse. Focus moving to browser chrome (address bar, devtools) does not trigger collapse."]}),`
`,e.jsx(i,{of:u,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:f}),`
`,e.jsx(n.h3,{id:"focus-scope",children:"Focus Scope"}),`
`,e.jsxs(n.p,{children:["Wrap panel content in ",e.jsx(n.code,{children:"<FocusScope>"})," to trap focus while expanded. Tab cycles between Action A and Action B without escaping to main content. Use ",e.jsx(n.code,{children:"contain={isExpanded}"})," so trapping only applies when open."]}),`
`,e.jsx(i,{of:g,inline:!0}),`
`,e.jsx(t,{language:"tsx",code:b}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.h3,{id:"keyboard",children:"Keyboard"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Key"}),e.jsx(n.th,{children:"Action"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.code,{children:"Enter"})," / ",e.jsx(n.code,{children:"Space"})]}),e.jsx(n.td,{children:"Toggle the drawer via the trigger button"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"Tab"})}),e.jsxs(n.td,{children:["Move focus into/out of the panel (or trapped when using ",e.jsx(n.code,{children:"FocusScope"}),")"]})]})]})]}),`
`,e.jsx(n.h3,{id:"aria",children:"ARIA"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-expanded"})," on the trigger button reflects panel state (via RAC Disclosure)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"aria-controls"})," links the trigger to the panel"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'hidden="until-found"'})," on collapsed panels (browser find-in-page support)"]}),`
`,e.jsxs(n.li,{children:["Panels with ",e.jsx(n.code,{children:"minSize"})," override ",e.jsx(n.code,{children:"aria-hidden"})," to keep collapsed content accessible"]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"minSize"})," + ",e.jsx(n.code,{children:"maxSize"})," for sidebar patterns where collapsed content stays visible."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"FocusScope"})," is opt-in. Don't combine ",e.jsx(n.code,{children:"contain={true}"})," with ",e.jsx(n.code,{children:"shouldDismissOnBlur"})," (trapped focus can't leave to trigger blur)."]}),`
`,e.jsxs(n.li,{children:["Collapsed panels use ",e.jsx(n.code,{children:'hidden="until-found"'})," for browser find-in-page support. Panels with ",e.jsx(n.code,{children:"minSize"})," override this to keep content visible."]}),`
`,e.jsx(n.li,{children:"Don't nest InlineDrawers."}),`
`]})]})}function ue(r={}){const{wrapper:n}={...s(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(a,{...r})}):a(r)}export{ue as default};
