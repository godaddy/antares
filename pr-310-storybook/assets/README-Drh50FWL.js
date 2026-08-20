import{i as e}from"./preload-helper-DlXxGc_m.js";import{F as t}from"./iframe-BCurNMvt.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-DwyGoTcx.js";import{t as c}from"./mdx-react-shim-DcLGT6jf.js";import{DatePickerControlled as l,DatePickerDisabled as u,DatePickerFormatOptions as d,DatePickerMinMax as f,DatePickerWithError as p,DateRangePicker as m,DateRangePickerProps as h,Default as g,Props as _,n as v,t as y}from"./date-picker.stories-BlKz8vUT.js";function b(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(o,{of:y,name:`Overview`}),`
`,(0,S.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,S.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a calendar popover to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,S.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,S.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar popover`]}),`
`,(0,S.jsx)(t.li,{children:`Built on React Aria — native form integration, validation, focus management, and screen-reader support`}),`
`,(0,S.jsxs)(t.li,{children:[`Consumer-controlled label formatting via `,(0,S.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,S.jsxs)(t.li,{children:[(0,S.jsx)(t.code,{children:`minValue`}),` / `,(0,S.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,S.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,S.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,S.jsxs)(t.p,{children:[`Values are `,(0,S.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,S.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,S.jsx)(t.pre,{children:(0,S.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@godaddy/antares/date';
import { DatePicker } from '@godaddy/antares';

<DatePicker label="Event" defaultValue={parseDate('2024-03-15')} />;
<DatePicker label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`@godaddy/antares/date`}),` re-exports `,(0,S.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,S.jsx)(t.code,{children:`@internationalized/date`})}),`, the package behind these date primitives. Locale comes from a host `,(0,S.jsx)(t.code,{children:`<I18nProvider>`}),`. This version has no typed/segmented entry - selection is via the calendar.`]}),`
`,(0,S.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,S.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,S.jsx)(t.p,{children:`A single date picker.`}),`
`,(0,S.jsx)(i,{of:g,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function DefaultExample() {
  return <DatePicker label="Event date" />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,S.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,S.jsx)(i,{of:m,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DateRangePicker } from '@godaddy/antares';

export function DateRangePickerExample() {
  return <DateRangePicker label="Trip dates" />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,S.jsxs)(t.p,{children:[`Driving the value with `,(0,S.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,S.jsx)(i,{of:l,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { useState } from 'react';
import { DatePicker } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

export function DatePickerControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));
  return <DatePicker label="Event date" value={value} onChange={setValue} />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`custom-format`,children:`Custom format`}),`
`,(0,S.jsxs)(t.p,{children:[`Controlling the label with `,(0,S.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,S.jsx)(i,{of:d,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function DatePickerFormatOptionsExample() {
  return (
    <DatePicker label="Event date" defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }} />
  );
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,S.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,S.jsx)(t.code,{children:`minValue`}),` / `,(0,S.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,S.jsx)(i,{of:f,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function DatePickerMinMaxExample() {
  return <DatePicker label="Booking date" minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')} />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`error`,children:`Error`}),`
`,(0,S.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,S.jsx)(t.code,{children:`isInvalid`}),` and `,(0,S.jsx)(t.code,{children:`errorMessage`}),`.`]}),`
`,(0,S.jsx)(i,{of:p,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function DatePickerWithErrorExample() {
  return <DatePicker label="Event date" isInvalid errorMessage="Please choose a date" />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,S.jsxs)(t.p,{children:[`A disabled picker via `,(0,S.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,S.jsx)(i,{of:u,inline:!0}),`
`,(0,S.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function DatePickerDisabledExample() {
  return <DatePicker label="Event date" isDisabled />;
}`,language:`tsx`}),`
`,(0,S.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,S.jsxs)(t.p,{children:[(0,S.jsx)(t.code,{children:`formatOptions`}),` accepts any `,(0,S.jsx)(t.code,{children:`Intl.DateTimeFormatOptions`}),` (e.g. `,(0,S.jsx)(t.code,{children:`{ dateStyle: 'short' }`}),`, `,(0,S.jsx)(t.code,{children:`{ month: 'long', year: 'numeric' }`}),`). `,(0,S.jsx)(t.code,{children:`placeholder`}),` sets the empty-state text.`]}),`
`,(0,S.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsx)(t.li,{children:`The whole field is a single focusable button; Enter/Space opens the popover`}),`
`,(0,S.jsx)(t.li,{children:`Focus is trapped in the open popover and returns to the trigger on close`}),`
`,(0,S.jsx)(t.li,{children:`Esc and outside-click dismiss the popover`}),`
`,(0,S.jsx)(t.li,{children:`The calendar grid is fully keyboard navigable and screen-reader announced`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Provide a `,(0,S.jsx)(t.code,{children:`label`}),` (or `,(0,S.jsx)(t.code,{children:`aria-label`}),`) on every picker.`]}),`
`,(0,S.jsx)(t.li,{children:`For typed/keyboard-fast date entry far from today, use the calendar's month dropdown and year input.`}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,S.jsxs)(t.ul,{children:[`
`,(0,S.jsxs)(t.li,{children:[`Dates not localizing? Wrap the app in `,(0,S.jsx)(t.code,{children:`<I18nProvider locale="…">`}),`.`]}),`
`,(0,S.jsxs)(t.li,{children:[`Form value missing on submit? Pass a `,(0,S.jsx)(t.code,{children:`name`}),` — React Aria renders the hidden input.`]}),`
`]}),`
`,(0,S.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`DatePicker`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:_}),`
`,(0,S.jsxs)(t.p,{children:[`The `,(0,S.jsx)(t.code,{children:`DateRangePicker`}),` component accepts the following props:`]}),`
`,(0,S.jsx)(a,{of:h})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(b,{...e})}):b(e)}var S;e((()=>{S=t(),c(),s(),v()}))();export{x as default};