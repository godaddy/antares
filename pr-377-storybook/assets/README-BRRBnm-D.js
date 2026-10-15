import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-CPHqjS_-.js";import{a as l,c as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./collapsible.stories-CsllNQuO.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...r(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`collapsible`,children:`Collapsible`}),`
`,(0,y.jsx)(t.p,{children:`Collapsible reveals or hides a section of content beneath a heading.`}),`
`,(0,y.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsx)(t.li,{children:`Independent sections with controlled or uncontrolled expansion.`}),`
`,(0,y.jsx)(t.li,{children:`Composed headings, optional status icons, and flexible panel content.`}),`
`,(0,y.jsx)(t.li,{children:`Persistent panel content when collapsed.`}),`
`,(0,y.jsx)(t.li,{children:`Accessible keyboard interaction and button-to-panel relationships powered by React Aria Components.`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsx)(t.p,{children:`Reveal optional details without an Accordion group.`}),`
`,(0,y.jsx)(a,{of:m,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function DefaultExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible defaultExpanded={defaultExpanded}>
      <Heading level={2}>
        <Button slot="trigger">
          <Text>Advanced settings</Text>
          <Icon slot="indicator" icon="chevron-down" />
        </Button>
      </Heading>
      <CollapsiblePanel role="region">Configure additional options here.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,y.jsx)(t.p,{children:`Control a section from application state or an external action.`}),`
`,(0,y.jsx)(a,{of:f,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { useState } from 'react';
import { Button, Collapsible, CollapsiblePanel, Heading, Icon, Text, Flex } from '@godaddy/antares';

export function ControlledExample({ onChange }: { onChange?: (isExpanded: boolean) => void } = {}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Flex direction="column" gap="md">
      <Button onPress={() => setIsExpanded((value) => !value)}>Toggle details externally</Button>
      <Collapsible
        isExpanded={isExpanded}
        onExpandedChange={function handleExpandedChange(value) {
          setIsExpanded(value);
          onChange?.(value);
        }}
      >
        <Heading>
          <Button slot="trigger">
            <Text>Account details</Text>
            <Icon slot="indicator" icon="chevron-down" />
          </Button>
        </Heading>
        <CollapsiblePanel>Your account details.</CollapsiblePanel>
      </Collapsible>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`with-status`,children:`With Status`}),`
`,(0,y.jsx)(t.p,{children:`Pair a status icon with text so completion is understandable without the icon.`}),`
`,(0,y.jsx)(a,{of:p,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Collapsible, CollapsiblePanel, Heading, Icon, Text, Button } from '@godaddy/antares';

export function WithStatusExample() {
  return (
    <Collapsible defaultExpanded>
      <Heading>
        <Button slot="trigger">
          <Icon icon="checkmark" />
          <Text>Contact details (Completed)</Text>
          <Icon slot="indicator" icon="chevron-down" />
        </Button>
      </Heading>
      <CollapsiblePanel>Your contact details have been saved.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,y.jsx)(t.p,{children:`Keep unavailable details disabled, including when their content starts visible.`}),`
`,(0,y.jsx)(a,{of:d,inline:!0}),`
`,(0,y.jsx)(i,{code:`import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function DisabledExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible isDisabled defaultExpanded={defaultExpanded}>
      <Heading>
        <Button slot="trigger">
          <Text>Unavailable settings</Text>
          <Icon slot="indicator" icon="chevron-down" />
        </Button>
      </Heading>
      <CollapsiblePanel>These settings are currently unavailable.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,y.jsxs)(t.p,{children:[`Place a `,(0,y.jsx)(t.code,{children:`Heading`}),` containing `,(0,y.jsx)(t.code,{children:`Button slot="trigger"`}),` inside Collapsible, followed by CollapsiblePanel.
Add an `,(0,y.jsx)(t.code,{children:`Icon slot="indicator"`}),` inside the button for the expansion indicator. The panel accepts text,
links, forms, and other components.`]}),`
`,(0,y.jsxs)(t.p,{children:[`CollapsiblePanel provides the content spacing automatically. Use `,(0,y.jsx)(t.code,{children:`contentProps`}),` to customize its
inner container with Box spacing props, a class name, or styles:`]}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`<CollapsiblePanel contentProps={{ padding: 'sm' }}>
  Additional information.
</CollapsiblePanel>
`})}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`contentProps={{ padding: '0' }}`}),` for content without padding. Props supplied directly to
CollapsiblePanel, including `,(0,y.jsx)(t.code,{children:`className`}),`, `,(0,y.jsx)(t.code,{children:`style`}),`, and `,(0,y.jsx)(t.code,{children:`ref`}),`, apply to the outer panel.`]}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`defaultExpanded`}),` for initial expansion, or `,(0,y.jsx)(t.code,{children:`isExpanded`}),` with `,(0,y.jsx)(t.code,{children:`onExpandedChange`}),` for controlled
state. The callback receives a boolean. Use the Accordion component to coordinate several sections;
in that composition, manage expansion through the group.`]}),`
`,(0,y.jsxs)(t.p,{children:[`Use `,(0,y.jsx)(t.code,{children:`className`}),` and `,(0,y.jsx)(t.code,{children:`style`}),` to customize each component. Button supports string or state-based
`,(0,y.jsx)(t.code,{children:`className`}),` values. Components expose these data attributes for state-based styling:`]}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`Collapsible`}),`: `,(0,y.jsx)(t.code,{children:`data-expanded`}),`, `,(0,y.jsx)(t.code,{children:`data-disabled`}),`, and `,(0,y.jsx)(t.code,{children:`data-focus-visible-within`}),`.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Trigger `,(0,y.jsx)(t.code,{children:`Button`}),`: `,(0,y.jsx)(t.code,{children:`data-hovered`}),`, `,(0,y.jsx)(t.code,{children:`data-pressed`}),`, `,(0,y.jsx)(t.code,{children:`data-focus-visible`}),`, and `,(0,y.jsx)(t.code,{children:`data-disabled`}),`.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`CollapsiblePanel`}),`: `,(0,y.jsx)(t.code,{children:`data-focus-visible-within`}),`.`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(t.h3,{id:`keyboard`,children:`Keyboard`}),`
`,(0,y.jsxs)(t.table,{children:[(0,y.jsx)(t.thead,{children:(0,y.jsxs)(t.tr,{children:[(0,y.jsx)(t.th,{children:`Key`}),(0,y.jsx)(t.th,{children:`Action`})]})}),(0,y.jsxs)(t.tbody,{children:[(0,y.jsxs)(t.tr,{children:[(0,y.jsxs)(t.td,{children:[(0,y.jsx)(t.code,{children:`Tab`}),` / `,(0,y.jsx)(t.code,{children:`Shift + Tab`})]}),(0,y.jsx)(t.td,{children:`Move between the enabled trigger and controls in the expanded panel`})]}),(0,y.jsxs)(t.tr,{children:[(0,y.jsxs)(t.td,{children:[(0,y.jsx)(t.code,{children:`Enter`}),` / `,(0,y.jsx)(t.code,{children:`Space`})]}),(0,y.jsx)(t.td,{children:`Toggle the section; focus stays on the trigger`})]})]})]}),`
`,(0,y.jsx)(t.h3,{id:`aria`,children:`ARIA`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`Button slot="trigger"`}),` renders a native button with `,(0,y.jsx)(t.code,{children:`aria-expanded`}),` for its open state and
`,(0,y.jsx)(t.code,{children:`aria-controls`}),` linked to the panel automatically.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`CollapsiblePanel`}),` is labeled by its trigger through `,(0,y.jsx)(t.code,{children:`aria-labelledby`}),` automatically.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`CollapsiblePanel`}),` uses `,(0,y.jsx)(t.code,{children:`role="group"`}),` by default. Keep it when the panel's content does not need
a navigation landmark; there is no need to set it explicitly.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Set `,(0,y.jsx)(t.code,{children:`role="region"`}),` on `,(0,y.jsx)(t.code,{children:`CollapsiblePanel`}),` when its content warrants a named landmark
for direct screen-reader navigation.`]}),`
`,(0,y.jsx)(t.li,{children:`Collapsed content stays mounted but is excluded from keyboard and screen-reader navigation.`}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`Icon slot="indicator"`}),` is decorative and receives `,(0,y.jsx)(t.code,{children:`aria-hidden="true"`}),` automatically.`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsx)(t.li,{children:`Use descriptive section titles and keep essential information visible.`}),`
`,(0,y.jsx)(t.li,{children:`Choose heading levels that fit the page hierarchy and avoid deeply nested sections.`}),`
`,(0,y.jsx)(t.li,{children:`Include text for status icons so their meaning is available to screen readers.`}),`
`,(0,y.jsx)(t.li,{children:`Put links, forms, and actions inside the panel.`}),`
`,(0,y.jsx)(t.li,{children:`Open the panel before moving focus to an input that needs attention.`}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,y.jsx)(t.h3,{id:`controlled-state-not-updating`,children:`Controlled State Not Updating`}),`
`,(0,y.jsxs)(t.p,{children:[`Update `,(0,y.jsx)(t.code,{children:`isExpanded`}),` from `,(0,y.jsx)(t.code,{children:`onExpandedChange`}),`. Changing `,(0,y.jsx)(t.code,{children:`defaultExpanded`}),` after mounting does not
control expansion. Inside Accordion, update the group's `,(0,y.jsx)(t.code,{children:`expandedKeys`}),` instead.`]}),`
`,(0,y.jsx)(t.h3,{id:`trigger-not-expanding-the-panel`,children:`Trigger Not Expanding the Panel`}),`
`,(0,y.jsxs)(t.p,{children:[`Place `,(0,y.jsx)(t.code,{children:`Button slot="trigger"`}),` inside the section's Heading. A Button without that slot acts
independently and does not toggle the section.`]}),`
`,(0,y.jsx)(t.h3,{id:`input-values-persist-after-closing`,children:`Input Values Persist After Closing`}),`
`,(0,y.jsx)(t.p,{children:`Panel content stays mounted when collapsed. Reset form state explicitly when the application requires it.`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-tsx`,children:`<Collapsible>
  <Heading>
    <Button slot="trigger">
      <Text />
      <Icon slot="indicator" />
    </Button>
  </Heading>
  <CollapsiblePanel>{/* ... */}</CollapsiblePanel>
</Collapsible>;
`})}),`
`,(0,y.jsx)(t.h3,{id:`collapsible-1`,children:`Collapsible`}),`
`,(0,y.jsx)(o,{of:l}),`
`,(0,y.jsx)(t.h3,{id:`collapsiblepanel`,children:`CollapsiblePanel`}),`
`,(0,y.jsx)(o,{of:g})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=t(),n(),c(),u()})))()}b();export{v as default};