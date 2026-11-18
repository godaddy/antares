import type { ReactNode } from 'react';
import { Button, ToastQueue, ToastRegion, type ToastEmphasis } from '@godaddy/antares';

// Its own queue, so the playground never shares toasts with other examples on the page.
const defaultQueue = new ToastQueue();

export interface PlaygroundExampleProps {
  /** Bold heading shown above the message. */
  title?: ReactNode;

  /** The notification text. */
  message?: string;

  /** The status icon. */
  emphasis?: ToastEmphasis;

  /** Milliseconds before the toast closes; 0 keeps it open. */
  timeout?: number;

  /** Whether to show the close button. */
  dismissible?: boolean;

  /** Queue used by this playground. */
  queue?: ToastQueue;
}

export function PlaygroundExample({
  title = 'Toast title',
  message = 'Something happened in the background.',
  emphasis = 'none',
  timeout = 5000,
  dismissible = true,
  queue = defaultQueue
}: PlaygroundExampleProps) {
  return (
    <>
      <ToastRegion queue={queue} />
      <Button
        variant="secondary"
        onPress={function showToast() {
          queue.add({ title, message, emphasis, timeout: timeout || null, dismissible });
        }}
      >
        Show toast
      </Button>
    </>
  );
}
