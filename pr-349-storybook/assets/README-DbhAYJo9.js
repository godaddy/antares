import{i as e}from"./preload-helper-CWTa06Vb.js";import{F as t}from"./iframe-nDimo5W-.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DQ7yJgOj.js";import{t as c}from"./mdx-react-shim-BuiGUll5.js";import{t as l}from"./runtime-Bn9Cmkgz.js";import{CollapsiblePanelProps as u,Controlled as d,Default as f,Disabled as p,LongContent as m,Props as h,WithStatus as g,n as _,t as v}from"./collapsible.stories-BJsx3EnL.js";function y(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`collapsible`,children:`Collapsible`}),`
`,(0,x.jsx)(t.p,{children:`Collapsible reveals or hides a section of content beneath a heading.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Independent sections with controlled or uncontrolled expansion.`}),`
`,(0,x.jsx)(t.li,{children:`Composed headings, optional status icons, and flexible panel content.`}),`
`,(0,x.jsx)(t.li,{children:`Persistent panel content when collapsed.`}),`
`,(0,x.jsx)(t.li,{children:`Accessible keyboard interaction and button-to-panel relationships powered by React Aria Components.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`Reveal optional details without an Accordion group.`}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function DefaultExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible defaultExpanded={defaultExpanded}>
      <Heading level={2}>
        <Button slot="trigger">
          <Text>Advanced settings</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel role="region">Configure additional options here.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,x.jsx)(t.p,{children:`Control a section from application state or an external action.`}),`
`,(0,x.jsx)(i,{of:d,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { useState } from 'react';
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
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Your account details.</CollapsiblePanel>
      </Collapsible>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`with-status`,children:`With Status`}),`
`,(0,x.jsx)(t.p,{children:`Pair a status icon with text so completion is understandable without the icon.`}),`
`,(0,x.jsx)(i,{of:g,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Collapsible, CollapsiblePanel, Heading, Icon, Text, Button } from '@godaddy/antares';

export function WithStatusExample() {
  return (
    <Collapsible defaultExpanded>
      <Heading>
        <Button slot="trigger">
          <Icon icon="checkmark" aria-hidden="true" />
          <Text>Contact details (Completed)</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>Your contact details have been saved.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsx)(t.p,{children:`Keep unavailable details disabled, including when their content starts visible.`}),`
`,(0,x.jsx)(i,{of:p,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function DisabledExample({ defaultExpanded = false }: { defaultExpanded?: boolean } = {}) {
  return (
    <Collapsible isDisabled defaultExpanded={defaultExpanded}>
      <Heading>
        <Button slot="trigger">
          <Text>Unavailable settings</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>These settings are currently unavailable.</CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`long-content`,children:`Long Content`}),`
`,(0,x.jsx)(t.p,{children:`Long labels wrap and content grows naturally at narrow widths and larger text sizes.`}),`
`,(0,x.jsx)(i,{of:m,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Collapsible, CollapsiblePanel, Heading, Text, Button, Icon } from '@godaddy/antares';

export function LongContentExample() {
  return (
    <Collapsible defaultExpanded>
      <Heading>
        <Button slot="trigger">
          <Text>How do I transfer a domain when my account name and the domain name are both very long?</Text>
          <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
        </Button>
      </Heading>
      <CollapsiblePanel>
        <Text>
          Check your contact information, unlock the domain, and request an authorization code from your current
          provider.
        </Text>
        <Text>
          Keep a copy of your confirmation email. You can return to these instructions while the transfer is processing.
        </Text>
        <Text>Reference: exceptionally-long-domain-name-without-spaces-for-testing.example</Text>
      </CollapsiblePanel>
    </Collapsible>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.p,{children:[`Place a `,(0,x.jsx)(t.code,{children:`Heading`}),` containing `,(0,x.jsx)(t.code,{children:`Button slot="trigger"`}),` inside Collapsible, followed by CollapsiblePanel.
Add an `,(0,x.jsx)(t.code,{children:`Icon slot="indicator"`}),` inside the button for the expansion indicator. The panel accepts text,
links, forms, and other components.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`defaultExpanded`}),` for initial expansion, or `,(0,x.jsx)(t.code,{children:`isExpanded`}),` with `,(0,x.jsx)(t.code,{children:`onExpandedChange`}),` for controlled
state. The callback receives a boolean. Use `,(0,x.jsx)(t.a,{href:`../accordion/README.mdx`,children:`Accordion`}),` to coordinate several
sections; in that composition, manage expansion through the group.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`className`}),` and `,(0,x.jsx)(t.code,{children:`style`}),` to customize each component. Button supports string or state-based
`,(0,x.jsx)(t.code,{children:`className`}),` values. Components expose these data attributes for state-based styling:`]}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`Collapsible`}),`: `,(0,x.jsx)(t.code,{children:`data-expanded`}),`, `,(0,x.jsx)(t.code,{children:`data-disabled`}),`, and `,(0,x.jsx)(t.code,{children:`data-focus-visible-within`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Trigger `,(0,x.jsx)(t.code,{children:`Button`}),`: `,(0,x.jsx)(t.code,{children:`data-hovered`}),`, `,(0,x.jsx)(t.code,{children:`data-pressed`}),`, `,(0,x.jsx)(t.code,{children:`data-focus-visible`}),`, and `,(0,x.jsx)(t.code,{children:`data-disabled`}),`.`]}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`CollapsiblePanel`}),`: `,(0,x.jsx)(t.code,{children:`data-focus-visible-within`}),`.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.p,{children:[`Choose a Heading level that fits the page hierarchy and use descriptive trigger text. React Aria connects
the trigger and panel through `,(0,x.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,x.jsx)(t.code,{children:`aria-controls`}),`, and `,(0,x.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,x.jsxs)(t.table,{children:[(0,x.jsx)(t.thead,{children:(0,x.jsxs)(t.tr,{children:[(0,x.jsx)(t.th,{children:`Key`}),(0,x.jsx)(t.th,{children:`Action`})]})}),(0,x.jsxs)(t.tbody,{children:[(0,x.jsxs)(t.tr,{children:[(0,x.jsxs)(t.td,{children:[(0,x.jsx)(t.code,{children:`Tab`}),` / `,(0,x.jsx)(t.code,{children:`Shift + Tab`})]}),(0,x.jsx)(t.td,{children:`Moves between available controls.`})]}),(0,x.jsxs)(t.tr,{children:[(0,x.jsxs)(t.td,{children:[(0,x.jsx)(t.code,{children:`Enter`}),` / `,(0,x.jsx)(t.code,{children:`Space`})]}),(0,x.jsx)(t.td,{children:`Expands or collapses the focused section.`})]})]})]}),`
`,(0,x.jsx)(t.p,{children:`Disabled triggers are excluded from the tab order. Collapsed panel content stays mounted but is
excluded from keyboard and accessibility navigation. Opening a panel keeps focus on its trigger.
If application logic closes a panel containing focus, move focus to a visible control.`}),`
`,(0,x.jsxs)(t.p,{children:[`Keep the indicator decorative with `,(0,x.jsx)(t.code,{children:`aria-hidden="true"`}),`. If an optional icon communicates status,
include equivalent text in the label. Place links, inputs, and additional buttons in the panel.
Use `,(0,x.jsx)(t.code,{children:`role="region"`}),` on CollapsiblePanel when its content warrants a named landmark.`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Use descriptive section titles and keep essential information visible.`}),`
`,(0,x.jsx)(t.li,{children:`Keep headings concise and avoid deeply nested sections.`}),`
`,(0,x.jsx)(t.li,{children:`Put links, forms, and actions inside the panel.`}),`
`,(0,x.jsx)(t.li,{children:`Open the panel before moving focus to an input that needs attention.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsx)(t.h3,{id:`controlled-state-not-updating`,children:`Controlled State Not Updating`}),`
`,(0,x.jsxs)(t.p,{children:[`Update `,(0,x.jsx)(t.code,{children:`isExpanded`}),` from `,(0,x.jsx)(t.code,{children:`onExpandedChange`}),`. Changing `,(0,x.jsx)(t.code,{children:`defaultExpanded`}),` after mounting does not
control expansion. Inside Accordion, update the group's `,(0,x.jsx)(t.code,{children:`expandedKeys`}),` instead.`]}),`
`,(0,x.jsx)(t.h3,{id:`trigger-not-expanding-the-panel`,children:`Trigger Not Expanding the Panel`}),`
`,(0,x.jsxs)(t.p,{children:[`Place `,(0,x.jsx)(t.code,{children:`Button slot="trigger"`}),` inside the section's Heading. A Button without that slot acts
independently and does not toggle the section.`]}),`
`,(0,x.jsx)(t.h3,{id:`input-values-persist-after-closing`,children:`Input Values Persist After Closing`}),`
`,(0,x.jsx)(t.p,{children:`Panel content stays mounted when collapsed. Reset form state explicitly when the application requires it.`}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Collapsible>
  <Heading>
    <Button slot="trigger">
      <Text />
      <Icon slot="indicator" />
    </Button>
  </Heading>
  <CollapsiblePanel>{/* ... */}</CollapsiblePanel>
</Collapsible>;
`})}),`
`,(0,x.jsx)(t.h3,{id:`collapsible-1`,children:`Collapsible`}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsx)(t.h3,{id:`collapsiblepanel`,children:`CollapsiblePanel`}),`
`,(0,x.jsx)(a,{of:u})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),l(),_()}))();export{b as default};