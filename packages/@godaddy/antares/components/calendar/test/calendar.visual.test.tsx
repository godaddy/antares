import { beforeAll, describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { set } from '#components/icon';
import { CalendarDefaultRangeExample } from '../examples/default-range.tsx';
import { CalendarOutOfMonthDaysExample } from '../examples/out-of-month-days.tsx';
import { CalendarTodayDistinctExample } from '../examples/today-distinct.tsx';
import { CalendarWithDurationExample } from '../examples/with-duration.tsx';
import { CalendarWithIndicatorsExample } from '../examples/with-indicators.tsx';

describe('@godaddy/antares', function antares() {
  beforeAll(function setupIcons() {
    set({
      'chevron-down': (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="#111" strokeWidth="2" fill="none" />
        </svg>
      ),
      alert: (
        <svg fill="none" height="24" width="24" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2z" stroke="#b22222" strokeWidth="2" />
        </svg>
      )
    });
  });

  describe('#Calendar', function calendarTests() {
    it('with-indicators example', async function indicatorsRender() {
      const { container } = await render(<CalendarWithIndicatorsExample />);
      await expect(container).toMatchScreenshot('with-indicators');
    });

    it('default-range example', async function rangeRender() {
      const { container } = await render(<CalendarDefaultRangeExample />);
      await expect(container).toMatchScreenshot('default-range');
    });

    it('today-distinct example', async function todayRender() {
      const { container } = await render(<CalendarTodayDistinctExample />);
      await expect(container).toMatchScreenshot('today-distinct');
    });

    it('out-of-month-days example', async function outOfMonthRender() {
      const { container } = await render(<CalendarOutOfMonthDaysExample />);
      await expect(container).toMatchScreenshot('out-of-month-days');
    });

    it('with-duration example', async function durationRender() {
      const { container } = await render(<CalendarWithDurationExample />);
      await expect(container).toMatchScreenshot('with-duration');
    });
  });
});
