import{j as e}from"./iframe-BB45uQw9.js";import{u as o,M as l,A as d,S as n,a}from"./blocks-UXsbcjKo.js";import{S as s,P as c,D as p,W as m,C as u,a as h,b as x,M as j,c as D,F as f}from"./date-field.stories-CdeIstkd.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CR40qPoM.js";import"./index-DOdcITIN.js";import"./index-DeSYg_wK.js";import"./Text-ZJBEvf3Z.js";import"./SSRProvider-BOxRGIuL.js";import"./clsx-B-dksMZM.js";import"./FieldError-BOpQty1z.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFormValidation-DDGFP1wn.js";import"./useLabel-Ce6K44CG.js";import"./useHover-Bl0j5gjk.js";import"./index-DFN17nrZ.js";import"./index-BtlUOAdW.js";import"./Button-CiCkcGr-.js";import"./ProgressBar-CksUgyRi.js";import"./I18nProvider-D3qKFq3v.js";import"./number-P4c4HRxZ.js";import"./useFocusRing-YLaLPNA4.js";import"./index-BPPc5JgW.js";import"./index-0Umr2O2Q.js";import"./index-Cs9YjUtQ.js";import"./VisuallyHidden-DEY4NYBW.js";import"./useCollator-BNO2m8qX.js";import"./FocusScope-hB-Jv6jy.js";import"./useLocalizedStringFormatter-Cfkn4cyG.js";import"./useEvent-COeAjPQ0.js";import"./useSpinButton-BhSgvIOc.js";import"./useControlledState-BknELBJC.js";import"./index-DdMMKOFe.js";import"./index-wbPc2JB2.js";import"./index-PdJvjei7.js";import"./index-B60S3ST-.js";import"./slots-DItSrxYQ.js";import"./index-DUeUyk1J.js";import"./index-CLj43KZG.js";import"./index--02ypIH8.js";import"./index-DwYknOof.js";import"./create-external-store-TtP3UJpK.js";import"./index-CtfwK49U.js";import"./client-M8dWfCpX.js";import"./index-DCbJJuRD.js";const g=`import { DateField, type DateFieldProps } from '@godaddy/antares';

export function DateFieldBasicExample(props: DateFieldProps) {
  return <DateField label="Start date" {...props} />;
}
`,b=`import { parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldWithDefaultValueExample() {
  return <DateField label="Start date" defaultValue={parseDate('2024-03-15')} />;
}
`,F=`import { type CalendarDate, parseDate } from '@internationalized/date';
import { useState } from 'react';
import { DateField, Text } from '@godaddy/antares';

export function DateFieldControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));

  return (
    <>
      <DateField label="Start date" value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value ? value.toString() : '(empty)'}
      </Text>
    </>
  );
}
`,y=`import { DateField } from '@godaddy/antares';

export function DateFieldWithDescriptionExample() {
  return <DateField label="Start date" description="The date your subscription begins." />;
}
`,S=`import { DateField } from '@godaddy/antares';

export function DateFieldWithErrorExample() {
  return <DateField label="Start date" errorMessage="Please enter a valid date." isInvalid isRequired />;
}
`,v=`import { parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldMinMaxExample() {
  return (
    <DateField
      label="Booking date"
      description="Must fall within 2024."
      minValue={parseDate('2024-01-01')}
      maxValue={parseDate('2024-12-31')}
      defaultValue={parseDate('2024-06-15')}
    />
  );
}
`,w=`import { parseDate } from '@internationalized/date';
import { Flex, DateField } from '@godaddy/antares';

export function DateFieldDisabledRequiredReadOnlyExample() {
  return (
    <Flex direction="column" gap="md">
      <DateField label="Disabled" defaultValue={parseDate('2024-03-15')} isDisabled />
      <DateField label="Required" isRequired />
      <DateField label="Read-only" defaultValue={parseDate('2024-03-15')} isReadOnly />
    </Flex>
  );
}
`,M=`import { type FormEvent, useState } from 'react';
import { Button, DateField, Flex, Text } from '@godaddy/antares';

export function DateFieldFormExample() {
  const [submitted, setSubmitted] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSubmitted(String(formData.get('startDate') ?? ''));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="md" alignItems="flex-start">
        <DateField label="Start date" name="startDate" isRequired />
        <Button type="submit">Submit</Button>
        {submitted !== null && (
          <Text>
            <strong>Submitted:</strong> {submitted || '(empty)'}
          </Text>
        )}
      </Flex>
    </form>
  );
}
`;function r(i){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:s,name:"Overview"}),`
`,e.jsx(t.h1,{id:"datefield",children:"DateField"}),`
`,e.jsx(t.p,{children:"DateField is a segmented date input with editable Year, Month, and Day segments. Use it in forms when the user needs to type a calendar date directly. Pair it with `DatePicker` when a popover calendar is also needed."}),`
`,e.jsx(t.h2,{id:"features",children:"Features"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Segmented input"}),": Editable Year, Month, and Day segments with arrow-key adjustment"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Label, description, error"}),": Optional label, helper text, and error message with proper accessibility"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Controlled or uncontrolled"}),": Use ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onChange"}),", or ",e.jsx(t.code,{children:"defaultValue"})]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Range bounds"}),": ",e.jsx(t.code,{children:"minValue"})," and ",e.jsx(t.code,{children:"maxValue"})," reject out-of-range entry"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Form integration"}),": Submits an ISO date string when given a ",e.jsx(t.code,{children:"name"})," prop"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"React Aria integration"}),": Built on React Aria DateField for accessibility, keyboard, and locale handling"]}),`
`]}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install --save @godaddy/antares
`})}),`
`,e.jsx(t.h2,{id:"working-with-dates",children:"Working with dates"}),`
`,e.jsxs(t.p,{children:["DateField values are typed as ",e.jsx(t.code,{children:"CalendarDate"})," from ",e.jsx(t.a,{href:"https://react-spectrum.adobe.com/internationalized/date/index.html",rel:"nofollow",children:e.jsx(t.code,{children:"@internationalized/date"})}),` — a date-only
type with no time and no timezone. `,e.jsx(t.code,{children:"@internationalized/date"}),` ships transitively with
`,e.jsx(t.code,{children:"react-aria-components"}),", so most consumers do not need to add it to their ",e.jsx(t.code,{children:"package.json"}),"."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Strict pnpm note:"})," if your repo disables hoisting (",e.jsx(t.code,{children:"node-linker=hoisted"}),` off), add
`,e.jsx(t.code,{children:"@internationalized/date"})," to your own ",e.jsx(t.code,{children:"package.json"})," so the import resolves."]}),`
`]}),`
`,e.jsx(t.p,{children:"Three common patterns:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-tsx",children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

// Fixed date
<DateField label="Start" defaultValue={parseDate('2024-03-15')} />

// Today
<DateField label="Date" defaultValue={today(getLocalTimeZone())} />

// Controlled
const [value, setValue] = useState(parseDate('2024-03-15'));
<DateField label="Date" value={value} onChange={setValue} />
`})}),`
`,e.jsxs(t.p,{children:["A canonical ",e.jsx(t.code,{children:"Working with dates"})," section will live in the ",e.jsx(t.code,{children:"DatePicker"}),` README in a follow-up
PR — this section will then link there. Locale comes from a host-app `,e.jsx(t.code,{children:"<I18nProvider>"}),"."]}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(t.p,{children:"The DateField component accepts the following props:"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"Minimal usage with a label."}),`
`,e.jsx(n,{language:"tsx",code:g}),`
`,e.jsx(a,{of:p,inline:!0}),`
`,e.jsx(t.h3,{id:"with-default-value",children:"With default value"}),`
`,e.jsxs(t.p,{children:["Pass a ",e.jsx(t.code,{children:"CalendarDate"})," to ",e.jsx(t.code,{children:"defaultValue"})," to initialize the segments."]}),`
`,e.jsx(n,{language:"tsx",code:b}),`
`,e.jsx(a,{of:m,inline:!0}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onChange"})," for controlled state."]}),`
`,e.jsx(n,{language:"tsx",code:F}),`
`,e.jsx(a,{of:u,inline:!0}),`
`,e.jsx(t.h3,{id:"with-description",children:"With description"}),`
`,e.jsxs(t.p,{children:["Provide helper text via ",e.jsx(t.code,{children:"description"}),"."]}),`
`,e.jsx(n,{language:"tsx",code:y}),`
`,e.jsx(a,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"with-error",children:"With error"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"isInvalid"})," with ",e.jsx(t.code,{children:"errorMessage"})," for validation feedback."]}),`
`,e.jsx(n,{language:"tsx",code:S}),`
`,e.jsx(a,{of:x,inline:!0}),`
`,e.jsx(t.h3,{id:"min-and-max",children:"Min and max"}),`
`,e.jsxs(t.p,{children:["Constrain typed entry with ",e.jsx(t.code,{children:"minValue"})," and ",e.jsx(t.code,{children:"maxValue"}),"."]}),`
`,e.jsx(n,{language:"tsx",code:v}),`
`,e.jsx(a,{of:j,inline:!0}),`
`,e.jsx(t.h3,{id:"disabled-required-read-only",children:"Disabled, required, read-only"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"isDisabled"})," blocks all interaction. ",e.jsx(t.code,{children:"isRequired"})," marks the field for form validation. ",e.jsx(t.code,{children:"isReadOnly"}),`
allows focus and copy but blocks edits.`]}),`
`,e.jsx(n,{language:"tsx",code:w}),`
`,e.jsx(a,{of:D,inline:!0}),`
`,e.jsx(t.h3,{id:"form",children:"Form"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"name"})," to integrate with native ",e.jsx(t.code,{children:"<form>"}),` submission. The submitted value is an ISO date
string (`,e.jsx(t.code,{children:"YYYY-MM-DD"}),")."]}),`
`,e.jsx(n,{language:"tsx",code:M}),`
`,e.jsx(a,{of:f,inline:!0})]})}function fe(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{fe as default};
