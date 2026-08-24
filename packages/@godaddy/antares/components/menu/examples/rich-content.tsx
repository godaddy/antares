import { Button, Calendar, Content, Icon, Menu, MenuItem, MenuTrigger, Popover, Text } from '@godaddy/antares';
import { parseDate, type CalendarDate } from '@godaddy/antares/date';
import { useRef, useState } from 'react';

/**
 * A `Menu` is a collection, so it only renders `MenuItem`, `MenuGroup`,
 * `MenuSeparator`, and `SubmenuTrigger` children. Rich content inside a `Menu`
 * or submenu is not supported. To show a `Calendar`, let the item close the
 * menu from `onAction` and open a separate `Popover` anchored to the trigger
 * with `triggerRef`.
 * @title Rich Content From an Item
 */
export function RichContentExample() {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState<CalendarDate | null>(parseDate('2024-03-01'));

  function selectDate(value: CalendarDate | null) {
    setDate(value);
    setCalendarOpen(false);
  }

  return (
    <>
      <MenuTrigger>
        <Button ref={triggerRef} variant="primary">
          Schedule
        </Button>
        <Menu aria-label="Schedule">
          <MenuItem id="now">Publish now</MenuItem>
          <MenuItem id="dates" icon={<Icon icon="calendar" />} onAction={() => setCalendarOpen(true)}>
            Pick a date
          </MenuItem>
        </Menu>
      </MenuTrigger>

      <Popover triggerRef={triggerRef} isOpen={isCalendarOpen} onOpenChange={setCalendarOpen}>
        <Content>
          <Calendar aria-label="Publish date" value={date} onChange={selectDate} />
        </Content>
      </Popover>

      <Text>Publishing on {date == null ? 'demand' : date.toString()}</Text>
    </>
  );
}
