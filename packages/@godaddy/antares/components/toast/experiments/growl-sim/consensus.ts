/**
 * A copy of the leader election that `@ux/growl` 2400 and 2500 ship (`src/consensus.js`, identical
 * in both). Same event name, same version stamps, same rules, so a simulated Growl takes part in
 * the same election as a real one would.
 */
const NAMESPACE = '__The_Unknown_Algorythm_Hash__';

const VERSION_KEY = `${NAMESPACE}:version`;
const ACTION_KEY = `${NAMESPACE}:action`;

type Action = 'promote' | 'candidate' | 'message';

export type Payload = Record<string, unknown>;

/** `<major>.<instance id>`. The major decides between versions; the instance id breaks ties. */
function stamp(major: string, id: string) {
  return `${major}.${id}`;
}

/** Token by token, like the original, including its quirk that equal stamps count as "highest". */
function highestVersion(ours: string, theirs: string): boolean {
  const ourTokens = ours.split('.');
  const theirTokens = theirs.split('.');

  for (let i = 0; i < ourTokens.length; i++) {
    const ourValue = +ourTokens[i];
    const theirValue = +theirTokens[i];

    if (ourValue > theirValue) return true;
    if (ourValue < theirValue) return false;
  }

  return true;
}

let counter = 0;

/** The original uses `performance.now()` plus a counter, so a later mount wins within a major. */
export function createInstanceId() {
  return `${performance.now()}.${counter++}`;
}

export function dispatch(action: Action, major: string, id: string, payload: Payload = {}) {
  globalThis.dispatchEvent(
    new CustomEvent(NAMESPACE, {
      detail: { ...payload, [VERSION_KEY]: stamp(major, id), [ACTION_KEY]: action }
    })
  );
}

/**
 * Joins the election and calls `onmessage` only while this instance is the leader.
 *
 * @returns Leave the election, which makes the others re-elect.
 */
export function listen(major: string, id: string, onmessage: (payload: Payload) => void): () => void {
  let leader: boolean | null = null;

  function consensus(event: Event) {
    const { [VERSION_KEY]: theirs, [ACTION_KEY]: action, ...payload } = (event as CustomEvent<Payload>).detail;
    const ours = stamp(major, id);

    switch (action) {
      case 'message':
        if (leader) onmessage(payload);
        break;

      case 'candidate':
        // A lower candidate gets our stamp back, so it learns it lost.
        if (!highestVersion(theirs as string, ours)) dispatch('candidate', major, id);
        if (leader !== false) leader = highestVersion(ours, theirs as string);
        break;

      case 'promote':
        leader = null;
        dispatch('candidate', major, id);
        break;

      default:
        break;
    }
  }

  globalThis.addEventListener(NAMESPACE, consensus);
  dispatch('promote', major, id);

  return function unlisten() {
    globalThis.removeEventListener(NAMESPACE, consensus);
    dispatch('promote', major, id);
  };
}
