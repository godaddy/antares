import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Preview-side entry. Registers the per-toggle `globalTypes` and the
 * decorator that injects or removes each toggle's `<style>` tag in the
 * preview iframe. See `preview.tsx`.
 */
export function previewAnnotations(entry: string[] = []): string[] {
  return [...entry, join(__dirname, './preview.tsx')];
}

/**
 * Manager-side entry. Registers the custom toolbar tool that renders
 * the multi-select dropdown and writes each toggle back to `globals`.
 * See `addon.tsx`.
 */
export function managerEntries(entry: string[] = []): string[] {
  return [...entry, join(__dirname, './addon.tsx')];
}
