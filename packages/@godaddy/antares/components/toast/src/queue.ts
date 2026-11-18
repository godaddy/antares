import type { ReactNode } from 'react';
import { UNSTABLE_ToastQueue as RACToastQueue } from 'react-aria-components';

/**
 * Controls the status icon and its color.
 */
export type ToastEmphasis = 'none' | 'success' | 'critical' | 'warning';

/**
 * Options for a single toast, passed to {@link ToastQueue.add} or `toast.add()`.
 */
export interface ToastOptions {
  /** Bold heading shown above the message. */
  title?: ReactNode;

  /** The notification text. */
  message: ReactNode;

  /** The status icon to show before the text. @default 'none' */
  emphasis?: ToastEmphasis;

  /**
   * Milliseconds before the toast closes on its own. The timer pauses while the region is hovered or
   * focused. `null` (or `0`) keeps the toast until the user closes it. @default 5000
   */
  timeout?: number | null;

  /**
   * Whether to show the close button. Only a toast with a timeout can hide it: a persistent toast is
   * always dismissible. @default true
   */
  dismissible?: boolean;

  /** Called when the toast closes, by the user or after its timeout. */
  onClose?: () => void;
}

/**
 * Options for a {@link ToastQueue}.
 */
export interface ToastQueueOptions {
  /** How many toasts show at once. Extra toasts wait until one closes. @default 5 */
  maxVisibleToasts?: number;
}

/** What a queued toast renders. */
export interface ToastContent {
  title?: ReactNode;
  message: ReactNode;
  emphasis: ToastEmphasis;
  dismissible: boolean;
}

const DEFAULT_TIMEOUT = 5000;
const DEFAULT_MAX_VISIBLE_TOASTS = 5;

/** How long a toast may wait for a mounted `ToastRegion` before we warn in development. */
const UNMOUNTED_WARNING_DELAY = 1000;

const isDev = process.env.NODE_ENV !== 'production';

/**
 * RAC's queue, plus an exit phase: `close()` marks a toast as exiting so it can animate out, and
 * the rendered toast calls `finishClose()` once its exit animation ends. RAC's own timers and close
 * button call `close()` too, so every path animates.
 */
export class InternalToastQueue extends RACToastQueue<ToastContent> {
  private regions = 0;
  private exiting = new Set<string>();
  private exitListeners = new Set<() => void>();

  /** Registers a mounted region and returns its cleanup. */
  attach(): () => void {
    this.regions++;

    if (isDev && this.regions > 1) {
      console.warn('[Antares] Toast: more than one <ToastRegion /> renders this queue, so its toasts show twice.');
    }

    return () => {
      this.regions--;
      if (this.regions > 0) return;
      // No region is left to play the exit animations, so finish them now.
      for (const key of [...this.exiting]) this.finishClose(key);
    };
  }

  /** Whether any `ToastRegion` currently renders this queue. */
  get isAttached(): boolean {
    return this.regions > 0;
  }

  subscribeExiting = (listener: () => void): (() => void) => {
    this.exitListeners.add(listener);

    return () => {
      this.exitListeners.delete(listener);
    };
  };

  isExiting(key: string): boolean {
    return this.exiting.has(key);
  }

  close(key: string): void {
    if (this.exiting.has(key)) return;

    // Nothing on screen to animate: a queued toast, or no region mounted.
    if (!this.isAttached || !this.visibleToasts.some((queued) => queued.key === key)) {
      super.close(key);
      return;
    }

    this.exiting.add(key);
    this.notifyExit();
  }

  finishClose(key: string): void {
    if (!this.exiting.delete(key)) return;

    super.close(key);
    this.notifyExit();
  }

  private notifyExit() {
    for (const listener of this.exitListeners) listener();
  }
}

const internals = new WeakMap<ToastQueue, InternalToastQueue>();

/**
 * A queue of toasts. Each `ToastRegion` renders one queue, the default `toast` queue unless you
 * pass your own, for example to isolate a micro front-end or a test.
 *
 * @example
 * ```tsx
 * const queue = new ToastQueue({ maxVisibleToasts: 3 });
 *
 * <ToastRegion queue={queue} />
 * queue.add({ message: 'Saved' });
 * ```
 */
export class ToastQueue {
  constructor(options: ToastQueueOptions = {}) {
    const { maxVisibleToasts = DEFAULT_MAX_VISIBLE_TOASTS } = options;
    internals.set(this, new InternalToastQueue({ maxVisibleToasts }));
  }

  /**
   * Shows a toast.
   *
   * @param options - {@link ToastOptions}
   * @returns The key to pass to {@link ToastQueue.close}.
   */
  add(options: ToastOptions): string {
    const { title, message, emphasis = 'none', timeout = DEFAULT_TIMEOUT, dismissible = true, onClose } = options;
    const persistent = !timeout;
    const queue = getInternalQueue(this);

    if (isDev && persistent && !dismissible) {
      console.warn('[Antares] Toast: a toast without a timeout must be dismissible, so the close button stays.');
    }

    const key = queue.add(
      { title, message, emphasis, dismissible: dismissible || persistent },
      { timeout: persistent ? undefined : timeout, onClose }
    );

    if (isDev && !queue.isAttached) {
      setTimeout(function warnUnmounted() {
        if (queue.isAttached) return;
        console.warn('[Antares] Toast: no <ToastRegion /> is mounted for this queue, so the toast is not shown yet.');
      }, UNMOUNTED_WARNING_DELAY);
    }

    return key;
  }

  /**
   * Closes a toast.
   *
   * @param key - The key returned by {@link ToastQueue.add}.
   */
  close(key: string): void {
    getInternalQueue(this).close(key);
  }
}

/**
 * The RAC queue behind a {@link ToastQueue}. Internal to the toast component.
 *
 * @param queue - The public queue.
 * @returns Its internal queue.
 */
export function getInternalQueue(queue: ToastQueue): InternalToastQueue {
  return internals.get(queue) as InternalToastQueue;
}

/** The queue `toast` and a `ToastRegion` without a `queue` prop share. */
export const defaultToastQueue = new ToastQueue();

/**
 * Shows and closes toasts on the default queue, from anywhere in the app. Mount one
 * `<ToastRegion />` to render them.
 *
 * @example
 * ```tsx
 * const key = toast.add({ title: 'Domain connected', message: 'Your site is live.', emphasis: 'success' });
 * toast.close(key);
 * ```
 */
export const toast = {
  /** Shows a toast and returns its key. */
  add(options: ToastOptions): string {
    return defaultToastQueue.add(options);
  },

  /** Closes the toast with this key. */
  close(key: string): void {
    defaultToastQueue.close(key);
  }
};
