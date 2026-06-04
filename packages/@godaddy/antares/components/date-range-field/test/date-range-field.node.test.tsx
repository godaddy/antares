import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components';
import { DateRangeField } from '../src/index.tsx';

function render(ui: React.ReactElement) {
  return renderToString(<I18nProvider locale="en-US">{ui}</I18nProvider>);
}

const RANGE = { start: parseDate('2022-08-12'), end: parseDate('2022-08-20') };

describe('@godaddy/antares', function antares() {
  describe('#DateRangeField', function dateRangeField() {
    it('renders without throwing', function renders() {
      expect(() => render(<DateRangeField label="Trip" />)).not.toThrow();
    });

    it('shows the localized prose range in prose mode', function prose() {
      const result = render(<DateRangeField label="Trip" defaultValue={RANGE} />);
      expect(result).toContain('Aug');
      expect(result).toContain('12');
      expect(result).toContain('20');
      expect(result).toContain('2022');
    });

    it('submits start and end as ISO strings under startName / endName', function hidden() {
      const result = render(
        <DateRangeField label="Trip" startName="from" endName="to" defaultValue={RANGE} />
      );
      expect(result).toContain('name="from"');
      expect(result).toContain('name="to"');
      expect(result).toContain('value="2022-08-12"');
      expect(result).toContain('value="2022-08-20"');
    });

    it('shows the placeholder text when empty in prose mode', function placeholder() {
      const result = render(<DateRangeField label="Trip" placeholder="Select dates" />);
      expect(result).toContain('Select dates');
    });
  });
});
