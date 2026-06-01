import{j as e}from"./iframe-BQo81cX5.js";import{u as o,M as l,A as d,S as a,a as n}from"./blocks-D40TWfPg.js";import{S as s,P as c,D as m,W as p,C as u,a as x,b as h,M as j,c as g,F as D}from"./date-field.stories-BF9MOLNR.js";import"./preload-helper-PPVm8Dsz.js";import"./index-4vCilNW6.js";import"./index-DgwHFz0H.js";import"./index-ns4hd72K.js";import"./Text-BXAFqKb0.js";import"./SSRProvider-DbNrytmr.js";import"./clsx-B-dksMZM.js";import"./FieldError-Dt2agXXs.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFormValidation-DHi03XDh.js";import"./useLabel-CxSbOIQ6.js";import"./useHover-BfbAv8dL.js";import"./index-C4DxTeLe.js";import"./index-BtlUOAdW.js";import"./Button-BONVOPKW.js";import"./ProgressBar-CbNr0uGk.js";import"./I18nProvider-DZdY1YND.js";import"./number-P4c4HRxZ.js";import"./useFocusRing-DHiMMysQ.js";import"./index-B5roP8fG.js";import"./index-IR1Fs-_n.js";import"./index-D6Jjajys.js";import"./VisuallyHidden-BnbrII6R.js";import"./useCollator-DOaNmk-f.js";import"./FocusScope-D41WX2hc.js";import"./useLocalizedStringFormatter-UxfUSOvb.js";import"./useEvent-Bm81J4Jv.js";import"./useSpinButton-Ts6ZxMDC.js";import"./useControlledState-CcPFMwGz.js";import"./index-wxe4feb3.js";import"./index-BKideCSp.js";import"./index-CSAEVYVz.js";import"./index-BKcMW1wv.js";import"./slots-gxdXh3-A.js";import"./index-DWoPlmc9.js";import"./index-CLj43KZG.js";import"./index-DtQrBc1g.js";import"./index-60QUrdxT.js";import"./create-external-store-TtP3UJpK.js";import"./index-CuMxKIpi.js";import"./client-CjDxRmut.js";import"./index-BXtJ1pza.js";const f=`import { DateField, type DateFieldProps } from '@godaddy/antares';

export function DateFieldBasicExample(props: DateFieldProps) {
  return <DateField label="Start date" {...props} />;
}
`,F=`import { parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldWithDefaultValueExample() {
  return <DateField label="Start date" defaultValue={parseDate('2024-03-15')} />;
}
`,b=`import { type CalendarDate, parseDate } from '@internationalized/date';
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
`;function r(i){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:s,name:"Overview"}),`
`,e.jsx(t.h1,{id:"datefield",children:"DateField"}),`
`,e.jsx(t.p,{children:"DateField is a segmented date input with editable Year, Month, and Day segments. Use it when users only need to type a date. If you also want a calendar popover, use `DatePicker` (or `DateRangePicker` for ranges) instead."}),`
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
`,e.jsxs(t.p,{children:["DateField values are typed as ",e.jsx(t.code,{children:"CalendarDate"})," from ",e.jsx(t.a,{href:"https://react-spectrum.adobe.com/internationalized/date/index.html",rel:"nofollow",children:e.jsx(t.code,{children:"@internationalized/date"})}),` — a
date-only type with no time and no timezone. Install it alongside `,e.jsx(t.code,{children:"@godaddy/antares"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @internationalized/date
`})}),`
`,e.jsx(t.p,{children:"We do not re-export anything from this package. Import directly:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
`})}),`
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
`,e.jsxs(t.p,{children:["Locale comes from a host-app ",e.jsx(t.code,{children:"<I18nProvider>"}),"."]}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(t.p,{children:"The DateField component accepts the following props:"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"Minimal usage with a label."}),`
`,e.jsx(a,{language:"tsx",code:f}),`
`,e.jsx(n,{of:m,inline:!0}),`
`,e.jsx(t.h3,{id:"with-default-value",children:"With default value"}),`
`,e.jsxs(t.p,{children:["Pass a ",e.jsx(t.code,{children:"CalendarDate"})," to ",e.jsx(t.code,{children:"defaultValue"})," to initialize the segments."]}),`
`,e.jsx(a,{language:"tsx",code:F}),`
`,e.jsx(n,{of:p,inline:!0}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onChange"})," for controlled state."]}),`
`,e.jsx(a,{language:"tsx",code:b}),`
`,e.jsx(n,{of:u,inline:!0}),`
`,e.jsx(t.h3,{id:"with-description",children:"With description"}),`
`,e.jsxs(t.p,{children:["Provide helper text via ",e.jsx(t.code,{children:"description"}),"."]}),`
`,e.jsx(a,{language:"tsx",code:y}),`
`,e.jsx(n,{of:x,inline:!0}),`
`,e.jsx(t.h3,{id:"with-error",children:"With error"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"isInvalid"})," with ",e.jsx(t.code,{children:"errorMessage"})," for validation feedback."]}),`
`,e.jsx(a,{language:"tsx",code:S}),`
`,e.jsx(n,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"min-and-max",children:"Min and max"}),`
`,e.jsxs(t.p,{children:["Constrain typed entry with ",e.jsx(t.code,{children:"minValue"})," and ",e.jsx(t.code,{children:"maxValue"}),"."]}),`
`,e.jsx(a,{language:"tsx",code:v}),`
`,e.jsx(n,{of:j,inline:!0}),`
`,e.jsx(t.h3,{id:"disabled-required-read-only",children:"Disabled, required, read-only"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"isDisabled"})," blocks all interaction. ",e.jsx(t.code,{children:"isRequired"})," marks the field for form validation. ",e.jsx(t.code,{children:"isReadOnly"}),`
allows focus and copy but blocks edits.`]}),`
`,e.jsx(a,{language:"tsx",code:w}),`
`,e.jsx(n,{of:g,inline:!0}),`
`,e.jsx(t.h3,{id:"form",children:"Form"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"name"})," to integrate with native ",e.jsx(t.code,{children:"<form>"}),` submission. The submitted value is an ISO date
string (`,e.jsx(t.code,{children:"YYYY-MM-DD"}),")."]}),`
`,e.jsx(a,{language:"tsx",code:M}),`
`,e.jsx(n,{of:D,inline:!0})]})}function De(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{De as default};
