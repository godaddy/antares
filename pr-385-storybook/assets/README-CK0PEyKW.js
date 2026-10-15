import{n as e}from"./rolldown-runtime-DkW27tQK.js";import{t}from"./jsx-runtime-DeHZSEgm.js";import{c as n,l as r,n as i,s as a,u as o}from"./blocks-DrzUE4cn.js";import{i as s,r as c}from"./react-BXJ34t_g.js";import{_ as l,a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,m as v,n as y,o as b,p as x,r as S,s as C,t as w,u as T,v as E,y as D}from"./date-picker.stories-ClmDC7uk.js";function O(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...s(),...e.components};return(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(a,{of:E,name:`Overview`}),`
`,(0,A.jsx)(t.h1,{id:`datepicker`,children:`DatePicker`}),`
`,(0,A.jsx)(t.p,{children:`Date fields that display the selected value as a label and open a responsive calendar to pick a single date (DatePicker) or a range (DateRangePicker).`}),`
`,(0,A.jsx)(t.h2,{id:`features`,children:`Features`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.strong,{children:`Composable interior`}),`: Compose `,(0,A.jsx)(t.code,{children:`Label`}),`, a `,(0,A.jsx)(t.code,{children:`Button slot="trigger"`}),`, `,(0,A.jsx)(t.code,{children:`DatePickerCalendar`}),`, and optional `,(0,A.jsx)(t.code,{children:`Text`}),` / `,(0,A.jsx)(t.code,{children:`FieldError`}),`. Nothing is added for you, and what you write keeps the order you wrote it in. `,(0,A.jsx)(t.code,{children:`children`}),` also accepts a function for picker state`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.strong,{children:`Trigger and calendar`}),`: An empty `,(0,A.jsx)(t.code,{children:`Button slot="trigger"`}),` renders a calendar icon and the formatted value from the field. `,(0,A.jsx)(t.code,{children:`DatePickerCalendar`}),` (and `,(0,A.jsx)(t.code,{children:`DateRangePickerCalendar`}),`) opens a responsive calendar: it takes `,(0,A.jsx)(t.code,{children:`Calendar`}),` props plus `,(0,A.jsx)(t.code,{children:`popoverProps`}),` and `,(0,A.jsx)(t.code,{children:`drawerProps`}),` for its overlay. Write `,(0,A.jsx)(t.code,{children:`Popover`}),`, `,(0,A.jsx)(t.code,{children:`Content`}),`, and `,(0,A.jsx)(t.code,{children:`Calendar`}),` yourself to replace the whole overlay`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.strong,{children:`Sizes`}),`: Each picker is a `,(0,A.jsx)(t.code,{children:`SizeProvider`}),`. `,(0,A.jsx)(t.code,{children:`size`}),` (`,(0,A.jsx)(t.code,{children:`sm`}),`, `,(0,A.jsx)(t.code,{children:`md`}),`, `,(0,A.jsx)(t.code,{children:`lg`}),`) sets its label, trigger, description, error, and the calendar it opens; without it, the picker follows the surrounding scope`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`DatePicker`}),` (single) and `,(0,A.jsx)(t.code,{children:`DateRangePicker`}),` (range): a read-only formatted date label; the whole field opens a calendar`]}),`
`,(0,A.jsx)(t.li,{children:`Built on React Aria - native form integration, validation, focus management, and screen-reader support`}),`
`,(0,A.jsxs)(t.li,{children:[`Label formatting via `,(0,A.jsx)(t.code,{children:`formatOptions`}),` / `,(0,A.jsx)(t.code,{children:`placeholder`}),` on the picker itself, or on `,(0,A.jsx)(t.code,{children:`DatePickerValue`}),` / `,(0,A.jsx)(t.code,{children:`DateRangePickerValue`}),` in a trigger you write`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`minValue`}),` / `,(0,A.jsx)(t.code,{children:`maxValue`}),` bounds and `,(0,A.jsx)(t.code,{children:`isDateUnavailable`}),` per-day disabling`]}),`
`]}),`
`,(0,A.jsx)(t.h2,{id:`installation`,children:`Installation`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-bash`,children:`npm install @godaddy/antares
`})}),`
`,(0,A.jsx)(t.h2,{id:`working-with-dates`,children:`Working with dates`}),`
`,(0,A.jsxs)(t.p,{children:[`Values are `,(0,A.jsx)(t.code,{children:`CalendarDate`}),` objects. Import the date primitives you need from the `,(0,A.jsx)(t.code,{children:`@godaddy/antares/date`}),` subpath:`]}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-tsx`,children:`import { parseDate } from '@godaddy/antares/date';
import { DatePicker, Label } from '@godaddy/antares';

function EventDatePicker() {
  return (
    <DatePicker defaultValue={parseDate('2024-03-15')}>
      <Label>Event date</Label>
    </DatePicker>
  );
}
`})}),`
`,(0,A.jsxs)(t.p,{children:[`Import date helpers from `,(0,A.jsx)(t.code,{children:`@godaddy/antares/date`}),` (a re-export of
`,(0,A.jsx)(t.a,{href:`https://react-spectrum.adobe.com/internationalized/date/`,rel:`nofollow`,children:(0,A.jsx)(t.code,{children:`@internationalized/date`})}),`).
Wrap the app in `,(0,A.jsx)(t.code,{children:`<I18nProvider>`}),` so formatting and the calendar follow the user's locale.`]}),`
`,(0,A.jsx)(t.h2,{id:`examples`,children:`Examples`}),`
`,(0,A.jsx)(t.h3,{id:`default`,children:`Default`}),`
`,(0,A.jsxs)(t.p,{children:[`A single date picker with a `,(0,A.jsx)(t.code,{children:`Label`}),`.`]}),`
`,(0,A.jsx)(r,{of:_,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DefaultExample() {
  return (
    <DatePicker>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,A.jsx)(t.h3,{id:`range`,children:`Range`}),`
`,(0,A.jsx)(t.p,{children:`A start/end range picker.`}),`
`,(0,A.jsx)(r,{of:h,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DateRangePicker, DateRangePickerCalendar, Label } from '@godaddy/antares';

export function RangeExample() {
  return (
    <DateRangePicker>
      <Label>Trip dates</Label>
      <Button slot="trigger" />
      <DateRangePickerCalendar />
    </DateRangePicker>
  );
}`,language:`tsx`}),`
`,(0,A.jsx)(t.h3,{id:`controlled`,children:`Controlled`}),`
`,(0,A.jsxs)(t.p,{children:[`Driving the value with `,(0,A.jsx)(t.code,{children:`useState`}),`.`]}),`
`,(0,A.jsx)(r,{of:S,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { useState } from 'react';
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
`,(0,A.jsx)(t.h3,{id:`mobile`,children:`Mobile`}),`
`,(0,A.jsx)(t.p,{children:`Below 40rem, the picker opens a scrolling drawer. Resize after closing to switch containers.`}),`
`,(0,A.jsx)(r,{of:x,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { useState } from 'react';
import { I18nProvider, useLocale } from 'react-aria';
import {
  Button,
  DatePicker,
  DatePickerCalendar,
  DateRangePicker,
  DateRangePickerCalendar,
  Label,
  type CalendarProps,
  type RangeCalendarProps,
  type ScaleSize
} from '@godaddy/antares';
import { parseDate, type DateValue } from '@godaddy/antares/date';

interface MobileExampleProps {
  /** Whether to choose a range. */
  range?: boolean;

  /** Override responsive presentation. */
  overlay?: 'responsive' | 'popover';

  /** Start with the overlay open. */
  defaultOpen?: boolean;

  /** Controlled open state, when supplied. */
  isOpen?: boolean;

  /** Locale used by the calendar and its controls. */
  locale?: string;

  /** Keep the overlay open after selection. */
  keepOpen?: boolean;

  /** Calendar focus supplied by the consumer. */
  focusedDate?: string;

  /** Initial focus when no controlled focus is supplied. */
  defaultFocusedDate?: string;

  /** Initial selection. */
  selectedDate?: string;

  /** Earliest selectable date. */
  min?: string;

  /** Latest selectable date. */
  max?: string;

  /** Mark the twentieth day of each month unavailable. */
  unavailable?: boolean;

  /** Allow a range to cross unavailable dates. */
  allowsNonContiguousRanges?: boolean;

  /** Number of months per page. */
  pageCount?: number;

  /** Amount to advance using the navigation buttons. */
  pageBehavior?: CalendarProps['pageBehavior'];

  /** React Aria's behavior when focus leaves an unfinished range. */
  commitBehavior?: RangeCalendarProps['commitBehavior'];

  /** Component size. */
  size?: ScaleSize;
}

export function MobileExample(props: MobileExampleProps) {
  return (
    <I18nProvider locale={props.locale}>
      <MobilePicker {...props} />
    </I18nProvider>
  );
}

function MobilePicker({
  range = false,
  overlay,
  defaultOpen,
  isOpen,
  keepOpen,
  focusedDate,
  defaultFocusedDate = '2026-09-15',
  selectedDate,
  min,
  max,
  unavailable,
  allowsNonContiguousRanges,
  pageCount,
  pageBehavior,
  commitBehavior,
  size
}: MobileExampleProps) {
  const { direction } = useLocale();
  const [selection, setSelection] = useState('');
  const [focus, setFocus] = useState(focusedDate);
  const [lastFocusedDate, setLastFocusedDate] = useState(focusedDate);
  if (lastFocusedDate !== focusedDate) {
    setLastFocusedDate(focusedDate);
    setFocus(focusedDate);
  }
  const calendarProps = {
    overlay,
    pageCount,
    pageBehavior,
    dir: direction,
    focusedValue: focus ? parseDate(focus) : undefined,
    defaultFocusedValue: defaultFocusedDate ? parseDate(defaultFocusedDate) : undefined,
    onFocusChange: focus
      ? function changeFocus(date: ReturnType<typeof parseDate>) {
          setFocus(date.toString());
        }
      : undefined
  };
  const shared = {
    defaultOpen,
    isOpen,
    shouldCloseOnSelect: !keepOpen,
    minValue: min ? parseDate(min) : undefined,
    maxValue: max ? parseDate(max) : undefined,
    isDateUnavailable: unavailable
      ? function unavailableDate(date: DateValue) {
          return date.day === 20;
        }
      : undefined,
    size
  };
  const children = (
    <>
      <Label>Event dates</Label>
      <Button slot="trigger" />
      {range ? (
        <DateRangePickerCalendar
          {...calendarProps}
          allowsNonContiguousRanges={allowsNonContiguousRanges}
          commitBehavior={commitBehavior}
        />
      ) : (
        <DatePickerCalendar {...calendarProps} />
      )}
    </>
  );

  return (
    <>
      {range ? (
        <DateRangePicker
          {...shared}
          defaultValue={
            selectedDate ? { start: parseDate(selectedDate), end: parseDate(selectedDate).add({ days: 3 }) } : undefined
          }
          onChange={function selected(value) {
            setSelection(value ? \`\${value.start}/\${value.end}\` : '');
          }}
        >
          {children}
        </DateRangePicker>
      ) : (
        <DatePicker
          {...shared}
          defaultValue={selectedDate ? parseDate(selectedDate) : undefined}
          onChange={function selected(value) {
            setSelection(value?.toString() ?? '');
          }}
        >
          {children}
        </DatePicker>
      )}
      <output aria-label="Selected dates">{selection}</output>
    </>
  );
}`,language:`tsx`}),`
`,(0,A.jsx)(t.h3,{id:`format-options`,children:`Format Options`}),`
`,(0,A.jsxs)(t.p,{children:[`Controlling the trigger's label format via `,(0,A.jsx)(t.code,{children:`formatOptions`}),`.`]}),`
`,(0,A.jsx)(r,{of:f,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
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
`,(0,A.jsx)(t.h3,{id:`min--max`,children:`Min / Max`}),`
`,(0,A.jsxs)(t.p,{children:[`Bounding selectable dates with `,(0,A.jsx)(t.code,{children:`minValue`}),` / `,(0,A.jsx)(t.code,{children:`maxValue`}),`.`]}),`
`,(0,A.jsx)(r,{of:p,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';
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
`,(0,A.jsx)(t.h3,{id:`with-error`,children:`With error`}),`
`,(0,A.jsxs)(t.p,{children:[`An invalid picker showing a validation message via `,(0,A.jsx)(t.code,{children:`isInvalid`}),` and a `,(0,A.jsx)(t.code,{children:`FieldError`}),`.`]}),`
`,(0,A.jsx)(r,{of:l,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, FieldError, Label } from '@godaddy/antares';

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
`,(0,A.jsx)(t.h3,{id:`disabled`,children:`Disabled`}),`
`,(0,A.jsxs)(t.p,{children:[`A disabled picker via `,(0,A.jsx)(t.code,{children:`isDisabled`}),`.`]}),`
`,(0,A.jsx)(r,{of:T,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, Label } from '@godaddy/antares';

export function DisabledExample() {
  return (
    <DatePicker isDisabled>
      <Label>Event date</Label>
      <Button slot="trigger" />
      <DatePickerCalendar />
    </DatePicker>
  );
}`,language:`tsx`}),`
`,(0,A.jsx)(t.h3,{id:`composed`,children:`Composed`}),`
`,(0,A.jsxs)(t.p,{children:[`Write the trigger and the overlay yourself instead of composing `,(0,A.jsx)(t.code,{children:`DatePickerCalendar`}),`, for full
control over the popover and the calendar.`]}),`
`,(0,A.jsx)(r,{of:w,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, Calendar, Content, DatePicker, DatePickerValue, Icon, Label, Popover, Text } from '@godaddy/antares';
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
`,(0,A.jsx)(t.h3,{id:`composed-range`,children:`Composed range`}),`
`,(0,A.jsx)(t.p,{children:`Write a DateRangePicker's trigger and overlay from lower-level pieces the same way.`}),`
`,(0,A.jsx)(r,{of:y,inline:!0}),`
`,(0,A.jsx)(n,{code:`import {
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
`,(0,A.jsx)(t.h3,{id:`sizes`,children:`Sizes`}),`
`,(0,A.jsxs)(t.p,{children:[(0,A.jsx)(t.code,{children:`size`}),` sets the label, trigger, and calendar. Without it, the picker follows the surrounding
size scope.`]}),`
`,(0,A.jsx)(r,{of:m,inline:!0}),`
`,(0,A.jsx)(n,{code:`import { Button, DatePicker, DatePickerCalendar, Flex, Label } from '@godaddy/antares';

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
`,(0,A.jsx)(t.h2,{id:`mobile-1`,children:`Mobile`}),`
`,(0,A.jsxs)(t.p,{children:[`Below `,(0,A.jsx)(t.code,{children:`40rem`}),`, `,(0,A.jsx)(t.code,{children:`DatePickerCalendar`}),` and `,(0,A.jsx)(t.code,{children:`DateRangePickerCalendar`}),` open a bottom drawer with vertically
scrolling months. Each drawer page contains three months by default. Use Previous/Next to change pages,
choose a month, or type a year to jump directly. The initial date follows `,(0,A.jsx)(t.code,{children:`focusedValue`}),`,
`,(0,A.jsx)(t.code,{children:`defaultFocusedValue`}),`, the selected date (range start), then today, constrained by the date bounds.`]}),`
`,(0,A.jsx)(t.p,{children:`The overlay keeps its container until it closes, including during resizing. Its next opening uses the
current viewport. An initially open server-rendered picker keeps its popover through hydration.`}),`
`,(0,A.jsxs)(t.ul,{children:[`
`,(0,A.jsxs)(t.li,{children:[`Set `,(0,A.jsx)(t.code,{children:`overlay="popover"`}),` on the calendar to always use the desktop presentation.`]}),`
`,(0,A.jsxs)(t.li,{children:[`Use `,(0,A.jsx)(t.code,{children:`drawerProps`}),` for drawer presentation, such as `,(0,A.jsx)(t.code,{children:`maxSize`}),` or an accessible label. It defaults to
`,(0,A.jsx)(t.code,{children:`85dvh`}),`. Open state stays on the picker; `,(0,A.jsx)(t.code,{children:`popoverProps`}),` configures the popover.`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`pageCount`}),` sets the number of months in either presentation. Defaults: three in the drawer, one in a
single-date popover, and two in a range popover. Scrolling stays within the current page. Navigation
advances by a full page, or by one month with `,(0,A.jsx)(t.code,{children:`pageBehavior="single"`}),`.`]}),`
`,(0,A.jsxs)(t.li,{children:[`Range selection and endpoint dragging follow React Aria. Drawers default to `,(0,A.jsx)(t.code,{children:`commitBehavior="reset"`}),`:
a calendar background press, focus leaving the calendar, or backdrop dismissal cancels a pending
range and preserves the previous value. Popovers default to `,(0,A.jsx)(t.code,{children:`commitBehavior="select"`}),`, which commits
the pending range on background press or blur. Set `,(0,A.jsx)(t.code,{children:`commitBehavior`}),` on `,(0,A.jsx)(t.code,{children:`DateRangePickerCalendar`}),` to
override either default. Escape from a date cell cancels the pending selection.`]}),`
`,(0,A.jsxs)(t.li,{children:[(0,A.jsx)(t.code,{children:`shouldCloseOnSelect={false}`}),` on the picker keeps either presentation open after a selection.`]}),`
`]}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-tsx`,children:`<DatePicker>
  <Label>Event date</Label>
  <Button slot="trigger" />
  <DatePickerCalendar drawerProps={{ maxSize: '90dvh' }} />
</DatePicker>
`})}),`
`,(0,A.jsx)(t.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,A.jsx)(t.p,{children:`The drawer has the same accessible name as the picker. Escape, an outside press, or the screen-reader
dismiss control closes it and returns focus to the trigger. Arrow keys and Page Up/Down retain React
Aria's calendar navigation. Scrolling does not move keyboard focus or change the selected value. The
month/year controls follow the focused date, and each grid has its own month heading. Weekday
labels shorten when the calendar has limited space, including with enlarged text. The weekday row is
decorative; each date cell provides its full accessible name.`}),`
`,(0,A.jsx)(t.h2,{id:`props`,children:`Props`}),`
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-tsx`,children:`<DatePicker>
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
`,(0,A.jsx)(t.pre,{children:(0,A.jsx)(t.code,{className:`language-tsx`,children:`<DateRangePicker>
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
`,(0,A.jsx)(t.h3,{id:`datepicker-1`,children:`DatePicker`}),`
`,(0,A.jsx)(i,{of:v}),`
`,(0,A.jsx)(t.h3,{id:`daterangepicker`,children:`DateRangePicker`}),`
`,(0,A.jsx)(i,{of:C}),`
`,(0,A.jsx)(t.h3,{id:`datepickercalendar`,children:`DatePickerCalendar`}),`
`,(0,A.jsx)(i,{of:g}),`
`,(0,A.jsx)(t.h3,{id:`daterangepickercalendar`,children:`DateRangePickerCalendar`}),`
`,(0,A.jsx)(i,{of:b}),`
`,(0,A.jsx)(t.h3,{id:`datepickervalue`,children:`DatePickerValue`}),`
`,(0,A.jsx)(i,{of:u}),`
`,(0,A.jsx)(t.h3,{id:`daterangepickervalue`,children:`DateRangePickerValue`}),`
`,(0,A.jsx)(i,{of:d})]})}function k(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,A.jsx)(t,{...e,children:(0,A.jsx)(O,{...e})}):O(e)}var A;function j(){return(j=e((()=>{A=t(),c(),o(),D()})))()}j();export{k as default};