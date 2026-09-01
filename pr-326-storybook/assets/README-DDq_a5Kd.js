import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-C1U0XjdE.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-J1guKep0.js";import{t as c}from"./mdx-react-shim-Dw8Dqmvo.js";import{t as l}from"./runtime-CCpseHws.js";import{Composed as u,ComposedRange as d,ComposedState as f,Controlled as p,DateRangePickerProps as m,Default as h,Disabled as g,FormatOptions as _,MinMax as v,Props as y,Range as b,WithError as x,n as S,t as C}from"./date-picker.stories-C-FmXUpp.js";function w(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o,{of:C,name:`Overview`}),`
`,(0,E.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,E.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a calendar popover to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,E.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,E.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar popover`]}),`
`,(0,E.jsx)(t.li,{children:`Built on React Aria — native form integration, validation, focus management, and screen-reader support`}),`
`,(0,E.jsxs)(t.li,{children:[`Consumer-controlled label formatting via `,(0,E.jsx)(t.code,{children:`formatOptions`})]}),`
`,(0,E.jsxs)(t.li,{children:[(0,E.jsx)(t.code,{children:`minValue`}),` / `,(0,E.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,E.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,E.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,E.jsxs)(t.p,{children:[`Values are `,(0,E.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,E.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,E.jsx)(t.pre,{children:(0,E.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate, today, getLocalTimeZone } from '@godaddy/antares/date';
import { DatePicker } from '@godaddy/antares';

<DatePicker label="Event" defaultValue={parseDate('2024-03-15')} />;
<DatePicker label="Today" defaultValue={today(getLocalTimeZone())} />;
`})}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`@godaddy/antares/date`}),` re-exports `,(0,E.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,E.jsx)(t.code,{children:`@internationalized/date`})}),`, the package behind these date primitives. Locale comes from a host `,(0,E.jsx)(t.code,{children:`<I18nProvider>`}),`. This version has no typed/segmented entry - selection is via the calendar.`]}),`
`,(0,E.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,E.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,E.jsx)(t.p,{children:`A single date picker.`}),`
`,(0,E.jsx)(i,{of:h,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function DefaultExample() {
  return <DatePicker label="Event date" />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,E.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,E.jsx)(i,{of:b,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DateRangePicker } from '@godaddy/antares';

export function RangeExample() {
  return <DateRangePicker label="Trip dates" />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,E.jsxs)(t.p,{children:[`Driving the value with `,(0,E.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,E.jsx)(i,{of:p,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { useState } from 'react';
import { DatePicker } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

export function ControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));
  return <DatePicker label="Event date" value={value} onChange={setValue} />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`format-options`,children:`Format Options`}),`
`,(0,E.jsxs)(t.p,{children:[`Controlling the label with `,(0,E.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,E.jsx)(i,{of:_,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function FormatOptionsExample() {
  return (
    <DatePicker label="Event date" defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }} />
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`min-max`,children:`Min Max`}),`
`,(0,E.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,E.jsx)(t.code,{children:`minValue`}),` / `,(0,E.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,E.jsx)(i,{of:v,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function MinMaxExample() {
  return <DatePicker label="Booking date" minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')} />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`with-error`,children:`With Error`}),`
`,(0,E.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,E.jsx)(t.code,{children:`isInvalid`}),` and `,(0,E.jsx)(t.code,{children:`errorMessage`}),`.`]}),`
`,(0,E.jsx)(i,{of:x,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function WithErrorExample() {
  return <DatePicker label="Event date" isInvalid errorMessage="Please choose a date" />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,E.jsxs)(t.p,{children:[`A disabled picker via `,(0,E.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,E.jsx)(i,{of:g,inline:!0}),`
`,(0,E.jsx)(r,{code:`import { DatePicker } from '@godaddy/antares';

export function DisabledExample() {
  return <DatePicker label="Event date" isDisabled />;
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,E.jsx)(t.p,{children:`Compose the interior out of Antares components when the default layout is not enough.
DatePicker renders your children as-is instead of building its own layout.`}),`
`,(0,E.jsx)(i,{of:u,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  Text
} from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function ComposedExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose the event date</Text>
      <FieldError />
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`composed-range`,children:`Composed Range`}),`
`,(0,E.jsx)(t.p,{children:`Compose a DateRangePicker interior the same way: Label, Group, trigger, RangeCalendar.`}),`
`,(0,E.jsx)(i,{of:d,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  RangeCalendar,
  Text
} from '@godaddy/antares';

export function ComposedRangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Group alignItems="center">
        <Button variant="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose your start and end dates</Text>
      <FieldError />
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h3,{id:`composed-state`,children:`Composed State`}),`
`,(0,E.jsxs)(t.p,{children:[`Pass a function when the interior needs the DatePicker state. It receives `,(0,E.jsx)(t.code,{children:`isOpen`}),`
and the rest of the render props.`]}),`
`,(0,E.jsx)(i,{of:f,inline:!0}),`
`,(0,E.jsx)(r,{code:`import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
  FieldError,
  Group,
  Icon,
  Label,
  Popover,
  Text
} from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function ComposedStateExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      {function renderInterior({ isOpen }) {
        return (
          <>
            <Label>Event date</Label>
            <Group alignItems="center">
              <Button variant="trigger">
                <Icon icon="calendar" />
                <DatePickerValue />
              </Button>
            </Group>
            <Text slot="description">{isOpen ? 'Use the arrow keys to browse' : 'Choose the event date'}</Text>
            <FieldError />
            <Popover hideArrow>
              <Content>
                <Calendar />
              </Content>
            </Popover>
          </>
        );
      }}
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,E.jsx)(t.h2,{id:`customization`,children:`Customization`}),`
`,(0,E.jsxs)(t.p,{children:[(0,E.jsx)(t.code,{children:`formatOptions`}),` accepts any `,(0,E.jsx)(t.code,{children:`Intl.DateTimeFormatOptions`}),` (e.g. `,(0,E.jsx)(t.code,{children:`{ dateStyle: 'short' }`}),`, `,(0,E.jsx)(t.code,{children:`{ month: 'long', year: 'numeric' }`}),`). `,(0,E.jsx)(t.code,{children:`placeholder`}),` sets the empty-state text.`]}),`
`,(0,E.jsxs)(t.p,{children:[`Pass `,(0,E.jsx)(t.code,{children:`children`}),` to compose `,(0,E.jsx)(t.code,{children:`Label`}),`, `,(0,E.jsx)(t.code,{children:`Group`}),`, `,(0,E.jsx)(t.code,{children:`Button`}),`, `,(0,E.jsx)(t.code,{children:`DatePickerValue`}),` or `,(0,E.jsx)(t.code,{children:`DateRangePickerValue`}),`, `,(0,E.jsx)(t.code,{children:`Text`}),`, `,(0,E.jsx)(t.code,{children:`FieldError`}),`, `,(0,E.jsx)(t.code,{children:`Popover`}),`, `,(0,E.jsx)(t.code,{children:`Content`}),`, and `,(0,E.jsx)(t.code,{children:`Calendar`}),` or `,(0,E.jsx)(t.code,{children:`RangeCalendar`}),` instead of the default layout.`]}),`
`,(0,E.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsx)(t.li,{children:`The whole field is a single focusable button; Enter/Space opens the popover`}),`
`,(0,E.jsx)(t.li,{children:`Focus is trapped in the open popover and returns to the trigger on close`}),`
`,(0,E.jsx)(t.li,{children:`Esc and outside-click dismiss the popover`}),`
`,(0,E.jsx)(t.li,{children:`The calendar grid is fully keyboard navigable and screen-reader announced`}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`best-practices`,children:`Best Practices`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Provide a `,(0,E.jsx)(t.code,{children:`label`}),` (or `,(0,E.jsx)(t.code,{children:`aria-label`}),`) on every picker.`]}),`
`,(0,E.jsx)(t.li,{children:`For typed/keyboard-fast date entry far from today, use the calendar's month dropdown and year input.`}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`troubleshooting`,children:`Troubleshooting`}),`
`,(0,E.jsxs)(t.ul,{children:[`
`,(0,E.jsxs)(t.li,{children:[`Dates not localizing? Wrap the app in `,(0,E.jsx)(t.code,{children:`<I18nProvider locale="…">`}),`.`]}),`
`,(0,E.jsxs)(t.li,{children:[`Form value missing on submit? Pass a `,(0,E.jsx)(t.code,{children:`name`}),` — React Aria renders the hidden input.`]}),`
`]}),`
`,(0,E.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,E.jsxs)(t.p,{children:[`The `,(0,E.jsx)(t.code,{children:`DatePicker`}),` component accepts the following props:`]}),`
`,(0,E.jsx)(a,{of:y}),`
`,(0,E.jsxs)(t.p,{children:[`The `,(0,E.jsx)(t.code,{children:`DateRangePicker`}),` component accepts the following props:`]}),`
`,(0,E.jsx)(a,{of:m})]})}function T(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,E.jsx)(t,{...e,children:(0,E.jsx)(w,{...e})}):w(e)}var E;e((()=>{E=t(),c(),s(),l(),S()}))();export{T as default};