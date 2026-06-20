import{i as e}from"./preload-helper-DOdH0sfz.js";import{y as t}from"./iframe-bpPIrQxj.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C8eHxHmm.js";import{t as c}from"./mdx-react-shim-Cu2ESsbd.js";import{Basic as l,Controlled as u,Disabled as d,Icon as f,IconOnly as p,Overflow as m,Props as h,RTL as g,Sizes as _,n as v,t as y}from"./segmented-controller.stories-CdgyjdBo.js";var b,x=e((()=>{b=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
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
`})),S,C=e((()=>{S=`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
`})),w,T=e((()=>{w=`import { SegmentedController, SegmentedControllerItem, Flex } from '@godaddy/antares';

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
`})),E,D=e((()=>{E=`import { Flex, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
`})),O,k=e((()=>{O=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function BasicExample() {
  return (
    <SegmentedController aria-label="View" defaultValue="day">
      <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
      <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
      <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
    </SegmentedController>
  );
}
`})),A,j=e((()=>{A=`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
`})),M,N=e((()=>{M=`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
`})),P,F=e((()=>{P=`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { OverflowExample } from './overflow.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <OverflowExample />
    </RTLProvider>
  );
}
`}));function I(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(o,{of:v,name:`Overview`}),`
`,(0,R.jsx)(t.h1,{id:`segmentedcontroller`,children:`SegmentedController`}),`
`,(0,R.jsx)(t.p,{children:`A segmented controller is a linear set of two or more segments, each of which functions as a button. A segmented controller allows users to select options, switch views, or sort elements.`}),`
`,(0,R.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,R.jsx)(t.pre,{children:(0,R.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,R.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,R.jsx)(a,{of:h}),`
`,(0,R.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,R.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,R.jsxs)(t.p,{children:[`An uncontrolled segmented controller with a default selection. The component manages its own state internally via `,(0,R.jsx)(t.code,{children:`defaultValue`}),`.`]}),`
`,(0,R.jsx)(i,{of:l,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:O}),`
`,(0,R.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,R.jsxs)(t.p,{children:[`Use `,(0,R.jsx)(t.code,{children:`value`}),` and `,(0,R.jsx)(t.code,{children:`onSelectionChange`}),` to fully control the selected segment from parent state.`]}),`
`,(0,R.jsx)(i,{of:u,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:b}),`
`,(0,R.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,R.jsxs)(t.p,{children:[`Three sizes are available: `,(0,R.jsx)(t.code,{children:`sm`}),`, `,(0,R.jsx)(t.code,{children:`md`}),` (default), and `,(0,R.jsx)(t.code,{children:`lg`}),`.`]}),`
`,(0,R.jsx)(i,{of:_,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:E}),`
`,(0,R.jsx)(t.h3,{id:`icon--text`,children:`Icon + Text`}),`
`,(0,R.jsxs)(t.p,{children:[`Segments can include an `,(0,R.jsx)(t.code,{children:`Icon`}),` alongside text for added visual context.`]}),`
`,(0,R.jsx)(i,{of:f,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:A}),`
`,(0,R.jsx)(t.h3,{id:`icon-only`,children:`Icon Only`}),`
`,(0,R.jsxs)(t.p,{children:[`For compact layouts, segments can contain only icons. Provide an `,(0,R.jsx)(t.code,{children:`aria-label`}),` on each item so screen readers can identify the action.`]}),`
`,(0,R.jsx)(i,{of:p,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:S}),`
`,(0,R.jsx)(t.h3,{id:`overflow`,children:`Overflow`}),`
`,(0,R.jsx)(t.p,{children:`When the number of options exceeds the width of the container, the component automatically shows scroll buttons to let users navigate. Users can also scroll horizontally to navigate the options.`}),`
`,(0,R.jsx)(i,{of:m,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:M}),`
`,(0,R.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,R.jsxs)(t.p,{children:[`The segmented controller follows the current `,(0,R.jsx)(t.strong,{children:`layout direction`}),` (LTR or RTL). By default, that direction is detected automatically from the browser or system settings.`]}),`
`,(0,R.jsx)(i,{of:g,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:P}),`
`,(0,R.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,R.jsxs)(t.p,{children:[`Disable the entire group with `,(0,R.jsx)(t.code,{children:`isDisabled`}),` on the container, or disable individual segments with `,(0,R.jsx)(t.code,{children:`isDisabled`}),` on specific items.`]}),`
`,(0,R.jsx)(i,{of:d,inline:!0}),`
`,(0,R.jsx)(r,{language:`tsx`,code:w}),`
`,(0,R.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,R.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,R.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,R.jsxs)(t.p,{children:[(0,R.jsx)(t.strong,{children:`SegmentedController Container:`}),` `,(0,R.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,R.jsxs)(t.p,{children:[(0,R.jsx)(t.strong,{children:`SegmentedControllerItem:`}),` `,(0,R.jsx)(t.code,{children:`data-selected`}),`, `,(0,R.jsx)(t.code,{children:`data-hovered`}),`, `,(0,R.jsx)(t.code,{children:`data-pressed`}),`, `,(0,R.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,R.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,R.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,R.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,R.jsxs)(t.ul,{children:[`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.strong,{children:`Tab`}),`: Moves focus to/from the segmented controller`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.strong,{children:`Arrow Left/Right`}),`: Move to next/previous segment`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.strong,{children:`Space/Enter`}),`: Select the focused segment`]}),`
`]}),`
`,(0,R.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,R.jsxs)(t.ul,{children:[`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.code,{children:`role="radiogroup"`}),` on the container`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.code,{children:`role="radio"`}),` on each segment`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.code,{children:`aria-checked`}),` indicates selection state`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.code,{children:`aria-disabled`}),` for disabled segments`]}),`
`,(0,R.jsxs)(t.li,{children:[(0,R.jsx)(t.code,{children:`aria-label`}),` required on the container for screen readers`]}),`
`]}),`
`,(0,R.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,R.jsx)(t.h3,{id:`when-to-use-a-segmented-controller`,children:`When to Use a Segmented Controller`}),`
`,(0,R.jsxs)(t.ul,{children:[`
`,(0,R.jsx)(t.li,{children:`When switching between 2-5 related views within the same context`}),`
`,(0,R.jsx)(t.li,{children:`When all options should be visible at once`}),`
`,(0,R.jsx)(t.li,{children:`When the selection immediately changes the displayed content`}),`
`]}),`
`,(0,R.jsx)(t.h3,{id:`when-not-to-use`,children:`When Not to Use`}),`
`,(0,R.jsxs)(t.ul,{children:[`
`,(0,R.jsx)(t.li,{children:`For more than 5 options (use Tabs or Select instead)`}),`
`,(0,R.jsx)(t.li,{children:`For form input (use RadioGroup instead)`}),`
`]})]})}function L(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,R.jsx)(t,{...e,children:(0,R.jsx)(I,{...e})}):I(e)}var R;e((()=>{R=t(),c(),s(),x(),C(),T(),D(),k(),j(),N(),F(),y()}))();export{L as default};