import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore
} from 'react';
import { createFocusManager } from '@react-aria/focus';
import { mergeRefs, UNSAFE_PortalProvider, useFocusVisible, useUNSAFE_PortalContext } from 'react-aria';
import { UNSTABLE_ToastRegion as RACToastRegion } from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import { getToastHost } from './host.ts';
import { defaultToastQueue, getInternalQueue, type InternalToastQueue, type ToastQueue } from './queue.ts';
import { Toast } from './toast.tsx';
import styles from './index.module.css';

export interface ToastRegionProps extends Pick<HTMLAttributes<HTMLDivElement>, 'id' | 'lang' | 'translate'> {
  /** The queue to render, created by this copy of Antares. @default the queue behind `toast` */
  queue?: ToastQueue;

  /** Screen reader labels. Each defaults to React Aria's localized string. */
  ariaLabels?: {
    /** Label of the notifications landmark. @default '{count} notifications' */
    region?: string;

    /** Label of each close button. @default 'Close' */
    close?: string;
  };

  /** Additional CSS class names applied to the region. */
  className?: string;

  /** Inline styles applied to the region. */
  style?: CSSProperties;
}

const ToastRegionElement = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'> & { queue: InternalToastQueue }
>(function ToastRegionElement({ queue, ...props }, ref) {
  useLayoutEffect(
    function trackRegion() {
      return queue.resetTimerPause;
    },
    [queue]
  );
  return <div {...props} ref={ref} />;
});

/**
 * Renders a queue's toasts in the top-right corner of the page. Mount one per app, inside your
 * providers, so toast content keeps your context (such as i18n). Nothing renders until a toast
 * is added.
 *
 * Every copy of Antares on a page renders into one shared host, so toasts from a shared header and
 * the app it wraps stack instead of overlapping. If several regions render the same queue, only the
 * first one mounted shows its toasts.
 *
 * @example
 * ```tsx
 * <ToastRegion />
 * toast.add({ message: 'Saved' });
 * ```
 *
 * @param props - {@link ToastRegionProps}
 */
export const ToastRegion = /* @__PURE__ */ forwardRef<HTMLDivElement, ToastRegionProps>(
  function ToastRegion(props, ref) {
    const { queue = defaultToastQueue, ariaLabels, className, ...rest } = props;
    const { getContainer: getPortalContainer } = useUNSAFE_PortalContext();
    const internal = getInternalQueue(queue);
    const lastFocused = useRef<HTMLElement | SVGElement | null>(null);
    const regionRef = useMemo(
      () =>
        mergeRefs(ref, function trackFocus(element: HTMLDivElement | null) {
          if (!element) return;

          function rememberFocus({ relatedTarget }: FocusEvent) {
            if (relatedTarget instanceof Node && element?.contains(relatedTarget)) return;
            lastFocused.current =
              relatedTarget instanceof HTMLElement || relatedTarget instanceof SVGElement ? relatedTarget : null;
          }

          element.addEventListener('focusin', rememberFocus);
          return () => element.removeEventListener('focusin', rememberFocus);
        }),
      [ref]
    );
    const { isFocusVisible } = useFocusVisible();
    const [region] = useState(() => Symbol('ToastRegion'));
    const isActive = useSyncExternalStore(
      internal.subscribeRegions,
      () => internal.isActiveRegion(region),
      () => false
    );
    const subscribeToasts = useMemo(() => internal.subscribe.bind(internal), [internal]);
    const hasVisibleToasts = useSyncExternalStore(
      subscribeToasts,
      () => internal.visibleToasts.length > 0,
      () => false
    );

    useEffect(
      function attach() {
        return internal.attach(region);
      },
      [internal, region]
    );

    if (!isActive || !hasVisibleToasts) return null;

    function moveFocus(closingToast: HTMLDivElement) {
      if (!closingToast.contains(closingToast.ownerDocument.activeElement)) return;

      const previous = lastFocused.current?.isConnected ? lastFocused.current : null;
      if (!isFocusVisible && previous) {
        previous.focus({ preventScroll: true });
        return;
      }

      const focus = createFocusManager({ current: closingToast.closest('ol') });
      const options = {
        from: closingToast,
        accept: (node: Element) => node.matches(`.${styles.toast}:not([data-exiting])`)
      };
      if (!focus.focusPrevious(options) && !focus.focusNext(options)) previous?.focus();
    }

    return (
      <UNSAFE_PortalProvider getContainer={getToastHost}>
        <RACToastRegion
          {...rest}
          ref={regionRef}
          queue={internal}
          aria-label={ariaLabels?.region}
          className={composeClassName(className, styles.region)}
          render={(domProps) => <ToastRegionElement {...domProps} queue={internal} />}
        >
          {function renderToast({ toast }) {
            return (
              <Toast
                toast={toast}
                queue={internal}
                closeLabel={ariaLabels?.close}
                getPortalContainer={getPortalContainer ?? null}
                moveFocus={moveFocus}
              />
            );
          }}
        </RACToastRegion>
      </UNSAFE_PortalProvider>
    );
  }
);
