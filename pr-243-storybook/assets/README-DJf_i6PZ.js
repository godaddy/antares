import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-De4EwHKN.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-C_nayckk.js";import{t as c}from"./mdx-react-shim-BMTn6U8D.js";import{Controlled as l,DateRangePickerProps as u,Default as d,Disabled as f,FormatOptions as p,MinMax as m,Props as h,Range as g,WithError as _,n as v,t as y}from"./date-picker.stories-48Bh7qFm.js";var b,x=e((()=>{b=`import { DatePicker } from '@godaddy/antares';

export function DatePickerDefaultExample() {
  return <DatePicker label="Event date" />;
}
`})),S,C=e((()=>{S=`import { DateRangePicker } from '@godaddy/antares';

export function DateRangePickerExample() {
  return <DateRangePicker label="Trip dates" />;
}
`})),w,T=e((()=>{w=`import { useState } from 'react';
import { DatePicker } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@internationalized/date';

export function DatePickerControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));
  return <DatePicker label="Event date" value={value} onChange={setValue} />;
}
`})),E,D=e((()=>{E=`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function DatePickerFormatOptionsExample() {
  return <DatePicker label="Event date" defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }} />;
}
`})),O,k=e((()=>{O=`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function DatePickerMinMaxExample() {
  return <DatePicker label="Booking date" minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')} />;
}
`})),A,j=e((()=>{A=`import { DatePicker } from '@godaddy/antares';

export function DatePickerWithErrorExample() {
  return <DatePicker label="Event date" isInvalid errorMessage="Please choose a date" />;
}
`})),M,N=e((()=>{M=`import { DatePicker } from '@godaddy/antares';

export function DatePickerDisabledExample() {
  return <DatePicker label="Event date" isDisabled />;
}
`}));function P(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(o,{of:y,name:`Overview`}),`
`,(0,I.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,I.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a calendar popover to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,I.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,I.jsxs)(t.ul,{children:[`
`,(0,I.jsxs)(t.li,{children:[(0,I.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,I.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar popover`]}),`
`,(0,I.jsx)(t.li,{children:`Built on React Aria — native form integration, validation, focus management, and screen-reader support`}),`
`,(0,I.jsxs)(t.li,{children:[`Consumer-controlled label formatting via `,(0,I.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,I.jsxs)(t.li,{children:[(0,I.jsx)(t.code,{children:`minValue`}),` / `,(0,I.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,I.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,I.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,I.jsx)(t.pre,{children:(0,I.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,I.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,I.jsxs)(t.p,{children:[`Values are `,(0,I.jsx)(t.code,{children:`CalendarDate`}),` objects from `,(0,I.jsx)(t.code,{children:`@internationalized/date`}),` (ships transitively — import directly):`]}),`
`,(0,I.jsx)(t.pre,{children:(0,I.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { DatePicker } from '@godaddy/antares';

<DatePicker label="Event" defaultValue={parseDate('2024-03-15')} />;
<DatePicker label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,I.jsxs)(t.p,{children:[`Strict-pnpm users (without `,(0,I.jsx)(t.code,{children:`node-linker=hoisted`}),`) must add `,(0,I.jsx)(t.code,{children:`@internationalized/date`}),` to their own `,(0,I.jsx)(t.code,{children:`package.json`}),`. Locale comes from a host `,(0,I.jsx)(t.code,{children:`<I18nProvider>`}),`. This version has no typed/segmented entry — selection is via the calendar.`]}),`
`,(0,I.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,I.jsxs)(t.p,{children:[`The `,(0,I.jsx)(t.code,{children:`DatePicker`}),` component accepts the following props:`]}),`
`,(0,I.jsx)(a,{of:h}),`
`,(0,I.jsxs)(t.p,{children:[`The `,(0,I.jsx)(t.code,{children:`DateRangePicker`}),` component accepts the following props:`]}),`
`,(0,I.jsx)(a,{of:u}),`
`,(0,I.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,I.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,I.jsx)(t.p,{children:`A single date picker.`}),`
`,(0,I.jsx)(r,{language:`tsx`,code:b}),`
`,(0,I.jsx)(i,{of:d,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,I.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,I.jsx)(r,{language:`tsx`,code:S}),`
`,(0,I.jsx)(i,{of:g,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,I.jsxs)(t.p,{children:[`Driving the value with `,(0,I.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,I.jsx)(r,{language:`tsx`,code:w}),`
`,(0,I.jsx)(i,{of:l,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`custom-format`,children:`Custom format`}),`
`,(0,I.jsxs)(t.p,{children:[`Controlling the label with `,(0,I.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,I.jsx)(r,{language:`tsx`,code:E}),`
`,(0,I.jsx)(i,{of:p,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,I.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,I.jsx)(t.code,{children:`minValue`}),` / `,(0,I.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,I.jsx)(r,{language:`tsx`,code:O}),`
`,(0,I.jsx)(i,{of:m,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`error`,children:`Error`}),`
`,(0,I.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,I.jsx)(t.code,{children:`isInvalid`}),` and `,(0,I.jsx)(t.code,{children:`errorMessage`}),`.`]}),`
`,(0,I.jsx)(r,{language:`tsx`,code:A}),`
`,(0,I.jsx)(i,{of:_,inline:!0}),`
`,(0,I.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,I.jsxs)(t.p,{children:[`A disabled picker via `,(0,I.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,I.jsx)(r,{language:`tsx`,code:M}),`
`,(0,I.jsx)(i,{of:f,inline:!0}),`
`,(0,I.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,I.jsxs)(t.p,{children:[(0,I.jsx)(t.code,{children:`formatOptions`}),` accepts any `,(0,I.jsx)(t.code,{children:`Intl.DateTimeFormatOptions`}),` (e.g. `,(0,I.jsx)(t.code,{children:`{ dateStyle: 'short' }`}),`, `,(0,I.jsx)(t.code,{children:`{ month: 'long', year: 'numeric' }`}),`). `,(0,I.jsx)(t.code,{children:`placeholder`}),` sets the empty-state text.`]}),`
`,(0,I.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,I.jsxs)(t.ul,{children:[`
`,(0,I.jsx)(t.li,{children:`The whole field is a single focusable button; Enter/Space opens the popover`}),`
`,(0,I.jsx)(t.li,{children:`Focus is trapped in the open popover and returns to the trigger on close`}),`
`,(0,I.jsx)(t.li,{children:`Esc and outside-click dismiss the popover`}),`
`,(0,I.jsx)(t.li,{children:`The calendar grid is fully keyboard navigable and screen-reader announced`}),`
`]}),`
`,(0,I.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,I.jsxs)(t.ul,{children:[`
`,(0,I.jsxs)(t.li,{children:[`Provide a `,(0,I.jsx)(t.code,{children:`label`}),` (or `,(0,I.jsx)(t.code,{children:`aria-label`}),`) on every picker.`]}),`
`,(0,I.jsx)(t.li,{children:`For typed/keyboard-fast date entry far from today, use the calendar's month dropdown and year input.`}),`
`]}),`
`,(0,I.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,I.jsxs)(t.ul,{children:[`
`,(0,I.jsxs)(t.li,{children:[`Dates not localizing? Wrap the app in `,(0,I.jsx)(t.code,{children:`<I18nProvider locale="…">`}),`.`]}),`
`,(0,I.jsxs)(t.li,{children:[`Form value missing on submit? Pass a `,(0,I.jsx)(t.code,{children:`name`}),` — React Aria renders the hidden input.`]}),`
`]})]})}function F(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,I.jsx)(t,{...e,children:(0,I.jsx)(P,{...e})}):P(e)}var I;e((()=>{I=t(),c(),s(),v(),x(),C(),T(),D(),k(),j(),N()}))();export{F as default};