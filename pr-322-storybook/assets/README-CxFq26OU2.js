import{i as e}from"./preload-helper-BPzpAaEy.js";import{F as t}from"./iframe-2WOHVFsL.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks--TtDj5YA.js";import{t as c}from"./mdx-react-shim-Bc_yXaGU.js";import{CalendarDisabled as l,CalendarMinMax as u,CalendarUnavailable as d,CalendarWithValue as f,Default as p,Props as m,RangeCalendar as h,RangeCalendarProps as g,n as _,t as v}from"./calendar.stories-hhd9h1aH.js";function y(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o,{of:v,name:`Overview`}),`
`,(0,x.jsx)(t.h1,{id:`calendar`,children:`Calendar`}),`
`,(0,x.jsx)(t.p,{children:`Accessible calendar grids for selecting a single date (Calendar) or a date range (RangeCalendar), built on React Aria.`}),`
`,(0,x.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Single-date (`,(0,x.jsx)(t.code,{children:`Calendar`}),`) and range (`,(0,x.jsx)(t.code,{children:`RangeCalendar`}),`) grids built on React Aria`]}),`
`,(0,x.jsx)(t.li,{children:`Month dropdown plus a typeable year input in the header for fast navigation`}),`
`,(0,x.jsx)(t.li,{children:`Keyboard navigable and screen-reader announced`}),`
`,(0,x.jsxs)(t.li,{children:[(0,x.jsx)(t.code,{children:`minValue`}),` / `,(0,x.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,x.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`,(0,x.jsxs)(t.li,{children:[`Date-only values via `,(0,x.jsx)(t.code,{children:`@internationalized/date`}),`'s `,(0,x.jsx)(t.code,{children:`CalendarDate`})]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,x.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`Calendar`}),` values are `,(0,x.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,x.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@godaddy/antares/date';
import { Calendar } from '@godaddy/antares';

<Calendar aria-label="Date" defaultValue={parseDate('2024-03-15')} />;
<Calendar aria-label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`@godaddy/antares/date`}),` re-exports `,(0,x.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,x.jsx)(t.code,{children:`@internationalized/date`})}),`, the package behind these date primitives.`]}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,x.jsx)(t.p,{children:`A single-date calendar.`}),`
`,(0,x.jsx)(i,{of:p,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function DefaultExample() {
  return <Calendar aria-label="Event date" defaultFocusedValue={parseDate('2024-03-01')} />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`with-value`,children:`With value`}),`
`,(0,x.jsx)(t.p,{children:`A calendar with a pre-selected date.`}),`
`,(0,x.jsx)(i,{of:f,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function CalendarWithValueExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,x.jsx)(t.p,{children:`Selecting a start and end date.`}),`
`,(0,x.jsx)(i,{of:h,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { RangeCalendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function RangeCalendarExample() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: parseDate('2024-03-10'), end: parseDate('2024-03-15') }}
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,x.jsx)(t.p,{children:`Bounding selectable dates.`}),`
`,(0,x.jsx)(i,{of:u,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function CalendarMinMaxExample() {
  return (
    <Calendar
      aria-label="Booking date"
      defaultValue={parseDate('2024-03-15')}
      minValue={parseDate('2024-03-05')}
      maxValue={parseDate('2024-03-25')}
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`unavailable`,children:`Unavailable`}),`
`,(0,x.jsxs)(t.p,{children:[`Disabling scattered individual dates with `,(0,x.jsx)(t.code,{children:`isDateUnavailable`}),`.`]}),`
`,(0,x.jsx)(i,{of:d,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Calendar } from '@godaddy/antares';
import { isWeekend, parseDate } from '@godaddy/antares/date';

export function CalendarUnavailableExample() {
  return (
    <Calendar
      aria-label="Weekday only"
      defaultValue={parseDate('2024-03-15')}
      isDateUnavailable={(date) => isWeekend(date, 'en-US')}
    />
  );
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,x.jsx)(t.p,{children:`A fully disabled calendar.`}),`
`,(0,x.jsx)(i,{of:l,inline:!0}),`
`,(0,x.jsx)(r,{code:`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarDisabledExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} isDisabled />;
}`,language:`tsx`}),`
`,(0,x.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsx)(t.li,{children:`Arrow keys move by day; PageUp/PageDown by month; Home/End to row edges`}),`
`,(0,x.jsx)(t.li,{children:`Focus-visible outline; disabled days are not focusable`}),`
`,(0,x.jsx)(t.li,{children:`Out-of-month days render at reduced opacity and are not selectable`}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Always provide an `,(0,x.jsx)(t.code,{children:`aria-label`}),` on standalone calendars.`]}),`
`,(0,x.jsxs)(t.li,{children:[`Use `,(0,x.jsx)(t.code,{children:`isDateUnavailable`}),` for scattered disabled days; use `,(0,x.jsx)(t.code,{children:`minValue`}),` / `,(0,x.jsx)(t.code,{children:`maxValue`}),` for contiguous bounds.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,x.jsxs)(t.ul,{children:[`
`,(0,x.jsxs)(t.li,{children:[`Dates not formatting per locale? Ensure the app is wrapped in `,(0,x.jsx)(t.code,{children:`<I18nProvider locale="…">`}),`.`]}),`
`]}),`
`,(0,x.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`Calendar`}),` component accepts the following props:`]}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsxs)(t.p,{children:[`The `,(0,x.jsx)(t.code,{children:`RangeCalendar`}),` component accepts the following props:`]}),`
`,(0,x.jsx)(a,{of:g})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),c(),s(),_()}))();export{b as default};