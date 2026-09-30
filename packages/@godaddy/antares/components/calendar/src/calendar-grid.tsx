import { useMemo } from 'react';
import { DateFormatter } from '@internationalized/date';
import {
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  CalendarGridHeader as RACCalendarGridHeader,
  CalendarGridBody as RACCalendarGridBody,
  CalendarHeaderCell as RACCalendarHeaderCell,
  useLocale,
  type CalendarGridProps as RACCalendarGridProps
} from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { Box } from '#components/layout/box';
import { cx } from 'cva';
import styles from './index.module.css';

export interface CalendarGridProps extends RACCalendarGridProps {
  /** Whether dates represent a single value or a range. */
  type: 'single' | 'range';
}

/** Month grid shared by paged and scrolling calendars. */
export function CalendarGrid({ className, type, ...rest }: CalendarGridProps) {
  const { locale } = useLocale();
  const narrowWeekdays = useMemo(
    function weekdayLabels() {
      const short = new DateFormatter(locale, { weekday: 'short' });
      const narrow = new DateFormatter(locale, { weekday: 'narrow' });
      return new Map(
        Array.from({ length: 7 }, function weekday(_, day) {
          const date = new Date(2024, 0, 7 + day);
          return [short.format(date), narrow.format(date)];
        })
      );
    },
    [locale]
  );
  return (
    <Box as={RACCalendarGrid} weekdayStyle="short" {...rest} className={cx(styles.grid, className)}>
      <RACCalendarGridHeader>
        {function weekday(day) {
          return (
            <RACCalendarHeaderCell>
              <span className={styles.weekdayShort}>{day}</span>
              <span className={styles.weekdayNarrow}>{narrowWeekdays.get(day) ?? day}</span>
            </RACCalendarHeaderCell>
          );
        }}
      </RACCalendarGridHeader>
      <RACCalendarGridBody>
        {(date) => (
          <Flex
            as={RACCalendarCell}
            date={date}
            alignItems="center"
            justifyContent="center"
            data-type={type}
            className={styles.cell}
          />
        )}
      </RACCalendarGridBody>
    </Box>
  );
}
