import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { cx } from 'cva';
import { UNSAFE_PortalProvider } from 'react-aria';
import {
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as RACToastContent,
  type QueuedToast
} from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Button } from '#components/button';
import { Icon } from '#components/icon';
import { Text } from '#components/text';
import type { InternalToastQueue, ToastContent, ToastEmphasis } from './queue.ts';
import styles from './index.module.css';

const emphasisIcons: Record<ToastEmphasis, string | null> = {
  none: null,
  success: 'checkmark',
  critical: 'alert',
  warning: 'alert'
};

interface ToastProps {
  /** The queued toast to render. */
  toast: QueuedToast<ToastContent>;

  /** The queue it belongs to, for the exit transition. */
  queue: InternalToastQueue;

  /** Overrides RAC's localized close label. */
  closeLabel?: string;

  /** Hands off focus from a closing toast within this region. */
  moveFocus: (element: HTMLDivElement) => void;
}

/**
 * One toast inside a `ToastRegion`. Internal: consumers add toasts through a queue.
 *
 * @param props - {@link ToastProps}
 */
export function Toast({ toast, queue, closeLabel, moveFocus }: ToastProps) {
  const { key, content, timer, timeout } = toast;
  const { title, message, emphasis, dismissible } = content;
  const icon = emphasisIcons[emphasis];
  const ref = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);

  // Toasts never render on the server, so the server snapshot can be the same function.
  const getIsExiting = () => queue.isExiting(key);
  const isExiting = useSyncExternalStore(queue.subscribeExiting, getIsExiting, getIsExiting);

  useEffect(
    function startTimer() {
      return queue.startTimer({ timer, timeout });
    },
    [queue, timer, timeout]
  );

  useLayoutEffect(
    function endInteraction() {
      const element = ref.current;
      if (!isExiting || !element || element.inert) return;
      // Move focus before inert can blur the active control.
      moveFocus(element);
      element.inert = true;
    },
    [isExiting, moveFocus]
  );

  useEffect(
    function removeAfterExit() {
      if (!isExiting) return;

      // Only the toast's own exit counts: content such as a spinner can animate forever.
      const transitions = [...(ref.current?.getAnimations() ?? []), ...(surfaceRef.current?.getAnimations() ?? [])];
      void Promise.allSettled(transitions.map((transition) => transition.finished)).then(function remove() {
        queue.remove(key);
      });
    },
    [isExiting, key, queue]
  );

  // `0` is a valid title, so only empty values count as "no title".
  const hasTitle = title != null && typeof title !== 'boolean' && title !== '';

  // Without a title, the message labels the toast so it isn't announced twice.
  const messageSlot = hasTitle ? 'description' : 'title';

  return (
    <RACToast
      toast={{ ...toast, timer: undefined }}
      ref={ref}
      className={styles.toast}
      data-emphasis={emphasis}
      data-exiting={isExiting || undefined}
    >
      <div className={styles.clip}>
        <div ref={surfaceRef} className={styles.surface}>
          {/* Content inside a toast portals to the page as usual, not into the toast host. */}
          <UNSAFE_PortalProvider getContainer={null}>
            {icon ? <Icon icon={icon} aria-hidden="true" className={styles.icon} /> : null}
            <RACToastContent className={styles.content}>
              {hasTitle ? (
                <Text as="div" slot="title" className={cx(styles.title, textTreatmentClassName('inherit'))}>
                  {title}
                </Text>
              ) : null}
              <Text as="div" slot={messageSlot} className={cx(styles.message, textTreatmentClassName('inherit'))}>
                {message}
              </Text>
            </RACToastContent>
            {dismissible ? (
              <Button slot="close" variant="minimal" size="sm" aria-label={closeLabel} className={styles.close}>
                <Icon icon="x" />
              </Button>
            ) : null}
          </UNSAFE_PortalProvider>
        </div>
      </div>
    </RACToast>
  );
}
