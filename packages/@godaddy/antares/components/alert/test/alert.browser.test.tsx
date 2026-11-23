import styles from '../src/index.module.css';
import { act, createRef } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { InteriorExample } from '../examples/interior.tsx';
const emphasisIconMap = [
  ['critical', 'alert'],
  ['warning', 'alert'],
  ['success', 'checkmark'],
  ['info', 'information'],
  ['highlight', 'star'],
  ['premium', 'diamond'],
  ['internal', 'comment']
] as const;

describe('@godaddy/antares', function antares() {
  beforeAll(preloadTestIcons);

  describe('#Alert', function alertTests() {
    it('exposes the message without adding a dismiss control', async function defaultMessage() {
      const { getByRole } = await render(<DefaultExample />);
      await expect.element(getByRole('alert')).toBeVisible();
      await expect.element(getByRole('heading', { name: 'Your domain is ready' })).toBeVisible();
      await expect.element(getByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    it('keeps the emphasis icons decorative', async function emphasisIcons() {
      const { container } = await render(<EmphasesExample />);
      for (const [emphasis, icon] of emphasisIconMap) {
        const alert = container.querySelector(`[data-emphasis="${emphasis}"]`) as HTMLElement;
        const svg = alert.querySelector(`svg[data-icon="${icon}"]`) as SVGSVGElement;
        expect(svg).not.toBeNull();
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      }
    });

    it('lets the parent hide and restore a dismissed alert', async function dismissCycle() {
      const { getByRole } = await render(<DismissibleExample />);
      await userEvent.click(getByRole('button', { name: 'Close' }));
      await expect.element(getByRole('alert')).not.toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Show alert' }));
      await expect.element(getByRole('alert')).toBeVisible();
    });

    it.each(['{Enter}', ' '])('dismisses with keyboard input %s', async function keyboardDismiss(key) {
      const { getByRole } = await render(<DismissibleExample closeLabel="Cerrar alerta" />);
      getByRole('button', { name: 'Cerrar alerta' }).element().focus();
      await userEvent.keyboard(key);
      await expect.element(getByRole('alert')).not.toBeInTheDocument();
    });

    it('activates the consumer action with pointer and keyboard', async function actionEvents() {
      const onAction = vi.fn();
      const { getByRole } = await render(<WithActionExample onAction={onAction} />);
      const action = getByRole('button', { name: 'Update Payment Method' });
      await userEvent.click(action);
      action.element().focus();
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onAction).toHaveBeenCalledTimes(3);
    });

    it('supports optional regions and native link semantics', async function optionalParts() {
      const { getByRole } = await render(<CompositionExample />);
      const minimal = getByRole('alert', { name: 'Message only' });
      expect(minimal.element().querySelector('svg')).toBeNull();
      await expect.element(minimal.getByRole('heading')).not.toBeInTheDocument();
      await expect.element(getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', '#billing');
      expect(getByRole('alert', { name: 'Documentation notice' }).element().querySelector('svg')).toHaveAttribute(
        'data-icon',
        'star'
      );
    });

    it('merges classes and styles while local props and refs remain effective', async function localOverrides() {
      const surfaceRef = createRef<HTMLDivElement>();
      const contentRef = createRef<HTMLElement>();
      const iconRef = createRef<SVGSVGElement>();
      const closeRef = createRef<HTMLButtonElement>();
      const onAction = vi.fn();
      const onClose = vi.fn();
      const { getByRole, getByTestId } = await render(
        <InteriorExample
          surfaceRef={surfaceRef}
          contentRef={contentRef}
          iconRef={iconRef}
          closeRef={closeRef}
          onAction={onAction}
          onClose={onClose}
        />
      );
      const surface = getByRole('alert', { name: 'Composition overrides' }).element();
      const content = getByTestId('owned-content').element();
      const icon = getByTestId('owned-icon').element();
      const close = getByRole('button', { name: 'Dismiss composition' });
      expect(surfaceRef.current).toBe(surface);
      expect(contentRef.current).toBe(content);
      expect(iconRef.current).toBe(icon);
      expect(closeRef.current).toBe(close.element());
      expect(surface).toHaveClass(styles.alert, 'caller-surface');
      expect(content).toHaveClass(styles.content, 'caller-content');
      expect(icon).toHaveClass(styles.indicator, 'caller-icon');
      expect(close.element()).toHaveClass(styles.close, 'caller-close');
      expect(surface.style.backgroundColor).toBe('rgb(240, 240, 240)');
      expect(content.style.color).toBe('rgb(10, 20, 30)');
      expect(icon).toHaveAttribute('data-icon', 'star');
      expect(icon).toHaveAttribute('width', '32');
      expect(getByTestId('standalone-icon').element()).toHaveAttribute('data-icon', 'information');
      const plainIcon = getByTestId('plain-icon').element();
      expect(plainIcon).toHaveAttribute('width', '20');
      expect(plainIcon).not.toHaveAttribute('aria-hidden', 'true');
      expect(plainIcon).toHaveAttribute('data-icon', 'checkmark');
      expect(close.element().querySelector('svg')).toHaveAttribute('data-icon', 'x');
      expect(close.element().querySelector('svg')).not.toHaveClass(styles.indicator);
      await expect.element(getByRole('heading', { name: 'Custom title', level: 2 })).toBeVisible();
      expect(getByRole('button', { name: 'Plain action' }).element()).toHaveClass(/tertiary/);
      await userEvent.click(getByRole('button', { name: 'Resolve' }));
      expect(onAction).toHaveBeenCalledTimes(1);
      await userEvent.click(close);
      expect(onClose).toHaveBeenCalledTimes(1);
      await expect.element(getByRole('alert')).toBeVisible();
    });

    it('keeps the nested Alert icon independent from the outer icon', async function nestedOwnership() {
      const { getByRole, getByTestId } = await render(<InteriorExample nested />);
      const nested = getByRole('alert', { name: 'Nested notice' }).element();
      expect(nested.querySelector(`.${styles.indicator}`)).toHaveAttribute('data-icon', 'checkmark');
      expect(getByTestId('owned-icon').element()).toHaveAttribute('data-icon', 'star');
    });

    it.each([false, true])(
      'keeps keyboard order aligned with source order: reversed %s',
      async function sourceOrder(reverse) {
        const { getByRole } = await render(<InteriorExample reverse={reverse} />);
        const controls = Array.from(getByRole('alert').element().querySelectorAll<HTMLElement>('button, a'));
        expect(controls.map((control) => control.getAttribute('aria-label') ?? control.textContent?.trim())).toEqual(
          reverse
            ? ['Dismiss composition', 'Resolve', 'Help', 'Plain action']
            : ['Plain action', 'Resolve', 'Help', 'Dismiss composition']
        );
        controls[0].focus();
        for (const control of controls.slice(1)) {
          await userEvent.keyboard('{Tab}');
          expect(document.activeElement).toBe(control);
        }
      }
    );

    it('keeps focus and source-order tabbing when the container changes width', async function reflowFocus() {
      const { getByRole } = await render(<PlaygroundExample width={320} showAction dismissible />);
      const action = getByRole('button', { name: 'Action' });
      action.element().focus();
      await userEvent.keyboard('{Tab}');
      const close = getByRole('button', { name: 'Close' });
      await expect.element(close).toHaveFocus();
      getByRole('alert').element().style.width = '640px';
      await expect.element(close).toHaveFocus();
    });

    it('hydrates the composed regions without replacing their DOM', async function hydration() {
      const container = document.createElement('div');
      container.innerHTML = renderToString(<PlaygroundExample showAction dismissible />);
      document.body.append(container);
      const surface = container.querySelector('[role="alert"]');
      const heading = container.querySelector('h3');
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function hydrate() {
          root = hydrateRoot(container, <PlaygroundExample showAction dismissible />, {
            onRecoverableError
          });
        });
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.querySelector('[role="alert"]')).toBe(surface);
        expect(container.querySelector('h3')).toBe(heading);
      } finally {
        await act(async function unmount() {
          root?.unmount();
        });
        container.remove();
      }
    });
  });
});
