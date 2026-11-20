import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { act } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { cdp, page, userEvent } from 'vitest/browser';
import { IndeterminateExample } from '../examples/indeterminate.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { SizesExample } from '../examples/sizes.tsx';
import { StatusesExample } from '../examples/statuses.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { SlotsExample } from '../examples/slots.tsx';

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
      expect(progress.element().querySelector('svg[data-indeterminate]')).not.toBeNull();

      await screen.rerender(<IndeterminateExample isIndeterminate={false} value={60} valueLabel="60 files" />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60 files');
      await expect.element(screen.getByText('60 files')).toBeVisible();
      expect(progress.element().querySelector('svg[data-indeterminate]')).toBeNull();

      await screen.rerender(<IndeterminateExample value={90} />);
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      expect(progress.element().textContent).not.toContain('90%');

      await screen.rerender(<IndeterminateExample isIndeterminate={false} />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '0');
      await expect.element(screen.getByText('0%')).toBeVisible();
    });

    it('keeps the indicator visible while respecting motion preferences', async function motionPreferences() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      try {
        await session.send('Emulation.setEmulatedMedia', {
          features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }]
        });
        const { getByRole } = await render(<IndeterminateExample />);
        const progress = getByRole('progressbar');
        const indicator = progress.element().querySelector('svg[data-indeterminate]') as Element;
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

    it('sets data-size for each size variant', async function dataSizeVariants() {
      const { container } = await render(<SizesExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-size', 'sm');
      expect(bars[1]).toHaveAttribute('data-size', 'md');
      expect(bars[2]).toHaveAttribute('data-size', 'lg');
      expect(bars[3]).toHaveAttribute('data-size', 'xl');
    });

    it('preserves the fill colors for each status', async function statusVariants() {
      const screen = await render(<StatusesExample />);
      const { container } = screen;
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-status', 'default');
      expect(bars[1]).toHaveAttribute('data-status', 'success');
      expect(bars[2]).toHaveAttribute('data-status', 'warning');
      expect(bars[3]).toHaveAttribute('data-status', 'critical');
      expect(Array.from(bars, (bar) => getComputedStyle(bar.querySelector('circle:nth-child(2)')!).stroke)).toEqual([
        'rgb(0, 164, 166)',
        'rgb(0, 166, 63)',
        'rgb(222, 124, 0)',
        'rgb(219, 24, 2)'
      ]);
      await screen.rerender(<DefaultExample />);
      await expect.element(screen.getByRole('progressbar')).toHaveAttribute('data-status', 'default');
    });

    it('associates descriptions after hydration without mismatches', async function hydratesDescriptions() {
      const environment = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
      const previousActEnvironment = environment.IS_REACT_ACT_ENVIRONMENT;
      environment.IS_REACT_ACT_ENVIRONMENT = true;
      const container = document.createElement('div');
      const recoverableErrors: unknown[] = [];
      const consoleError = vi.spyOn(console, 'error').mockImplementation(function captureError() {
        // Keep hydration warnings available for the assertion below.
      });
      let root: Root | undefined;
      try {
        container.innerHTML = renderToString(<CompositionExample />);
        document.body.append(container);
        const progress = page.elementLocator(container).getByRole('progressbar', { name: 'Uploading' });
        const serverElement = progress.element();
        await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description');
        await expect.element(progress).toHaveAccessibleDescription('Keep this window open.');

        await act(async function hydrate() {
          root = hydrateRoot(container, <CompositionExample />, {
            onRecoverableError(error) {
              recoverableErrors.push(error);
            }
          });
        });

        expect(progress.element()).toBe(serverElement);
        await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description upload-description');
        await expect.element(progress).toHaveAccessibleDescription('Keep this window open. 60% uploaded');
        expect(recoverableErrors).toEqual([]);
        expect(consoleError).not.toHaveBeenCalled();
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
        consoleError.mockRestore();
        environment.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
      }
    });

    it('associates dynamic descriptions through wrappers and preserves external descriptions', async function dynamicDescriptions() {
      const screen = await render(<CompositionExample />);
      const progress = screen.getByRole('progressbar', { name: 'Uploading' });
      await expect.element(progress).toHaveAccessibleDescription('Keep this window open. 60% uploaded');
      await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description upload-description');
      await userEvent.click(screen.getByRole('button', { name: 'Change description' }));
      await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description renamed-description');
      await userEvent.click(screen.getByRole('button', { name: 'Change description' }));
      await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description');
      await expect.element(progress).toHaveAccessibleDescription('Keep this window open.');
      await userEvent.click(screen.getByRole('button', { name: 'Change description' }));
      await expect.element(progress).toHaveAccessibleDescription('Keep this window open. 60% uploaded');
      await screen.rerender(<CompositionExample value={80} />);
      await expect.element(progress).toHaveAccessibleDescription('Keep this window open. 80% uploaded');
    });

    it('isolates nested progress state, labels, descriptions, and track styling', async function nestedComposition() {
      const screen = await render(<CompositionExample nested />);
      const outer = screen.getByRole('progressbar', { name: 'Uploading' });
      const inner = screen.getByRole('progressbar', { name: 'Current file' });
      await expect.element(outer).toHaveAttribute('aria-valuetext', '60%');
      await expect.element(inner).toHaveAttribute('aria-valuetext', '20%');
      await expect.element(outer).toHaveAccessibleDescription('Keep this window open. 60% uploaded');
      await expect.element(inner).toHaveAccessibleDescription('One file');
      await expect.element(screen.getByText('60%', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('20%', { exact: true })).toBeVisible();
      const track = inner.element().querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(track.getBoundingClientRect().height).toBe(64);
      const unrelated = screen.getByTestId('unrelated-box').element();
      expect(unrelated.textContent).toBe('');
      expect(unrelated).not.toHaveAttribute('aria-hidden');
      expect(unrelated).not.toHaveAttribute('data-indeterminate');
    });

    it('renders Box and Text values with accessible descriptions', async function slotValues() {
      const screen = await render(<SlotsExample />);
      const boxProgress = screen.getByRole('progressbar', { name: 'Box value' });
      const textProgress = screen.getByRole('progressbar', { name: 'Text value' });
      await expect.element(boxProgress).toHaveAttribute('aria-valuetext', '60%');
      await expect.element(boxProgress).toHaveAccessibleDescription('Processing files');
      const boxValue = boxProgress.element().querySelector('[slot="value"]')!;
      const textValue = textProgress.element().querySelector('[slot="value"]')!;
      expect(boxValue.textContent).toBe('60%');
      expect(textValue.textContent).toBe('60%');
      expect(getComputedStyle(boxValue).fontSize).toBe(getComputedStyle(textValue).fontSize);
      expect(getComputedStyle(boxValue).color).toBe(getComputedStyle(textValue).color);
      await expect.element(screen.getByText('60/100')).toBeVisible();
      expect(screen.getByRole('progressbar', { name: 'Track only' }).element().getBoundingClientRect().height).toBe(64);
      await expect.element(screen.getByText('Waiting')).not.toBeVisible();
    });

    it('exposes the composed name, description, and decorative progress', async function defaultProgress() {
      const screen = await render(<DefaultExample />);
      const progress = screen.getByRole('progressbar', { name: 'Uploading…' });
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuemin', '0');
      await expect.element(progress).toHaveAttribute('aria-valuemax', '100');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      await expect.element(progress).toHaveAccessibleDescription('3 of 5 files uploaded');
      const track = progress.element().querySelector('[slot="track"]')!;
      const value = progress.element().querySelector('[slot="value"]')!;
      expect(track).toHaveAttribute('aria-hidden', 'true');
      expect(track.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(value).toHaveAttribute('aria-hidden', 'true');
      expect(value.textContent).toBe('60%');
      const trackRect = track.getBoundingClientRect();
      const valueRect = value.getBoundingClientRect();
      expect(valueRect.x + valueRect.width / 2).toBeCloseTo(trackRect.x + trackRect.width / 2, 0);
      expect(valueRect.y + valueRect.height / 2).toBeCloseTo(trackRect.y + trackRect.height / 2, 0);
    });

    it('supports omitted parts, external names, and compact circles', async function optionalParts() {
      const screen = await render(
        <CompositionExample
          showLabel={false}
          showValue={false}
          showDescription={false}
          size="sm"
          aria-describedby={undefined}
        />
      );
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      await expect.element(progress).not.toHaveAttribute('aria-describedby');
      expect(progress.element().getBoundingClientRect().height).toBe(64);
      expect(progress.element().querySelector('[slot="value"]')).toBeNull();
      await screen.rerender(
        <CompositionExample
          showLabel={false}
          showValue={false}
          showDescription={false}
          aria-label={undefined}
          aria-labelledby="external-description"
          isIndeterminate
          size="sm"
        />
      );
      await expect
        .element(screen.getByRole('progressbar', { name: 'Keep this window open.' }))
        .not.toHaveAttribute('aria-valuenow');
    });

    it('updates the ring and formatted values for custom ranges and clamping', async function rangesAndFormatting() {
      const screen = await render(<CompositionExample showLabel={false} minValue={20} maxValue={100} />);
      const progress = screen.getByRole('progressbar');
      const fill = progress.element().querySelector('circle:nth-child(2)')!;
      const circumference = Number(fill.getAttribute('stroke-dasharray'));
      await expect.element(screen.getByText('50%', { exact: true })).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuemin', '20');
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      expect(Number(fill.getAttribute('stroke-dashoffset'))).toBeCloseTo(circumference * 0.5);
      await screen.rerender(<CompositionExample value={120} maxValue={80} />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '80');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '100%');
      expect(Number(fill.getAttribute('stroke-dashoffset'))).toBe(0);
      await screen.rerender(<CompositionExample value={-10} />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '0');
      expect(Number(fill.getAttribute('stroke-dashoffset'))).toBeCloseTo(circumference);
      await screen.rerender(
        <CompositionExample formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }} />
      );
      await expect.element(screen.getByText('$60', { exact: true })).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '$60');
      await screen.rerender(<CompositionExample valueLabel="3 of 5 files" />);
      await expect.element(screen.getByText('3 of 5 files', { exact: true })).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '3 of 5 files');
    });

    it('updates custom output and hides it during indeterminate progress', async function customValues() {
      const renderValue = ({ percentage }: { percentage: number | undefined }) => `Current: ${percentage}%`;
      const screen = await render(<CompositionExample valueContent={renderValue} />);
      const progress = screen.getByRole('progressbar');
      await expect.element(screen.getByText('Current: 60%')).toBeVisible();
      await screen.rerender(<CompositionExample value={80} valueContent={renderValue} />);
      await expect.element(screen.getByText('Current: 80%')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '80%');
      await screen.rerender(<CompositionExample isIndeterminate valueContent="3 files" />);
      await expect.element(screen.getByText('3 files')).not.toBeVisible();
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      await screen.rerender(<CompositionExample valueContent="3 files" />);
      await expect.element(screen.getByText('3 files')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      for (const valueContent of [null, false, true, '', <></>]) {
        await screen.rerender(<CompositionExample valueContent={valueContent} />);
        expect(progress.element().querySelector('[slot="value"]')).not.toBeVisible();
      }
      await screen.rerender(<CompositionExample valueContent={0} />);
      await expect.element(screen.getByText('0', { exact: true })).toBeVisible();
    });

    it('places reordered parts by area and merges overrides and refs', async function overrides() {
      let root: HTMLDivElement | null = null;
      let track: HTMLDivElement | null = null;
      let value: HTMLDivElement | null = null;
      const screen = await render(
        <CompositionExample
          ref={function rootRef(element) {
            root = element;
          }}
          className="custom-root"
          style={{ width: 320 }}
          trackProps={{
            ref: function trackRef(element) {
              track = element;
            },
            className: 'custom-track',
            style: { width: 80 }
          }}
          valueProps={{
            ref: function valueRef(element) {
              value = element;
            },
            className: 'custom-value',
            style: { fontSize: 18 }
          }}
        />
      );
      expect(root).toBe(screen.getByRole('progressbar').element());
      expect(root).toHaveClass('custom-root');
      expect(root!.getBoundingClientRect().width).toBe(320);
      expect(track).toHaveClass('custom-track');
      expect(track!.getBoundingClientRect().width).toBe(80);
      expect(value).toHaveClass('custom-value');
      expect(getComputedStyle(value!).fontSize).toBe('18px');
      expect(screen.getByText('Uploading').element().getBoundingClientRect().top).toBeGreaterThan(
        track!.getBoundingClientRect().bottom
      );
      expect(screen.getByText('60% uploaded').element().getBoundingClientRect().top).toBeGreaterThan(
        screen.getByText('Uploading').element().getBoundingClientRect().bottom
      );
      for (const alignment of ['start', 'end'] as const) {
        for (const width of [undefined, 80]) {
          await screen.rerender(
            <CompositionExample
              justifyItems={alignment}
              alignItems={alignment}
              rows="160px auto auto"
              style={{ width: 320 }}
              trackProps={{ style: { width } }}
            />
          );
          const progress = screen.getByRole('progressbar').element();
          const trackRect = progress.querySelector('[slot="track"]')!.getBoundingClientRect();
          const valueRect = progress.querySelector('[slot="value"]')!.getBoundingClientRect();
          expect(valueRect.x + valueRect.width / 2).toBeCloseTo(trackRect.x + trackRect.width / 2, 0);
          expect(valueRect.y + valueRect.height / 2).toBeCloseTo(trackRect.y + trackRect.height / 2, 0);
        }
      }
      await screen.rerender(<CompositionExample areas={['label track', 'description track']} columns="1fr auto" />);
      expect(getComputedStyle(screen.getByRole('progressbar').element()).gridTemplateAreas).toBe(
        '"label track" "description track"'
      );
      await screen.rerender(<CompositionExample trackProps={{ children: 'Custom ring' }} />);
      await expect.element(screen.getByText('Custom ring')).toBeVisible();
      expect(screen.getByRole('progressbar').element().querySelector('svg')).toBeNull();
    });

    it('keeps indeterminate progress distinct in forced colors', async function forcedColors() {
      const session = cdp() as unknown as { send: (method: string, params: unknown) => Promise<void> };
      try {
        await session.send('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] });
        const screen = await render(<IndeterminateExample />);
        const svg = screen.getByRole('progressbar').element().querySelector('svg')!;
        expect(getComputedStyle(svg).forcedColorAdjust).toBe('none');
        expect(getComputedStyle(svg.querySelector('circle')!).stroke).not.toBe(
          getComputedStyle(svg.querySelector('circle:nth-child(2)')!).stroke
        );
      } finally {
        await session.send('Emulation.setEmulatedMedia', { features: [] });
      }
    });
  });
});
