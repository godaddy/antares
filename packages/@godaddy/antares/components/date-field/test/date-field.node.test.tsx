import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components';
import { DateField } from '../src/index.tsx';

function render(ui: React.ReactElement) {
  return renderToString(<I18nProvider locale="en-US">{ui}</I18nProvider>);
}

describe('@godaddy/antares', function antares() {
  describe('#DateField', function dateField() {
    it('renders without throwing', function renders() {
      expect(() => render(<DateField label="Birthday" />)).not.toThrow();
    });

    it('shows the localized prose value in prose mode', function prose() {
      const result = render(<DateField label="Birthday" defaultValue={parseDate('2022-08-12')} />);
      expect(result).toContain('Aug');
      expect(result).toContain('2022');
    });

    it('renders a hidden form input under the given name', function hiddenInput() {
      const result = render(<DateField label="Birthday" name="birthday" defaultValue={parseDate('2022-08-12')} />);
      expect(result).toContain('name="birthday"');
    });

    it('shows the placeholder text when empty in prose mode', function placeholder() {
      const result = render(<DateField label="Birthday" placeholder="Select a date" />);
      expect(result).toContain('Select a date');
    });
  });
});
