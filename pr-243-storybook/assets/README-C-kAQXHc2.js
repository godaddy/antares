import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-CNDmUKd7.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-OKPNOdlK.js";import{t as c}from"./mdx-react-shim-CgwinoHn.js";import{AriaLabel as l,Basic as u,Controlled as d,Description as f,Disabled as p,Form as m,GroupProps as h,Horizontal as g,Props as _,Required as v,ValidationError as y,n as b,t as x}from"./radio.stories-fuzEnDUc.js";var S,C=e((()=>{S=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioDescriptionExample() {
  return (
    <RadioGroup
      label="Notification preferences"
      description="Choose how you'd like to receive updates"
      defaultValue="email"
    >
      <Radio value="email">Email</Radio>
      <Radio value="sms">SMS</Radio>
      <Radio value="push">Push Notifications</Radio>
    </RadioGroup>
  );
}
`})),w,T=e((()=>{w=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioHorizontalExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="standard" orientation="horizontal">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
`})),E,D=e((()=>{E=`import { Radio, RadioGroup } from '@godaddy/antares';
import { useState } from 'react';

export function RadioControlledExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <>
      <RadioGroup label="Select your plan" value={selected} onChange={setSelected}>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
      <p>Current selection: {selected}</p>
    </>
  );
}
`})),O,k=e((()=>{O=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioAriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Radio value="newest">Newest first</Radio>
      <Radio value="oldest">Oldest first</Radio>
      <Radio value="popular">Most popular</Radio>
    </RadioGroup>
  );
}
`})),A,j=e((()=>{A=`import { Radio, RadioGroup, Flex } from '@godaddy/antares';

export function RadioDisabledExample() {
  return (
    <Flex direction="column" gap="md">
      <RadioGroup label="Disabled group" defaultValue="basic" isDisabled>
        <Radio value="basic">Basic</Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>

      <RadioGroup label="Individual disabled options" defaultValue="standard">
        <Radio value="basic" isDisabled>
          Basic (disabled)
        </Radio>
        <Radio value="standard">Standard</Radio>
        <Radio value="premium">Premium</Radio>
      </RadioGroup>
    </Flex>
  );
}
`})),M,N=e((()=>{M=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioRequiredExample() {
  return (
    <RadioGroup label="Payment method" isRequired defaultValue="credit">
      <Radio value="credit">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="bank">Bank Transfer</Radio>
    </RadioGroup>
  );
}
`})),P,F=e((()=>{P=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioBasicExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="basic">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
`})),I,L=e((()=>{I=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioErrorExample() {
  return (
    <RadioGroup label="Select shipping method" isRequired isInvalid errorMessage="Please select a shipping method">
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
      <Radio value="overnight">Overnight Shipping</Radio>
    </RadioGroup>
  );
}
`})),R,z=e((()=>{R=`import { Radio, RadioGroup } from '@godaddy/antares';
import { type FormEvent, useState } from 'react';

export function RadioFormExample() {
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get('plan');
    setSubmittedValue(value != null ? String(value) : null);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <RadioGroup name="plan" label="Select your plan" defaultValue="standard">
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
}
`}));function B(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,H.jsxs)(H.Fragment,{children:[(0,H.jsx)(o,{of:b,name:`Overview`}),`
`,(0,H.jsx)(t.h1,{id:`radio`,children:`Radio`}),`
`,(0,H.jsx)(t.p,{children:`Accessible radio button component for mutually exclusive selections with keyboard navigation, validation states, and flexible layouts.`}),`
`,(0,H.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-bash`,children:`npm install --save @godaddy/antares
`})}),`
`,(0,H.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,H.jsxs)(t.p,{children:[`The `,(0,H.jsx)(t.code,{children:`Radio`}),` component has the following props:`]}),`
`,(0,H.jsx)(a,{of:_}),`
`,(0,H.jsxs)(t.p,{children:[`The `,(0,H.jsx)(t.code,{children:`RadioGroup`}),` component has the following props:`]}),`
`,(0,H.jsx)(a,{of:h}),`
`,(0,H.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,H.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,H.jsx)(i,{of:u,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:P}),`
`,(0,H.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,H.jsx)(i,{of:d,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:E}),`
`,(0,H.jsx)(t.h3,{id:`horizontal-layout`,children:`Horizontal Layout`}),`
`,(0,H.jsx)(i,{of:g,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:w}),`
`,(0,H.jsx)(t.h3,{id:`disabled-states`,children:`Disabled States`}),`
`,(0,H.jsx)(i,{of:p,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:A}),`
`,(0,H.jsx)(t.h3,{id:`required-indicator`,children:`Required Indicator`}),`
`,(0,H.jsx)(i,{of:v,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:M}),`
`,(0,H.jsx)(t.h3,{id:`description-text`,children:`Description Text`}),`
`,(0,H.jsx)(i,{of:f,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:S}),`
`,(0,H.jsx)(t.h3,{id:`error-state`,children:`Error State`}),`
`,(0,H.jsx)(i,{of:y,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:I}),`
`,(0,H.jsx)(t.h3,{id:`aria-label`,children:`Aria Label`}),`
`,(0,H.jsx)(i,{of:l,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:O}),`
`,(0,H.jsx)(t.h3,{id:`form-submission`,children:`Form Submission`}),`
`,(0,H.jsx)(i,{of:m,inline:!0}),`
`,(0,H.jsx)(r,{language:`tsx`,code:R}),`
`,(0,H.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,H.jsx)(t.h3,{id:`data-attributes`,children:`Data Attributes`}),`
`,(0,H.jsx)(t.p,{children:`Components automatically add data attributes for styling different states:`}),`
`,(0,H.jsxs)(t.p,{children:[(0,H.jsx)(t.strong,{children:`RadioGroup Container:`}),` `,(0,H.jsx)(t.code,{children:`data-invalid`}),`, `,(0,H.jsx)(t.code,{children:`data-disabled`}),`, `,(0,H.jsx)(t.code,{children:`data-required`}),`, `,(0,H.jsx)(t.code,{children:`data-readonly`}),`, `,(0,H.jsx)(t.code,{children:`data-orientation`})]}),`
`,(0,H.jsxs)(t.p,{children:[(0,H.jsx)(t.strong,{children:`Radio Button:`}),` `,(0,H.jsx)(t.code,{children:`data-selected`}),`, `,(0,H.jsx)(t.code,{children:`data-hovered`}),`, `,(0,H.jsx)(t.code,{children:`data-pressed`}),`, `,(0,H.jsx)(t.code,{children:`data-focused`}),`, `,(0,H.jsx)(t.code,{children:`data-disabled`})]}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-css`,children:`.my-radio-group [data-selected] {
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
`,(0,H.jsx)(t.h3,{id:`component-customization`,children:`Component Customization`}),`
`,(0,H.jsxs)(t.p,{children:[`Individual components can be styled by passing `,(0,H.jsx)(t.code,{children:`className`}),` props:`]}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup label="Select plan" className="custom-radio-group">
  <Radio value="basic" className="custom-radio">
    Basic
  </Radio>
  <Radio value="premium" className="premium-radio">
    Premium
  </Radio>
</RadioGroup>
`})}),`
`,(0,H.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,H.jsx)(t.h3,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.strong,{children:`Tab`}),`: Moves focus to/from the radio group`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.strong,{children:`Arrow Down/Right`}),`: Move to next radio button`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.strong,{children:`Arrow Up/Left`}),`: Move to previous radio button`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.strong,{children:`Space`}),`: Select the focused radio button`]}),`
`]}),`
`,(0,H.jsx)(t.h3,{id:`aria-support`,children:`ARIA Support`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`role="radiogroup"`}),` on the container`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`role="radio"`}),` on each option`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`aria-checked`}),` indicates selection state`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`aria-disabled`}),` for disabled options`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`aria-required`}),` when selection is required`]}),`
`,(0,H.jsxs)(t.li,{children:[(0,H.jsx)(t.code,{children:`aria-invalid`}),` for validation errors`]}),`
`]}),`
`,(0,H.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,H.jsx)(t.h3,{id:`selection-not-updating`,children:`Selection Not Updating`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-jsx`,children:`// ❌ Wrong: Using both value and defaultValue
<RadioGroup value={value} defaultValue="basic">
  <Radio value="basic">Basic</Radio>
</RadioGroup>

// ✅ Controlled mode
<RadioGroup value={value} onChange={setValue}>
  <Radio value="basic">Basic</Radio>
</RadioGroup>

// ✅ Uncontrolled mode
<RadioGroup defaultValue="basic">
  <Radio value="basic">Basic</Radio>
</RadioGroup>
`})}),`
`,(0,H.jsx)(t.h3,{id:`styling-overrides-not-applying`,children:`Styling Overrides Not Applying`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-css`,children:`/* ❌ May not have enough specificity */
.my-custom-radio {
  color: red;
}

/* ✅ Use data attributes and className for higher specificity */
.my-radio-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,(0,H.jsx)(t.h3,{id:`keyboard-navigation-not-working`,children:`Keyboard Navigation Not Working`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-css`,children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-radio-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,(0,H.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,H.jsx)(t.h3,{id:`when-to-use-radio-buttons`,children:`When to Use Radio Buttons`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsx)(t.li,{children:`✅ When there are 2-7 mutually exclusive options`}),`
`,(0,H.jsx)(t.li,{children:`✅ When all options should be visible at once`}),`
`,(0,H.jsx)(t.li,{children:`✅ When the decision is important and deserves space`}),`
`,(0,H.jsx)(t.li,{children:`❌ For more than 7 options (use Select instead)`}),`
`,(0,H.jsx)(t.li,{children:`❌ For binary yes/no choices (use Checkbox or Toggle instead)`}),`
`,(0,H.jsx)(t.li,{children:`❌ When space is limited (use Select dropdown)`}),`
`]}),`
`,(0,H.jsx)(t.h3,{id:`label-guidelines`,children:`Label Guidelines`}),`
`,(0,H.jsxs)(t.ul,{children:[`
`,(0,H.jsx)(t.li,{children:`Use clear, concise labels`}),`
`,(0,H.jsx)(t.li,{children:`Keep labels short (1-3 words when possible)`}),`
`,(0,H.jsx)(t.li,{children:`Place the most common option first`}),`
`,(0,H.jsx)(t.li,{children:`Ensure labels are descriptive without being verbose`}),`
`]}),`
`,(0,H.jsx)(t.h3,{id:`validation`,children:`Validation`}),`
`,(0,H.jsx)(t.p,{children:`Always provide clear error messages:`}),`
`,(0,H.jsx)(t.pre,{children:(0,H.jsx)(t.code,{className:`language-jsx`,children:`<RadioGroup
  label="Select shipping method"
  isRequired
  isInvalid={!selectedShipping}
  errorMessage="Please select a shipping method"
>
  <Radio value="standard">Standard</Radio>
  <Radio value="express">Express</Radio>
</RadioGroup>
`})})]})}function V(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,H.jsx)(t,{...e,children:(0,H.jsx)(B,{...e})}):B(e)}var H;e((()=>{H=t(),c(),s(),C(),T(),D(),k(),j(),N(),F(),L(),z(),x()}))();export{V as default};