import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{a as l,c as u,d,f,i as p,l as m,n as h,o as g,p as _,r as v,s as y,t as b,u as x}from"./radio.stories-CUlMkjbH.js";function S(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{of:_,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`radio`,children:`Radio`}),`
`,(0,w.jsx)(t.p,{children:`Accessible radio button component for mutually exclusive selections with keyboard navigation, validation states, and flexible layouts.`}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsx)(t.p,{children:`A radio group with a default selection.`}),`
`,(0,w.jsx)(a,{of:v,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <RadioGroup defaultValue="basic">
      <Label>Select your plan</Label>
      <Group>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Group>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`A controlled radio group using `,(0,w.jsx)(t.code,{children:`value`}),` and `,(0,w.jsx)(t.code,{children:`onChange`}),`.`]}),`
`,(0,w.jsx)(a,{of:h,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <Label>Select your plan</Label>
        <Group>
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Group>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`horizontal-layout`,children:`Horizontal Layout`}),`
`,(0,w.jsx)(t.p,{children:`A radio group arranged horizontally.`}),`
`,(0,w.jsx)(a,{of:m,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

export function HorizontalExample() {
  return (
    <RadioGroup defaultValue="standard" orientation="horizontal">
      <Label>Select your plan</Label>
      <Group>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </Group>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,w.jsx)(t.p,{children:`Disabled group and individually disabled radio options.`}),`
`,(0,w.jsx)(a,{of:l,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Flex, Group, Label, Radio, RadioGroup } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <RadioGroup defaultValue="basic" isDisabled>
        <Label>Disabled group</Label>
        <Group>
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Group>
      </RadioGroup>

      <RadioGroup defaultValue="standard">
        <Label>Individual disabled options</Label>
        <Group>
          <Radio value="basic" isDisabled>
            Basic (disabled)
          </Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </Group>
      </RadioGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`required-indicator`,children:`Required Indicator`}),`
`,(0,w.jsx)(t.p,{children:`A required radio group with a payment method selection.`}),`
`,(0,w.jsx)(a,{of:d,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';

export function RequiredExample() {
  return (
    <RadioGroup isRequired defaultValue="credit">
      <Label>Payment method</Label>
      <Group>
        <Radio value="credit">Credit Card</Radio>
        <Radio value="paypal">PayPal</Radio>
        <Radio value="bank">Bank Transfer</Radio>
      </Group>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`description-text`,children:`Description Text`}),`
`,(0,w.jsx)(t.p,{children:`A radio group with helper description text.`}),`
`,(0,w.jsx)(a,{of:p,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup, Text } from '@godaddy/antares';

export function DescriptionExample() {
  return (
    <RadioGroup defaultValue="email">
      <Label>Notification preferences</Label>
      <Group>
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="push">Push Notifications</Radio>
      </Group>
      <Text slot="description">Choose how you'd like to receive updates</Text>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`error-state`,children:`Error State`}),`
`,(0,w.jsx)(t.p,{children:`An invalid required group displaying an error message.`}),`
`,(0,w.jsx)(a,{of:g,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { FieldError, Group, Label, Radio, RadioGroup } from '@godaddy/antares';

export function ErrorExample() {
  return (
    <RadioGroup isRequired isInvalid>
      <Label>Select shipping method</Label>
      <Group>
        <Radio value="standard">Standard Shipping</Radio>
        <Radio value="express">Express Shipping</Radio>
        <Radio value="overnight">Overnight Shipping</Radio>
      </Group>
      <FieldError>Please select a shipping method</FieldError>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`aria-label`,children:`Aria Label`}),`
`,(0,w.jsxs)(t.p,{children:[`A radio group using `,(0,w.jsx)(t.code,{children:`aria-label`}),` instead of a visible label.`]}),`
`,(0,w.jsx)(a,{of:b,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Radio, RadioGroup } from '@godaddy/antares';

export function AriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Group>
        <Radio value="newest">Newest first</Radio>
        <Radio value="oldest">Oldest first</Radio>
        <Radio value="popular">Most popular</Radio>
      </Group>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`form-submission`,children:`Form Submission`}),`
`,(0,w.jsx)(t.p,{children:`A radio group integrated with native form submission.`}),`
`,(0,w.jsx)(a,{of:y,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Group, Label, Radio, RadioGroup } from '@godaddy/antares';
import { type FormEvent, useState } from 'react';

export function FormExample() {
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('plan');
    setSubmittedValue(value != null ? String(value) : null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RadioGroup name="plan" defaultValue="standard">
          <Label>Select your plan</Label>
          <Group>
            <Radio value="basic">Basic</Radio>
            <Radio value="standard">Standard</Radio>
            <Radio value="premium">Premium</Radio>
          </Group>
        </RadioGroup>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
      {submittedValue && <p>Form submitted with value: {submittedValue}</p>}
    </>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.code,{children:`RadioGroup`}),` is composed: write `,(0,w.jsx)(t.code,{children:`Label`}),`, a `,(0,w.jsx)(t.code,{children:`Group`}),` holding the `,(0,w.jsx)(t.code,{children:`Radio`}),` items, `,(0,w.jsx)(t.code,{children:`Text slot="description"`}),`, and `,(0,w.jsx)(t.code,{children:`FieldError`}),`. The `,(0,w.jsx)(t.code,{children:`Group`}),` takes its axis, gap, and presentational role from the group's `,(0,w.jsx)(t.code,{children:`orientation`}),`, so a bare `,(0,w.jsx)(t.code,{children:`<Group>`}),` is all you need; pass your own `,(0,w.jsx)(t.code,{children:`direction`}),`/`,(0,w.jsx)(t.code,{children:`gap`}),` to lay the items out differently. Each `,(0,w.jsx)(t.code,{children:`Radio`}),` takes label text next to the indicator. `,(0,w.jsx)(t.code,{children:`orientation`}),` also sets keyboard-navigation direction and ARIA.`]}),`
`,(0,w.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,w.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`RadioGroup Container:`}),` `,(0,w.jsx)(t.code,{children:`data-invalid`}),`, `,(0,w.jsx)(t.code,{children:`data-disabled`}),`, `,(0,w.jsx)(t.code,{children:`data-required`}),`, `,(0,w.jsx)(t.code,{children:`data-readonly`}),`, `,(0,w.jsx)(t.code,{children:`data-orientation`})]}),`
`,(0,w.jsxs)(t.p,{children:[(0,w.jsx)(t.strong,{children:`Radio Button:`}),` `,(0,w.jsx)(t.code,{children:`data-selected`}),`, `,(0,w.jsx)(t.code,{children:`data-hovered`}),`, `,(0,w.jsx)(t.code,{children:`data-pressed`}),`, `,(0,w.jsx)(t.code,{children:`data-focused`}),`, `,(0,w.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-css`,children:`.my-radio-group [data-selected] {
  color: #09757a;
  font-weight: 500;
}

.my-radio-group[data-invalid] {
  border-color: #db1802;
}

.my-radio-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

.my-radio-group [data-disabled] {
  opacity: 0.4;
  cursor: not-allowed;
}
`})}),`
`,(0,w.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,w.jsxs)(t.p,{children:[`Pass `,(0,w.jsx)(t.code,{children:`className`}),` or `,(0,w.jsx)(t.code,{children:`style`}),` to customize a radio field container. Use descendant data-attribute selectors to style the interactive radio state:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup className="custom-radio-group">
  <Label>Select plan</Label>
  <Group>
    <Radio value="basic" className="custom-radio">
      Basic
    </Radio>
    <Radio value="premium" className="premium-radio">
      Premium
    </Radio>
  </Group>
</RadioGroup>
`})}),`
`,(0,w.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,w.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Tab`}),`: Moves focus to/from the radio group`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Arrow Down/Right`}),`: Move to next radio button`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Arrow Up/Left`}),`: Move to previous radio button`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Space`}),`: Select the focused radio button`]}),`
`]}),`
`,(0,w.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`role="radiogroup"`}),` on the container`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`role="radio"`}),` on each option`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`aria-checked`}),` indicates selection state`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`aria-disabled`}),` for disabled options`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`aria-required`}),` when selection is required`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`aria-invalid`}),` for validation errors`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,w.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
<RadioGroup value={value} defaultValue="basic">
  <Label>Plan</Label>
  <Group>
    <Radio value="basic">Basic</Radio>
  </Group>
</RadioGroup>

// ✅ Controlled mode
<RadioGroup value={value} onChange={setValue}>
  <Label>Plan</Label>
  <Group>
    <Radio value="basic">Basic</Radio>
  </Group>
</RadioGroup>

// ✅ Uncontrolled mode
<RadioGroup defaultValue="basic">
  <Label>Plan</Label>
  <Group>
    <Radio value="basic">Basic</Radio>
  </Group>
</RadioGroup>
`})}),`
`,(0,w.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-radio {
  color: red;
}

/* ✅ Use data attributes and className for higher specificity */
.my-radio-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,(0,w.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-radio-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,w.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,w.jsx)(t.h3,{id:`when-to-use-radio-buttons`,children:`When to Use Radio Buttons`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsx)(t.li,{children:`✅ When there are 2-7 mutually exclusive options`}),`
`,(0,w.jsx)(t.li,{children:`✅ When all options should be visible at once`}),`
`,(0,w.jsx)(t.li,{children:`✅ When the decision is important and deserves space`}),`
`,(0,w.jsx)(t.li,{children:`❌ For more than 7 options (use Select instead)`}),`
`,(0,w.jsx)(t.li,{children:`❌ For binary yes/no choices (use Checkbox or Toggle instead)`}),`
`,(0,w.jsx)(t.li,{children:`❌ When space is limited (use Select dropdown)`}),`
`]}),`
`,(0,w.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsx)(t.li,{children:`Use clear, concise labels`}),`
`,(0,w.jsx)(t.li,{children:`Keep labels short (1-3 words when possible)`}),`
`,(0,w.jsx)(t.li,{children:`Place the most common option first`}),`
`,(0,w.jsx)(t.li,{children:`Ensure labels are descriptive without being verbose`}),`
`]}),`
`,(0,w.jsx)(t.h3,{id:`validation`,children:`Validation`}),`
`,(0,w.jsx)(t.p,{children:`Always provide clear error messages:`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup isRequired isInvalid={!selectedShipping}>
  <Label>Select shipping method</Label>
  <Group>
    <Radio value="standard">Standard</Radio>
    <Radio value="express">Express</Radio>
  </Group>
  <FieldError>Please select a shipping method</FieldError>
</RadioGroup>
`})}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<RadioGroup>
  <Label />
  <Group>
    <Radio />
  </Group>
  <Text slot="description" />
  <FieldError />
</RadioGroup>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`Radio`}),` component has the following props:`]}),`
`,(0,w.jsx)(o,{of:x}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`RadioGroup`}),` component has the following props:`]}),`
`,(0,w.jsx)(o,{of:u})]})}function C(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;function T(){return(T=e((()=>{w=t(),n(),c(),f()})))()}T();export{C as default};