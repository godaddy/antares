import camelCase from 'camelcase';

const STYLE_ID_PREFIX = 'theme-token-switcher';

/**
 * Builds CSS-free metadata for one toggle. Generic over `name` so the
 * union of literal names survives in {@link ToggleName} and powers the
 * exhaustiveness check in `toggles.ts`.
 *
 * `globalKey` and `styleId` are derived from `name` so callers cannot
 * drift them out of sync. Toggle names must therefore be single
 * identifier-safe words (no spaces or punctuation) — the `styleId` is
 * a plain `name.toLowerCase()` and would otherwise yield an invalid
 * DOM id / CSS selector.
 */
function createMeta<N extends string>(config: { name: N; defaultEnabled?: boolean; description?: string }) {
  return {
    name: config.name,
    globalKey: camelCase(config.name),
    styleId: `${STYLE_ID_PREFIX}-${config.name.toLowerCase()}`,
    defaultEnabled: config.defaultEnabled ?? false,
    description: config.description ?? `Toggle ${config.name} tokens`
  };
}

/**
 * Source of truth for the addon's toggle catalog. CSS-free so it can be
 * imported from both Storybook bundles:
 *
 *   - **Preview** (`preview.tsx`, `toggles.ts`) — registers
 *     `globalTypes` and pairs each entry with its CSS payload.
 *   - **Manager** (`addon.tsx`) — renders the dropdown rows.
 *
 * Adding a new theme starts here. TypeScript will then refuse to
 * compile `toggles.ts` until the matching CSS payload is wired up.
 *
 * Order is meaningful: when multiple toggles are enabled, the entry
 * declared **later** wins for any colliding `:root` custom properties
 * (its `<style>` tag is appended after the previous one).
 */
export const TOGGLE_META = [
  createMeta({ name: 'Legacy', defaultEnabled: true }),
  createMeta({ name: 'Nextgen', defaultEnabled: false })
];

/**
 * Union of every registered toggle's `name`, recovered from
 * {@link TOGGLE_META}. Used by `toggles.ts` to enforce that every
 * toggle has a matching CSS payload.
 */
export type ToggleName = (typeof TOGGLE_META)[number]['name'];

/**
 * Shape of one CSS-free metadata entry. Declared as an `interface`
 * (rather than derived as `(typeof TOGGLE_META)[number]`) on purpose:
 *
 *   - `interface … extends TokenMeta` rejects union types (TS2312),
 *     and `TokenToggle` in `toggles.ts` needs to extend it.
 *   - Biome flags the `type alias & intersection` workaround.
 *
 * Pinning `name` to {@link ToggleName} preserves the literal union, so
 * the `Record<ToggleName, string>` exhaustiveness check in `toggles.ts`
 * still fires for missing entries.
 */
export interface TokenMeta {
  name: ToggleName;
  globalKey: string;
  styleId: string;
  defaultEnabled: boolean;
  description: string;
}
