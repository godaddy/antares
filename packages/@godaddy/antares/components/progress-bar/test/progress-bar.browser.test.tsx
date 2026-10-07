import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp } from 'vitest/browser';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { WithoutValueLabelExample } from '../examples/without-value-label.tsx';
import { WithoutLabelExample } from '../examples/without-label.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressBar', function progressBarTests() {
    it('hides the visible value without hiding progress from assistive technology', async function hidesValueLabel() {
      const screen = await render(<WithoutValueLabelExample />);
      const progress = screen.getByRole('progressbar', { name: 'Uploading files' });
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      expect(progress.element().textContent).toBe('Uploading files');

      await screen.rerender(<WithoutValueLabelExample valueLabel />);
      await expect.element(screen.getByText('60%')).toBeVisible();

      await screen.rerender(<WithoutValueLabelExample valueLabel="3 of 5 files" />);
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '3 of 5 files');

      await screen.rerender(<WithoutValueLabelExample valueLabel={null} />);
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      expect(progress.element().textContent).toBe('Uploading files');

      await screen.rerender(<WithoutValueLabelExample valueLabel={false} />);
      expect(progress.element().textContent).toBe('Uploading files');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');

      await screen.rerender(<WithoutValueLabelExample valueLabel={undefined} />);
      expect(progress.element().textContent).toBe('Uploading files');
    });

    it('shows only the track when both visible texts are omitted', async function trackOnly() {
      const screen = await render(<WithoutLabelExample />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(progress).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      expect(progress.element().textContent).toBe('');

      await screen.rerender(<WithoutLabelExample valueLabel={null} />);
      expect(progress.element().textContent).toBe('');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');

      await screen.rerender(<WithoutLabelExample isIndeterminate />);
      expect(progress.element().textContent).toBe('');
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
    });

    it('shows custom value text without a visible label', async function valueOnly() {
      const screen = await render(<WithoutLabelExample valueLabel="3 of 5 files" />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '3 of 5 files');
      expect(progress.element().textContent).toBe('3 of 5 files');

      await screen.rerender(<WithoutLabelExample valueLabel="3 of 5 files" isIndeterminate />);
      expect(progress.element().textContent).toBe('');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
    });

    it('shows formatted values independently of the visible label', async function formattedValueOnly() {
      const screen = await render(<WithoutLabelExample value={60} minValue={20} maxValue={100} valueLabel />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(screen.getByText('50%')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '50%');

      await screen.rerender(
        <WithoutLabelExample
          valueLabel
          value={60}
          formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        />
      );
      await expect.element(screen.getByText('$60')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '$60');
    });

    it('supports formatted, static, and state-based value labels', async function valueDisplay() {
      const screen = await render(<ValueDisplayExample />);
      await expect.element(screen.getByText('60%', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await expect.element(screen.getByText('Current: 60%')).toBeVisible();
      await expect
        .element(screen.getByRole('progressbar', { name: 'Files uploaded' }))
        .toHaveAttribute('aria-valuetext', '60%');
    });

    it('updates a state-based value label when progress changes', async function stateValueLabel() {
      const renderValue: NonNullable<Parameters<typeof WithoutLabelExample>[0]['valueLabel']> = function renderValue({
        percentage
      }) {
        return percentage === 0 ? null : `Current: ${percentage}%`;
      };
      const screen = await render(<WithoutLabelExample valueLabel={renderValue} />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(screen.getByText('Current: 60%')).toBeVisible();

      await screen.rerender(<WithoutLabelExample value={80} valueLabel={renderValue} />);
      await expect.element(screen.getByText('Current: 80%')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuenow', '80');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '80%');

      await screen.rerender(<WithoutLabelExample value={0} valueLabel={renderValue} />);
      expect(progress.element().textContent).toBe('');

      await screen.rerender(<WithoutLabelExample valueLabel={renderValue} isIndeterminate />);
      expect(progress.element().textContent).toBe('');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
    });

    it('renders zero as static value-label content', async function zeroValueLabel() {
      const screen = await render(<WithoutLabelExample valueLabel={0} />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(screen.getByText('0', { exact: true })).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
    });

    it('announces activity without a numeric value', async function indeterminateSemantics() {
      const { getByRole, getByText } = await render(<IndeterminateExample />);
      const progress = getByRole('progressbar', { name: 'Preparing upload…' });
      await expect.element(progress).toBeVisible();
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      await expect.element(progress).toHaveAttribute('aria-valuemin', '0');
      await expect.element(progress).toHaveAttribute('aria-valuemax', '100');
      await expect.element(progress).toHaveAccessibleDescription('Calculating the total size');
      await expect.element(getByText('Calculating the total size')).toBeVisible();
      expect(progress.element().textContent).not.toContain('0%');
    });

    it('switches between unknown and measured progress', async function changesMode() {
      const screen = await render(<IndeterminateExample value={60} valueLabel="60 files" />);
      const progress = screen.getByRole('progressbar');
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      expect(progress.element().textContent).not.toContain('60 files');
      expect(progress.element().querySelector('[data-indeterminate]')).not.toBeNull();

      await screen.rerender(<IndeterminateExample isIndeterminate={false} value={60} valueLabel="60 files" />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60 files');
      await expect.element(screen.getByText('60 files')).toBeVisible();
      expect(progress.element().querySelector('[data-indeterminate]')).toBeNull();

      await screen.rerender(<IndeterminateExample value={90} />);
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      expect(progress.element().textContent).not.toContain('90%');

      await screen.rerender(<IndeterminateExample isIndeterminate={false} />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '0');
      await expect.element(screen.getByText('0%')).toBeVisible();
    });

    it('supports a nonvisual label and a custom range', async function labelAndRange() {
      const screen = await render(
        <IndeterminateExample label={undefined} aria-label="Preparing upload" minValue={20} maxValue={80} value={50} />
      );
      const progress = screen.getByRole('progressbar', { name: 'Preparing upload' });
      await expect.element(progress).toHaveAttribute('aria-valuemin', '20');
      await expect.element(progress).toHaveAttribute('aria-valuemax', '80');
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await screen.rerender(
        <IndeterminateExample
          label={undefined}
          aria-label="Preparing upload"
          minValue={20}
          maxValue={80}
          value={50}
          isIndeterminate={false}
        />
      );
      await expect.element(progress).toHaveAttribute('aria-valuenow', '50');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '50%');
    });

    it('keeps the indicator visible while respecting motion preferences', async function motionPreferences() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      try {
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
        });
        const { getByRole } = await render(<IndeterminateExample />);
        const progress = getByRole('progressbar');
        const indicator = progress.element().querySelector('[data-indeterminate]') as Element;
        expect(indicator).not.toBeNull();
        expect(getComputedStyle(indicator, '::after').animationName).not.toBe('none');
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
        });
        expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
        expect(getComputedStyle(indicator, '::after').animationName).toBe('none');
        await expect.element(progress).toBeVisible();
        const fillStyle = getComputedStyle(indicator, '::after');
        expect(parseFloat(fillStyle.width)).toBeGreaterThan(0);
        expect(parseFloat(fillStyle.width)).toBeLessThan(indicator.getBoundingClientRect().width);
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });

    it('mirrors the indeterminate sweep in RTL', async function rtlMotion() {
      const screen = await render(<IndeterminateExample dir="ltr" />);
      const indicator = screen.getByRole('progressbar').element().querySelector('[data-indeterminate]') as Element;
      expect(getComputedStyle(indicator).getPropertyValue('--_progress-bar-direction').trim()).toBe('1');
      await screen.rerender(<IndeterminateExample dir="rtl" />);
      expect(getComputedStyle(indicator).getPropertyValue('--_progress-bar-direction').trim()).toBe('-1');
    });

    it('keeps the indeterminate fill distinct in forced colors', async function forcedColors() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      try {
        await session.send('Emulation.setEmulatedMedia', {
          features: [
            { name: 'forced-colors', value: 'active' },
            { name: 'prefers-reduced-motion', value: 'reduce' }
          ]
        });
        const { getByRole } = await render(<IndeterminateExample />);
        const progress = getByRole('progressbar', { name: 'Preparing upload…' });
        const indicator = progress.element().querySelector('[data-indeterminate]') as Element;
        const trackStyle = getComputedStyle(indicator);
        const fillStyle = getComputedStyle(indicator, '::after');
        expect(matchMedia('(forced-colors: active)').matches).toBe(true);
        expect(fillStyle.backgroundColor).not.toBe(trackStyle.backgroundColor);
        expect(trackStyle.outlineColor).not.toBe(trackStyle.backgroundColor);
        expect(trackStyle.outlineWidth).toBe('1px');
        expect(fillStyle.animationName).toBe('none');
        await expect.element(progress).toBeVisible();
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });

    it('renders with role progressbar', async function rendersRole() {
      const { getByRole } = await render(<DefaultExample />);
      await expect.element(getByRole('progressbar')).toBeVisible();
    });

    it('applies aria-valuenow from value prop', async function ariaValueNow() {
      const { getByRole } = await render(<DefaultExample />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60');
    });

    it('applies aria-valuemin and aria-valuemax', async function ariaMinMax() {
      const { getByRole } = await render(<DefaultExample />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
    });

    it('renders the label text', async function rendersLabel() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('Loading…')).toBeVisible();
    });

    it('renders the helper text', async function rendersHelperText() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('Please wait while we process your request')).toBeVisible();
    });

    it('sets data-size for each size variant', async function dataSizeVariants() {
      const { container } = await render(<SizesExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-size', 'xs');
      expect(bars[1]).toHaveAttribute('data-size', 'sm');
      expect(bars[2]).toHaveAttribute('data-size', 'md');
    });

    it('sets --progress-bar-progress CSS variable on the track', async function progressCssVariable() {
      const { getByRole } = await render(<DefaultExample />);
      const track = getByRole('progressbar')
        .element()
        .querySelector('[style*="--progress-bar-progress"]') as HTMLElement;

      expect(track.style.getPropertyValue('--progress-bar-progress')).toBe('60%');
    });

    it('sets data-status for each status variant', async function dataStatusVariants() {
      const { container } = await render(<StatusesExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-status', 'default');
      expect(bars[1]).toHaveAttribute('data-status', 'success');
      expect(bars[2]).toHaveAttribute('data-status', 'warning');
      expect(bars[3]).toHaveAttribute('data-status', 'critical');
    });
  });
});
