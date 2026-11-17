import { beforeAll } from 'vitest';
import { page } from 'vitest/browser';
import '../apps/docs/.storybook/legacy-tokens.css';

beforeAll(async function synchronizeBrowserFrame() {
  // A locator resolves the new iframe before Vitest's focus commands can select the previous one by name.
  await page.getByRole('document').hover({ position: { x: -1, y: -1 }, force: true });
});
