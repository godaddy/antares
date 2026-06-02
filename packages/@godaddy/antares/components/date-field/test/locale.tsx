import type { ReactElement } from 'react';
import { I18nProvider } from '@godaddy/antares';

/**
 * Locale used to lock segment ordering, placeholder text, and numeral system
 * for tests. Without this, RAC resolves the host runner's default locale, which
 * varies across CI machines and produces flaky assertions/snapshots/screenshots.
 */
export const TEST_LOCALE = 'en-US';

/** Wraps a node in `<I18nProvider locale={TEST_LOCALE}>` for deterministic tests. */
export function withTestLocale(node: ReactElement): ReactElement {
  return <I18nProvider locale={TEST_LOCALE}>{node}</I18nProvider>;
}
