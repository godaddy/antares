---
'@godaddy/antares': minor
---

feat(antares): add Calendar, RangeCalendar, DatePicker, DateRangePicker and FieldTrigger

Adds date components built on React Aria Components:

- `Calendar` / `RangeCalendar` — accessible single-date and date-range calendars. The header
  pairs a month `Select` with a typeable year `NumberField`, flanked by prev/next navigation.
- `DatePicker` / `DateRangePicker` — date-only (`CalendarDate`) fields that render the selected
  value as a read-only formatted label and open a calendar in a popover (no editable segmented
  input). Built on the field primitives, with `size`, `formatOptions`, and `placeholder` props.
- `FieldTrigger` - Used in DatePicker and Select as the component sharing their  styles
