import type { CalendarDate } from '@internationalized/date';
import { CalendarCell as RACCalendarCell } from 'react-aria-components';
import { Flex } from '#components/layout/flex';
import { type DayIndicator, type GetDayIndicators, MAX_INDICATORS } from './types';
import styles from './index.module.css';

interface DayCellProps {
  date: CalendarDate;
  /** Hide out-of-month days entirely (RangeCalendar). When false, dim them (Calendar). */
  hideOutsideMonth?: boolean;
  getDayIndicators?: GetDayIndicators;
}

/**
 * A calendar day cell. Renders the day number, an optional row of up to 3 indicator
 * dots, and surfaces indicator labels to assistive tech via a visually-hidden span.
 *
 * Out-of-month days are either dimmed (single Calendar) or hidden entirely (RangeCalendar)
 * per the AC.
 */
export function DayCell({ date, hideOutsideMonth = false, getDayIndicators }: DayCellProps) {
  const rawIndicators = getDayIndicators?.(date) ?? [];
  const indicators = sliceIndicators(rawIndicators);
  const indicatorLabel = indicators
    .map((indicator) => indicator.label)
    .filter((label): label is string => Boolean(label))
    .join(', ');

  return (
    <RACCalendarCell date={date} className={styles.cell}>
      {function renderCell(renderProps) {
        if (hideOutsideMonth && renderProps.isOutsideMonth) {
          return <span aria-hidden="true" className={styles.cellHidden} />;
        }

        return (
          <Flex direction="column" alignItems="center" justifyContent="center" className={styles.cellInner}>
            <span className={styles.cellDate}>{renderProps.formattedDate}</span>
            {indicators.length > 0 && (
              <Flex as="span" alignItems="center" aria-hidden="true" className={styles.indicators}>
                {indicators.map(function renderIndicator(indicator, index) {
                  return (
                    <span
                      key={`${indicator.color}-${index}`}
                      className={styles.indicator}
                      style={{ background: `var(--color-feedback-${indicator.color}-strong)` }}
                    />
                  );
                })}
              </Flex>
            )}
            {indicatorLabel && <span className={styles.srOnly}>{indicatorLabel}</span>}
          </Flex>
        );
      }}
    </RACCalendarCell>
  );
}

function sliceIndicators(indicators: DayIndicator[]): DayIndicator[] {
  if (indicators.length <= MAX_INDICATORS) {
    return indicators;
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `[@godaddy/antares] getDayIndicators returned ${indicators.length} indicators; only the first ${MAX_INDICATORS} will be rendered.`
    );
  }

  return indicators.slice(0, MAX_INDICATORS);
}
