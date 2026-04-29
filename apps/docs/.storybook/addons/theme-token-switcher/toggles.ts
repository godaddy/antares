/// <reference types="vite/client" />
import legacyCss from '../../legacy-tokens.css?inline';
import nextgenCss from '../../../../../packages/@godaddy/antares/variables.css?inline';

import { TOGGLE_META, type TokenMeta, type ToggleName } from './toggles-meta.ts';

/**
 * Per-toggle CSS payload. Preview-only — the manager builder cannot
 * resolve `?inline` imports.
 *
 * The `Record<ToggleName, string>` annotation is the addon's
 * load-bearing constraint: the build fails if a toggle in
 * `toggles-meta.ts` is missing a payload here, or if a payload here is
 * not declared in `toggles-meta.ts`. There is no runtime check; the
 * compiler is the source-of-truth enforcer.
 */
const CSS: Record<ToggleName, string> = {
  Legacy: legacyCss,
  Nextgen: nextgenCss
};

/** Fully-resolved toggle: {@link TokenMeta} plus its CSS payload. */
export interface TokenToggle extends TokenMeta {
  css: string;
}

/**
 * Toggles consumed by the preview decorator in `preview.tsx` to drive
 * the `<style>`-tag lifecycle. Order mirrors {@link TOGGLE_META}.
 */
export const TOGGLES: TokenToggle[] = TOGGLE_META.map(function attachCss(meta) {
  return { ...meta, css: CSS[meta.name] };
});
