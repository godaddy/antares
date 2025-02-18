import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Adds the custom addon entry to the Storybook manager entries.
 *
 * @param {Array} entry - The existing array of manager entries.
 * @returns {Array} The updated array of manager entries including the custom addon.
 */
export function managerEntries(entry = []) {
  return [...entry, join(__dirname, './addon.tsx')];
}
