import{j as e}from"./iframe-ClWTPl5x.js";import{u as i,M as d,A as s,a as n,S as o}from"./blocks-DG6eLz6l.js";import{S as a,P as m,B as c,C as g,a as h,I as u,b as x,O as p,R as S,D as C}from"./segmented-controller.stories-D2QWvFgA.js";import"./preload-helper-PPVm8Dsz.js";import"./index-GsngMiyr.js";import"./index-DUACdkfR.js";import"./index-BbqJLgpW.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./SelectionIndicator-CvH_SVyg.js";import"./Text-BH8NBewb.js";import"./mergeProps-BJpXx4bB.js";import"./SSRProvider-CfbBhIjL.js";import"./useObjectRef-Bmub13Bc.js";import"./useButton-Ii2SQuDq.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFocusable-DEJIEQ8h.js";import"./useEffectEvent-BVbYnPFx.js";import"./useGlobalListeners-BnImAHxc.js";import"./DOMFunctions-1-yhhTt0.js";import"./useHover-BR_Y-GQi.js";import"./platform-DTNzKOdA.js";import"./usePress-D6HH4oj5.js";import"./FocusScope-nc0k0ZO2.js";import"./I18nProvider-Dzi0B1IC.js";import"./useControlledState-dyoyjkUJ.js";import"./useToggleState-BcpOOpEa.js";import"./useFocusRing-CqVf9l6b.js";import"./useFocusWithin-CrR9OGu2.js";import"./index-CIRxvt8Z.js";import"./index-iqTyB0XZ.js";import"./index-C-Rv7Pva.js";import"./Button-JYLAdiGx.js";import"./Hidden-DuHvqV4_.js";import"./index-BDKdxbl8.js";import"./index-D8m644f2.js";import"./index-2bjkk-qr.js";import"./slots-C-wNTvaf.js";import"./index-Ckd9fOVu.js";import"./index-CLj43KZG.js";import"./index-DzS4bbTN.js";import"./index-B3IMV5iP.js";import"./create-external-store-TtP3UJpK.js";import"./index-KhMAmn8o.js";import"./client-DYqE1Xvq.js";import"./index-BcDzO8sH.js";import"./rtl-locale-provider-BGVbvsjP.js";const j=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState('week');

  return (
    <>
      <SegmentedController aria-label="View" value={selected} onSelectionChange={setSelected}>
        <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
      </SegmentedController>
      <p>Current selection: {selected}</p>
    </>
  );
}
`,I=`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function IconOnlyExample() {
  return (
    <SegmentedController aria-label="Layout">
      <SegmentedControllerItem value="list" aria-label="List view">
        <Icon icon="bulleted-list" />
      </SegmentedControllerItem>
      <SegmentedControllerItem value="grid" aria-label="Grid view">
        <Icon icon="grid" />
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
`,f=`import { SegmentedController, SegmentedControllerItem, Flex } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="sm" alignItems="start">
      <label>Disabled group</label>
      <SegmentedController aria-label="Disabled group" isDisabled defaultValue="day">
        <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
      </SegmentedController>

      <label>Individual disabled</label>
      <SegmentedController aria-label="Individual disabled" defaultValue="day">
        <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
        <SegmentedControllerItem value="week" isDisabled>
          Week
        </SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
      </SegmentedController>
    </Flex>
  );
}
`,v=`import { Flex, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function SizesExample() {
  return (
    <Flex direction="column" gap="lg" alignItems="start">
      <SegmentedController aria-label="View (small)" size="sm" defaultValue="day">
        <SegmentedControllerItem value="day">Day sm</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week sm</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month sm</SegmentedControllerItem>
      </SegmentedController>

      <SegmentedController aria-label="View (medium)" size="md" defaultValue="day">
        <SegmentedControllerItem value="day">Day md</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week md</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month md</SegmentedControllerItem>
      </SegmentedController>

      <SegmentedController aria-label="View (large)" size="lg" defaultValue="day">
        <SegmentedControllerItem value="day">Day lg</SegmentedControllerItem>
        <SegmentedControllerItem value="week">Week lg</SegmentedControllerItem>
        <SegmentedControllerItem value="month">Month lg</SegmentedControllerItem>
      </SegmentedController>
    </Flex>
  );
}
`,b=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function BasicExample() {
  return (
    <SegmentedController aria-label="View" defaultValue="day">
      <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
      <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
      <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
    </SegmentedController>
  );
}
`,y=`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function IconExample() {
  return (
    <SegmentedController aria-label="Layout" defaultValue="list">
      <SegmentedControllerItem value="list">
        <Icon icon="bulleted-list" />
        List
      </SegmentedControllerItem>
      <SegmentedControllerItem value="grid">
        <Icon icon="grid" />
        Grid
      </SegmentedControllerItem>
    </SegmentedController>
  );
}
`,w=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function OverflowExample({ maxWidth = '300px' }: { maxWidth?: string }) {
  return (
    <SegmentedController aria-label="Category" defaultValue="electronics" style={{ maxWidth }}>
      <SegmentedControllerItem value="electronics">Electronics</SegmentedControllerItem>
      <SegmentedControllerItem value="clothing">Clothing</SegmentedControllerItem>
      <SegmentedControllerItem value="home">Home</SegmentedControllerItem>
      <SegmentedControllerItem value="sports">Sports</SegmentedControllerItem>
      <SegmentedControllerItem value="toys">Toys</SegmentedControllerItem>
    </SegmentedController>
  );
}
`,D=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { OverflowExample } from './overflow.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <OverflowExample />
    </RTLProvider>
  );
}
`;function r(l){const t={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a,name:"Overview"}),`
`,e.jsx(t.h1,{id:"segmentedcontroller",children:"SegmentedController"}),`
`,e.jsx(t.p,{children:"A segmented controller is a linear set of two or more segments, each of which functions as a button. A segmented controller allows users to select options, switch views, or sort elements."}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"basic",children:"Basic"}),`
`,e.jsxs(t.p,{children:["An uncontrolled segmented controller with a default selection. The component manages its own state internally via ",e.jsx(t.code,{children:"defaultValue"}),"."]}),`
`,e.jsx(n,{of:c,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:b}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onSelectionChange"})," to fully control the selected segment from parent state."]}),`
`,e.jsx(n,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:j}),`
`,e.jsx(t.h3,{id:"sizes",children:"Sizes"}),`
`,e.jsxs(t.p,{children:["Three sizes are available: ",e.jsx(t.code,{children:"sm"}),", ",e.jsx(t.code,{children:"md"})," (default), and ",e.jsx(t.code,{children:"lg"}),"."]}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(t.h3,{id:"icon--text",children:"Icon + Text"}),`
`,e.jsxs(t.p,{children:["Segments can include an ",e.jsx(t.code,{children:"Icon"})," alongside text for added visual context."]}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(t.h3,{id:"icon-only",children:"Icon Only"}),`
`,e.jsxs(t.p,{children:["For compact layouts, segments can contain only icons. Provide an ",e.jsx(t.code,{children:"aria-label"})," on each item so screen readers can identify the action."]}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:I}),`
`,e.jsx(t.h3,{id:"overflow",children:"Overflow"}),`
`,e.jsx(t.p,{children:"When the number of options exceeds the width of the container, the component automatically shows scroll buttons to let users navigate. Users can also scroll horizontally to navigate the options."}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:w}),`
`,e.jsx(t.h3,{id:"rtl-direction",children:"RTL Direction"}),`
`,e.jsxs(t.p,{children:["The segmented controller follows the current ",e.jsx(t.strong,{children:"layout direction"})," (LTR or RTL). By default, that direction is detected automatically from the browser or system settings."]}),`
`,e.jsx(n,{of:S,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:D}),`
`,e.jsx(t.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsxs(t.p,{children:["Disable the entire group with ",e.jsx(t.code,{children:"isDisabled"})," on the container, or disable individual segments with ",e.jsx(t.code,{children:"isDisabled"})," on specific items."]}),`
`,e.jsx(n,{of:C,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(t.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(t.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(t.p,{children:"Components automatically add data attributes for styling different states:"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"SegmentedController Container:"})," ",e.jsx(t.code,{children:"data-disabled"})]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"SegmentedControllerItem:"})," ",e.jsx(t.code,{children:"data-selected"}),", ",e.jsx(t.code,{children:"data-hovered"}),", ",e.jsx(t.code,{children:"data-pressed"}),", ",e.jsx(t.code,{children:"data-focus-visible"}),", ",e.jsx(t.code,{children:"data-disabled"})]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Tab"}),": Moves focus to/from the segmented controller"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Arrow Left/Right"}),": Move to next/previous segment"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Space/Enter"}),": Select the focused segment"]}),`
`]}),`
`,e.jsx(t.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'role="radiogroup"'})," on the container"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:'role="radio"'})," on each segment"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"aria-checked"})," indicates selection state"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"aria-disabled"})," for disabled segments"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"aria-label"})," required on the container for screen readers"]}),`
`]}),`
`,e.jsx(t.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(t.h3,{id:"when-to-use-a-segmented-controller",children:"When to Use a Segmented Controller"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"When switching between 2-5 related views within the same context"}),`
`,e.jsx(t.li,{children:"When all options should be visible at once"}),`
`,e.jsx(t.li,{children:"When the selection immediately changes the displayed content"}),`
`]}),`
`,e.jsx(t.h3,{id:"when-not-to-use",children:"When Not to Use"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"For more than 5 options (use Tabs or Select instead)"}),`
`,e.jsx(t.li,{children:"For form input (use RadioGroup instead)"}),`
`]})]})}function Ie(l={}){const{wrapper:t}={...i(),...l.components};return t?e.jsx(t,{...l,children:e.jsx(r,{...l})}):r(l)}export{Ie as default};
