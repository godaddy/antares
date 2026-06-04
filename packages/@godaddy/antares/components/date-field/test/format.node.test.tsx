import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { parseDate } from '@internationalized/date';
import { I18nProvider } from 'react-aria-components';
import { useFormattedDate, useFormattedRange } from '../src/format.ts';

function SingleProbe({ value }: { value: ReturnType<typeof parseDate> | null }) {
  const formatted = useFormattedDate(value);
  return <span>{formatted ?? 'EMPTY'}</span>;
}

function RangeProbe({
  start,
  end
}: {
  start: ReturnType<typeof parseDate> | null;
  end: ReturnType<typeof parseDate> | null;
}) {
  const formatted = useFormattedRange(start, end);
  return <span>{formatted ?? 'EMPTY'}</span>;
}

describe('@godaddy/antares', function antares() {
  describe('#DateField format helpers', function format() {
    it('formats a single date with the medium default (en-US)', function single() {
      const result = renderToString(
        <I18nProvider locale="en-US">
          <SingleProbe value={parseDate('2022-08-12')} />
        </I18nProvider>
      );
      expect(result).toContain('Aug');
      expect(result).toContain('12');
      expect(result).toContain('2022');
    });

    it('returns undefined for a null single value', function nullSingle() {
      const result = renderToString(
        <I18nProvider locale="en-US">
          <SingleProbe value={null} />
        </I18nProvider>
      );
      expect(result).toContain('EMPTY');
    });

    it('formats a range and collapses shared parts (en-US)', function range() {
      const result = renderToString(
        <I18nProvider locale="en-US">
          <RangeProbe start={parseDate('2022-08-12')} end={parseDate('2022-08-20')} />
        </I18nProvider>
      );
      expect(result).toContain('Aug');
      expect(result).toContain('12');
      expect(result).toContain('20');
      expect(result).toContain('2022');
    });

    it('returns undefined when either range endpoint is missing', function partialRange() {
      const result = renderToString(
        <I18nProvider locale="en-US">
          <RangeProbe start={parseDate('2022-08-12')} end={null} />
        </I18nProvider>
      );
      expect(result).toContain('EMPTY');
    });
  });
});
