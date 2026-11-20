import type { ReactNode } from 'react';
import { UNSTABLE_ToastQueue as RACToastQueue, type ToastOptions as RACToastOptions } from 'react-aria-components';

/**
 * Controls the status icon and its color.
 */
export type ToastEmphasis = 'none' | 'success' | 'critical' | 'warning';

/**
 * Options for a single toast, passed to {@link ToastQueue.add} or `toast.add()`.
 */
export interface ToastOptions {
  /** Bold heading shown above the message. Any React node. */
  title?: ReactNode;

  /** The notification text. Any React node, such as `<FormattedMessage />`. */
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

/**
 * RAC's queue, plus two things:
 *
 * - Only one region renders it. Micro front-ends sharing one copy of Antares each mount a
 *   `ToastRegion` for the same default queue; the first one mounted renders the toasts, the others
 *   render nothing, and the next one takes over if it unmounts. So no toast shows twice.
 * - A visible toast stays mounted while it plays its exit transition, then calls `remove()`.
 */
export class InternalToastQueue extends RACToastQueue<ToastContent> {
  private regions: symbol[] = [];
  private regionListeners = new Set<() => void>();
  private closeCallbacks = new Map<string, () => void>();
  private exiting = new Set<string>();
  private exitListeners = new Set<() => void>();

  add(content: ToastContent, { onClose, ...options }: RACToastOptions = {}): string {
    const key = super.add(content, options);
    if (onClose) this.closeCallbacks.set(key, onClose);

    // A closing toast pushed out of view can't play its exit, so finish it now.
    for (const exiting of [...this.exiting]) {
      if (!this.visibleToasts.some((toast) => toast.key === exiting)) this.remove(exiting);
    }

    return key;
  }

  /**
   * Closes a toast, letting a visible one play its exit transition first.
   *
   * @param key - The toast's key.
   */
  close(key: string): void {
    const isVisible = this.regions.length > 0 && this.visibleToasts.some((toast) => toast.key === key);
    if (!isVisible) return this.remove(key);
    if (this.exiting.has(key)) return;

    this.exiting.add(key);
    for (const listener of this.exitListeners) listener();
  }

  /**
   * Removes a toast and calls its `onClose`. The queue keeps `onClose` from RAC, which calls it
   * mid-removal: a toast added from it would make RAC remove the wrong one.
   *
   * @param key - The toast's key.
   */
  remove(key: string): void {
    this.exiting.delete(key);
    const onClose = this.closeCallbacks.get(key);
    this.closeCallbacks.delete(key);
    super.close(key);
    onClose?.();
  }

  isExiting(key: string): boolean {
    return this.exiting.has(key);
  }

  subscribeExiting = (listener: () => void): (() => void) => {
    this.exitListeners.add(listener);

    return () => {
      this.exitListeners.delete(listener);
    };
  };

  /**
   * Registers a mounted region.
   *
   * @param region - A token unique to the region.
   * @returns Its cleanup.
   */
  attach(region: symbol): () => void {
    this.regions.push(region);
    this.notifyRegions();

    return () => {
      this.regions = this.regions.filter((other) => other !== region);
      this.notifyRegions();
      // No region is left to play the exits, so finish them now.
      if (this.regions.length === 0) for (const key of [...this.exiting]) this.remove(key);
    };
  }

  subscribeRegions = (listener: () => void): (() => void) => {
    this.regionListeners.add(listener);

    return () => {
      this.regionListeners.delete(listener);
    };
  };

  /** Whether this region is the one that renders the queue. */
  isActiveRegion(region: symbol): boolean {
    return this.regions[0] === region;
  }

  private notifyRegions() {
    for (const listener of this.regionListeners) listener();
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

    return getInternalQueue(this).add(
      { title, message, emphasis, dismissible: dismissible || persistent },
      { timeout: persistent ? undefined : timeout, onClose }
    );
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
