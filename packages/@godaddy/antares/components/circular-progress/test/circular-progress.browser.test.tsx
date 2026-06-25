import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { CircularProgress } from '@godaddy/antares';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { EmphasisExample } from '../examples/emphasis.tsx';

describe('@godaddy/antares', function antares() {
  describe('#CircularProgress', function circularProgressTests() {
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
