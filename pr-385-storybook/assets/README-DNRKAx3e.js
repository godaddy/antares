import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,c as i,l as a,n as o,s,u as c}from"./blocks-D0__gynf.js";import{_ as l,a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,m as v,n as y,o as b,p as x,r as S,s as C,t as w,u as T,v as E}from"./date-picker.stories-Kagyvx7D.js";function D(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return(0,k.jsxs)(k.Fragment,{children:[(0,k.jsx)(s,{of:l,name:`Overview`}),`
`,(0,k.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,k.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a responsive calendar to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,k.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsx)(t.li,{children:`Single-date and range selection, with a formatted trigger and responsive calendar`}),`
`,(0,k.jsxs)(t.li,{children:[`Compose `,(0,k.jsx)(t.code,{children:`Label`}),`, `,(0,k.jsx)(t.code,{children:`Button slot="trigger"`}),`, a calendar, and optional description or error text`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`size`}),` (`,(0,k.jsx)(t.code,{children:`sm`}),`, `,(0,k.jsx)(t.code,{children:`md`}),`, `,(0,k.jsx)(t.code,{children:`lg`}),`) applies to the field and calendar; omitted sizes follow the surrounding scope`]}),`
`,(0,k.jsxs)(t.li,{children:[`Customize the trigger with `,(0,k.jsx)(t.code,{children:`formatOptions`}),`, `,(0,k.jsx)(t.code,{children:`placeholder`}),`, or `,(0,k.jsx)(t.code,{children:`DatePickerValue`}),` / `,(0,k.jsx)(t.code,{children:`DateRangePickerValue`})]}),`
`,(0,k.jsx)(t.li,{children:`Date bounds, unavailable dates, form validation, and keyboard navigation through React Aria`}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,k.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,k.jsxs)(t.p,{children:[`Values are `,(0,k.jsx)(t.code,{children:`CalendarDate`}),` objects. Import helpers from `,(0,k.jsx)(t.code,{children:`@godaddy/antares/date`}),`, which re-exports
`,(0,k.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,k.jsx)(t.code,{children:`@internationalized/date`})}),`:`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate } from '@godaddy/antares/date';

const date = parseDate('2024-03-15');
`})}),`
`,(0,k.jsxs)(t.p,{children:[`Use `,(0,k.jsx)(t.code,{children:`<I18nProvider>`}),` to set the locale for formatting and calendar navigation.`]}),`
`,(0,k.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,k.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,k.jsxs)(t.p,{children:[`A single date picker with a `,(0,k.jsx)(t.code,{children:`Label`}),`.`]}),`
`,(0,k.jsx)(a,{of:_,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,k.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,k.jsx)(a,{of:v,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DateRangePicker, DateRangePickerCalendar, Label } from '@godaddy/antares';

export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Button slot="trigger" />
      <DateRangePickerCalendar />
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,k.jsxs)(t.p,{children:[`Driving the value with `,(0,k.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,k.jsx)(a,{of:S,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { useState } from 'react';
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
`,(0,k.jsx)(t.h3,{id:`format-options`,children:`Format Options`}),`
`,(0,k.jsxs)(t.p,{children:[`Controlling the trigger's label format via `,(0,k.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,k.jsx)(a,{of:f,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
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
`,(0,k.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,k.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,k.jsx)(t.code,{children:`minValue`}),` / `,(0,k.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,k.jsx)(a,{of:p,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
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
`,(0,k.jsx)(t.h3,{id:`with-error`,children:`With error`}),`
`,(0,k.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,k.jsx)(t.code,{children:`isInvalid`}),` and a `,(0,k.jsx)(t.code,{children:`FieldError`}),`.`]}),`
`,(0,k.jsx)(a,{of:m,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, FieldError, Label } from '@godaddy/antares';

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
`,(0,k.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,k.jsxs)(t.p,{children:[`A disabled picker via `,(0,k.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,k.jsx)(a,{of:T,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,k.jsxs)(t.p,{children:[`Write the trigger and the overlay yourself instead of composing `,(0,k.jsx)(t.code,{children:`DatePickerCalendar`}),`, for full
control over the popover and the calendar.`]}),`
`,(0,k.jsx)(a,{of:w,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, Calendar, Content, DatePicker, DatePickerValue, Icon, Label, Popover, Text } from '@godaddy/antares';
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
`,(0,k.jsx)(t.h3,{id:`composed-range`,children:`Composed range`}),`
`,(0,k.jsx)(t.p,{children:`Write a DateRangePicker's trigger and overlay from lower-level pieces the same way.`}),`
`,(0,k.jsx)(a,{of:y,inline:!0}),`
`,(0,k.jsx)(i,{code:`import {
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
`,(0,k.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,k.jsxs)(t.p,{children:[(0,k.jsx)(t.code,{children:`size`}),` sets the label, trigger, and calendar. Without it, the picker follows the surrounding
size scope.`]}),`
`,(0,k.jsx)(a,{of:h,inline:!0}),`
`,(0,k.jsx)(i,{code:`import { Button, DatePicker, DatePickerCalendar, Flex, Label } from '@godaddy/antares';

const SIZES = ['sm', 'md', 'lg'] as const;

export function SizesExample() {
  return (
    <Flex direction="column" gap="md">
      {SIZES.map(function picker(size) {
        return (
          <DatePicker key={size} size={size}>
            <Label>Event date ({size})</Label>
            <Button slot="trigger" />
            <DatePickerCalendar />
          </DatePicker>
        );
      })}
    </Flex>
  );
}`,language:`tsx`}),`
`,(0,k.jsx)(t.h2,{id:`mobile`,children:`Mobile`}),`
`,(0,k.jsxs)(t.p,{children:[`Below `,(0,k.jsx)(t.code,{children:`40rem`}),`, calendars open in a bottom drawer with continuous month scrolling. Use the month/year
controls to jump directly. Resizing changes the presentation on the next opening.`]}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`overlay="popover"`}),` always uses the desktop presentation.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`drawerProps`}),` customizes the drawer, which defaults to `,(0,k.jsx)(t.code,{children:`85dvh`}),`; `,(0,k.jsx)(t.code,{children:`popoverProps`}),` customizes the popover.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`pageCount`}),` sets months per popover page: one for single dates and two for ranges by default.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`commitBehavior`}),` on `,(0,k.jsx)(t.code,{children:`DateRangePickerCalendar`}),` applies to both presentations.`]}),`
`,(0,k.jsxs)(t.li,{children:[(0,k.jsx)(t.code,{children:`shouldCloseOnSelect={false}`}),` on the picker keeps the calendar open after selection.`]}),`
`]}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<DatePicker>
  <Label>Event date</Label>
  <Button slot="trigger" />
  <DatePickerCalendar drawerProps={{ maxSize: '90dvh' }} />
</DatePicker>
`})}),`
`,(0,k.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,k.jsxs)(t.ul,{children:[`
`,(0,k.jsx)(t.li,{children:`Label the picker; its calendar uses the same accessible name.`}),`
`,(0,k.jsx)(t.li,{children:`Arrow keys move between dates; Page Up/Down moves between months. Scrolling preserves focus and selection.`}),`
`,(0,k.jsx)(t.li,{children:`Escape or dismissal returns focus to the trigger. Escape cancels an unfinished range.`}),`
`,(0,k.jsx)(t.li,{children:`Enlarged text remains readable, with horizontal scrolling inside the drawer when needed.`}),`
`]}),`
`,(0,k.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<DatePicker>
  <Label />
  <Button slot="trigger" />
  <DatePickerCalendar />
  <Text slot="description" />
  <FieldError />
</DatePicker>
`})}),`
`,(0,k.jsx)(t.pre,{children:(0,k.jsx)(t.code,{className:`language-tsx`,children:`<DateRangePicker>
  <Label />
  <Button slot="trigger" />
  <DateRangePickerCalendar />
  <Text slot="description" />
  <FieldError />
</DateRangePicker>
`})}),`
`,(0,k.jsx)(t.h3,{id:`datepicker-1`,children:`DatePicker`}),`
`,(0,k.jsx)(o,{of:x}),`
`,(0,k.jsx)(t.h3,{id:`daterangepicker`,children:`DateRangePicker`}),`
`,(0,k.jsx)(o,{of:C}),`
`,(0,k.jsx)(t.h3,{id:`datepickercalendar`,children:`DatePickerCalendar`}),`
`,(0,k.jsx)(o,{of:g}),`
`,(0,k.jsx)(t.h3,{id:`daterangepickercalendar`,children:`DateRangePickerCalendar`}),`
`,(0,k.jsx)(o,{of:b}),`
`,(0,k.jsx)(t.h3,{id:`datepickervalue`,children:`DatePickerValue`}),`
`,(0,k.jsx)(o,{of:u}),`
`,(0,k.jsx)(t.h3,{id:`daterangepickervalue`,children:`DateRangePickerValue`}),`
`,(0,k.jsx)(o,{of:d})]})}function O(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,k.jsx)(t,{...e,children:(0,k.jsx)(D,{...e})}):D(e)}var k;function A(){return(A=e((()=>{k=t(),n(),c(),E()})))()}A();export{O as default};