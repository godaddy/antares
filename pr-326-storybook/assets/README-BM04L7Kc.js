import{i as e}from"./preload-helper-BT3GefEN.js";import{F as t}from"./iframe-DGW9Ha8k.js";import{S as n,c as r,l as i,n as a,s as o,u as s}from"./blocks-Bsyba9RX.js";import{t as c}from"./mdx-react-shim-mSeRT3c4.js";import{t as l}from"./runtime-CCpseHws.js";import{Composed as u,ComposedRange as d,Controlled as f,DateRangePickerProps as p,Default as m,Disabled as h,FormatOptions as g,MinMax as _,Props as v,Range as y,WithError as b,n as x,t as S}from"./date-picker.stories-CvB34iEu.js";function C(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{of:S,name:`Overview`}),`
`,(0,T.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,T.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a calendar popover to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,T.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,T.jsxs)(t.ul,{children:[`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.strong,{children:`Composable interior`}),`: Pass `,(0,T.jsx)(t.code,{children:`Label`}),` and optional `,(0,T.jsx)(t.code,{children:`Text`}),` / `,(0,T.jsx)(t.code,{children:`FieldError`}),`; the field adds the trigger and the calendar popover, keeping the order you wrote. Write a `,(0,T.jsx)(t.code,{children:`DatePickerControl`}),` to set the label format, or a `,(0,T.jsx)(t.code,{children:`Group`}),`, `,(0,T.jsx)(t.code,{children:`Button`}),`, `,(0,T.jsx)(t.code,{children:`DatePickerValue`}),`, `,(0,T.jsx)(t.code,{children:`Popover`}),`, `,(0,T.jsx)(t.code,{children:`Content`}),`, and `,(0,T.jsx)(t.code,{children:`Calendar`}),` interior of your own to replace either part. `,(0,T.jsx)(t.code,{children:`children`}),` also accepts a function for picker state`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,T.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar popover`]}),`
`,(0,T.jsx)(t.li,{children:`Built on React Aria - native form integration, validation, focus management, and screen-reader support`}),`
`,(0,T.jsxs)(t.li,{children:[`Label formatting via `,(0,T.jsx)(t.code,{children:`formatOptions`}),` / `,(0,T.jsx)(t.code,{children:`placeholder`}),` on `,(0,T.jsx)(t.code,{children:`DatePickerControl`}),` / `,(0,T.jsx)(t.code,{children:`DateRangePickerControl`}),`, or on `,(0,T.jsx)(t.code,{children:`DatePickerValue`}),` / `,(0,T.jsx)(t.code,{children:`DateRangePickerValue`}),` when composing`]}),`
`,(0,T.jsxs)(t.li,{children:[(0,T.jsx)(t.code,{children:`minValue`}),` / `,(0,T.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,T.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,T.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,T.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,T.jsxs)(t.p,{children:[`Values are `,(0,T.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,T.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,T.jsx)(t.pre,{children:(0,T.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate } from '@godaddy/antares/date';
import { DatePicker, Label } from '@godaddy/antares';

function EventDatePicker() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
    </DatePicker>
  );
}
`})}),`
`,(0,T.jsxs)(t.p,{children:[`Import date helpers from `,(0,T.jsx)(t.code,{children:`@godaddy/antares/date`}),` (a re-export of
`,(0,T.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,T.jsx)(t.code,{children:`@internationalized/date`})}),`).
Wrap the app in `,(0,T.jsx)(t.code,{children:`<I18nProvider>`}),` so formatting and the calendar follow the user's locale.`]}),`
`,(0,T.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,T.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,T.jsxs)(t.p,{children:[`A single date picker with a `,(0,T.jsx)(t.code,{children:`Label`}),`.`]}),`
`,(0,T.jsx)(i,{of:m,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DatePicker, Label } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,T.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,T.jsx)(i,{of:y,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DateRangePicker, Label } from '@godaddy/antares';

export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,T.jsxs)(t.p,{children:[`Driving the value with `,(0,T.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,T.jsx)(i,{of:f,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { useState } from 'react';
import { DatePicker, Label } from '@godaddy/antares';
import { type CalendarDate, parseDate } from '@godaddy/antares/date';

export function ControlledExample() {
  const [value, setValue] = useState<CalendarDate | null>(parseDate('2024-03-15'));

  return (
    <DatePicker value={value} onChange={setValue}>
      <Label>Event date</Label>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`format-options`,children:`Format Options`}),`
`,(0,T.jsxs)(t.p,{children:[`Controlling the label format via `,(0,T.jsx)(t.code,{children:`formatOptions`}),` on `,(0,T.jsx)(t.code,{children:`DatePickerControl`}),`.`]}),`
`,(0,T.jsx)(i,{of:g,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DatePicker, DatePickerControl, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function FormatOptionsExample() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
      <DatePickerControl formatOptions={{ dateStyle: 'short' }} />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,T.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,T.jsx)(t.code,{children:`minValue`}),` / `,(0,T.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,T.jsx)(i,{of:_,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DatePicker, Label } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

export function MinMaxExample() {
  return (
    <DatePicker minValue={parseDate('2024-03-05')} maxValue={parseDate('2024-03-25')}>
      <Label>Booking date</Label>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`with-error`,children:`With error`}),`
`,(0,T.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,T.jsx)(t.code,{children:`isInvalid`}),` and a `,(0,T.jsx)(t.code,{children:`FieldError`}),`.`]}),`
`,(0,T.jsx)(i,{of:b,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DatePicker, FieldError, Label } from '@godaddy/antares';

export function WithErrorExample() {
  return (
    <DatePicker isInvalid>
      <Label>Event date</Label>
      <FieldError>Please choose a date</FieldError>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,T.jsxs)(t.p,{children:[`A disabled picker via `,(0,T.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,T.jsx)(i,{of:h,inline:!0}),`
`,(0,T.jsx)(r,{code:`import { DatePicker, Label } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,T.jsx)(t.p,{children:`Write the whole interior yourself instead of letting the field fill it in, for full control over
the trigger and popover.`}),`
`,(0,T.jsx)(i,{of:u,inline:!0}),`
`,(0,T.jsx)(r,{code:`import {
  Button,
  Calendar,
  Content,
  DatePicker,
  DatePickerValue,
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
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DatePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose the event date</Text>
      <Popover hideArrow>
        <Content>
          <Calendar />
        </Content>
      </Popover>
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h3,{id:`composed-range`,children:`Composed range`}),`
`,(0,T.jsx)(t.p,{children:`Build a DateRangePicker interior from lower-level pieces the same way.`}),`
`,(0,T.jsx)(i,{of:d,inline:!0}),`
`,(0,T.jsx)(r,{code:`import {
  Button,
  Content,
  DateRangePicker,
  DateRangePickerValue,
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
        <Button slot="trigger">
          <Icon icon="calendar" />
          <DateRangePickerValue />
        </Button>
      </Group>
      <Text slot="description">Choose your start and end dates</Text>
      <Popover hideArrow>
        <Content>
          <RangeCalendar />
        </Content>
      </Popover>
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,T.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`DatePicker`}),` component accepts the following props:`]}),`
`,(0,T.jsx)(a,{of:v}),`
`,(0,T.jsxs)(t.p,{children:[`The `,(0,T.jsx)(t.code,{children:`DateRangePicker`}),` component accepts the following props:`]}),`
`,(0,T.jsx)(a,{of:p})]})}function w(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,T.jsx)(t,{...e,children:(0,T.jsx)(C,{...e})}):C(e)}var T;e((()=>{T=t(),c(),s(),l(),x()}))();export{w as default};