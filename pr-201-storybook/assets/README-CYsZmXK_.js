import{j as e}from"./iframe-B_XvV7CY.js";import{u as o,M as l,A as d,S as n,a}from"./blocks-DI7fewAK.js";import{S as s,P as c,D as h,W as p,C as m,a as u,b as x,M as j,c as g,F as f}from"./date-field.stories-C1SmDLo7.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BpwH3HVJ.js";import"./index-nU4GYxAx.js";import"./index-CuQRGrwp.js";import"./Text-UYduh6qR.js";import"./SSRProvider-Babacl1u.js";import"./clsx-B-dksMZM.js";import"./FieldError-CKXcdYho.js";import"./filterDOMProps-SeKkUh_q.js";import"./useFormValidation-ROpuEpb0.js";import"./useLabel-Dehw8yOx.js";import"./useHover-Cvj41HgA.js";import"./index-1oub9rDX.js";import"./index-BtlUOAdW.js";import"./Button-C1Mdsi0m.js";import"./ProgressBar-DYD8Z5xy.js";import"./I18nProvider-BB58OBzh.js";import"./number-P4c4HRxZ.js";import"./useFocusRing-BKR0SpF4.js";import"./index-BU6kDO4d.js";import"./index-B1_NATH6.js";import"./index-Cx2ZJ0h9.js";import"./VisuallyHidden-BNI5lx0u.js";import"./useCollator-vFQIZqyW.js";import"./FocusScope-t3NnZ0pU.js";import"./useLocalizedStringFormatter-k92g5IsD.js";import"./useEvent-BBM8QJpL.js";import"./useSpinButton-BuMTUEJx.js";import"./useControlledState-B6OB8qD_.js";import"./index-D_gDE2Yp.js";import"./index-BOAZ7-sQ.js";import"./index-DvzUQ3nw.js";import"./index-EZUigfgO.js";import"./slots-Bp7M6d4d.js";import"./index-ID7BPCPn.js";import"./index-CLj43KZG.js";import"./index-CWg3q78b.js";import"./index-CdQnZzqy.js";import"./create-external-store-TtP3UJpK.js";import"./index-Dv5QjmLx.js";import"./client-DUrbyb1m.js";import"./index-DFMxgtYQ.js";const D=`import { DateField, type DateFieldProps } from '@godaddy/antares';

export function DateFieldBasicExample(props: DateFieldProps) {
  return <DateField label="Start date" {...props} />;
}
`,b=`import { parseDate } from '@internationalized/date';
import { DateField } from '@godaddy/antares';

export function DateFieldWithDefaultValueExample() {
  return <DateField label="Start date" defaultValue={parseDate('2024-03-15')} />;
}
`,y=`import { type CalendarDate, parseDate } from '@internationalized/date';
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
`,F=`import { DateField } from '@godaddy/antares';

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
`,e.jsxs(t.p,{children:["Date components in Antares are typed for ",e.jsx(t.code,{children:"CalendarDate"}),` from
`,e.jsx(t.a,{href:"https://react-spectrum.adobe.com/internationalized/date/index.html",rel:"nofollow",children:e.jsx(t.code,{children:"@internationalized/date"})})," — a date-only type with no time and no timezone."]}),`
`,e.jsxs(t.h3,{id:"why-internationalizeddate",children:["Why ",e.jsx(t.code,{children:"@internationalized/date"}),"?"]}),`
`,e.jsxs(t.p,{children:["JavaScript's built-in ",e.jsx(t.code,{children:"Date"}),` is a single timestamp that conflates calendar date, time of day,
and timezone. That's the wrong shape for "a calendar date" (e.g. a birthday or a booking date),
and round-tripping it through string parsers and `,e.jsx(t.code,{children:"toISOString()"}),` is the source of countless
off-by-one timezone bugs. `,e.jsx(t.code,{children:"@internationalized/date"}),` separates these concepts cleanly. Antares
date components only deal with `,e.jsx(t.code,{children:"CalendarDate"}),"."]}),`
`,e.jsx(t.h3,{id:"installation-1",children:"Installation"}),`
`,e.jsxs(t.p,{children:["Install ",e.jsx(t.code,{children:"@internationalized/date"})," alongside ",e.jsx(t.code,{children:"@godaddy/antares"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @internationalized/date
`})}),`
`,e.jsx(t.p,{children:"We do not re-export anything from this package. Import directly:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
`})}),`
`,e.jsx(t.h3,{id:"three-patterns",children:"Three patterns"}),`
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
`,e.jsx(t.h3,{id:"locale-and-i18n",children:"Locale and i18n"}),`
`,e.jsxs(t.p,{children:["Locale comes from the host app's ",e.jsx(t.code,{children:"<I18nProvider>"}),` (a React Aria component). There is no
per-component `,e.jsx(t.code,{children:"locale"})," prop. Segment formatting follows the active locale."]}),`
`,e.jsx(t.h3,{id:"further-reading",children:"Further reading"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsxs(t.a,{href:"https://react-spectrum.adobe.com/react-aria/DateField.html",rel:"nofollow",children:["React Aria ",e.jsx(t.code,{children:"DateField"})]})}),`
`,e.jsx(t.li,{children:e.jsxs(t.a,{href:"https://react-spectrum.adobe.com/internationalized/date/index.html",rel:"nofollow",children:[e.jsx(t.code,{children:"@internationalized/date"})," reference"]})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"https://react-spectrum.adobe.com/internationalized/date/CalendarDate.html",rel:"nofollow",children:e.jsx(t.code,{children:"CalendarDate"})})}),`
`]}),`
`,e.jsx(t.h2,{id:"props",children:"Props"}),`
`,e.jsx(t.p,{children:"The DateField component accepts the following props:"}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"Minimal usage with a label."}),`
`,e.jsx(n,{language:"tsx",code:D}),`
`,e.jsx(a,{of:h,inline:!0}),`
`,e.jsx(t.h3,{id:"with-default-value",children:"With default value"}),`
`,e.jsxs(t.p,{children:["Pass a ",e.jsx(t.code,{children:"CalendarDate"})," to ",e.jsx(t.code,{children:"defaultValue"})," to initialize the segments."]}),`
`,e.jsx(n,{language:"tsx",code:b}),`
`,e.jsx(a,{of:p,inline:!0}),`
`,e.jsx(t.h3,{id:"controlled",children:"Controlled"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"onChange"})," for controlled state."]}),`
`,e.jsx(n,{language:"tsx",code:y}),`
`,e.jsx(a,{of:m,inline:!0}),`
`,e.jsx(t.h3,{id:"with-description",children:"With description"}),`
`,e.jsxs(t.p,{children:["Provide helper text via ",e.jsx(t.code,{children:"description"}),"."]}),`
`,e.jsx(n,{language:"tsx",code:F}),`
`,e.jsx(a,{of:u,inline:!0}),`
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
`,e.jsx(a,{of:g,inline:!0}),`
`,e.jsx(t.h3,{id:"form",children:"Form"}),`
`,e.jsxs(t.p,{children:["Pass ",e.jsx(t.code,{children:"name"})," to integrate with native ",e.jsx(t.code,{children:"<form>"}),` submission. The submitted value is an ISO date
string (`,e.jsx(t.code,{children:"YYYY-MM-DD"}),")."]}),`
`,e.jsx(n,{language:"tsx",code:M}),`
`,e.jsx(a,{of:f,inline:!0})]})}function fe(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{fe as default};
