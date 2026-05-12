import{j as e}from"./iframe-FizPR52R.js";import{useMDXComponents as l}from"./index-CYlWwwKA.js";import{M as s,A as d,S as t,a as r}from"./blocks-JxoEOWeE.js";import{S as a,P as c,B as x,C as p,I as m,D as h,A as u,M as j}from"./text-field.stories-B4a3459z.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BtUkGQ9d.js";import"./index-R0fMKMBX.js";import"./index-CrXPsRGT.js";import"./index-B94YArBg.js";import"./index-BtlUOAdW.js";import"./clsx-B-dksMZM.js";import"./Button-DsaOcjMy.js";import"./Text-3vU_939k.js";import"./mergeProps-9Am4NR0I.js";import"./SSRProvider-DDSV1Vs0.js";import"./useObjectRef-DnlaCVIn.js";import"./Hidden-MBZOZzXp.js";import"./filterDOMProps-BNnC3YgW.js";import"./useButton-DtixIwNP.js";import"./usePress-DeI64UOY.js";import"./utils-DkDEtTO9.js";import"./DOMFunctions-BADGQOBX.js";import"./useFocusable-Dg3BZ-Kf.js";import"./useHover-hy5lvGvb.js";import"./platform-BULRNHlZ.js";import"./useFocusRing-CH-_2Iu_.js";import"./useFocusWithin-DNTW3fOk.js";import"./FieldError-dSPk0bzE.js";import"./index-DvFlFjnI.js";import"./index-fOJowGxv.js";import"./index-uLcaEJqG.js";import"./RSPContexts-HdXEig3x.js";import"./Form-DKntOly0.js";import"./useTextField-M6L-kG9P.js";import"./useField-BSs7B68L.js";import"./useLabel-CYZxHHfI.js";import"./useLabels-Dv68jEKz.js";import"./useControlledState-BZKzWP2Y.js";const g=`import { TextField } from '@godaddy/antares';

export function TextFieldAdornmentsExample() {
  return (
    <TextField
      description="Use leadingText and trailingText to show fixed text before and after the input (e.g. currency)."
      label="Amount"
      leadingText="$"
      placeholder="0.00"
      trailingText=".00"
    />
  );
}
`,f=`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldBasic(props: TextFieldProps) {
  return <TextField label="Name" placeholder="Enter your name" {...props} />;
}
`,T=`import { useState } from 'react';
import { Text, TextField } from '@godaddy/antares';

export function TextFieldControlledExample() {
  const [value, setValue] = useState('');

  return (
    <>
      <TextField label="Email" placeholder="you@example.com" value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value || '(empty)'}
      </Text>
    </>
  );
}
`,b=`import { TextField } from '@godaddy/antares';

export function TextFieldDisabledExample() {
  return <TextField label="Name" placeholder="Enter your name" defaultValue="Disabled value" isDisabled />;
}
`,F=`import { TextField } from '@godaddy/antares';

export function TextFieldInvalidExample() {
  return (
    <TextField
      label="Email"
      placeholder="you@example.com"
      errorMessage="Please enter a valid email address"
      isInvalid
      isRequired
    />
  );
}
`,y=`import { TextField, type TextFieldProps } from '@godaddy/antares';

export function TextFieldMultilineExample(props: TextFieldProps) {
  return <TextField label="Comment" placeholder="Enter your comment" multiline {...props} />;
}
`;function o(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a,name:"Overview"}),`
`,e.jsx(n.h1,{id:"textfield",children:"TextField"}),`
`,e.jsx(n.p,{children:"TextField is a single-line or multiline text input with optional label, description, and error message. Use it in forms for short answers (email, search, name) or longer content (comments). It supports optional leading and trailing text adornments (e.g. currency or units)."}),`
`,e.jsx(n.h1,{id:"textfield-1",children:"TextField"}),`
`,e.jsx(n.p,{children:"TextField is a single-line or multiline text input with optional label, description, and error message. Use it in forms for short answers (email, search, name) or longer content (comments). It supports optional leading and trailing text adornments (e.g. currency or units)."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Label, description, error"}),": Optional label, helper text, and error message with proper accessibility"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Adornments"}),": Optional ",e.jsx(n.code,{children:"leadingText"})," and ",e.jsx(n.code,{children:"trailingText"})," for fixed text before or after the input (e.g. ",e.jsx(n.code,{children:"$"}),", ",e.jsx(n.code,{children:".00"}),", ",e.jsx(n.code,{children:"px"}),")"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Controlled or uncontrolled"}),": Use ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"})," for controlled state, or ",e.jsx(n.code,{children:"defaultValue"})," for uncontrolled"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Multiline"}),": Set ",e.jsx(n.code,{children:"multiline"})," to render a textarea instead of a single-line input"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Validation states"}),": Use ",e.jsx(n.code,{children:"isInvalid"})," with ",e.jsx(n.code,{children:"errorMessage"})," and ",e.jsx(n.code,{children:"isDisabled"})," for validation and disabled state"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React Aria integration"}),": Built on React Aria TextField for accessibility and behavior"]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsx(n.p,{children:"The TextField component accepts the following props:"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"basic",children:"Basic"}),`
`,e.jsx(n.p,{children:"Minimal usage with label and placeholder."}),`
`,e.jsx(t,{language:"tsx",code:f}),`
`,e.jsx(r,{of:x,inline:!0}),`
`,e.jsx(n.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"value"})," and ",e.jsx(n.code,{children:"onChange"})," for controlled state."]}),`
`,e.jsx(t,{language:"tsx",code:T}),`
`,e.jsx(r,{of:p,inline:!0}),`
`,e.jsx(n.h3,{id:"invalid",children:"Invalid"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"isInvalid"})," with ",e.jsx(n.code,{children:"errorMessage"})," for validation feedback."]}),`
`,e.jsx(t,{language:"tsx",code:F}),`
`,e.jsx(r,{of:m,inline:!0}),`
`,e.jsx(n.h3,{id:"disabled",children:"Disabled"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"isDisabled"})," to prevent input."]}),`
`,e.jsx(t,{language:"tsx",code:b}),`
`,e.jsx(r,{of:h,inline:!0}),`
`,e.jsx(n.h3,{id:"adornments",children:"Adornments"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"leadingText"})," and ",e.jsx(n.code,{children:"trailingText"})," for fixed text before and after the input (e.g. currency)."]}),`
`,e.jsx(t,{language:"tsx",code:g}),`
`,e.jsx(r,{of:u,inline:!0}),`
`,e.jsx(n.h3,{id:"multiline",children:"Multiline"}),`
`,e.jsxs(n.p,{children:["Use ",e.jsx(n.code,{children:"multiline"})," to render a textarea."]}),`
`,e.jsx(t,{language:"tsx",code:y}),`
`,e.jsx(r,{of:j,inline:!0})]})}function se(i={}){const{wrapper:n}={...l(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(o,{...i})}):o(i)}export{se as default};
