import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-C9TrGnTe.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DOwjN0XH.js";import{t as c}from"./mdx-react-shim-CSfbNQ3w.js";import{t as l}from"./runtime-BXZUr_13.js";import{BareContent as u,Default as d,Overlays as f,Props as p,Sizes as m,n as h,t as g}from"./size-scope.stories-D6V7E9NC.js";function _(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(o,{of:h,name:`Overview`}),`
`,(0,y.jsx)(t.h1,{id:`sizescope`,children:`SizeScope`}),`
`,(0,y.jsx)(t.p,{children:`Sizes a section, so the text, controls, and default spacing inside it follow one size.`}),`
`,(0,y.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`sm`}),`, `,(0,y.jsx)(t.code,{children:`md`}),`, or `,(0,y.jsx)(t.code,{children:`lg`}),` for everything inside: text, controls, and default spacing.`]}),`
`,(0,y.jsx)(t.li,{children:`The nearest scope wins, and nested scopes replace the size rather than compounding it.`}),`
`,(0,y.jsxs)(t.li,{children:[`A component's own `,(0,y.jsx)(t.code,{children:`size`}),` prop wins for that component only.`]}),`
`,(0,y.jsx)(t.li,{children:`Overlays opened inside, such as Modal and Select options, open at the scope's size even though
they render in a portal.`}),`
`,(0,y.jsxs)(t.li,{children:[`Renders a real element (`,(0,y.jsx)(t.code,{children:`div`}),` by default, or `,(0,y.jsx)(t.code,{children:`as`}),`), so bare text and ordinary HTML follow it too.
It is not a layout component; compose `,(0,y.jsx)(t.code,{children:`Flex`}),` or `,(0,y.jsx)(t.code,{children:`Grid`}),` inside it.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Without any scope, components use `,(0,y.jsx)(t.code,{children:`md`}),`. Render one at the app root to give unsized text its body
typography.`]}),`
`,(0,y.jsxs)(t.li,{children:[`Adopted so far by Text, Detail, Heading, Label, Button, TextField, TextLockup, Select, Modal,
Drawer, and Popover. Layout spacing props keep their meaning: `,(0,y.jsx)(t.code,{children:`gap="md"`}),` is the layout `,(0,y.jsx)(t.code,{children:`md`}),` gap
in any scope.`]}),`
`]}),`
`,(0,y.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,y.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,y.jsxs)(t.p,{children:[`A scope sizes everything inside it: text, controls, and default spacing. A component's own
`,(0,y.jsx)(t.code,{children:`size`}),` still wins, here on the second button.`]}),`
`,(0,y.jsx)(i,{of:d,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Button, Flex, Heading, Input, Label, SizeScope, Text, TextField, TextLockup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <SizeScope size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <TextLockup>
          <Heading slot="title" level={2}>
            Billing
          </Heading>
          <Text slot="body">Manage your payment methods.</Text>
        </TextLockup>

        <TextField>
          <Label>Email</Label>
          <Input />
          <Text slot="description">We'll send receipts here.</Text>
        </TextField>

        <Flex gap="sm">
          <Button>Update payment method</Button>
          <Button size="md">Contact support</Button>
        </Flex>
      </Flex>
    </SizeScope>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,y.jsxs)(t.p,{children:[`The same section at each size. Without a scope, components use `,(0,y.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,y.jsx)(i,{of:m,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { Button, Detail, Flex, Heading, SizeScope, Text } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

export function SizesExample() {
  return (
    <Flex direction="column" gap="lg">
      {SIZES.map(function section(size) {
        return (
          <SizeScope key={size} size={size} as="section">
            <Flex direction="column" gap="sm" alignItems="start">
              <Heading>Size {size}</Heading>
              <Text>Body copy follows the scope.</Text>
              <Detail>Supporting copy too.</Detail>
              <Button variant="primary">Save</Button>
            </Flex>
          </SizeScope>
        );
      })}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`overlays`,children:`Overlays`}),`
`,(0,y.jsxs)(t.p,{children:[`Overlays open at the size of the scope around their trigger, even though they render in a
portal. An explicit `,(0,y.jsx)(t.code,{children:`size`}),` on the owner sizes its overlay too.`]}),`
`,(0,y.jsx)(i,{of:f,inline:!0}),`
`,(0,y.jsx)(r,{code:`import {
  Button,
  ButtonGroup,
  Content,
  Flex,
  Heading,
  Label,
  Modal,
  ModalTrigger,
  Select,
  SelectItem,
  SelectOptions,
  SizeScope,
  Text
} from '@godaddy/antares';

export function OverlaysExample() {
  return (
    <SizeScope size="sm">
      <Flex gap="md" alignItems="end" wrap="wrap">
        <Select placeholder="Pick a plan">
          <Label>Plan</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="basic">Basic</SelectItem>
            <SelectItem id="pro">Pro</SelectItem>
          </SelectOptions>
        </Select>

        <Select size="lg" placeholder="Pick a region">
          <Label>Region</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="us">United States</SelectItem>
            <SelectItem id="eu">Europe</SelectItem>
          </SelectOptions>
        </Select>

        <ModalTrigger>
          <Button>Edit plan</Button>
          <Modal>
            <Heading slot="title">Edit plan</Heading>
            <Content>
              <Text>Changes apply at the next billing cycle.</Text>
            </Content>
            <ButtonGroup>
              <Button slot="close">Cancel</Button>
              <Button slot="close" variant="primary">
                Save
              </Button>
            </ButtonGroup>
          </Modal>
        </ModalTrigger>
      </Flex>
    </SizeScope>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h3,{id:`bare-content`,children:`Bare Content`}),`
`,(0,y.jsxs)(t.p,{children:[`A scope renders a real element, so bare text and ordinary HTML inside it follow its size too.
Use `,(0,y.jsx)(t.code,{children:`as="span"`}),` around inline content.`]}),`
`,(0,y.jsx)(i,{of:u,inline:!0}),`
`,(0,y.jsx)(r,{code:`import { SizeScope, Text } from '@godaddy/antares';

export function BareContentExample() {
  return (
    <SizeScope size="lg">
      <p>A plain paragraph takes the scope's body typography.</p>
      <Text>
        Your trial ends{' '}
        <SizeScope as="span" size="sm">
          in 3 days
        </SizeScope>
        .
      </Text>
    </SizeScope>
  );
}`,language:`tsx`}),`
`,(0,y.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,y.jsx)(a,{of:p})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;e((()=>{y=t(),c(),s(),l(),g()}))();export{v as default};