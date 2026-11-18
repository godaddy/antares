/**
 * The page-wide element every copy of Antares renders its toasts into.
 *
 * A page can load several copies of Antares, such as a shared header and the app it wraps. Each
 * copy portals its own `ToastRegion` into this one element, so their toasts stack instead of
 * overlapping, while every copy renders with its own components and React context.
 *
 * The attribute and inline style below are the whole contract between copies, so they are frozen:
 * a breaking change ships a new `TOAST_HOST_CONTRACT`, and copies on different contracts get
 * separate hosts. Inline styles keep the host working however each copy's CSS is loaded.
 */
const TOAST_HOST_ATTRIBUTE = 'data-antares-toast-host';
const TOAST_HOST_CONTRACT = '1';

const HOST_STYLE = [
  'position: fixed',
  'inset-block-start: 0',
  'inset-inline-end: 0',
  'display: flex',
  'flex-direction: column',
  'align-items: flex-end',
  'gap: var(--size-space-040, calc(var(--ux-1sbfig8, 0.25rem) * 2))',
  'padding: var(--size-space-070, calc(var(--ux-1sbfig8, 0.25rem) * 4))',
  'max-block-size: 100dvh',
  'box-sizing: border-box',
  'pointer-events: none'
].join(';');

/**
 * Finds the toast host for this contract, creating it on first use.
 *
 * @returns The host element.
 */
export function getToastHost(): HTMLElement {
  const existing = document.querySelector<HTMLElement>(`[${TOAST_HOST_ATTRIBUTE}="${TOAST_HOST_CONTRACT}"]`);
  if (existing) return existing;

  const host = document.createElement('div');
  host.setAttribute(TOAST_HOST_ATTRIBUTE, TOAST_HOST_CONTRACT);
  host.setAttribute('style', HOST_STYLE);
  document.body.append(host);

  return host;
}
