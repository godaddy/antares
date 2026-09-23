import{i as e}from"./preload-helper-CWTa06Vb.js";import{F as t}from"./iframe-nDimo5W-.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DQ7yJgOj.js";import{t as c}from"./mdx-react-shim-BuiGUll5.js";import{t as l}from"./runtime-Bn9Cmkgz.js";import{Controlled as u,Default as d,Disabled as f,FormSteps as p,Multiple as m,Nested as h,Props as g,n as _,t as v}from"./accordion.stories-DZNam6qp.js";function y(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`accordion`,children:`Accordion`}),`
`,(0,x.jsx)(t.p,{children:`Accordion coordinates related collapsible sections with single or multiple expansion.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Single or multiple expanded sections.`}),`
`,(0,x.jsx)(t.li,{children:`Controlled and uncontrolled group state.`}),`
`,(0,x.jsx)(t.li,{children:`Group-level disabled state.`}),`
`,(0,x.jsx)(t.li,{children:`Composable sections using Collapsible and CollapsiblePanel.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`one-section-at-a-time`,children:`One section at a time`}),`
`,(0,x.jsx)(t.p,{children:`Let people explore short answers one at a time.`}),`
`,(0,x.jsx)(i,{of:d,inline:!0}),`
`,(0,x.jsx)(r,{code:`import {
  Accordion,
  Collapsible,
  CollapsiblePanel,
  Heading,
  Text,
  Button,
  Icon,
  type AccordionProps
} from '@godaddy/antares';

export function DefaultExample({
  defaultExpandedKeys = ['domains']
}: Pick<AccordionProps, 'defaultExpandedKeys'> = {}) {
  return (
    <Accordion allowsMultipleExpanded={false} defaultExpandedKeys={defaultExpandedKeys}>
      <Collapsible id="domains">
        <Heading>
          <Button slot="trigger">
            <Text>Can I transfer my domain?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Text>Yes. Start your transfer from the Domains page.</Text>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="renewal">
        <Heading>
          <Button slot="trigger">
            <Text>How does renewal work?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Text>Enable automatic renewal in your account settings.</Text>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="privacy">
        <Heading>
          <Button slot="trigger">
            <Text>Is domain privacy included?</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Domain privacy helps keep your personal contact information private.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`multiple-sections-open`,children:`Multiple sections open`}),`
`,(0,x.jsx)(t.p,{children:`Keep related answers visible together when people need to compare information.`}),`
`,(0,x.jsx)(i,{of:m,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Accordion, Button, Collapsible, CollapsiblePanel, Heading, Icon, Text } from '@godaddy/antares';

export function MultipleExample() {
  return (
    <Accordion allowsMultipleExpanded defaultExpandedKeys={['shipping', 'returns']}>
      <Collapsible id="shipping">
        <Heading>
          <Button slot="trigger">
            <Text>Shipping</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Most orders arrive within two business days.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="returns">
        <Heading>
          <Button slot="trigger">
            <Text>Returns</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Return eligible items within thirty days.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="tracking">
        <Heading>
          <Button slot="trigger">
            <Text>Tracking</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Track your order from the confirmation email.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,x.jsx)(t.p,{children:`Coordinate expanded sections with application state in either expansion mode.`}),`
`,(0,x.jsx)(i,{of:u,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { useState } from 'react';
import {
  Accordion,
  Button,
  Collapsible,
  CollapsiblePanel,
  Flex,
  Heading,
  Text,
  Icon,
  type AccordionProps
} from '@godaddy/antares';

export function ControlledExample({
  onChange,
  allowsMultipleExpanded = false
}: {
  onChange?: AccordionProps['onExpandedChange'];
  allowsMultipleExpanded?: boolean;
} = {}) {
  const [keys, setKeys] = useState<Set<string | number>>(new Set(['account']));
  return (
    <Flex direction="column" gap="md">
      <Button onPress={() => setKeys(new Set())}>Close all sections</Button>
      <Text>Open panels: {[...keys].join(', ') || 'none'}</Text>
      <Accordion
        allowsMultipleExpanded={allowsMultipleExpanded}
        expandedKeys={keys}
        onExpandedChange={function handleExpandedChange(next) {
          setKeys(next);
          onChange?.(next);
        }}
      >
        <Collapsible id="account">
          <Heading>
            <Button slot="trigger">
              <Text>Account</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Manage your account information.</CollapsiblePanel>
        </Collapsible>
        <Collapsible id="billing">
          <Heading>
            <Button slot="trigger">
              <Text>Billing</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Manage payment methods.</CollapsiblePanel>
        </Collapsible>
        <Collapsible id="notifications">
          <Heading>
            <Button slot="trigger">
              <Text>Notifications</Text>
              <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
            </Button>
          </Heading>
          <CollapsiblePanel>Choose how you receive account updates.</CollapsiblePanel>
        </Collapsible>
      </Accordion>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsx)(t.p,{children:`Keep unavailable options visible and explain the reason in their label.`}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Accordion, Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function DisabledExample({ isGroupDisabled = false }: { isGroupDisabled?: boolean } = {}) {
  return (
    <Accordion isDisabled={isGroupDisabled}>
      <Collapsible id="basic">
        <Heading>
          <Button slot="trigger">
            <Text>Basic plan</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Features included with your plan.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="premium" isDisabled>
        <Heading>
          <Button slot="trigger">
            <Text>Premium plan (Upgrade required)</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Additional premium features.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="enterprise" isDisabled>
        <Heading>
          <Button slot="trigger">
            <Text>Enterprise plan (Contact sales)</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Contact our sales team for a plan tailored to your business.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`form-steps`,children:`Form Steps`}),`
`,(0,x.jsx)(t.p,{children:`Break a single-page form into steps while keeping entered values mounted.`}),`
`,(0,x.jsx)(i,{of:p,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { useRef, useState } from 'react';
import {
  Accordion,
  Button,
  Collapsible,
  CollapsiblePanel,
  Flex,
  Heading,
  Input,
  Label,
  TextField,
  Icon,
  Text
} from '@godaddy/antares';

export function FormStepsExample() {
  const [keys, setKeys] = useState<Set<string | number>>(new Set(['contact']));
  const paymentTrigger = useRef<HTMLButtonElement>(null);
  return (
    <Accordion allowsMultipleExpanded={false} expandedKeys={keys} onExpandedChange={setKeys}>
      <Collapsible id="contact">
        <Heading>
          <Button slot="trigger">
            <Text>Contact details</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Flex direction="column" gap="md">
            <TextField>
              <Label>Name</Label>
              <Input />
            </TextField>
            <Button
              onPress={function continueToPayment() {
                paymentTrigger.current?.focus();
                setKeys(new Set(['payment']));
              }}
            >
              Continue to payment
            </Button>
          </Flex>
        </CollapsiblePanel>
      </Collapsible>
      <Collapsible id="payment">
        <Heading>
          <Button slot="trigger" ref={paymentTrigger}>
            <Text>Payment details</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Review your payment details before submitting.</CollapsiblePanel>
      </Collapsible>
      <Collapsible id="review">
        <Heading>
          <Button slot="trigger">
            <Text>Review and submit</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>Check your contact and payment details before submitting.</CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`nested`,children:`Nested`}),`
`,(0,x.jsx)(t.p,{children:`Nested sections keep independent state. Prefer a flatter structure when possible.`}),`
`,(0,x.jsx)(i,{of:h,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Accordion, Collapsible, CollapsiblePanel, Heading, Button, Icon, Text } from '@godaddy/antares';

export function NestedExample() {
  return (
    <Accordion defaultExpandedKeys={['outer']}>
      <Collapsible id="outer">
        <Heading level={2}>
          <Button slot="trigger">
            <Text>Outer question</Text>
            <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
          </Button>
        </Heading>
        <CollapsiblePanel>
          <Collapsible>
            <Heading>
              <Button slot="trigger">
                <Text>Independent detail</Text>
                <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
              </Button>
            </Heading>
            <CollapsiblePanel>Independent answer.</CollapsiblePanel>
          </Collapsible>
          <Accordion>
            <Collapsible id="inner">
              <Heading>
                <Button slot="trigger">
                  <Text>Inner question</Text>
                  <Icon slot="indicator" icon="chevron-down" aria-hidden="true" />
                </Button>
              </Heading>
              <CollapsiblePanel>Inner answer.</CollapsiblePanel>
            </Collapsible>
          </Accordion>
        </CollapsiblePanel>
      </Collapsible>
    </Accordion>
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,x.jsxs)(t.p,{children:[`Compose related `,(0,x.jsx)(t.code,{children:`Collapsible`}),` sections inside Accordion. Give each section a stable, unique `,(0,x.jsx)(t.code,{children:`id`}),`.
See `,(0,x.jsx)(t.a,{href:`../collapsible/README.mdx`,children:`Collapsible`}),` for the section anatomy, panel content, and trigger styling.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`defaultExpandedKeys`}),` for initial expansion, or `,(0,x.jsx)(t.code,{children:`expandedKeys`}),` with `,(0,x.jsx)(t.code,{children:`onExpandedChange`}),` for
controlled state. Keys must match the section IDs; the callback receives a `,(0,x.jsx)(t.code,{children:`Set`}),` of expanded keys.
By default, only one section can stay open. Set `,(0,x.jsx)(t.code,{children:`allowsMultipleExpanded`}),` to keep several open.
Both behaviors are shown in the examples.`]}),`
`,(0,x.jsxs)(t.p,{children:[`Use `,(0,x.jsx)(t.code,{children:`className`}),` and `,(0,x.jsx)(t.code,{children:`style`}),` to customize the group container. `,(0,x.jsx)(t.code,{children:`data-disabled`}),` reflects the group's
disabled state. Customize individual headings, triggers, and panels on the composed Collapsible sections.`]}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.p,{children:[`Each section provides its own heading and button-to-panel relationship. Choose heading levels that
fit the page hierarchy. The `,(0,x.jsx)(t.a,{href:`../collapsible/README.mdx#accessibility`,children:`Collapsible accessibility guidance`}),`
covers keyboard interaction, focus, and status icons.`]}),`
`,(0,x.jsxs)(t.p,{children:[`To identify the whole accordion as a named group, provide `,(0,x.jsx)(t.code,{children:`role="group"`}),` together with `,(0,x.jsx)(t.code,{children:`aria-label`}),`
or `,(0,x.jsx)(t.code,{children:`aria-labelledby`}),`. Setting `,(0,x.jsx)(t.code,{children:`isDisabled`}),` on Accordion disables every section's trigger.`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Group related sections and keep essential information visible outside the accordion.`}),`
`,(0,x.jsx)(t.li,{children:`Use multiple expansion when users need to compare information across sections.`}),`
`,(0,x.jsx)(t.li,{children:`Keep item IDs stable when reordering or filtering data.`}),`
`,(0,x.jsx)(t.li,{children:`Manage expansion on Accordion when sections belong to a group.`}),`
`,(0,x.jsx)(t.li,{children:`Keep form validation and step progression in application logic.`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsx)(t.h3,{id:`controlled-state-not-updating`,children:`Controlled State Not Updating`}),`
`,(0,x.jsxs)(t.p,{children:[`Update `,(0,x.jsx)(t.code,{children:`expandedKeys`}),` from `,(0,x.jsx)(t.code,{children:`onExpandedChange`}),` and make sure the keys match the item IDs.
Changing `,(0,x.jsx)(t.code,{children:`defaultExpandedKeys`}),` after mounting does not control expansion.`]}),`
`,(0,x.jsx)(t.h3,{id:`sections-close-when-another-opens`,children:`Sections Close When Another Opens`}),`
`,(0,x.jsxs)(t.p,{children:[`Enable `,(0,x.jsx)(t.code,{children:`allowsMultipleExpanded`}),` when several sections should remain open together.
For a single independent section, use Collapsible without an Accordion.`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`<Accordion>
  <Collapsible>
    <Heading>
      <Button slot="trigger">
        <Text />
        <Icon slot="indicator" />
      </Button>
    </Heading>
    <CollapsiblePanel>{/* ... */}</CollapsiblePanel>
  </Collapsible>
</Accordion>;
`})}),`
`,(0,x.jsx)(a,{of:g})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),l(),_()}))();export{b as default};