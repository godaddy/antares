import { type CalendarDate, parseDate } from '@internationalized/date';
import { Calendar, type DayIndicator } from '@godaddy/antares';

export function CalendarWithIndicatorsExample() {
  function getDayIndicators(date: CalendarDate): DayIndicator[] {
    if (date.month !== 3) return [];
    if (date.day === 5) {
      return [{ color: 'success', label: 'Available' }];
    }
    if (date.day === 12) {
      return [
        { color: 'warning', label: 'Limited' },
        { color: 'info', label: 'Promo' }
      ];
    }
    if (date.day === 18) {
      return [
        { color: 'critical', label: 'Booked' },
        { color: 'highlight', label: 'Featured' },
        { color: 'passive', label: 'Returning' }
      ];
    }
    if (date.day === 22) {
      return [
        { color: 'critical' },
        { color: 'highlight' },
        { color: 'info' },
        { color: 'success' }
      ];
    }
    return [];
  }

  return (
    <Calendar
      aria-label="Calendar with indicators"
      defaultValue={parseDate('2024-03-12')}
      getDayIndicators={getDayIndicators}
    />
  );
}
