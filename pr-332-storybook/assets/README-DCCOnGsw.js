import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-Cdu_Aq_A.js";import{a as l,c as u,d,f,i as p,l as m,n as h,o as g,p as _,r as v,s as y,t as b,u as x}from"./date-picker.stories-Db_GmNz7.js";function S(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(s,{of:f,name:`Overview`}),`
`,(0,w.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,w.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a calendar popover to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,w.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,w.jsxs)(t.ul,{children:[`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Composable interior`}),`: Compose `,(0,w.jsx)(t.code,{children:`Label`}),`, a `,(0,w.jsx)(t.code,{children:`Button slot="trigger"`}),`, `,(0,w.jsx)(t.code,{children:`DatePickerCalendar`}),`, and optional `,(0,w.jsx)(t.code,{children:`Text`}),` / `,(0,w.jsx)(t.code,{children:`FieldError`}),`. Nothing is added for you, and what you write keeps the order you wrote it in. `,(0,w.jsx)(t.code,{children:`children`}),` also accepts a function for picker state`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.strong,{children:`Trigger and calendar`}),`: An empty `,(0,w.jsx)(t.code,{children:`Button slot="trigger"`}),` renders a calendar icon and the formatted value from the field. `,(0,w.jsx)(t.code,{children:`DatePickerCalendar`}),` (and `,(0,w.jsx)(t.code,{children:`DateRangePickerCalendar`}),`) is the calendar in the popover it opens: it takes `,(0,w.jsx)(t.code,{children:`Calendar`}),` props plus `,(0,w.jsx)(t.code,{children:`popoverProps`}),` for the overlay. Write `,(0,w.jsx)(t.code,{children:`Popover`}),`, `,(0,w.jsx)(t.code,{children:`Content`}),`, and `,(0,w.jsx)(t.code,{children:`Calendar`}),` yourself to replace the whole overlay`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,w.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar popover`]}),`
`,(0,w.jsx)(t.li,{children:`Built on React Aria - native form integration, validation, focus management, and screen-reader support`}),`
`,(0,w.jsxs)(t.li,{children:[`Label formatting via `,(0,w.jsx)(t.code,{children:`formatOptions`}),` / `,(0,w.jsx)(t.code,{children:`placeholder`}),` on the picker itself, or on `,(0,w.jsx)(t.code,{children:`DatePickerValue`}),` / `,(0,w.jsx)(t.code,{children:`DateRangePickerValue`}),` in a trigger you write`]}),`
`,(0,w.jsxs)(t.li,{children:[(0,w.jsx)(t.code,{children:`minValue`}),` / `,(0,w.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,w.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,w.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,w.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,w.jsxs)(t.p,{children:[`Values are `,(0,w.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,w.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate } from '@godaddy/antares/date';
import { DatePicker, Label } from '@godaddy/antares';

function EventDatePicker() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
    </DatePicker>
  );
}
`})}),`
`,(0,w.jsxs)(t.p,{children:[`Import date helpers from `,(0,w.jsx)(t.code,{children:`@godaddy/antares/date`}),` (a re-export of
`,(0,w.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,w.jsx)(t.code,{children:`@internationalized/date`})}),`).
Wrap the app in `,(0,w.jsx)(t.code,{children:`<I18nProvider>`}),` so formatting and the calendar follow the user's locale.`]}),`
`,(0,w.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,w.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,w.jsxs)(t.p,{children:[`A single date picker with a `,(0,w.jsx)(t.code,{children:`Label`}),`.`]}),`
`,(0,w.jsx)(a,{of:l,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,w.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,w.jsx)(a,{of:x,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DateRangePicker, DateRangePickerCalendar, Label } from '@godaddy/antares';

export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Button slot="trigger" />
      <DateRangePickerCalendar />
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,w.jsxs)(t.p,{children:[`Driving the value with `,(0,w.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,w.jsx)(a,{of:v,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { useState } from 'react';
import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

export function ControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));

  return (
    <DatePicker value={value} onChange={setValue}>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`format-options`,children:`Format Options`}),`
`,(0,w.jsxs)(t.p,{children:[`Controlling the trigger's label format via `,(0,w.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,w.jsx)(a,{of:y,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')} formatOptions={{ dateStyle: 'short' }}>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,w.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,w.jsx)(t.code,{children:`minValue`}),` / `,(0,w.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,w.jsx)(a,{of:u,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function MinMaxExample() {
  return (
    <DatePicker minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')}>
      <Label>Booking date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`with-error`,children:`With error`}),`
`,(0,w.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,w.jsx)(t.code,{children:`isInvalid`}),` and a `,(0,w.jsx)(t.code,{children:`FieldError`}),`.`]}),`
`,(0,w.jsx)(a,{of:d,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, FieldError, Label } from '@godaddy/antares';

export function WithErrorExample() {
  return (
    <DatePicker isInvalid>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <FieldError>Please choose a date</FieldError>
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,w.jsxs)(t.p,{children:[`A disabled picker via `,(0,w.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,w.jsx)(a,{of:g,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,w.jsxs)(t.p,{children:[`Write the trigger and the overlay yourself instead of composing `,(0,w.jsx)(t.code,{children:`DatePickerCalendar`}),`, for full
control over the popover and the calendar.`]}),`
`,(0,w.jsx)(a,{of:b,inline:!0}),`
`,(0,w.jsx)(i,{code:`import { Button, Calendar, Content, DatePicker, DatePickerValue, Icon, Label, Popover, Text } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function ComposedExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <Button slot="trigger">
        <Icon icon="calendar" />
        <DatePickerValue />
      </Button>
      <Text slot="description">Choose the event date</Text>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h3,{id:`composed-range`,children:`Composed range`}),`
`,(0,w.jsx)(t.p,{children:`Write a DateRangePicker's trigger and overlay from lower-level pieces the same way.`}),`
`,(0,w.jsx)(a,{of:h,inline:!0}),`
`,(0,w.jsx)(i,{code:`import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
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
      <Button slot="trigger">
        <Icon icon="calendar" />
        <DateRangePickerValue />
      </Button>
      <Text slot="description">Choose your start and end dates</Text>
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,w.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<DatePicker>
  <Label />
  <Group>
    <Button slot="trigger">
      <DatePickerValue />
    </Button>
  </Group>
  <Text slot="description" />
  <Popover>
    <Content>
      <Calendar />
    </Content>
  </Popover>
  <FieldError />
</DatePicker>
`})}),`
`,(0,w.jsx)(t.pre,{children:(0,w.jsx)(t.code,{className:`language-tsx`,children:`<DateRangePicker>
  <Label />
  <Group>
    <Button slot="trigger">
      <DateRangePickerValue />
    </Button>
  </Group>
  <Text slot="description" />
  <Popover>
    <Content>
      <RangeCalendar />
    </Content>
  </Popover>
  <FieldError />
</DateRangePicker>
`})}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`DatePicker`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(o,{of:m}),`
`,(0,w.jsxs)(t.p,{children:[`The `,(0,w.jsx)(t.code,{children:`DateRangePicker`}),` component accepts the following props:`]}),`
`,(0,w.jsx)(o,{of:p})]})}function C(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(S,{...e})}):S(e)}var w;function T(){return(T=e((()=>{w=t(),n(),c(),_()})))()}T();export{C as default};