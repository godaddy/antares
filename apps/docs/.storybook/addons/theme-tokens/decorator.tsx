import type { Decorator } from '@storybook/react-vite';
import { DecoratorHelpers } from '@storybook/addon-themes';
import { useLayoutEffect } from 'react';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;

interface ThemeTokensConfig<T extends Record<string, readonly CSSStyleSheet[]>> {
  themes: T;
  defaultTheme: Extract<keyof T, string>;
}

/**
 * Custom decorator for `@storybook/addon-themes`. Applies the
 * selected `themes` entry's sheets via `document.adoptedStyleSheets`,
 * partitioning out sheets adopted by anything else so we coexist on
 * the same document.
 *
 * Resolution order: `parameters.themes.themeOverride` →
 * `globals.theme` → `defaultTheme`.
 *
 * @param config - Theme configuration mapping recipe names to ordered stylesheet arrays.
 * @returns A Storybook decorator that applies the active recipe's sheets to `document.adoptedStyleSheets`.
 */
export function withThemeTokens<T extends Record<string, readonly CSSStyleSheet[]>>(
  config: ThemeTokensConfig<T>
): Decorator {
  const themeNames = Object.keys(config.themes);
  const owned = new Set<CSSStyleSheet>();

  for (const sheets of Object.values(config.themes)) {
    for (const sheet of sheets) owned.add(sheet);
  }

  initializeThemeState(themeNames, config.defaultTheme);

  return function themeTokensDecorator(Story, context) {
    const themesParams = context.parameters.themes as { themeOverride?: string } | undefined;
    const candidate = themesParams?.themeOverride ?? pluckThemeFromContext(context) ?? config.defaultTheme;
    const themeName = themeNames.includes(candidate) ? candidate : config.defaultTheme;

    useLayoutEffect(function applyThemeSheets() {
      const previousSheets = document.adoptedStyleSheets;
      const others = previousSheets.filter((sheet) => !owned.has(sheet));
      document.adoptedStyleSheets = [...others, ...config.themes[themeName]];

      return function restoreThemeSheets() {
        document.adoptedStyleSheets = previousSheets;
      };
    }, [themeName]);

    return <Story />;
  };
}
