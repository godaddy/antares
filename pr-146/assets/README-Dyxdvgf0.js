import{j as e}from"./iframe-6GaXOUaT.js";import{useMDXComponents as r}from"./index-Cf9r2Gk8.js";import{M as t,A as s,a,S as o}from"./blocks-6xSex4GH.js";import{S as l,P as c,B as u,C as p,H as m,D as h,R as x,a as R,V as j,A as g,F as b}from"./radio.stories-DDvzJMsP.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bj9gKbGQ.js";import"./index-CMgpeNKa.js";import"./index-D8j4FsKY.js";import"./index-DrFu-skq.js";import"./index-BZHpy5ln.js";import"./index-C_3Vx422.js";import"./clsx-CgyFOmLt.js";import"./index-D-r1tqzZ.js";import"./mergeProps-DIoepj2e.js";import"./useObjectRef-GZJVnHfU.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-CEGxrnOL.js";import"./useFocusWithin-Qx4aKUdm.js";import"./platform-BULRNHlZ.js";import"./useFocusable-DZQjtpTF.js";import"./Collection-D4gn1lMD.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-VoVYMqej.js";import"./context-45Edcitn.js";import"./useControlledState-B9NBlRKo.js";import"./useOverlayTriggerState-C348ZOJT.js";import"./PortalProvider-lDXbK3q3.js";import"./usePreventScroll-DuxZLyfb.js";import"./useLabel-_TylngYe.js";import"./VisuallyHidden-C2Ucj3xH.js";import"./useField-CjNNHvIE.js";import"./useButton-CudY5WVT.js";import"./index-F36OoBR6.js";import"./index-DEOF3SdA.js";import"./slots-BRJ0SIrG.js";import"./index-U4fMboO0.js";import"./index-CLj43KZG.js";import"./index-BPiTBM6K.js";import"./index-C1FmEf8O.js";import"./create-external-store-TtP3UJpK.js";import"./index-N-5CbV7O.js";import"./client-BKBN4TYK.js";import"./index-cr67a0mC.js";import"./index-RfYcw_2-.js";import"./useRadioGroupState-BCHaJJ7J.js";const v=`import { Radio, RadioGroup } from '@godaddy/antares';

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
`,f=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioHorizontalExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="standard" orientation="horizontal">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
`,y=`import { Radio, RadioGroup } from '@godaddy/antares';
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
`,S=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioAriaLabelExample() {
  return (
    <RadioGroup aria-label="Sort order" defaultValue="newest">
      <Radio value="newest">Newest first</Radio>
      <Radio value="oldest">Oldest first</Radio>
      <Radio value="popular">Most popular</Radio>
    </RadioGroup>
  );
}
`,G=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioDisabledExample() {
  return (
    <>
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
    </>
  );
}
`,w=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioRequiredExample() {
  return (
    <RadioGroup label="Payment method" isRequired defaultValue="credit">
      <Radio value="credit">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="bank">Bank Transfer</Radio>
    </RadioGroup>
  );
}
`,E=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioBasicExample() {
  return (
    <RadioGroup label="Select your plan" defaultValue="basic">
      <Radio value="basic">Basic</Radio>
      <Radio value="standard">Standard</Radio>
      <Radio value="premium">Premium</Radio>
    </RadioGroup>
  );
}
`,C=`import { Radio, RadioGroup } from '@godaddy/antares';

export function RadioErrorExample() {
  return (
    <RadioGroup label="Select shipping method" isRequired isInvalid errorMessage="Please select a shipping method">
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
      <Radio value="overnight">Overnight Shipping</Radio>
    </RadioGroup>
  );
}
`,D=`import { Radio, RadioGroup } from '@godaddy/antares';
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
`;function d(n){const i={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l,name:"Overview"}),`
`,e.jsx(i.h1,{id:"radio",children:"Radio"}),`
`,e.jsx(i.p,{children:"Accessible radio button component for mutually exclusive selections with keyboard navigation, validation states, and flexible layouts."}),`
`,e.jsx(i.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(i.h2,{id:"props",children:"Props"}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(i.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(i.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(a,{of:u,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:E}),`
`,e.jsx(i.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsx(a,{of:p,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:y}),`
`,e.jsx(i.h3,{id:"horizontal-layout",children:"Horizontal Layout"}),`
`,e.jsx(a,{of:m,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:f}),`
`,e.jsx(i.h3,{id:"disabled-states",children:"Disabled States"}),`
`,e.jsx(a,{of:h,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:G}),`
`,e.jsx(i.h3,{id:"required-indicator",children:"Required Indicator"}),`
`,e.jsx(a,{of:x,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:w}),`
`,e.jsx(i.h3,{id:"description-text",children:"Description Text"}),`
`,e.jsx(a,{of:R,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:v}),`
`,e.jsx(i.h3,{id:"error-state",children:"Error State"}),`
`,e.jsx(a,{of:j,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:C}),`
`,e.jsx(i.h3,{id:"aria-label",children:"Aria Label"}),`
`,e.jsx(a,{of:g,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:S}),`
`,e.jsx(i.h3,{id:"form-submission",children:"Form Submission"}),`
`,e.jsx(a,{of:b,inline:!0}),`
`,e.jsx(o,{language:"tsx",code:D}),`
`,e.jsx(i.h2,{id:"customization",children:"Customization"}),`
`,e.jsx(i.h3,{id:"data-attributes",children:"Data Attributes"}),`
`,e.jsx(i.p,{children:"Components automatically add data attributes for styling different states:"}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"RadioGroup Container:"})," ",e.jsx(i.code,{children:"data-invalid"}),", ",e.jsx(i.code,{children:"data-disabled"}),", ",e.jsx(i.code,{children:"data-required"}),", ",e.jsx(i.code,{children:"data-readonly"}),", ",e.jsx(i.code,{children:"data-orientation"})]}),`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Radio Button:"})," ",e.jsx(i.code,{children:"data-selected"}),", ",e.jsx(i.code,{children:"data-hovered"}),", ",e.jsx(i.code,{children:"data-pressed"}),", ",e.jsx(i.code,{children:"data-focused"}),", ",e.jsx(i.code,{children:"data-disabled"})]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-css",children:`.my-radio-group [data-selected] {
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
`,e.jsx(i.h3,{id:"component-customization",children:"Component Customization"}),`
`,e.jsxs(i.p,{children:["Individual components can be styled by passing ",e.jsx(i.code,{children:"className"})," props:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-jsx",children:`<RadioGroup label="Select plan" className="custom-radio-group">
  <Radio value="basic" className="custom-radio">
    Basic
  </Radio>
  <Radio value="premium" className="premium-radio">
    Premium
  </Radio>
</RadioGroup>
`})}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(i.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Tab"}),": Moves focus to/from the radio group"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Arrow Down/Right"}),": Move to next radio button"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Arrow Up/Left"}),": Move to previous radio button"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.strong,{children:"Space"}),": Select the focused radio button"]}),`
`]}),`
`,e.jsx(i.h3,{id:"aria-support",children:"ARIA Support"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:'role="radiogroup"'})," on the container"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:'role="radio"'})," on each option"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"aria-checked"})," indicates selection state"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"aria-disabled"})," for disabled options"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"aria-required"})," when selection is required"]}),`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"aria-invalid"})," for validation errors"]}),`
`]}),`
`,e.jsx(i.h2,{id:"troubleshooting",children:"Troubleshooting"}),`
`,e.jsx(i.h3,{id:"selection-not-updating",children:"Selection Not Updating"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-jsx",children:`// ❌ Wrong: Using both value and defaultValue
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
`,e.jsx(i.h3,{id:"styling-overrides-not-applying",children:"Styling Overrides Not Applying"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-css",children:`/* ❌ May not have enough specificity */
.my-custom-radio {
  color: red;
}

/* ✅ Use data attributes and className for higher specificity */
.my-radio-group [data-selected] {
  color: red;
  font-weight: 600;
}
`})}),`
`,e.jsx(i.h3,{id:"keyboard-navigation-not-working",children:"Keyboard Navigation Not Working"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-css",children:`/* ❌ Don't remove focus outlines without replacement */
[data-focused] {
  outline: none;
}

/* ✅ Provide visible focus indicator */
.my-radio-group [data-focused] {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}
`})}),`
`,e.jsx(i.h2,{id:"best-practices",children:"Best Practices"}),`
`,e.jsx(i.h3,{id:"when-to-use-radio-buttons",children:"When to Use Radio Buttons"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"✅ When there are 2-7 mutually exclusive options"}),`
`,e.jsx(i.li,{children:"✅ When all options should be visible at once"}),`
`,e.jsx(i.li,{children:"✅ When the decision is important and deserves space"}),`
`,e.jsx(i.li,{children:"❌ For more than 7 options (use Select instead)"}),`
`,e.jsx(i.li,{children:"❌ For binary yes/no choices (use Checkbox or Toggle instead)"}),`
`,e.jsx(i.li,{children:"❌ When space is limited (use Select dropdown)"}),`
`]}),`
`,e.jsx(i.h3,{id:"label-guidelines",children:"Label Guidelines"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Use clear, concise labels"}),`
`,e.jsx(i.li,{children:"Keep labels short (1-3 words when possible)"}),`
`,e.jsx(i.li,{children:"Place the most common option first"}),`
`,e.jsx(i.li,{children:"Ensure labels are descriptive without being verbose"}),`
`]}),`
`,e.jsx(i.h3,{id:"validation",children:"Validation"}),`
`,e.jsx(i.p,{children:"Always provide clear error messages:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-jsx",children:`<RadioGroup
  label="Select shipping method"
  isRequired
  isInvalid={!selectedShipping}
  errorMessage="Please select a shipping method"
>
  <Radio value="standard">Standard</Radio>
  <Radio value="express">Express</Radio>
</RadioGroup>
`})})]})}function fe(n={}){const{wrapper:i}={...r(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(d,{...n})}):d(n)}export{fe as default};
