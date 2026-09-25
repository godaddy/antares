import{i as e}from"./preload-helper-C0wvdM37.js";import{F as t}from"./iframe-BUHQzdz-.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C3xwePwh.js";import{t as c}from"./mdx-react-shim-PwRoQAvl.js";import{t as l}from"./runtime-BXZUr_13.js";import{Default as u,ExplicitSize as d,Form as f,NestedScopes as p,Overlays as m,PlainHtml as h,Props as g,Sizes as _,n as v,t as y}from"./size-provider.stories-Do-Evi8L.js";function b(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:v,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`sizeprovider`,children:`SizeProvider`}),`
`,(0,S.jsx)(t.p,{children:`Sizes a section, so the text, controls, and default spacing inside it follow one size.`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`sm`}),`, `,(0,S.jsx)(t.code,{children:`md`}),`, or `,(0,S.jsx)(t.code,{children:`lg`}),` for everything inside: text, controls, and default spacing.`]}),`
`,(0,S.jsx)(t.li,{children:`The nearest scope wins, and nested scopes replace the size rather than compounding it.`}),`
`,(0,S.jsxs)(t.li,{children:[`A component's own `,(0,S.jsx)(t.code,{children:`size`}),` prop wins for that component only.`]}),`
`,(0,S.jsx)(t.li,{children:`Overlays opened inside, such as Modal and Select options, open at the scope's size even though
they render in a portal.`}),`
`,(0,S.jsxs)(t.li,{children:[`Renders no element, so it never affects layout. Only Antares components follow it; plain HTML
keeps its own typography, so put copy in `,(0,S.jsx)(t.code,{children:`Text`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Without any scope, components use `,(0,S.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Adopted so far by Text, Detail, Heading, Label, Button, TextField, TextLockup, Select, Modal,
Drawer, and Popover. Layout spacing props keep their meaning: `,(0,S.jsx)(t.code,{children:`gap="md"`}),` is the layout `,(0,S.jsx)(t.code,{children:`md`}),` gap
in any scope.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsxs)(t.p,{children:[`A scope sizes everything inside it: text, controls, and default spacing. A component's own
`,(0,S.jsx)(t.code,{children:`size`}),` still wins.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Flex, Heading, Input, Label, SizeProvider, Text, TextField, TextLockup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <SizeProvider size="sm">
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

        <Flex gap="sm" alignItems="center">
          <Button variant="primary">Update payment method</Button>
          <Button variant="primary" size="md">
            Contact support
          </Button>
        </Flex>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,S.jsxs)(t.p,{children:[`The same section at each size. Without a scope, components use `,(0,S.jsx)(t.code,{children:`md`}),`.`]}),`
`,(0,S.jsx)(i,{of:_,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Detail, Flex, Heading, SizeProvider, Text } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

export function SizesExample() {
  return (
    <Flex direction="column" gap="lg">
      {SIZES.map(function section(size) {
        return (
          <SizeProvider key={size} size={size}>
            <Flex direction="column" gap="sm" alignItems="start">
              <Heading>Size {size}</Heading>
              <Text>Body copy follows the scope.</Text>
              <Detail>Supporting copy too.</Detail>
              <Button variant="primary">Save</Button>
            </Flex>
          </SizeProvider>
        );
      })}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`form`,children:`Form`}),`
`,(0,S.jsx)(t.p,{children:`Wrap a whole form to size it at once. Fields, their labels and descriptions, choices, and
buttons all follow the scope, so they stay aligned with each other.`}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Label,
  Select,
  SelectItem,
  SelectOptions,
  SizeProvider,
  Text,
  TextField
} from '@godaddy/antares';

export function FormExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <Heading level={2}>Contact details</Heading>

        <TextField>
          <Label>Full name</Label>
          <Input />
        </TextField>

        <TextField>
          <Label>Email</Label>
          <Input type="email" />
          <Text slot="description">We'll send receipts here.</Text>
        </TextField>

        <Select placeholder="Pick a country">
          <Label>Country</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="us">United States</SelectItem>
            <SelectItem id="ca">Canada</SelectItem>
            <SelectItem id="mx">Mexico</SelectItem>
          </SelectOptions>
        </Select>

        <Checkbox>Email me about offers</Checkbox>

        <Flex gap="sm">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save</Button>
        </Flex>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`nested-scopes`,children:`Nested Scopes`}),`
`,(0,S.jsxs)(t.p,{children:[`The nearest scope wins. An inner scope replaces the outer size rather than scaling it, so an
`,(0,S.jsx)(t.code,{children:`sm`}),` section inside an `,(0,S.jsx)(t.code,{children:`lg`}),` page matches `,(0,S.jsx)(t.code,{children:`sm`}),` anywhere else.`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Button, Detail, Flex, Heading, SizeProvider, Text } from '@godaddy/antares';

export function NestedScopesExample() {
  return (
    <SizeProvider size="lg">
      <Flex direction="column" gap="md" alignItems="start">
        <Heading level={2}>Your plan</Heading>
        <Text>Premium hosting, renews on March 1.</Text>
        <Button variant="primary">Manage plan</Button>

        <SizeProvider size="sm">
          <Flex direction="column" gap="sm" alignItems="start">
            <Detail>Need less? You can switch to Basic at any time.</Detail>
            <Button variant="primary">Compare plans</Button>
          </Flex>
        </SizeProvider>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`explicit-size`,children:`Explicit Size`}),`
`,(0,S.jsxs)(t.p,{children:[`A component's own `,(0,S.jsx)(t.code,{children:`size`}),` wins for that component and every part inside it, such as a field's
label and description. Its siblings keep following the scope.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { Flex, Input, Label, SizeProvider, Text, TextField } from '@godaddy/antares';

export function ExplicitSizeExample() {
  return (
    <SizeProvider size="sm">
      <Flex direction="column" gap="md" alignItems="start">
        <TextField>
          <Label>Coupon code</Label>
          <Input />
          <Text slot="description">Follows the scope.</Text>
        </TextField>

        <TextField size="lg">
          <Label>Domain name</Label>
          <Input />
          <Text slot="description">Sized by the field.</Text>
        </TextField>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`overlays`,children:`Overlays`}),`
`,(0,S.jsxs)(t.p,{children:[`Overlays open at the size of the scope around their trigger, even though they render in a
portal. An explicit `,(0,S.jsx)(t.code,{children:`size`}),` on the owner sizes its overlay too.`]}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import {
  Button,
  ButtonGroup,
  Content,
  DatePicker,
  DatePickerCalendar,
  DateRangePicker,
  DateRangePickerCalendar,
  Flex,
  Heading,
  Label,
  Modal,
  ModalTrigger,
  Select,
  SelectItem,
  SelectOptions,
  SizeProvider,
  Text,
  Tooltip,
  TooltipTrigger
} from '@godaddy/antares';

export function OverlaysExample() {
  return (
    <SizeProvider size="sm">
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

        <DatePicker>
          <Label>Renewal date</Label>
          <Button slot="trigger" />
          <DatePickerCalendar />
        </DatePicker>

        <DateRangePicker size="lg">
          <Label>Contract dates</Label>
          <Button slot="trigger" />
          <DateRangePickerCalendar />
        </DateRangePicker>

        <ModalTrigger>
          <Button variant="primary">Edit plan</Button>
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

        <TooltipTrigger>
          <Button variant="primary">Help</Button>
          <Tooltip>Billing questions</Tooltip>
        </TooltipTrigger>
      </Flex>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`plain-html`,children:`Plain Html`}),`
`,(0,S.jsxs)(t.p,{children:[`A scope sizes Antares components only. Plain HTML keeps its own typography, so put copy in
`,(0,S.jsx)(t.code,{children:`Text`}),` to follow the scope.`]}),`
`,(0,S.jsx)(i,{of:h,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { SizeProvider, Text } from '@godaddy/antares';

export function PlainHtmlExample() {
  return (
    <SizeProvider size="lg">
      <p>A plain paragraph keeps the page's typography.</p>
      <Text>Text follows the scope.</Text>
    </SizeProvider>
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsx)(a,{of:g})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),l(),y()}))();export{x as default};