import type { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components';

/** BCP-47 locale used for RTL tests and Storybook RTL examples. */
const RTL_TEST_LOCALE = 'ar-EG' as const;

/** Wraps children with React Aria `I18nProvider` so `useLocale()` resolves to RTL. */
export function RtlI18nProvider({ children }: { children: ReactNode }) {
  return <I18nProvider locale={RTL_TEST_LOCALE}>{children}</I18nProvider>;
}
