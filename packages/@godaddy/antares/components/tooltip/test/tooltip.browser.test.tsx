import { SizeProvider, Text } from '@godaddy/antares';
import assume from 'assume';
import { act, type ComponentProps } from 'react';
import { UNSAFE_PortalProvider } from 'react-aria';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cdp, page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { resetHover, resetPointer } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';

type ExampleTooltipProps = NonNullable<ComponentProps<typeof DefaultExample>['tooltipProps']>;
type ThemeTokens = Record<`--${string}`, string>;

const centeredTrigger = { position: 'fixed', inset: 0, display: 'grid', placeItems: 'center' } as const;

function arrowElements(tooltip: HTMLElement) {
  const wrapper = tooltip.querySelector<HTMLElement>(':scope > [data-placement]');
  const frame = wrapper?.firstElementChild;
  const tip = frame?.firstElementChild;
  if (!wrapper || !frame || !tip) throw new Error('Expected a visible tooltip arrow');
  return { wrapper, frame, tip };
}

function rgb(color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Expected a 2D canvas context');
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  const pixel = context.getImageData(0, 0, 1, 1).data;
  expect(pixel[3]).toBe(255);
  return [...pixel].slice(0, 3);
}

function luminance(channels: number[]) {
  const weights = [0.2126, 0.7152, 0.0722];
  return channels.reduce(function weighted(total, channel, index) {
    const srgb = channel / 255;
    const linear = srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    return total + linear * weights[index]!;
  }, 0);
}

describe('@godaddy/antares', function antares() {
  describe('#Tooltip', function tooltipTests() {
    // Run the cold first-hover check before opening any tooltip in this browser test file.
    it('opens at 250 ms, cancels a brief hover, and hands off to a nearby trigger immediately', async function hoverTiming() {
      await resetPointer();
      const openFirst = vi.fn();
      const openSecond = vi.fn();
      const { getByRole } = await render(
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', padding: '64px' }}>
          <DefaultExample tooltipTriggerProps={{ onOpenChange: openFirst }} />
          <DefaultExample tooltipTriggerProps={{ onOpenChange: openSecond, closeDelay: 80 }} />
        </div>
      );
      const first = getByRole('button').nth(0).element();
      const second = getByRole('button').nth(1).element();
      const outside = document.body;
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });

      // Keep pointer motion synchronous with the clock for assertions one millisecond apart.
      function movePointer(from: Element, to: Element) {
        const pointer = { bubbles: true, pointerType: 'mouse', pointerId: 1, isPrimary: true };
        act(function dispatchPointerMotion() {
          to.dispatchEvent(new PointerEvent('pointermove', pointer));
          from.dispatchEvent(new PointerEvent('pointerout', { ...pointer, relatedTarget: to }));
          to.dispatchEvent(new PointerEvent('pointerover', { ...pointer, relatedTarget: from }));
        });
      }

      async function advance(ms: number) {
        await act(async function advanceTimer() {
          await vi.advanceTimersByTimeAsync(ms);
        });
      }

      try {
        movePointer(outside, first);
        await advance(100);
        movePointer(first, outside);
        await advance(500);
        expect(openFirst).not.toHaveBeenCalled();

        movePointer(outside, first);
        await advance(249);
        expect(openFirst).not.toHaveBeenCalled();
        await advance(1);
        expect(openFirst).toHaveBeenCalledExactlyOnceWith(true);

        movePointer(first, second);
        expect(openSecond).toHaveBeenCalledExactlyOnceWith(true);
        expect(openFirst).toHaveBeenLastCalledWith(false);

        movePointer(second, outside);
        await advance(79);
        expect(openSecond).toHaveBeenCalledExactlyOnceWith(true);
        await advance(1);
        expect(openSecond).toHaveBeenLastCalledWith(false);
        await advance(500);
      } finally {
        vi.useRealTimers();
      }
    });

    it('shows tooltip on focus', async function focusShow() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        const tooltip = getByRole('tooltip').query();
        assume(tooltip).is.not.equal(null);
        assume(tooltip?.textContent).includes('This is the tooltip content!');
      });
    });

    it('keeps opacity feedback without spatial motion when reduced motion is preferred', async function reducedMotion() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      const setReducedMotion = (value: 'reduce' | 'no-preference') =>
        session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value }]
        });

      await setReducedMotion('reduce');

      try {
        assume(matchMedia('(prefers-reduced-motion: reduce)').matches).is.true();

        const { getByRole } = await render(<DefaultExample />);
        await userEvent.keyboard('{Tab}');

        const tooltip = getByRole('tooltip').element();
        const style = getComputedStyle(tooltip);

        assume(style.transform).equals('none');
        assume(style.transitionProperty).equals('opacity');
      } finally {
        await setReducedMotion('no-preference');
      }
    });

    it('hides tooltip on Escape', async function escapeHide() {
      const { getByRole } = await render(<DefaultExample />);

      await userEvent.keyboard('{Tab}');

      await vi.waitFor(async function open() {
        assume(getByRole('tooltip').query()).is.not.equal(null);
      });

      await userEvent.keyboard('{Escape}');

      await vi.waitFor(async function close() {
        assume(getByRole('tooltip').query()).equals(null);
      });

      expect(getByRole('button').element()).toHaveFocus();
    });

    it('shows tooltip on hover', async function hoverShow() {
      const { getByRole } = await render(<DefaultExample tooltipTriggerProps={{ delay: 0, closeDelay: 0 }} />);

      await resetHover();
      await page.getByRole('button').hover();

      await vi.waitFor(async function open() {
        const tooltip = getByRole('tooltip').query();
        assume(tooltip).is.not.equal(null);
        assume(tooltip?.textContent).includes('This is the tooltip content!');
      });
    });

    it('hides tooltip on unhover', async function hoverHide() {
      const { getByRole } = await render(<DefaultExample tooltipTriggerProps={{ delay: 0, closeDelay: 0 }} />);

      await resetHover();
      await page.getByRole('button').hover();

      await vi.waitFor(async function open() {
        assume(getByRole('tooltip').query()).is.not.equal(null);
      });

      await resetHover();

      await vi.waitFor(async function close() {
        assume(getByRole('tooltip').query()).equals(null);
      });
    });

    describe('portaled theme styles', function portaledThemeStyles() {
      let portal: HTMLDivElement;

      beforeEach(function setupPortal() {
        portal = document.createElement('div');
        document.body.append(portal);
      });

      afterEach(function removePortal() {
        portal.remove();
      });

      async function renderInPortal(tokens: ThemeTokens, tooltipProps: ExampleTooltipProps = { style: {} }) {
        for (const [name, value] of Object.entries(tokens)) portal.style.setProperty(name, value);

        const { getByRole } = await render(
          <UNSAFE_PortalProvider getContainer={() => portal}>
            <DefaultExample tooltipTriggerProps={{ defaultOpen: true }} tooltipProps={tooltipProps} />
          </UNSAFE_PortalProvider>
        );
        await expect.element(getByRole('tooltip')).toBeVisible();
        const tooltip = getByRole('tooltip').element() as HTMLElement;
        expect(portal).toContainElement(tooltip);
        return tooltip;
      }

      it('prefers numeric spacing and radius tokens over legacy inputs on the portal', async function modernGeometry() {
        const tooltip = await renderInPortal({
          '--size-space-020': '9px',
          '--size-space-050': '19px',
          '--size-radius-md': '7px',
          '--ux-1sbfig8': '13px',
          '--ux-2jubes': '11px'
        });
        expect(tooltip).toHaveStyle({ padding: '9px 19px', borderRadius: '7px' });
      });

      it('uses the theme density and radius when modern tokens are absent', async function legacyGeometry() {
        const tooltip = await renderInPortal({
          '--ux-1sbfig8': '5px',
          '--ux-2jubes': '11px',
          '--size-space-sm': '50px',
          '--size-space-md': '60px'
        });
        expect(tooltip).toHaveStyle({ padding: '5px 10px', borderRadius: '11px' });
      });

      it('keeps token-free geometry in pixels even at a 20 px root', async function literalGeometry() {
        const root = document.documentElement;
        const previousSize = root.style.fontSize;
        root.style.fontSize = '20px';
        try {
          const tooltip = await renderInPortal({ '--ux-1sbfig8': 'initial', '--ux-2jubes': 'initial' });
          expect(tooltip).toHaveStyle({ padding: '8px 16px', borderRadius: '6px' });
        } finally {
          root.style.fontSize = previousSize;
        }
      });

      it('allows a render-prop style to override panel padding and radius', async function callerStyle() {
        const tooltip = await renderInPortal(
          { '--size-space-020': '8px', '--size-space-050': '16px', '--size-radius-md': '8px' },
          { style: () => ({ padding: '3px 23px', borderRadius: '2px' }) }
        );
        expect(tooltip).toHaveStyle({ padding: '3px 23px', borderRadius: '2px' });
      });

      it.each([
        {
          name: 'both legacy colors',
          background: '#123',
          foreground: '#eef',
          panel: [17, 34, 51],
          text: [238, 238, 255]
        },
        {
          name: 'only a midtone background',
          background: '#888',
          foreground: 'initial',
          panel: [136, 136, 136],
          text: [0, 0, 0]
        },
        {
          name: 'only a midtone foreground',
          background: 'initial',
          foreground: '#888',
          panel: [0, 0, 0],
          text: [136, 136, 136]
        },
        {
          name: 'only a dark background',
          background: '#222',
          foreground: 'initial',
          panel: [34, 34, 34],
          text: [255, 255, 255]
        },
        {
          name: 'only a dark foreground',
          background: 'initial',
          foreground: '#222',
          panel: [255, 255, 255],
          text: [34, 34, 34]
        },
        {
          name: 'neither color',
          background: 'initial',
          foreground: 'initial',
          panel: [17, 17, 17],
          text: [255, 255, 255]
        }
      ])('chooses a readable pair with $name', async function contrast({ background, foreground, panel, text }) {
        const tooltip = await renderInPortal({
          '--ux-7wu8i7': background,
          '--ux-1o8cusa': foreground,
          '--color-surface-background-raised': '#fff',
          '--color-surface-text-raised': '#111',
          '--color-surface-background-overlay': '#fff',
          '--color-surface-text-overlay': '#111'
        });
        const style = getComputedStyle(tooltip);
        const actualPanel = rgb(style.backgroundColor);
        const actualText = rgb(style.color);
        expect(actualPanel).toEqual(panel);
        expect(actualText).toEqual(text);
        const panelLuminance = luminance(actualPanel);
        const textLuminance = luminance(actualText);
        expect(
          (Math.max(panelLuminance, textLuminance) + 0.05) / (Math.min(panelLuminance, textLuminance) + 0.05)
        ).toBeGreaterThanOrEqual(4.5);
        expect(rgb(getComputedStyle(arrowElements(tooltip).tip).backgroundColor)).toEqual(actualPanel);
      });

      it('keeps the legacy inverted pair and a fill-only arrow', async function invertedLegacy() {
        portal.className = 'ux-surface';
        portal.dataset.partial = '"inverted"';
        portal.style.colorScheme = 'dark';
        const tooltip = await renderInPortal({});
        expect(portal).toHaveStyle({ backgroundColor: 'rgb(17, 17, 17)' });
        expect(tooltip).toHaveStyle({
          backgroundColor: 'rgb(17, 17, 17)',
          color: 'rgb(255, 255, 255)',
          borderColor: 'rgba(0, 0, 0, 0)'
        });
        expect(arrowElements(tooltip).tip).toHaveStyle({ backgroundColor: 'rgb(17, 17, 17)', borderWidth: '0px' });
      });
    });

    it.each([
      { size: undefined, fontSize: '14px', lineHeight: '21px' },
      { size: 'md' as const, fontSize: '14px', lineHeight: '21px' },
      { size: 'sm' as const, fontSize: '14px', lineHeight: '21px' },
      { size: 'lg' as const, fontSize: '18px', lineHeight: '27px' }
    ])(
      'uses the expected text tier in the $size size scope',
      async function typographyTier({ size, fontSize, lineHeight }) {
        const example = (
          <DefaultExample
            tooltipTriggerProps={{ defaultOpen: true }}
            tooltipProps={{ children: <Text size="xl">Explicit size</Text> }}
          />
        );
        const { getByRole, getByText } = await render(
          size ? <SizeProvider size={size}>{example}</SizeProvider> : example
        );
        await expect.element(getByRole('tooltip')).toHaveStyle({ fontSize, lineHeight });
        await expect.element(getByText('Explicit size')).toHaveStyle({ fontSize: '20px', lineHeight: '30px' });
      }
    );

    it.each(['top', 'bottom', 'left', 'right'] as const)(
      'draws the arrow toward the trigger at %s',
      async function orientation(placement) {
        const { getByRole } = await render(
          <div style={centeredTrigger}>
            <DefaultExample
              tooltipTriggerProps={{ defaultOpen: true }}
              tooltipProps={{ placement, shouldFlip: false }}
            />
          </div>
        );
        await expect.element(getByRole('tooltip')).toHaveAttribute('data-placement', placement);
        const tooltip = getByRole('tooltip').element() as HTMLElement;
        const { wrapper, frame, tip } = arrowElements(tooltip);
        const vertical = placement === 'top' || placement === 'bottom';
        expect(wrapper).toHaveAttribute('data-placement', placement);
        expect(wrapper).toHaveStyle({ width: '10px', height: '10px' });
        expect(frame).toHaveStyle(vertical ? { width: '10px', height: '8px' } : { width: '8px', height: '10px' });
        expect(tip).toHaveStyle(vertical ? { width: '10px', height: '6px' } : { width: '6px', height: '10px' });
        expect(getComputedStyle(tip).clipPath).toMatch(/^polygon\(/);
        await expect
          .poll(function edgeDistance() {
            const panel = tooltip.getBoundingClientRect();
            const arrow = tip.getBoundingClientRect();
            const edges = {
              top: arrow.top - panel.bottom,
              bottom: arrow.bottom - panel.top,
              left: arrow.left - panel.right,
              right: arrow.right - panel.left
            };
            return Math.abs(edges[placement]);
          })
          .toBeLessThanOrEqual(0.5);
      }
    );

    it('preserves the visible and hidden gaps as padding and offset change', async function triggerGaps() {
      const previousViewport = { width: window.innerWidth, height: window.innerHeight };
      await page.viewport(800, 600);

      function centeredTooltip(tooltipProps: ExampleTooltipProps) {
        return (
          <div style={centeredTrigger}>
            <DefaultExample
              tooltipTriggerProps={{ defaultOpen: true }}
              tooltipProps={{ placement: 'top', ...tooltipProps }}
            />
          </div>
        );
      }

      const { getByRole, rerender, unmount } = await render(centeredTooltip({ style: {} }));
      try {
        const getTooltip = () => getByRole('tooltip').element() as HTMLElement;
        const triggerTop = () => getByRole('button').element().getBoundingClientRect().top;
        const tipGap = () => triggerTop() - arrowElements(getTooltip()).tip.getBoundingClientRect().bottom;
        const panelGap = () => triggerTop() - getTooltip().getBoundingClientRect().bottom;

        await expect.element(getByRole('tooltip')).toHaveAttribute('data-placement', 'top');
        await expect.poll(() => Math.abs(tipGap() - 2.04)).toBeLessThanOrEqual(0.5);
        const originalTipGap = tipGap();
        await rerender(centeredTooltip({}));
        await expect.element(getByRole('tooltip')).toHaveStyle({ padding: '8px 16px' });
        await expect.poll(() => Math.abs(tipGap() - originalTipGap)).toBeLessThanOrEqual(0.5);
        await rerender(centeredTooltip({ offset: 5 }));
        await expect.poll(() => Math.abs(tipGap() - originalTipGap - 5)).toBeLessThanOrEqual(0.5);

        await rerender(centeredTooltip({ hideArrow: true, style: {} }));
        expect(getTooltip().querySelector(':scope > [data-placement]')).toBeNull();
        await expect.poll(() => Math.abs(panelGap() - 3.5)).toBeLessThanOrEqual(0.5);
        const originalPanelGap = panelGap();
        await rerender(centeredTooltip({ hideArrow: true, offset: 5 }));
        await expect.poll(() => Math.abs(panelGap() - originalPanelGap - 5)).toBeLessThanOrEqual(0.5);
      } finally {
        await unmount();
        await page.viewport(previousViewport.width, previousViewport.height);
      }
    });

    it('flips near a viewport corner and keeps the shifted arrow attached and aimed at the trigger', async function cornerPlacement() {
      const { getByRole } = await render(
        <div style={{ position: 'fixed', insetBlockStart: 0, insetInlineStart: 0 }}>
          <DefaultExample tooltipTriggerProps={{ defaultOpen: true }} tooltipProps={{ placement: 'top' }} />
        </div>
      );
      await expect.element(getByRole('tooltip')).toHaveAttribute('data-placement', 'bottom');
      const tooltip = getByRole('tooltip').element() as HTMLElement;
      const { tip } = arrowElements(tooltip);
      await expect
        .poll(() => Math.abs(tip.getBoundingClientRect().bottom - tooltip.getBoundingClientRect().top))
        .toBeLessThanOrEqual(0.5);
      const panel = tooltip.getBoundingClientRect();
      const arrow = tip.getBoundingClientRect();
      const trigger = getByRole('button').element().getBoundingClientRect();
      const arrowCenter = (arrow.left + arrow.right) / 2;
      expect(arrow.left).toBeGreaterThanOrEqual(panel.left + 6);
      expect(arrowCenter).toBeGreaterThan(trigger.left);
      expect(arrowCenter).toBeLessThan(trigger.right);
      expect(arrowCenter).toBeLessThan((panel.left + panel.right) / 2);
    });
  });
});
