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
import { WithoutValueLabelExample } from '../examples/without-value-label.tsx';
import { WithoutLabelExample } from '../examples/without-label.tsx';
import { ValueDisplayExample } from '../examples/value-display.tsx';
import { CompositionExample } from '../examples/composition.tsx';

describe('@godaddy/antares', function antares() {
  describe('#ProgressBar', function progressBarTests() {
    it('omits visible value output while preserving accessible progress', async function hidesValue() {
      const screen = await render(<WithoutValueLabelExample />);
      const progress = screen.getByRole('progressbar', { name: 'Uploading files' });
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      expect(progress.element().textContent).toBe('Uploading files');
      await expect.element(progress).not.toHaveAttribute('aria-describedby');
    });

    it('renders a compact track without empty rows or gaps', async function trackOnly() {
      const screen = await render(<WithoutLabelExample />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      expect(progress.element().textContent).toBe('');
      expect(progress.element().getBoundingClientRect().height).toBe(12);
      await screen.rerender(<WithoutLabelExample isIndeterminate size="xs" />);
      expect(progress.element().getBoundingClientRect().height).toBe(6);
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
    });

    it('formats values independently of visible labels and respects custom ranges', async function formattedValues() {
      const screen = await render(<WithoutLabelExample showValue minValue={20} maxValue={100} />);
      const progress = screen.getByRole('progressbar', { name: 'Upload progress' });
      await expect.element(screen.getByText('50%')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuetext', '50%');
      const track = progress.element().querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(track.style.getPropertyValue('--progress-bar-progress')).toBe('50%');
      await screen.rerender(
        <WithoutLabelExample
          showValue
          value={60}
          formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        />
      );
      await expect.element(screen.getByText('$60')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '$60');
      await screen.rerender(<WithoutLabelExample showValue value={120} maxValue={80} />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '80');
      await expect.element(screen.getByText('100%')).toBeVisible();
      expect(track.style.getPropertyValue('--progress-bar-progress')).toBe('100%');
    });

    it('separates static visual content from accessible value text', async function staticValues() {
      const screen = await render(<WithoutLabelExample showValue valueContent="3 of 5 files" />);
      const progress = screen.getByRole('progressbar');
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '60%');
      await screen.rerender(<WithoutLabelExample showValue valueLabel="3 of 5 files" />);
      await expect.element(progress).toHaveAttribute('aria-valuetext', '3 of 5 files');
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await screen.rerender(<WithoutLabelExample showValue valueContent={0} />);
      await expect.element(screen.getByText('0', { exact: true })).toBeVisible();
      await screen.rerender(<WithoutLabelExample showValue valueContent={null} />);
      expect(progress.element().textContent).toBe('');
      expect(progress.element().getBoundingClientRect().height).toBe(12);
      await screen.rerender(<WithoutLabelExample showValue valueContent={false} />);
      expect(progress.element().textContent).toBe('');
    });

    it('updates render-function output when progress changes', async function renderFunctionValues() {
      const renderValue: NonNullable<Parameters<typeof WithoutLabelExample>[0]['valueContent']> = function renderValue({
        percentage
      }) {
        return percentage === 0 ? null : `Current: ${percentage}%`;
      };
      const screen = await render(<WithoutLabelExample showValue valueContent={renderValue} />);
      const progress = screen.getByRole('progressbar');
      await expect.element(screen.getByText('Current: 60%')).toBeVisible();
      await screen.rerender(<WithoutLabelExample showValue value={80} valueContent={renderValue} />);
      await expect.element(screen.getByText('Current: 80%')).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuetext', '80%');
      await screen.rerender(<WithoutLabelExample showValue value={0} valueContent={renderValue} />);
      expect(progress.element().textContent).toBe('');
    });

    it('supports formatted, static, and state-based value output', async function valueDisplay() {
      const screen = await render(<ValueDisplayExample />);
      await expect.element(screen.getByText('60%', { exact: true })).toBeVisible();
      await expect.element(screen.getByText('3 of 5 files')).toBeVisible();
      await expect.element(screen.getByText('Current: 60%')).toBeVisible();
    });

    it('switches between indeterminate and measured progress', async function changesMode() {
      const screen = await render(<IndeterminateExample value={60} valueLabel="60 files" />);
      const progress = screen.getByRole('progressbar', { name: 'Preparing upload…' });
      await expect.element(progress).not.toHaveAttribute('aria-valuenow');
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      await expect.element(progress).toHaveAttribute('aria-valuemin', '0');
      await expect.element(progress).toHaveAttribute('aria-valuemax', '100');
      await expect.element(progress).toHaveAccessibleDescription('Calculating the total size');
      expect(progress.element().textContent).not.toContain('60 files');
      expect(progress.element().querySelector('[data-indeterminate]')).not.toBeNull();
      await screen.rerender(<IndeterminateExample isIndeterminate={false} value={60} valueLabel="60 files" />);
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(screen.getByText('60 files')).toBeVisible();
      expect(progress.element().querySelector('[data-indeterminate]')).toBeNull();
      await screen.rerender(<IndeterminateExample />);
      await expect.element(progress).not.toHaveAttribute('aria-valuetext');
      await screen.rerender(<IndeterminateExample isIndeterminate={false} />);
      await expect.element(screen.getByText('0%')).toBeVisible();
    });

    it('preserves description links from server markup through hydration', async function hydratesDescriptions() {
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
        const serverMarkup = serverElement.outerHTML;
        await expect.element(progress).toHaveAttribute('aria-describedby', 'external-description upload-description');
        await expect.element(progress).toHaveAccessibleDescription('Keep this window open. 60% uploaded');

        await act(async function hydrate() {
          root = hydrateRoot(container, <CompositionExample />, {
            onRecoverableError(error) {
              recoverableErrors.push(error);
            }
          });
        });

        expect(progress.element()).toBe(serverElement);
        expect(progress.element().outerHTML).toBe(serverMarkup);
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

    it('places direct parts by named area and forwards refs and overrides', async function compositionOverrides() {
      let root: HTMLDivElement | null = null;
      let track: HTMLDivElement | null = null;
      let value: HTMLElement | null = null;
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
            style: { height: 10 }
          }}
          valueProps={{
            ref: function valueRef(element) {
              value = element;
            },
            className: 'custom-value',
            size: 'lg'
          }}
        />
      );
      const progress = screen.getByRole('progressbar').element();
      expect(root).toBe(progress);
      expect(progress).toHaveClass('custom-root');
      expect(progress.getBoundingClientRect().width).toBe(320);
      expect(track).toHaveClass('custom-track');
      expect(track!.getBoundingClientRect().height).toBe(10);
      expect(value).toHaveClass('custom-value');
      expect(getComputedStyle(value!).fontSize).toBe('18px');
      const label = screen.getByText('Uploading').element();
      const description = screen.getByText('60% uploaded').element();
      expect(value!.getBoundingClientRect().bottom).toBeLessThan(track!.getBoundingClientRect().top);
      expect(value!.getBoundingClientRect().right).toBe(progress.getBoundingClientRect().right);
      expect(track!.getBoundingClientRect().top).toBeGreaterThan(label.getBoundingClientRect().bottom);
      expect(description.getBoundingClientRect().top).toBeGreaterThan(track!.getBoundingClientRect().bottom);
      await expect.element(screen.getByText('Additional content')).toBeVisible();
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
      expect(track.getBoundingClientRect().height).toBe(6);
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

    it('exposes the default label, description, range, and progress', async function defaultProgress() {
      const screen = await render(<DefaultExample />);
      const progress = screen.getByRole('progressbar', { name: 'Loading…' });
      await expect.element(progress).toBeVisible();
      await expect.element(progress).toHaveAttribute('aria-valuenow', '60');
      await expect.element(progress).toHaveAttribute('aria-valuemin', '0');
      await expect.element(progress).toHaveAttribute('aria-valuemax', '100');
      await expect.element(progress).toHaveAccessibleDescription('Please wait while we process your request');
      await expect.element(screen.getByText('Loading…')).toBeVisible();
      await expect.element(screen.getByText('Please wait while we process your request')).toBeVisible();
      const track = progress.element().querySelector('[aria-hidden="true"]') as HTMLElement;
      expect(track.style.getPropertyValue('--progress-bar-progress')).toBe('60%');
    });

    it('sets data-size for each size variant', async function dataSizeVariants() {
      const { container } = await render(<SizesExample />);
      const bars = container.querySelectorAll('[role="progressbar"]');

      expect(bars[0]).toHaveAttribute('data-size', 'xs');
      expect(bars[1]).toHaveAttribute('data-size', 'sm');
      expect(bars[2]).toHaveAttribute('data-size', 'md');
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
