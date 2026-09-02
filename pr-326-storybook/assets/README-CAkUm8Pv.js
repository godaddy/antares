import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-CdbiARft.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-XGtAa86w.js";import{t as c}from"./mdx-react-shim-DzdanjaZ.js";import{t as l}from"./runtime-CCpseHws.js";import{AriaLabel as u,Controlled as d,Default as f,Description as p,Disabled as m,Error as h,Form as g,GroupProps as _,Horizontal as v,Props as y,Required as b,n as x,t as S}from"./radio.stories-UF474vEX.js";function C(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:x,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`radio`,children:`Radio`}),`
`,(0,T.jsx)(t.p,{children:`Accessible radio button component for mutually exclusive selections with keyboard navigation, validation states, and flexible layouts.`}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsx)(t.p,{children:`A radio group with a default selection.`}),`
`,(0,T.jsx)(i,{of:f,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <RadioGroup defaultValue="basic">
      <Label>Select your plan</Label>
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,T.jsxs)(t.p,{children:[`A controlled radio group using `,(0,T.jsx)(t.code,{children:`value`}),` and `,(0,T.jsx)(t.code,{children:`onChange`}),`.`]}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

export function ControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup value={selected} onChange={setSelected}>
        <Label>Select your plan</Label>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`horizontal-layout`,children:`Horizontal Layout`}),`
`,(0,T.jsx)(t.p,{children:`A radio group arranged horizontally.`}),`
`,(0,T.jsx)(i,{of:v,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup } from '@godaddy/antares';

export function HorizontalExample() {
  return (
    <RadioGroup defaultValue="standard" orientation="horizontal">
      <Label>Select your plan</Label>
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,T.jsx)(t.p,{children:`Disabled group and individually disabled radio options.`}),`
`,(0,T.jsx)(i,{of:m,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Flex, Label, Radio, RadioGroup } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <RadioGroup defaultValue="basic" isDisabled>
        <Label>Disabled group</Label>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>

      <RadioGroup defaultValue="standard">
        <Label>Individual disabled options</Label>
        <Radio value="basic" isDisabled>
          Basic (disabled)
        </Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`required-indicator`,children:`Required Indicator`}),`
`,(0,T.jsx)(t.p,{children:`A required radio group with a payment method selection.`}),`
`,(0,T.jsx)(i,{of:b,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup } from '@godaddy/antares';

export function RequiredExample() {
  return (
    <RadioGroup isRequired defaultValue="credit">
      <Label>Payment method</Label>
      <Radio value="credit">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="bank">Bank Transfer</Radio>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`description-text`,children:`Description Text`}),`
`,(0,T.jsx)(t.p,{children:`A radio group with helper description text.`}),`
`,(0,T.jsx)(i,{of:p,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup, Text } from '@godaddy/antares';

export function DescriptionExample() {
  return (
    <RadioGroup defaultValue="email">
      <Label>Notification preferences</Label>
      <Radio value="email">Email</Radio>
      <Radio value="sms">SMS</Radio>
      <Radio value="push">Push Notifications</Radio>
      <Text slot="description">Choose how you'd like to receive updates</Text>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`error-state`,children:`Error State`}),`
`,(0,T.jsx)(t.p,{children:`An invalid required group displaying an error message.`}),`
`,(0,T.jsx)(i,{of:h,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { FieldError, Label, Radio, RadioGroup } from '@godaddy/antares';

export function ErrorExample() {
  return (
    <RadioGroup isRequired isInvalid>
      <Label>Select shipping method</Label>
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
      <Radio value="overnight">Overnight Shipping</Radio>
      <FieldError>Please select a shipping method</FieldError>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`aria-label`,children:`Aria Label`}),`
`,(0,T.jsxs)(t.p,{children:[`A radio group using `,(0,T.jsx)(t.code,{children:`aria-label`}),` instead of a visible label.`]}),`
`,(0,T.jsx)(i,{of:u,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Radio, RadioGroup } from '@godaddy/antares';

export function AriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Radio value="newest">Newest first</Radio>
      <Radio value="oldest">Oldest first</Radio>
      <Radio value="popular">Most popular</Radio>
    </RadioGroup>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`form-submission`,children:`Form Submission`}),`
`,(0,T.jsx)(t.p,{children:`A radio group integrated with native form submission.`}),`
`,(0,T.jsx)(i,{of:g,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { Label, Radio, RadioGroup } from '@godaddy/antares';
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
          <Radio value="basic">Basic</Radio>
          <Radio value="standard">Standard</Radio>
          <Radio value="premium">Premium</Radio>
        </RadioGroup>
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
      {submittedValue && <p>Form submitted with value: {submittedValue}</p>}
    </>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.code,{children:`RadioGroup`}),` is composed: pass `,(0,T.jsx)(t.code,{children:`Label`}),`, the `,(0,T.jsx)(t.code,{children:`Radio`}),` items, `,(0,T.jsx)(t.code,{children:`Text slot="description"`}),`, and `,(0,T.jsx)(t.code,{children:`FieldError`}),`. The items are wrapped in a `,(0,T.jsx)(t.code,{children:`Group`}),` for you - wrap them yourself when you need to lay them out differently. Each `,(0,T.jsx)(t.code,{children:`Radio`}),` takes label text next to the indicator. `,(0,T.jsx)(t.code,{children:`orientation`}),` sets keyboard-navigation direction, ARIA, and the item layout.`]}),`
`,(0,T.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,T.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.strong,{children:`RadioGroup Container:`}),` `,(0,T.jsx)(t.code,{children:`data-invalid`}),`, `,(0,T.jsx)(t.code,{children:`data-disabled`}),`, `,(0,T.jsx)(t.code,{children:`data-required`}),`, `,(0,T.jsx)(t.code,{children:`data-readonly`}),`, `,(0,T.jsx)(t.code,{children:`data-orientation`})]}),`
`,(0,T.jsxs)(t.p,{children:[(0,T.jsx)(t.strong,{children:`Radio Button:`}),` `,(0,T.jsx)(t.code,{children:`data-selected`}),`, `,(0,T.jsx)(t.code,{children:`data-hovered`}),`, `,(0,T.jsx)(t.code,{children:`data-pressed`}),`, `,(0,T.jsx)(t.code,{children:`data-focused`}),`, `,(0,T.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`.my-radio-group [data-selected] {
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
`,(0,T.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,T.jsxs)(t.p,{children:[`Pass `,(0,T.jsx)(t.code,{children:`className`}),` or `,(0,T.jsx)(t.code,{children:`style`}),` to customize a radio field container. Use descendant data-attribute selectors to style the interactive radio state:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup className="custom-radio-group">
  <Label>Select plan</Label>
  <Radio value="basic" className="custom-radio">
    Basic
  </Radio>
  <Radio value="premium" className="premium-radio">
    Premium
  </Radio>
</RadioGroup>
`})}),`
`,(0,T.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,T.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Tab`}),`: Moves focus to/from the radio group`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Arrow Down/Right`}),`: Move to next radio button`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Arrow Up/Left`}),`: Move to previous radio button`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Space`}),`: Select the focused radio button`]}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`role="radiogroup"`}),` on the container`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`role="radio"`}),` on each option`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-checked`}),` indicates selection state`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-disabled`}),` for disabled options`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-required`}),` when selection is required`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`aria-invalid`}),` for validation errors`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,T.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
<RadioGroup value={value} defaultValue="basic">
  <Label>Plan</Label>
  <Radio value="basic">Basic</Radio>
</RadioGroup>

// ✅ Controlled mode
<RadioGroup value={value} onChange={setValue}>
  <Label>Plan</Label>
  <Radio value="basic">Basic</Radio>
</RadioGroup>

// ✅ Uncontrolled mode
<RadioGroup defaultValue="basic">
  <Label>Plan</Label>
  <Radio value="basic">Basic</Radio>
</RadioGroup>
`})}),`
`,(0,T.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-radio {
  color: red;
}

/* ✅ Use data attributes and className for higher specificity */
.my-radio-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,(0,T.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-radio-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,T.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,T.jsx)(t.h3,{id:`when-to-use-radio-buttons`,children:`When to Use Radio Buttons`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`✅ When there are 2-7 mutually exclusive options`}),`
`,(0,T.jsx)(t.li,{children:`✅ When all options should be visible at once`}),`
`,(0,T.jsx)(t.li,{children:`✅ When the decision is important and deserves space`}),`
`,(0,T.jsx)(t.li,{children:`❌ For more than 7 options (use Select instead)`}),`
`,(0,T.jsx)(t.li,{children:`❌ For binary yes/no choices (use Checkbox or Toggle instead)`}),`
`,(0,T.jsx)(t.li,{children:`❌ When space is limited (use Select dropdown)`}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsx)(t.li,{children:`Use clear, concise labels`}),`
`,(0,T.jsx)(t.li,{children:`Keep labels short (1-3 words when possible)`}),`
`,(0,T.jsx)(t.li,{children:`Place the most common option first`}),`
`,(0,T.jsx)(t.li,{children:`Ensure labels are descriptive without being verbose`}),`
`]}),`
`,(0,T.jsx)(t.h3,{id:`validation`,children:`Validation`}),`
`,(0,T.jsx)(t.p,{children:`Always provide clear error messages:`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup isRequired isInvalid={!selectedShipping}>
  <Label>Select shipping method</Label>
  <Radio value="standard">Standard</Radio>
  <Radio value="express">Express</Radio>
  <FieldError>Please select a shipping method</FieldError>
</RadioGroup>
`})}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`Radio`}),` component has the following props:`]}),`
`,(0,T.jsx)(a,{of:y}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`RadioGroup`}),` component has the following props:`]}),`
`,(0,T.jsx)(a,{of:_})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),l(),S()}))();export{w as default};