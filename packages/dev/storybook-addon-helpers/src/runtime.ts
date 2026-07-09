/**
 * Browser-safe runtime entry for docs sites that import `*.stories.tsx`.
 *
 * Exports only the authoring getters (no-op at runtime). Storybook uses the
 * main `.` entry, which bundles the CSF transformer and type engine.
 */
export * from './storybook/getters.ts';
export type * from './types.ts';
