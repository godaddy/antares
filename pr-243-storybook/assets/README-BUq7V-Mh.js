import{i as e}from"./preload-helper-DOotEt7k.js";import{y as t}from"./iframe-CNDmUKd7.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-OKPNOdlK.js";import{t as c}from"./mdx-react-shim-CgwinoHn.js";import{Default as l,Disabled as u,MinMax as d,Props as f,Range as p,RangeCalendarProps as m,Unavailable as h,WithValue as g,n as _,t as v}from"./calendar.stories-aX4EC7o7.js";var y,b=e((()=>{y=`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

// Unselected calendar pinned to a fixed visible month so the month/year header snapshots
// deterministically — without a fixed focus it would show today's month and churn daily.
export function CalendarDefaultExample() {
  return <Calendar aria-label="Event date" defaultFocusedValue={parseDate('2024-03-01')} />;
}
`})),x,S=e((()=>{x=`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarWithValueExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} />;
}
`})),C,w=e((()=>{C=`import { RangeCalendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function RangeCalendarExample() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: parseDate('2024-03-10'), end: parseDate('2024-03-15') }}
    />
  );
}
`})),T,E=e((()=>{T=`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarMinMaxExample() {
  return (
    <Calendar
      aria-label="Booking date"
      defaultValue={parseDate('2024-03-15')}
      minValue={parseDate('2024-03-05')}
      maxValue={parseDate('2024-03-25')}
    />
  );
}
`})),D,O=e((()=>{D=`import { Calendar } from '@godaddy/antares';
import { isWeekend, parseDate } from '@internationalized/date';

export function CalendarUnavailableExample() {
  return (
    <Calendar
      aria-label="Weekday only"
      defaultValue={parseDate('2024-03-15')}
      isDateUnavailable={(date) => isWeekend(date, 'en-US')}
    />
  );
}
`})),k,A=e((()=>{k=`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function CalendarDisabledExample() {
  return <Calendar aria-label="Event date" defaultValue={parseDate('2024-03-15')} isDisabled />;
}
`}));function j(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(o,{of:v,name:`Overview`}),`
`,(0,N.jsx)(t.h1,{id:`calendar`,children:`Calendar`}),`
`,(0,N.jsx)(t.p,{children:`Accessible calendar grids for selecting a single date (Calendar) or a date range (RangeCalendar), built on React Aria.`}),`
`,(0,N.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsxs)(t.li,{children:[`Single-date (`,(0,N.jsx)(t.code,{children:`Calendar`}),`) and range (`,(0,N.jsx)(t.code,{children:`RangeCalendar`}),`) grids built on React Aria`]}),`
`,(0,N.jsx)(t.li,{children:`Month dropdown plus a typeable year input in the header for fast navigation`}),`
`,(0,N.jsx)(t.li,{children:`Keyboard navigable and screen-reader announced`}),`
`,(0,N.jsxs)(t.li,{children:[(0,N.jsx)(t.code,{children:`minValue`}),` / `,(0,N.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,N.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`,(0,N.jsxs)(t.li,{children:[`Date-only values via `,(0,N.jsx)(t.code,{children:`@internationalized/date`}),`'s `,(0,N.jsx)(t.code,{children:`CalendarDate`})]}),`
`]}),`
`,(0,N.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,N.jsx)(t.pre,{children:(0,N.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,N.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,N.jsxs)(t.p,{children:[(0,N.jsx)(t.code,{children:`Calendar`}),` values are `,(0,N.jsx)(t.code,{children:`CalendarDate`}),` objects from `,(0,N.jsx)(t.code,{children:`@internationalized/date`}),`, which is included transitively with `,(0,N.jsx)(t.code,{children:`@godaddy/antares`}),`. Add `,(0,N.jsx)(t.code,{children:`@internationalized/date`}),` to your `,(0,N.jsx)(t.code,{children:`package.json`}),` and use it directly:`]}),`
`,(0,N.jsx)(t.pre,{children:(0,N.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { Calendar } from '@godaddy/antares';

<Calendar aria-label="Date" defaultValue={parseDate('2024-03-15')} />;
<Calendar aria-label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,N.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,N.jsxs)(t.p,{children:[`The `,(0,N.jsx)(t.code,{children:`Calendar`}),` component accepts the following props:`]}),`
`,(0,N.jsx)(a,{of:f}),`
`,(0,N.jsxs)(t.p,{children:[`The `,(0,N.jsx)(t.code,{children:`RangeCalendar`}),` component accepts the following props:`]}),`
`,(0,N.jsx)(a,{of:m}),`
`,(0,N.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,N.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,N.jsx)(t.p,{children:`A single-date calendar.`}),`
`,(0,N.jsx)(r,{language:`tsx`,code:y}),`
`,(0,N.jsx)(i,{of:l,inline:!0}),`
`,(0,N.jsx)(t.h3,{id:`with-value`,children:`With value`}),`
`,(0,N.jsx)(t.p,{children:`A calendar with a pre-selected date.`}),`
`,(0,N.jsx)(r,{language:`tsx`,code:x}),`
`,(0,N.jsx)(i,{of:g,inline:!0}),`
`,(0,N.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,N.jsx)(t.p,{children:`Selecting a start and end date.`}),`
`,(0,N.jsx)(r,{language:`tsx`,code:C}),`
`,(0,N.jsx)(i,{of:p,inline:!0}),`
`,(0,N.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,N.jsx)(t.p,{children:`Bounding selectable dates.`}),`
`,(0,N.jsx)(r,{language:`tsx`,code:T}),`
`,(0,N.jsx)(i,{of:d,inline:!0}),`
`,(0,N.jsx)(t.h3,{id:`unavailable`,children:`Unavailable`}),`
`,(0,N.jsxs)(t.p,{children:[`Disabling scattered individual dates with `,(0,N.jsx)(t.code,{children:`isDateUnavailable`}),`.`]}),`
`,(0,N.jsx)(r,{language:`tsx`,code:D}),`
`,(0,N.jsx)(i,{of:h,inline:!0}),`
`,(0,N.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,N.jsx)(t.p,{children:`A fully disabled calendar.`}),`
`,(0,N.jsx)(r,{language:`tsx`,code:k}),`
`,(0,N.jsx)(i,{of:u,inline:!0}),`
`,(0,N.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsx)(t.li,{children:`Arrow keys move by day; PageUp/PageDown by month; Home/End to row edges`}),`
`,(0,N.jsx)(t.li,{children:`Focus-visible outline; disabled days are not focusable`}),`
`,(0,N.jsx)(t.li,{children:`Out-of-month days render at reduced opacity and are not selectable`}),`
`]}),`
`,(0,N.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsxs)(t.li,{children:[`Always provide an `,(0,N.jsx)(t.code,{children:`aria-label`}),` on standalone calendars.`]}),`
`,(0,N.jsxs)(t.li,{children:[`Use `,(0,N.jsx)(t.code,{children:`isDateUnavailable`}),` for scattered disabled days; use `,(0,N.jsx)(t.code,{children:`minValue`}),` / `,(0,N.jsx)(t.code,{children:`maxValue`}),` for contiguous bounds.`]}),`
`]}),`
`,(0,N.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,N.jsxs)(t.ul,{children:[`
`,(0,N.jsxs)(t.li,{children:[`Dates not formatting per locale? Ensure the app is wrapped in `,(0,N.jsx)(t.code,{children:`<I18nProvider locale="…">`}),`.`]}),`
`]})]})}function M(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,N.jsx)(t,{...e,children:(0,N.jsx)(j,{...e})}):j(e)}var N;e((()=>{N=t(),c(),s(),_(),b(),S(),w(),E(),O(),A()}))();export{M as default};