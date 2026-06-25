import{i as e}from"./preload-helper-r38FjZtB.js";import{y as t}from"./iframe-DngYp88K.js";import{S as n,c as r,l as i,s as a,u as o}from"./blocks-xvnfn_hA.js";import{t as s}from"./mdx-react-shim-CAuTOnCQ.js";import{Basic as c,MinMax as l,Range as u,n as d,t as f}from"./calendar.stories-CuPZlXqN.js";var p,m=e((()=>{p=`import { Calendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

// Unselected calendar pinned to a fixed visible month so the month/year header snapshots
// deterministically — without a fixed focus it would show today's month and churn daily.
export function CalendarBasicExample() {
  return <Calendar aria-label="Event date" defaultFocusedValue={parseDate('2024-03-01')} />;
}
`})),h,g=e((()=>{h=`import { RangeCalendar } from '@godaddy/antares';
import { parseDate } from '@internationalized/date';

export function RangeCalendarExample() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      defaultValue={{ start: parseDate('2024-03-10'), end: parseDate('2024-03-15') }}
    />
  );
}
`})),_,v=e((()=>{_=`import { Calendar } from '@godaddy/antares';
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
`}));function y(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(a,{of:f,name:`Overview`}),`
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
`,(0,x.jsxs)(t.p,{children:[(0,x.jsx)(t.code,{children:`Calendar`}),` values are `,(0,x.jsx)(t.code,{children:`CalendarDate`}),` objects from `,(0,x.jsx)(t.code,{children:`@internationalized/date`}),`, which ships transitively with `,(0,x.jsx)(t.code,{children:`@godaddy/antares`}),` — import it directly:`]}),`
`,(0,x.jsx)(t.pre,{children:(0,x.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@internationalized/date';
import { Calendar } from '@godaddy/antares';

<Calendar aria-label="Date" defaultValue={parseDate('2024-03-15')} />;
<Calendar aria-label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,x.jsxs)(t.p,{children:[`Strict-pnpm users (without `,(0,x.jsx)(t.code,{children:`node-linker=hoisted`}),`) must add `,(0,x.jsx)(t.code,{children:`@internationalized/date`}),` to their own `,(0,x.jsx)(t.code,{children:`package.json`}),`. Locale comes from a host `,(0,x.jsx)(t.code,{children:`<I18nProvider>`}),`.`]}),`
`,(0,x.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,x.jsx)(t.h3,{id:`basic`,children:`Basic`}),`
`,(0,x.jsx)(t.p,{children:`A single-date calendar.`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:p}),`
`,(0,x.jsx)(i,{of:c,inline:!0}),`
`,(0,x.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,x.jsx)(t.p,{children:`Selecting a start and end date.`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:h}),`
`,(0,x.jsx)(i,{of:u,inline:!0}),`
`,(0,x.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,x.jsx)(t.p,{children:`Bounding selectable dates.`}),`
`,(0,x.jsx)(r,{language:`tsx`,code:_}),`
`,(0,x.jsx)(i,{of:l,inline:!0}),`
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
`]})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;e((()=>{x=t(),s(),o(),d(),m(),g(),v()}))();export{b as default};