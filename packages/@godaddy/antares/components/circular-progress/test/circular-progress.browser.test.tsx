import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp } from 'vitest/browser';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { CircularProgress } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressTests() {
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
        expect(getComputedStyle(indicator).animationName).not.toBe('none');
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
        });
        expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
        expect(getComputedStyle(indicator).animationName).toBe('none');
        await expect.element(progress).toBeVisible();
        const fill = indicator.querySelector('circle:nth-child(2)') as SVGCircleElement;
        const circumference = Number(fill.getAttribute('stroke-dasharray'));
        expect(Number(fill.getAttribute('stroke-dashoffset'))).toBeCloseTo(circumference * 0.75);
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
      await expect.element(getByText('Uploading…')).toBeVisible();
    });

    it('renders the helper text', async function rendersHelperText() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('3 of 5 files uploaded')).toBeVisible();
    });

    it('renders the output text inside the circle', async function rendersOutput() {
      const { getByText } = await render(<DefaultExample />);
      await expect.element(getByText('60%')).toBeVisible();
    });

    it('sets data-size for each size variant', async function dataSizeVariants() {
      const { container } = await render(<SizesExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-size', 'sm');
      expect(bars[1]).toHaveAttribute('data-size', 'md');
      expect(bars[2]).toHaveAttribute('data-size', 'lg');
      expect(bars[3]).toHaveAttribute('data-size', 'xl');
    });

    it('sets data-emphasis for each emphasis variant', async function dataEmphasisVariants() {
      const { container } = await render(<EmphasisExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[1]).toHaveAttribute('data-emphasis', 'success');
      expect(bars[2]).toHaveAttribute('data-emphasis', 'warning');
      expect(bars[3]).toHaveAttribute('data-emphasis', 'critical');
    });

    it('does not set data-emphasis when emphasis is not provided', async function noEmphasis() {
      const { getByRole } = await render(<DefaultExample />);
      expect(getByRole('progressbar')).not.toHaveAttribute('data-emphasis');
    });

    it('the SVG is aria-hidden', async function svgAriaHidden() {
      const { container } = await render(<DefaultExample />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('wires aria-describedby to helperText element', async function ariaDescribedBy() {
      const { getByRole, getByText } = await render(<DefaultExample />);
      const progressbar = getByRole('progressbar');
      const helperText = getByText('3 of 5 files uploaded');

      const describedById = progressbar.element().getAttribute('aria-describedby');
      const helperTextId = helperText.element().getAttribute('id');

      expect(describedById).toBeTruthy();
      expect(helperTextId).toBeTruthy();
      expect(describedById).toContain(helperTextId);
    });

    it('sets aria-valuetext to the formatted percentage', async function ariaValueText() {
      const { getByRole } = await render(<DefaultExample />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuetext', '60%');
    });

    it('sets aria-labelledby when label prop is provided', async function ariaLabelledBy() {
      const { getByRole } = await render(<DefaultExample />);
      const progressbar = getByRole('progressbar');
      expect(progressbar.element().getAttribute('aria-labelledby')).toBeTruthy();
    });

    it('sets SVG fill strokeDashoffset proportional to value', async function svgDashoffset() {
      const { container } = await render(<DefaultExample />);
      const fillCircle = container.querySelector('circle:nth-child(2)') as SVGCircleElement | null;
      expect(fillCircle).not.toBeNull();
      const circumference = parseFloat(fillCircle?.getAttribute('stroke-dasharray') ?? '0');
      const offset = parseFloat(fillCircle?.getAttribute('stroke-dashoffset') ?? '0');
      // value=60 → offset should be circumference × (1 - 0.6)
      expect(offset).toBeCloseTo(circumference * 0.4, 1);
    });

    it('clamps value above 100 to 100', async function clampsAbove() {
      const { getByRole } = await render(<CircularProgress value={150} aria-label="Overflow" />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps value below 0 to 0', async function clampsBelow() {
      const { getByRole } = await render(<CircularProgress value={-10} aria-label="Underflow" />);
      expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });
  });
});
