import styles from '../src/index.module.css';
import { act, createRef } from 'react';
import { hydrateRoot, type Root } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { DEFAULT_SLOT } from 'react-aria-components';
import { preloadTestIcons } from '#test/utils/test-helpers.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { PlaygroundExample } from '../examples/alert-playground.tsx';
import { DismissibleExample } from '../examples/dismissible.tsx';
import { EmphasesExample } from '../examples/emphases.tsx';
import { WithActionExample } from '../examples/with-action.tsx';
import { CompositionExample } from '../examples/composition.tsx';
import { InteriorExample } from '../examples/interior.tsx';
import { InModalExample } from '../examples/in-modal.tsx';
import { CustomRegionsExample } from '../examples/custom-regions.tsx';

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

    it('keeps composed icons decorative and matched to the surface accent', async function emphasisIcons() {
      const { container } = await render(<EmphasesExample />);
      for (const [emphasis, icon] of emphasisIconMap) {
        const alert = container.querySelector(`[data-emphasis="${emphasis}"]`) as HTMLElement;
        const svg = alert.querySelector(`svg[data-icon="${icon}"]`) as SVGSVGElement;
        expect(svg).not.toBeNull();
        expect(svg).toHaveAttribute('aria-hidden', 'true');
        const accent = getComputedStyle(alert).borderInlineStartColor;
        expect(getComputedStyle(svg).color).toBe(accent);
        expect(getComputedStyle(alert).borderTopColor).toBe(accent);
        expect(getComputedStyle(alert).borderInlineEndColor).toBe(accent);
        const size = `${1.625 * Number.parseFloat(getComputedStyle(document.documentElement).fontSize)}px`;
        expect(getComputedStyle(svg).width).toBe(size);
        expect(getComputedStyle(svg).height).toBe(size);
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
      const { getByRole, getByText } = await render(<CompositionExample />);
      const textTitle = getByText('Plain title').element();
      const headingTitle = getByRole('alert', { name: 'Title only' }).getByRole('heading').element();
      expect(getComputedStyle(textTitle).fontSize).toBe(getComputedStyle(headingTitle).fontSize);
      expect(getComputedStyle(textTitle).fontWeight).toBe(getComputedStyle(headingTitle).fontWeight);
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
      expect(content).toHaveClass(styles.textRegion, 'caller-content');
      expect(icon).toHaveClass(styles.emphasisIcon, 'caller-icon');
      expect(close.element()).toHaveClass(styles.close, 'caller-close');
      expect(getComputedStyle(surface).backgroundColor).toBe('rgb(240, 240, 240)');
      expect(getComputedStyle(content).color).toBe('rgb(10, 20, 30)');
      expect(getComputedStyle(content).paddingInlineStart).toBe('0px');
      expect(getComputedStyle(content).paddingBlockStart).toBe('0px');
      expect(icon).toHaveAttribute('data-icon', 'star');
      expect(getComputedStyle(icon).width).toBe('32px');
      expect(getByTestId('standalone-icon').element()).toHaveAttribute('data-icon', 'information');
      const plainIcon = getByTestId('plain-icon').element();
      expect(plainIcon).toHaveAttribute('width', '20');
      expect(plainIcon).not.toHaveAttribute('aria-hidden', 'true');
      expect(plainIcon).toHaveAttribute('data-icon', 'checkmark');
      expect(close.element().querySelector('svg')).toHaveAttribute('data-icon', 'x');
      expect(close.element().querySelector('svg')).not.toHaveClass(styles.emphasisIcon);
      await expect.element(getByRole('heading', { name: 'Custom title', level: 2 })).toBeVisible();
      expect(getComputedStyle(getByRole('heading', { name: 'Custom title' }).element()).fontSize).toBe(
        getComputedStyle(getByTestId('reference-title').element()).fontSize
      );
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
      expect(nested.querySelector(`.${styles.emphasisIcon}`)).toHaveAttribute('data-icon', 'checkmark');
      expect(getByTestId('owned-icon').element()).toHaveAttribute('data-icon', 'star');
    });

    it.each(['plain', 'slots'])(
      'preserves inherited icon overrides through %s context',
      async function inheritedIconOverrides(mode) {
        const defaults = { color: 'purple', width: 18, height: 18, className: 'ambient-icon', 'aria-hidden': false };
        const iconContext =
          mode === 'plain'
            ? defaults
            : {
                slots: {
                  [DEFAULT_SLOT]: defaults,
                  support: { color: 'green' }
                }
              };
        const { getByRole, getByTestId } = await render(
          <InteriorExample iconContext={iconContext} supportIcon={mode === 'slots'} nested />
        );
        const closeIcon = getByRole('button', { name: 'Dismiss composition' }).element().querySelector('svg');
        expect(closeIcon).toHaveAttribute('data-icon', 'x');
        expect(closeIcon).toHaveAttribute('fill', 'purple');
        expect(closeIcon).toHaveAttribute('width', '18');
        expect(closeIcon).toHaveClass('ambient-icon');
        expect(closeIcon).not.toHaveClass(styles.emphasisIcon);
        expect(closeIcon).not.toHaveAttribute('aria-hidden', 'true');
        const actionIcon = getByTestId('action-icon').element();
        expect(actionIcon).toHaveAttribute('fill', 'purple');
        expect(actionIcon).not.toHaveClass(styles.emphasisIcon);
        expect(getByTestId('ordinary-heading').element()).not.toHaveClass(styles.title);
        expect(getByTestId('owned-icon').element()).toHaveAttribute('data-icon', 'star');
        expect(
          getByRole('alert', { name: 'Nested notice' }).element().querySelector(`.${styles.emphasisIcon}`)
        ).toHaveAttribute('data-icon', 'checkmark');
        if (mode === 'slots') {
          expect(getByTestId('support-icon').element()).toHaveAttribute('data-icon', 'information');
          expect(getByTestId('support-icon').element()).toHaveAttribute('fill', 'green');
        }
      }
    );

    it.each([false, true])(
      'places named regions independently of reversed source order: %s',
      async function regionOrder(reverse) {
        const { getByRole, getByTestId } = await render(<InteriorExample reverse={reverse} />);
        const icon = getByTestId('owned-icon').element().getBoundingClientRect();
        const content = getByTestId('owned-content').element().getBoundingClientRect();
        const actions = getByRole('group', { name: 'Resolution options' }).element().getBoundingClientRect();
        const close = getByRole('button', { name: 'Dismiss composition' }).element().getBoundingClientRect();
        expect(icon.right).toBeLessThanOrEqual(content.left + 1);
        expect(actions.top).toBeGreaterThanOrEqual(content.top);
        expect(actions.right).toBeLessThanOrEqual(close.right + 1);
      }
    );

    it.each([320, 419, 420, 421, 640])(
      'reflows actions without overlapping the close column at %s CSS px',
      async function responsiveLayout(width) {
        const { getByRole, container } = await render(<PlaygroundExample width={width} showAction dismissible />);
        const content = (container.querySelector(`.${styles.textRegion}`) as HTMLElement).getBoundingClientRect();
        const action = getByRole('button', { name: 'Action' }).element().getBoundingClientRect();
        const close = getByRole('button', { name: 'Close' }).element().getBoundingClientRect();
        expect(close.left).toBeGreaterThanOrEqual(content.right);
        expect(close.right).toBeLessThanOrEqual(getByRole('alert').element().getBoundingClientRect().right);
        if (width < 420) {
          expect(action.top).toBeGreaterThanOrEqual(content.bottom);
          expect(action.left).toBeCloseTo(content.left, 0);
        } else {
          expect(action.left).toBeGreaterThanOrEqual(content.right);
          expect(action.top).toBeLessThan(content.bottom);
        }
      }
    );

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

    it('places regions returned by custom components and keeps their actions usable', async function customRegions() {
      const { getByRole, container } = await render(<CustomRegionsExample width={640} />);
      const content = (container.querySelector(`.${styles.textRegion}`) as HTMLElement).getBoundingClientRect();
      const icon = (container.querySelector(`.${styles.emphasisIcon}`) as SVGSVGElement).getBoundingClientRect();
      const action = getByRole('button', { name: 'Update payment' });
      const close = getByRole('button', { name: 'Dismiss payment warning' });
      expect(icon.right).toBeLessThanOrEqual(content.left);
      expect(action.element().getBoundingClientRect().left).toBeGreaterThanOrEqual(content.right);
      expect(close.element().getBoundingClientRect().left).toBeGreaterThan(
        action.element().getBoundingClientRect().right
      );
      action.element().focus();
      await userEvent.keyboard('{Tab}');
      await expect.element(close).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect.element(getByRole('alert')).not.toBeInTheDocument();
      await userEvent.click(getByRole('button', { name: 'Show warning' }));
      await expect.element(getByRole('alert')).toBeVisible();
    });

    it('reclaims the close column when a custom region returns null', async function conditionalRegion() {
      const { getByRole, container } = await render(<CustomRegionsExample width={320} />);
      const content = container.querySelector(`.${styles.textRegion}`) as HTMLElement;
      const title = getByRole('heading', { name: 'Payment method expiring' }).element();
      const withClose = content.getBoundingClientRect().width;
      await userEvent.click(getByRole('button', { name: 'Toggle close control' }));
      await expect.element(getByRole('button', { name: 'Dismiss payment warning' })).not.toBeInTheDocument();
      expect(content.getBoundingClientRect().width).toBeGreaterThan(withClose);
      expect(getByRole('heading', { name: 'Payment method expiring' }).element()).toBe(title);
      await userEvent.click(getByRole('button', { name: 'Toggle close control' }));
      await expect.element(getByRole('button', { name: 'Dismiss payment warning' })).toBeVisible();
      expect(content.getBoundingClientRect().width).toBeCloseTo(withClose);
    });

    it('does not reserve empty icon or close columns', async function omittedRegions() {
      const { getByRole, container } = await render(
        <CustomRegionsExample width={320} showIcon={false} initiallyDismissible={false} />
      );
      const surface = getByRole('alert').element();
      const content = (container.querySelector(`.${styles.textRegion}`) as HTMLElement).getBoundingClientRect();
      const style = getComputedStyle(surface);
      const bounds = surface.getBoundingClientRect();
      expect(content.left).toBeCloseTo(
        bounds.left + Number.parseFloat(style.borderLeftWidth) + Number.parseFloat(style.paddingLeft)
      );
      expect(content.right).toBeCloseTo(
        bounds.right - Number.parseFloat(style.borderRightWidth) - Number.parseFloat(style.paddingRight)
      );
    });

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
      container.innerHTML = renderToString(<PlaygroundExample width={419} showAction dismissible />);
      document.body.append(container);
      const surface = container.querySelector('[role="alert"]');
      const heading = container.querySelector('h3');
      const onRecoverableError = vi.fn();
      let root: Root | undefined;
      try {
        await act(async function hydrate() {
          root = hydrateRoot(container, <PlaygroundExample width={419} showAction dismissible />, {
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

    it('mirrors the icon and close columns in RTL', async function rtlLayout() {
      const { getByRole, container } = await render(<PlaygroundExample width={320} dir="rtl" dismissible />);
      const icon = container.querySelector(`.${styles.emphasisIcon}`) as Element;
      const content = container.querySelector(`.${styles.textRegion}`) as Element;
      const close = getByRole('button', { name: 'Close' }).element();
      expect(icon.getBoundingClientRect().left).toBeGreaterThanOrEqual(content.getBoundingClientRect().right - 1);
      expect(close.getBoundingClientRect().right).toBeLessThanOrEqual(content.getBoundingClientRect().left);
    });

    it('dismisses the nested alert without closing or renaming its dialog', async function modalIsolation() {
      const { getByRole } = await render(<InModalExample />);
      await userEvent.click(getByRole('button', { name: 'Open alert dialog' }));
      const dialog = getByRole('dialog', { name: 'Account settings' });
      await expect.element(dialog).toBeVisible();
      await userEvent.click(getByRole('button', { name: 'Dismiss warning' }));
      await expect.element(getByRole('alert')).not.toBeInTheDocument();
      await expect.element(dialog).toBeVisible();
      await expect.element(getByRole('button', { name: 'Continue' })).toHaveFocus();
      await userEvent.click(getByRole('button', { name: 'Done' }));
      await expect.element(dialog).not.toBeInTheDocument();
    });
  });
});
