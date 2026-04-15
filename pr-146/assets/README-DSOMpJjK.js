import{j as e}from"./iframe-CFbvAMt4.js";import{useMDXComponents as o}from"./index-BVZTzHhQ.js";import{M as l,A as a,S as r,a as i}from"./blocks-ZM53LnYJ.js";import{S as d,P as c,B as m,C as u,I as p,D as h,H as x,V as j,F as b}from"./number-field.stories-BjChb3ne.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C70cCOwD.js";import"./index-Rp5O-AnQ.js";import"./index-CL47zJHF.js";import"./index-DrFu-skq.js";import"./index-BXOJyyqD.js";import"./index-DAgja_K1.js";import"./clsx-DMFXSSP5.js";import"./index-BWpU0Ejx.js";import"./mergeProps-Bka8Jxbh.js";import"./useObjectRef-C6URdWSn.js";import"./DOMFunctions-DY9RYDsQ.js";import"./filterDOMProps-BNnC3YgW.js";import"./useFocusRing-ZFzQB34m.js";import"./useFocusWithin-DwrOTBLN.js";import"./platform-BULRNHlZ.js";import"./useFocusable-CkVQvVnK.js";import"./Collection-8edibhNn.js";import"./keyboard-BlyT3oQC.js";import"./FocusScope-DfEJQTqb.js";import"./context-DYHQLQHZ.js";import"./useControlledState-BRSvzLzZ.js";import"./useOverlayTriggerState-PnS9NX8W.js";import"./PortalProvider-CZCwfmDd.js";import"./usePreventScroll-BWlr1gS9.js";import"./useLabel-TrEoNmh7.js";import"./VisuallyHidden-DgDCiHiU.js";import"./useField-BQfSAFf_.js";import"./useButton-DBljmLAR.js";import"./index-IYEPKBof.js";import"./index-CPz1UQiM.js";import"./slots-DKU5GXw6.js";import"./index-BotUJ0jx.js";import"./index-CLj43KZG.js";import"./index-B6Ixxdps.js";import"./index-BZk8MZOZ.js";import"./create-external-store-TtP3UJpK.js";import"./index-Y0RGMAIk.js";import"./client-jzqcwY2l.js";import"./index-B1XYqvgl.js";import"./index-BLDDmHng.js";const g=`import { NumberField, type NumberFieldProps } from '@godaddy/antares';

export function NumberFieldBasicExample(props: NumberFieldProps) {
  return <NumberField label="Quantity" placeholder="0" defaultValue={0} {...props} />;
}
`,f=`import { useState } from 'react';
import { NumberField, Text } from '@godaddy/antares';

export function NumberFieldControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField label="Quantity" minValue={0} maxValue={100} value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}
`,v=`import { NumberField } from '@godaddy/antares';

export function NumberFieldInvalidExample() {
  return (
    <NumberField
      label="Quantity"
      minValue={0}
      maxValue={100}
      errorMessage="Please enter a value between 0 and 100"
      isInvalid
      isRequired
    />
  );
}
`,y=`import { NumberField } from '@godaddy/antares';

export function NumberFieldDisabledExample() {
  return <NumberField label="Quantity" defaultValue={42} minValue={0} maxValue={100} isDisabled />;
}
`,F=`import { NumberField } from '@godaddy/antares';

export function NumberFieldHideStepperExample() {
  return (
    <NumberField
      label="Quantity"
      description="Enter a value between 0 and 100."
      placeholder="0"
      minValue={0}
      maxValue={100}
      hideStepper
    />
  );
}
`,w=`import { NumberField } from '@godaddy/antares';

export function NumberFieldValueScaleExample() {
  return (
    <NumberField
      label="Step value"
      description="Steps are from the minimum: minValue={2}, step={3} gives 2, 5, 8, 11, …"
      placeholder="2"
      minValue={2}
      maxValue={20}
      step={3}
    />
  );
}
`,N=`import { NumberField } from '@godaddy/antares';

const devanagariFormatOptions = Intl.NumberFormat('hi-IN-u-nu-deva').resolvedOptions();

export function NumberFieldFormatOptionsExample() {
  return (
    <NumberField
      label="Number (Devanagari)"
      description="By default, NumberField uses the user's locale. Use formatOptions to override with a Unicode numbering system locale extension (e.g. nu-deva)."
      hideStepper
      value={1024}
      formatOptions={devanagariFormatOptions}
    />
  );
}
`;function t(s){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d,name:"Overview"}),`
`,e.jsx(n.h1,{id:"numberfield",children:"NumberField"}),`
`,e.jsx(n.p,{children:"NumberField is a numeric input with optional label, description, error message, min/max/step, and increment/decrement stepper buttons. Use it in forms for quantities, amounts, or percentages."}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(n.p,{children:"The NumberField component accepts the following props:"}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(n.p,{children:"Minimal usage with label, placeholder, and min/max."}),`
`,e.jsx(r,{language:"tsx",code:g}),`
`,e.jsx(i,{of:m,inline:!0}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"})," for controlled state."]}),`
`,e.jsx(r,{language:"tsx",code:f}),`
`,e.jsx(i,{of:u,inline:!0}),`
`,e.jsx(n.h3,{id:"invalid",children:"Invalid"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"isInvalid"})," with ",e.jsx(n.code,{children:"errorMessage"})," for validation feedback."]}),`
`,e.jsx(r,{language:"tsx",code:v}),`
`,e.jsx(i,{of:p,inline:!0}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"isDisabled"})," to prevent input."]}),`
`,e.jsx(r,{language:"tsx",code:y}),`
`,e.jsx(i,{of:h,inline:!0}),`
`,e.jsx(n.h3,{id:"hide-stepper",children:"Hide stepper"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"hideStepper"})," to show only the input without +/- buttons."]}),`
`,e.jsx(r,{language:"tsx",code:F}),`
`,e.jsx(i,{of:x,inline:!0}),`
`,e.jsx(n.h3,{id:"value-scale",children:"Value scale"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"minValue"}),", ",e.jsx(n.code,{children:"maxValue"}),", and ",e.jsx(n.code,{children:"step"})," to set the allowed values. Steps are calculated from the minimum value."]}),`
`,e.jsx(r,{language:"tsx",code:w}),`
`,e.jsx(i,{of:j,inline:!0}),`
`,e.jsx(n.h3,{id:"format-options-numbering-system",children:"Format options (numbering system)"}),`
`,e.jsxs(n.p,{children:["By default, NumberField displays the value using the numbering system for the user's locale. Use the ",e.jsx(n.code,{children:"formatOptions"})," prop to override the numbering system by setting the ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem#adding_a_numbering_system_via_the_locale_string",rel:"nofollow",children:"Unicode numbering system locale extension"}),"."]}),`
`,e.jsx(r,{language:"tsx",code:N}),`
`,e.jsx(i,{of:b,inline:!0}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.h3,{id:"keyboard",children:"Keyboard"}),`
`,e.jsx(n.p,{children:"When focus is in the input (and the field is not read-only), keyboard behavior follows common spinbutton-style conventions:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Arrow Up"})," / ",e.jsx(n.strong,{children:"Arrow Down"})," (or ",e.jsx(n.strong,{children:"Up"})," / ",e.jsx(n.strong,{children:"Down"}),"): increase or decrease by ",e.jsx(n.code,{children:"step"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Page Up"})," / ",e.jsx(n.strong,{children:"Page Down"}),": larger increase or decrease when supported"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Home"})," / ",e.jsx(n.strong,{children:"End"}),": jump to ",e.jsx(n.code,{children:"minValue"})," or ",e.jsx(n.code,{children:"maxValue"})," when those props are set"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Stepper buttons are real buttons and follow standard button keyboard activation. Use ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"incrementAriaLabel"})})," and ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"decrementAriaLabel"})})," when the default labels are not enough in your locale or UI."]}),`
`,e.jsx(n.h3,{id:"aria-and-labeling",children:"ARIA and labeling"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The input is associated with the visible label and optional description and error content for assistive technologies."}),`
`,e.jsxs(n.li,{children:["Invalid and required states are exposed to assistive technologies when you use ",e.jsx(n.code,{children:"isInvalid"}),", ",e.jsx(n.code,{children:"errorMessage"}),", and ",e.jsx(n.code,{children:"isRequired"}),"."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"isWheelDisabled"})})," if the value should not change when the user scrolls with a pointer wheel while the field is focused."]}),`
`]}),`
`,e.jsx(n.h2,{id:"best-practices",children:"Best practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Pair ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"isInvalid"})})," with ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"errorMessage"})})," so users get both visual and programmatic feedback."]}),`
`,e.jsxs(n.li,{children:["Remember valid steps start from ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"minValue"})}),"."]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"isDisabled"})})," when the value cannot be changed; use ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"isReadOnly"})})," when the value should be visible but not editable. Do not use them interchangeably."]}),`
`,e.jsxs(n.li,{children:["For currency or units, ensure ",e.jsx(n.strong,{children:e.jsx(n.code,{children:"formatOptions"})})," (and locale) match what users are allowed to type."]}),`
`]})]})}function je(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{je as default};
