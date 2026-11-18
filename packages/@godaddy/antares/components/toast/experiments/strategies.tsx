import { type ReactNode, useEffect, useState } from 'react';
import { type ToastEmphasis, type ToastOptions, type ToastQueue, ToastRegion } from '@godaddy/antares';
import { createInstanceId, dispatch, listen } from './growl-sim/consensus.ts';

/**
 * The ways Antares Toast could live next to Growl, each as a small adapter. None of this ships:
 * the core Toast knows nothing about Growl.
 */

/** "Avoid": move the toast host below any visible Growl stack, so the two never overlap. */
export function useAvoidGrowl(enabled: boolean) {
  useEffect(
    function followGrowl() {
      if (!enabled) return;

      function place() {
        const host = document.querySelector<HTMLElement>('[data-antares-toast-host="1"]');
        if (!host) return;
        const shells = document.querySelectorAll('[data-simulated-growl], .ux-growl-shell');
        const bottom = Math.max(0, ...Array.from(shells, (shell) => shell.getBoundingClientRect().bottom));
        host.style.insetBlockStart = `${bottom}px`;
      }

      const observer = new MutationObserver(place);
      observer.observe(document.body, { childList: true, subtree: true });
      place();

      return function stop() {
        observer.disconnect();
        const host = document.querySelector<HTMLElement>('[data-antares-toast-host="1"]');
        if (host) host.style.insetBlockStart = '0px';
      };
    },
    [enabled]
  );
}

const growlEmphasis: Record<ToastEmphasis, string | undefined> = {
  none: 'info',
  success: 'success',
  critical: 'critical',
  warning: 'warning'
};

/**
 * "Forward": Antares hands its toast to whichever Growl leads. Receivers never check the sender, so
 * any stamp works. One stack, but Growl draws it, in Growl's style and inside Growl's React tree.
 */
export function forwardToGrowl({ title, message, emphasis = 'none', timeout = 5000 }: ToastOptions) {
  dispatch('message', '0', createInstanceId(), {
    type: 'addGrowlMessage',
    id: `forwarded-${createInstanceId()}`,
    title,
    children: message,
    emphasis: growlEmphasis[emphasis],
    lifetime: timeout ?? undefined
  });
}

/**
 * "Lead": Antares joins Growl's election with a higher major (9999) and draws every Growl message
 * itself. This is what Growl does today, and it shows why the React context breaks: the messages
 * come from other trees but render in this one.
 */
export function LeadingAntares({ queue }: { queue: ToastQueue }) {
  const [instanceId] = useState(createInstanceId);

  useEffect(
    function joinElection() {
      return listen('9999', instanceId, function onmessage({ type, title, children }) {
        if (type !== 'addGrowlMessage') return;
        queue.add({ title: title as ReactNode, message: children as ReactNode, timeout: 5000 });
      });
    },
    [instanceId, queue]
  );

  return <ToastRegion queue={queue} ariaLabels={{ region: 'Leading Antares notifications' }} />;
}

interface GrowlConfig {
  id?: string;
  title?: ReactNode;
  children?: ReactNode;
  content?: ReactNode;
  emphasis?: string;
  icon?: string;
  lifetime?: number;
  fadeTime?: number;
}

const toastEmphasis: Record<string, ToastEmphasis> = {
  success: 'success',
  critical: 'critical',
  warning: 'warning'
};

/**
 * "Migration shim": the Growl API, backed by an Antares queue. Teams swap the import and keep their
 * calls; Growl's "no lifetime" means persistent, so it maps to `timeout: null`.
 */
export function createGrowlShim(queue: ToastQueue) {
  const keys = new Map<string, string>();

  return {
    addGrowlMessage(config: GrowlConfig) {
      const lifetime = config.lifetime ?? config.fadeTime;
      const key = queue.add({
        title: config.title,
        message: config.children ?? config.content,
        emphasis: toastEmphasis[config.emphasis ?? config.icon ?? ''] ?? 'none',
        timeout: lifetime || null
      });
      if (config.id) keys.set(config.id, key);
    },

    removeGrowlMessage(id: string) {
      const key = keys.get(id);
      if (key) queue.close(key);
      keys.delete(id);
    }
  };
}
