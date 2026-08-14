import{i as e}from"./preload-helper-Bb7i_SVf.js";import{y as t}from"./iframe-OA1rneRr.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-KKQq45ao.js";import{t as c}from"./mdx-react-shim-DbOVepbS.js";import{Controlled as l,Default as u,Disabled as d,Icon as f,IconOnly as p,Overflow as m,Props as h,RTL as g,Sizes as _,n as v,t as y}from"./segmented-controller.stories-DAezj1tE.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`segmentedcontroller`,children:`SegmentedController`}),`
`,(0,S.jsx)(t.p,{children:`A segmented controller is a linear set of two or more segments, each of which functions as a button. A segmented controller allows users to select options, switch views, or sort elements.`}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`An uncontrolled segmented controller with a default selection. The component manages its own state internally via `,(0,S.jsx)(t.code,{children:`defaultValue`}),`.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <SegmentedController aria-label="View" defaultValue="day">
      <SegmentedControllerItem value="day">Day</SegmentedControllerItem>
      <SegmentedControllerItem value="week">Week</SegmentedControllerItem>
      <SegmentedControllerItem value="month">Month</SegmentedControllerItem>
    </SegmentedController>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,S.jsxs)(t.p,{children:[`Use `,(0,S.jsx)(t.code,{children:`value`}),` and `,(0,S.jsx)(t.code,{children:`onSelectionChange`}),` to fully control the selected segment from parent state.`]}),`
`,(0,S.jsx)(i,{of:l,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';
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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`Three sizes are available: `,(0,S.jsx)(t.code,{children:`sm`}),`, `,(0,S.jsx)(t.code,{children:`md`}),` (default), and `,(0,S.jsx)(t.code,{children:`lg`}),`.`]}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Flex, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`icon--text`,children:`Icon + Text`}),`
`,(0,S.jsxs)(t.p,{children:[`Segments can include an `,(0,S.jsx)(t.code,{children:`Icon`}),` alongside text for added visual context.`]}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`icon-only`,children:`Icon Only`}),`
`,(0,S.jsxs)(t.p,{children:[`For compact layouts, segments can contain only icons. Provide an `,(0,S.jsx)(t.code,{children:`aria-label`}),` on each item so screen readers can identify the action.`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Icon, SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`overflow`,children:`Overflow`}),`
`,(0,S.jsx)(t.p,{children:`When the number of options exceeds the width of the container, the component automatically shows scroll buttons to let users navigate. Users can also scroll horizontally to navigate the options.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { SegmentedController, SegmentedControllerItem } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`rtl-direction`,children:`RTL Direction`}),`
`,(0,S.jsx)(t.p,{children:`The segmented controller follows the current layout direction (LTR or RTL), detected automatically from the browser or system settings.`}),`
`,(0,S.jsx)(i,{of:g,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { OverflowExample } from './overflow.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <OverflowExample />
    </RTLProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,S.jsxs)(t.p,{children:[`Disable the entire group with `,(0,S.jsx)(t.code,{children:`isDisabled`}),` on the container, or disable individual segments with `,(0,S.jsx)(t.code,{children:`isDisabled`}),` on specific items.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { SegmentedController, SegmentedControllerItem, Flex } from '@godaddy/antares';

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
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,S.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.strong,{children:`SegmentedController Container:`}),` `,(0,S.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.strong,{children:`SegmentedControllerItem:`}),` `,(0,S.jsx)(t.code,{children:`data-selected`}),`, `,(0,S.jsx)(t.code,{children:`data-hovered`}),`, `,(0,S.jsx)(t.code,{children:`data-pressed`}),`, `,(0,S.jsx)(t.code,{children:`data-focus-visible`}),`, `,(0,S.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Tab`}),`: Moves focus to/from the segmented controller`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Arrow Left/Right`}),`: Move to next/previous segment`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.strong,{children:`Space/Enter`}),`: Select the focused segment`]}),`
`]}),`
`,(0,S.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`role="radiogroup"`}),` on the container`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`role="radio"`}),` on each segment`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-checked`}),` indicates selection state`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-disabled`}),` for disabled segments`]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`aria-label`}),` required on the container for screen readers`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsx)(t.h3,{id:`when-to-use-a-segmented-controller`,children:`When to Use a Segmented Controller`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`When switching between 2-5 related views within the same context`}),`
`,(0,S.jsx)(t.li,{children:`When all options should be visible at once`}),`
`,(0,S.jsx)(t.li,{children:`When the selection immediately changes the displayed content`}),`
`]}),`
`,(0,S.jsx)(t.h3,{id:`when-not-to-use`,children:`When Not to Use`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`For more than 5 options (use Tabs or Select instead)`}),`
`,(0,S.jsx)(t.li,{children:`For form input (use RadioGroup instead)`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(a,{of:h})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),y()}))();export{x as default};