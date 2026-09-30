import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
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

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);
  beforeEach(resetHover);
  beforeEach(function fixedToday() {
    vi.setSystemTime(new Date('2026-09-30T12:00:00Z'));
  });
  afterEach(function restoreClock() {
    vi.useRealTimers();
  });

  describe('#DatePicker', function datePicker() {
    it.each([320, 639, 640])('responsive calendar at %ipx', async function responsive(width) {
      await page.viewport(width, 768);
      const screen = await render(<MobileExample />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect(screen.getByRole('dialog')).toMatchScreenshot(`date-picker-open-${width}`);
      await page.viewport(1024, 768);
    });

    it('mobile range selection', async function mobileRange() {
      await page.viewport(320, 768);
      const screen = await render(<MobileExample range keepOpen />);
      await screen.getByRole('button', { name: /Calendar Event dates/ }).click();
      await expect
        .poll(function settled() {
          return getComputedStyle(screen.getByRole('dialog').element().parentElement!).transform;
        })
        .toBe('none');
      await screen.getByRole('button', { name: /September 15, 2026/ }).click();
      await screen.getByRole('button', { name: /September 25, 2026/ }).click();
      await expect(screen.getByRole('dialog')).toMatchScreenshot('date-picker-mobile-range');
      await page.viewport(1024, 768);
    });

    it('mobile RTL with enlarged text', async function rtl() {
      await page.viewport(320, 768);
      document.documentElement.style.fontSize = '200%';
      const screen = await render(<MobileExample locale="ar-AE" defaultOpen />);
      await expect(screen.getByRole('dialog')).toMatchScreenshot('date-picker-mobile-rtl-large-text');
      document.documentElement.style.fontSize = '';
      await page.viewport(1024, 768);
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
