import { Calendar } from '@godaddy/antares';
import { parseDate } from '@godaddy/antares/date';

// Unselected calendar pinned to a fixed visible month so the month/year header snapshots
// deterministically — without a fixed focus it would show today's month and churn daily.
export function CalendarDefaultExample() {
  return <Calendar aria-label="Event date" defaultFocusedValue={parseDate('2024-03-01')} />;
}
