import { createContext, useContext, type ReactNode } from 'react';

/** A stand-in for react-intl: an app-level provider that message content reads from. */
const LocaleContext = createContext<string | null>(null);

export function LocaleProvider({ locale, children }: { locale: string; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/**
 * Like `<FormattedMessage />`: it reads the provider of whatever tree renders it. `from` is the
 * locale of the team that sent it, so the badge shows whether it rendered with the right one.
 */
export function Localized({ from, children }: { from: string; children: ReactNode }) {
  const locale = useContext(LocaleContext);
  const ok = locale === from;

  return (
    <span data-context={ok ? 'ok' : 'wrong'}>
      {children} {ok ? `✅ ${locale}` : `❌ expected ${from}, got ${locale ?? 'no provider'}`}
    </span>
  );
}
