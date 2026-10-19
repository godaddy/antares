import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { cdp } from 'vitest/browser';
import { AspectRatioExample } from '../examples/aspect-ratio.tsx';
import { CustomSizeExample } from '../examples/custom-size.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { LoadingRegionExample } from '../examples/loading-region.tsx';
import { RoundingsExample } from '../examples/roundings.tsx';
import { RowExample } from '../examples/row.tsx';
import { ShapesExample } from '../examples/shapes.tsx';
import { SizesExample } from '../examples/sizes.tsx';

type CDPSession = { send: (method: string, params: unknown) => Promise<void> };

function skeletons(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>('[data-rounding]'));
}

describe('@godaddy/antares', function antares() {
  describe('#Skeleton', function skeletonTests() {
    it('hides from assistive technology and fills its container', async function defaults() {
      const screen = await render(<DefaultExample data-testid="skeleton" className="custom" />);
      const skeleton = screen.getByTestId('skeleton').element() as HTMLElement;
      const parent = skeleton.parentElement as HTMLElement;
      expect(skeleton).toHaveAttribute('aria-hidden', 'true');
      expect(skeleton).toHaveClass('custom');
      expect(skeleton.getBoundingClientRect().width).toBe(parent.getBoundingClientRect().width);
      expect(skeleton.getBoundingClientRect().height).toBe(24);
    });

    it('sets the height from each size preset', async function sizes() {
      const { container } = await render(<SizesExample />);
      const heights = skeletons(container).map((skeleton) => skeleton.getBoundingClientRect().height);
      expect(heights).toEqual([12, 16, 24, 32, 40, 56]);
    });

    it('applies custom width and height over the size preset', async function customSize() {
      const { container } = await render(<CustomSizeExample />);
      const [fixed, relative] = skeletons(container);
      const parentWidth = (relative.parentElement as HTMLElement).getBoundingClientRect().width;
      expect(fixed.getBoundingClientRect().width).toBe(240);
      expect(fixed.getBoundingClientRect().height).toBe(120);
      expect(relative.getBoundingClientRect().width).toBe(parentWidth / 2);
      expect(relative.getBoundingClientRect().height).toBe(80);
    });

    it('derives the height from the aspect ratio', async function aspectRatio() {
      const { container } = await render(<AspectRatioExample />);
      const ratios = skeletons(container).map(function toRatio(skeleton) {
        const { width, height } = skeleton.getBoundingClientRect();
        return width / height;
      });
      for (const [index, expected] of [16 / 9, 4 / 3, 1, 3 / 4, 9 / 16].entries()) {
        expect(ratios[index]).toBeCloseTo(expected, 1);
      }
    });

    it('resolves size presets passed as width', async function presetWidth() {
      const { container } = await render(<ShapesExample />);
      for (const skeleton of skeletons(container)) {
        const { width, height } = skeleton.getBoundingClientRect();
        expect(width).toBe(height);
      }
    });

    it('keeps fixed-width shapes in a Flex row while default ones fill the rest', async function row() {
      const { container } = await render(
        <div style={{ width: 320 }}>
          <RowExample />
        </div>
      );
      const [circle, bar] = skeletons(container);
      const gap = parseFloat(getComputedStyle(circle.parentElement as HTMLElement).columnGap);
      expect(circle.getBoundingClientRect().width).toBe(40);
      expect(circle.getBoundingClientRect().height).toBe(40);
      expect(bar.getBoundingClientRect().width).toBe(320 - 40 - gap);
    });

    it('applies each rounding option', async function roundings() {
      const { container } = await render(<RoundingsExample />);
      const radii = skeletons(container).map((skeleton) => getComputedStyle(skeleton).borderRadius);
      expect(radii).toEqual(['6px', '9999px', '9999px', '0px']);
    });

    it('exposes the loading region without announcing each skeleton', async function loadingRegion() {
      const screen = await render(<LoadingRegionExample />);
      const region = screen.getByRole('status', { name: 'Loading profile' });
      await expect.element(region).toHaveAttribute('aria-busy', 'true');
      expect(skeletons(region.element() as HTMLElement)).toHaveLength(3);
      for (const skeleton of skeletons(region.element() as HTMLElement)) {
        expect(skeleton).toHaveAttribute('aria-hidden', 'true');
      }
    });

    it('mirrors the shimmer in RTL', async function rtl() {
      const screen = await render(<DefaultExample data-testid="skeleton" dir="ltr" />);
      const skeleton = screen.getByTestId('skeleton').element();
      expect(getComputedStyle(skeleton).getPropertyValue('--_skeleton-direction').trim()).toBe('1');
      await screen.rerender(<DefaultExample data-testid="skeleton" dir="rtl" />);
      expect(getComputedStyle(skeleton).getPropertyValue('--_skeleton-direction').trim()).toBe('-1');
    });

    it('stops the shimmer when reduced motion is preferred', async function reducedMotion() {
      const session = cdp() as unknown as CDPSession;
      try {
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
        });
        const screen = await render(<DefaultExample data-testid="skeleton" />);
        const skeleton = screen.getByTestId('skeleton').element();
        expect(getComputedStyle(skeleton, '::after').animationName).not.toBe('none');
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
        });
        expect(matchMedia('(prefers-reduced-motion: reduce)').matches).toBe(true);
        expect(getComputedStyle(skeleton, '::after').animationName).toBe('none');
        await expect.element(screen.getByTestId('skeleton')).toBeInTheDocument();
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });

    it('outlines the shape and hides the shimmer in forced colors', async function forcedColors() {
      const session = cdp() as unknown as CDPSession;
      try {
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'forced-colors', value: 'active' }]
        });
        const screen = await render(<DefaultExample data-testid="skeleton" />);
        const skeleton = screen.getByTestId('skeleton').element();
        expect(matchMedia('(forced-colors: active)').matches).toBe(true);
        expect(getComputedStyle(skeleton).outlineWidth).toBe('1px');
        expect(getComputedStyle(skeleton, '::after').display).toBe('none');
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });
  });
});
