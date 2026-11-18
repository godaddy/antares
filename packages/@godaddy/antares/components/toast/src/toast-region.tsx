import { type CSSProperties, forwardRef, useEffect } from 'react';
import { UNSAFE_PortalProvider } from 'react-aria';
import {
  UNSTABLE_ToastRegion as RACToastRegion,
  type ToastRegionProps as RACToastRegionProps
} from 'react-aria-components';
import { composeClassName } from '#utils/render-props.ts';
import { getToastHost } from './host.ts';
import { defaultToastQueue, getInternalQueue, type ToastContent, type ToastQueue } from './queue.ts';
import { Toast } from './toast.tsx';
import styles from './index.module.css';

//
// Our build process introduces the package version as a build-time constant.
// @see tsdown.config.ts
//
const VERSION = '__ANTARES_VERSION__';

export interface ToastRegionProps
  extends Omit<RACToastRegionProps<ToastContent>, 'queue' | 'children' | 'className' | 'style' | 'aria-label'> {
  /** The queue to render. @default the queue behind `toast` */
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

/**
 * Renders a queue's toasts in the top-right corner of the page. Mount one per app, inside your
 * providers, so toast content keeps your context (such as i18n). Nothing renders until a toast
 * is added.
 *
 * Every copy of Antares on a page renders into one shared host, so toasts from a shared header and
 * the app it wraps stack instead of overlapping.
 *
 * @example
 * ```tsx
 * <ToastRegion />
 * toast.add({ message: 'Saved' });
 * ```
 *
 * @param props - {@link ToastRegionProps}
 */
export const ToastRegion = forwardRef<HTMLDivElement, ToastRegionProps>(function ToastRegion(props, ref) {
  const { queue = defaultToastQueue, ariaLabels, className, ...rest } = props;
  const internal = getInternalQueue(queue);

  useEffect(
    function attach() {
      return internal.attach();
    },
    [internal]
  );

  return (
    <UNSAFE_PortalProvider getContainer={getToastHost}>
      <RACToastRegion
        {...rest}
        ref={ref}
        queue={internal}
        aria-label={ariaLabels?.region}
        data-antares-version={VERSION}
        className={composeClassName(className, styles.region)}
      >
        {function renderToast({ toast }) {
          return <Toast toast={toast} queue={internal} closeLabel={ariaLabels?.close} />;
        }}
      </RACToastRegion>
    </UNSAFE_PortalProvider>
  );
});
