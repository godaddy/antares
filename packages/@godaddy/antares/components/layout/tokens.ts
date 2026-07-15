import type { CSSProperties } from 'react';

/** Valid spacing scale values. Uses t-shirt size naming convention. */
const SPACINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Spacing value. Supports predefined sizes or custom CSS values. */
export type Spacing = (typeof SPACINGS)[number] | (string & {});

/** Rounding values for border radius. */
const ROUNDINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

/** Rounding value. Supports predefined values or custom CSS values. */
export type Rounding = (typeof ROUNDINGS)[number] | (string & {});

/** Elevation levels for visual depth. */
const ELEVATIONS = ['base', 'card', 'raised', 'overlay'] as const;

/** Elevation value. Supports predefined levels or custom CSS values. */
export type Elevation = (typeof ELEVATIONS)[number];

const SPACING_TOKENS: ReadonlySet<string> = new Set(SPACINGS);
const ROUNDING_TOKENS: ReadonlySet<string> = new Set(ROUNDINGS);

/** A CSS Modules import: a map of local class names to their hashed values. */
type CssModule = Record<string, string | undefined>;

/**
 * CSS module class for a single known token (`padMd`, `gapSm`, `radFull`, …).
 * Arrays and custom CSS strings return undefined — use {@link toSpacingVar} / {@link toRoundingVar} instead.
 */
function tokenClass(styles: CssModule, prefix: string, value?: string | string[]): string | undefined {
  if (typeof value !== 'string' || (!SPACING_TOKENS.has(value) && !ROUNDING_TOKENS.has(value))) {
    return undefined;
  }
  const suffix = value === '2xl' ? '2xl' : `${value[0]!.toUpperCase()}${value.slice(1)}`;
  return styles[`${prefix}${suffix}`];
}

/**
 * Converts spacing scale value(s) to CSS variable reference(s); custom values pass through.
 * The `--sp-*` scale is defined on `.box`, so output is only valid on a Box-rendered element.
 * @example toSpacingVar('xs') => 'var(--sp-xs)'
 * @example toSpacingVar(['sm', 'md']) => 'var(--sp-sm) var(--sp-md)'
 *
 * @param size - Spacing scale value or array of values
 * @returns CSS variable reference(s) or undefined
 */
function toSpacingVar(size?: Spacing | Spacing[]): string | undefined {
  if (size === undefined) return undefined;
  if (Array.isArray(size)) return size.map(toSpacingVar).join(' ');
  return SPACING_TOKENS.has(size) ? `var(--sp-${size})` : size;
}

/**
 * Converts rounding scale value(s) to CSS variable reference(s); custom values pass through.
 * The `--rounding-*` scale is defined on `.box`, so output is only valid on a Box-rendered element.
 * @example toRoundingVar('xs') => 'var(--rounding-xs)'
 * @example toRoundingVar('10px') => '10px'
 *
 * @param rounding - Rounding scale value(s) or custom CSS value
 * @returns CSS variable reference(s) or custom value, or undefined
 */
export function toRoundingVar(rounding?: Rounding | Rounding[]): string | undefined {
  if (rounding === undefined) return undefined;
  if (Array.isArray(rounding)) return rounding.map(toRoundingVar).join(' ');
  return ROUNDING_TOKENS.has(rounding) ? `var(--rounding-${rounding})` : rounding;
}

/**
 * A single token-styled property: the utility-class prefix, the CSS property to
 * fall back to inline, the caller's value, and an optional value→CSS-var converter.
 */
type LayoutStyleSpec = readonly [
  prefix: string,
  cssProp: keyof CSSProperties,
  value?: Spacing | Spacing[],
  toVar?: (value: Spacing | Spacing[]) => string | undefined
];

/**
 * Resolves layout token props to a class (for single known tokens) or inline
 * style (for arrays / custom values), declaring each prop exactly once.
 *
 * @param styles - Token-classes CSS module ({@link CssModule})
 * @param specs - One {@link LayoutStyleSpec} per token-styled prop
 * @returns Utility class names plus the leftover inline `style`
 */
export function resolveTokenStyles(
  styles: CssModule,
  specs: readonly LayoutStyleSpec[]
): { classNames: string[]; style: CSSProperties } {
  const classNames: string[] = [];
  const style: Record<string, string> = {};

  for (const [prefix, cssProp, value, toVar = toSpacingVar] of specs) {
    const utilityClass = tokenClass(styles, prefix, value);

    if (utilityClass) {
      classNames.push(utilityClass);
    } else if (value != null) {
      const resolved = toVar(value);
      if (resolved != null) style[cssProp] = resolved;
    }
  }

  return { classNames, style };
}
