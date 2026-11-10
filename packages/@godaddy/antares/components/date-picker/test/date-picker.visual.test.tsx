import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { I18nProvider } from 'react-aria-components';
import { MobileExample } from '../examples/mobile.tsx';
import { render } from 'vitest-browser-react';
import { preloadTestIcons, resetHover } from '#test/utils/test-helpers.tsx';
import { ControlledExample } from '../examples/controlled.tsx';
import { RangeExample } from '../examples/range.tsx';
import { WithErrorExample } from '../examples/with-error.tsx';
import { DisabledExample } from '../examples/disabled.tsx';
import { MinMaxExample } from '../examples/min-max.tsx';
import { FormatOptionsExample } from '../examples/format-options.tsx';
import { SizesExample } from '../examples/sizes.tsx';

/** Waits for the drawer (or popover) to finish sliding in. */
async function settle() {
  await expect
    .poll(function entered() {
      return document.querySelector('[role="dialog"]')?.closest('[data-entering]');
    })
    .toBeNull();
}

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  beforeEach(async function fixedToday() {
    await page.viewport(1024, 768);
    vi.setSystemTime(new Date('2026-09-30T12:00:00Z'));
  });
  afterEach(function reset() {
    vi.useRealTimers();
    document.documentElement.style.fontSize = '';
  });

  describe('#DatePicker', function datePicker() {
    it.each([320, 639, 640])('responsive calendar at %ipx', async function responsive(width) {
      await page.viewport(width, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle();
      await expect(screen.getByRole('dialog')).toMatchScreenshot(`date-picker-open-${width}`);
    });

    it('mobile range selection', async function mobileRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle();
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await screen.getByRole('button', { name: /September 25, 2026/ }).click();
      await expect.element(screen.getByLabelText('Selected dates')).toMatchTextContent('2026-09-15/2026-09-25');
      const month = screen.getByRole('grid', { name: 'September 2026' }).element().parentElement!;
      month.scrollIntoView({ block: 'start' });
      await expect(screen.getByRole('dialog')).toMatchScreenshot('date-picker-mobile-range');
    });

    it.each(['sm', 'lg'] as const)('mobile %s calendar', async function mobileSize(size) {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample size={size} />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await settle();
      await expect(screen.getByRole('dialog')).toMatchScreenshot(`date-picker-mobile-${size}`);
    });

    it('mobile RTL with enlarged text', async function rtl() {
      await page.viewport(320, 768);
      document.documentElement.style.fontSize = '200%';
      const screen = await render(
        <I18nProvider locale="ar-AE">
          <MobileExample />
        </I18nProvider>
      );
      await screen.getByRole('button', { name: /Event dates/ }).click();
      await settle();
      await expect(screen.getByRole('dialog')).toMatchScreenshot('date-picker-mobile-rtl-large-text');
    });

    it('with value', async function withValue() {
      const { container } = await render(<ControlledExample />);
      await expect(container).toMatchScreenshot('date-picker-value');
    });

    it('range', async function range() {
      const { container } = await render(<RangeExample />);
      await expect(container).toMatchScreenshot('date-range-picker');
    });

    it('error', async function error() {
      const { container } = await render(<WithErrorExample />);
      await expect(container).toMatchScreenshot('date-picker-error');
    });

    it('disabled', async function disabled() {
      const { container } = await render(<DisabledExample />);
      await expect(container).toMatchScreenshot('date-picker-disabled');
    });

    it('min-max', async function minMax() {
      const { container } = await render(<MinMaxExample />);
      await expect(container).toMatchScreenshot('date-picker-min-max');
    });

    it('format-options', async function formatOptions() {
      const { container } = await render(<FormatOptionsExample />);
      await expect(container).toMatchScreenshot('date-picker-format-options');
    });

    it('sizes', async function sizes() {
      const { container } = await render(<SizesExample />);
      await expect(container).toMatchScreenshot('date-picker-sizes');
    });
  });
});
