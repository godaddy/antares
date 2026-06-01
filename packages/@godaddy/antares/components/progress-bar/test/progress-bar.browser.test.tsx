import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressBar', function progressBarTests() {
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
