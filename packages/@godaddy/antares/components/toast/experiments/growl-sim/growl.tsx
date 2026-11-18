import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createInstanceId, dispatch, listen, type Payload } from './consensus.ts';
import styles from './growl.module.css';

export interface GrowlMessage {
  id: string;
  title?: ReactNode;
  children?: ReactNode;
  emphasis?: 'success' | 'critical' | 'warning' | 'info';
  lifetime?: number;
}

interface GrowlProps {
  /** The `@ux/growl` major this instance pretends to be. */
  major: '2400' | '2500';
}

/**
 * Everything a simulated `@ux/growl` major needs: its `<Growl />` and its static
 * `addGrowlMessage`/`removeGrowlMessage`, like the real package. Each call gets a separate copy, as
 * each bundle on a page would.
 */
export function createGrowl(major: '2400' | '2500') {
  let send: ((payload: Payload) => void) | null = null;
  let id = 0;

  function onReady(fn: (payload: Payload) => void) {
    send = fn;
  }

  function Growl() {
    return <SimulatedGrowl major={major} onReady={onReady} />;
  }

  return {
    Growl,

    addGrowlMessage(config: Omit<GrowlMessage, 'id'> & { id?: string }) {
      send?.({ type: 'addGrowlMessage', id: `growl-${major}-${id++}`, ...config });
    },

    removeGrowlMessage(messageId: string) {
      send?.({ type: 'removeGrowlMessage', id: messageId });
    }
  };
}

function SimulatedGrowl({ major, onReady }: GrowlProps & { onReady: (send: (payload: Payload) => void) => void }) {
  const [messages, setMessages] = useState<GrowlMessage[]>([]);
  const [instanceId] = useState(createInstanceId);

  useEffect(
    function joinElection() {
      onReady(function send(payload) {
        dispatch('message', major, instanceId, payload);
      });

      return listen(major, instanceId, function onmessage({ type, ...config }) {
        if (type === 'addGrowlMessage') {
          const message = config as unknown as GrowlMessage;
          setMessages((prev) => prev.concat(message));
          if (message.lifetime) {
            setTimeout(function expire() {
              setMessages((prev) => prev.filter((m) => m.id !== message.id));
            }, message.lifetime);
          }
        } else if (type === 'removeGrowlMessage') {
          setMessages((prev) => prev.filter((m) => m.id !== config.id));
        }
      });
    },
    [major, instanceId, onReady]
  );

  if (!messages.length) return null;

  return createPortal(
    <div className={styles.shell} aria-live="polite" data-simulated-growl={major}>
      {messages.length > 1 ? (
        <button type="button" className={styles.clear} onClick={() => setMessages([])}>
          Close All
        </button>
      ) : null}
      <ul className={styles.messages}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message} role="alert" data-emphasis={message.emphasis}>
            <span className={styles.badge}>Growl {major} (simulated)</span>
            {message.title ? <strong>{message.title}</strong> : null}
            {message.children ? <div>{message.children}</div> : null}
            <button
              type="button"
              className={styles.close}
              aria-label="Close message"
              onClick={() => setMessages((prev) => prev.filter((m) => m.id !== message.id))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
}
