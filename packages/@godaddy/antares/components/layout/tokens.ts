/** Valid spacing scale values. Uses t-shirt size naming convention. */
const SPACINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Spacing value. Supports predefined sizes or custom CSS values. */
export type Spacing = (typeof SPACINGS)[number] | (string & {});

/** Mapping of spacing values to CSS variables. */
const SPACING_MAP = {
  xs: 'var(--sp-xs, 2px)',
  sm: 'var(--sp-sm, 4px)',
  md: 'var(--sp-md, 8px)',
  lg: 'var(--sp-lg, 12px)',
  xl: 'var(--sp-xl, 16px)',
  '2xl': 'var(--sp-2xl, 32px)'
} as const satisfies Record<Spacing, string>;

/** Rounding values for border radius. */
const ROUNDINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

/** Rounding value. Supports predefined values or custom CSS values. */
export type Rounding = (typeof ROUNDINGS)[number] | (string & {});

/** Mapping of rounding values to CSS variables. */
const ROUNDING_MAP = {
  xs: 'var(--rounding-xs, 1px)',
  sm: 'var(--rounding-sm, 2px)',
  md: 'var(--rounding-md, 3px)',
  lg: 'var(--rounding-lg, 6px)',
  xl: 'var(--rounding-xl, 10px)',
  '2xl': 'var(--rounding-2xl, 20px)',
  full: '9999px'
} as const satisfies Record<Rounding, string>;

/** Elevation levels for visual depth. */
export const ELEVATIONS = ['base', 'card', 'raised', 'overlay'] as const;

/** Elevation value. Supports predefined levels or custom CSS values. */
export type Elevation = (typeof ELEVATIONS)[number];

/**
 * Converts a spacing scale value(s) to CSS variable reference(s).
 * @example toSpacingVar('xs') => 'var(--sp-xs)'
 * @example toSpacingVar(['sm', 'md']) => 'var(--sp-sm) var(--sp-md)'
 *
 * @param size - Spacing scale value or array of values
 * @returns CSS variable reference(s) or undefined
 */
export function toSpacingVar(size?: Spacing | Spacing[]): string | undefined {
  if (size === undefined) return undefined;

  if (typeof size === 'string') return SPACING_MAP[size as keyof typeof SPACING_MAP] ?? size;
  return size.map(toSpacingVar).join(' ');
}

/**
 * Converts a rounding scale value to CSS variable reference or passes through custom values.
 * @example toRoundingVar('xs') => 'var(--rounding-xs)'
 * @example toRoundingVar('10px') => '10px'
 *
 * @param rounding - Rounding scale value or custom CSS value
 * @returns CSS variable reference or custom value, or undefined
 */
export function toRoundingVar(rounding?: Rounding): string | undefined {
  if (rounding === undefined) return undefined;
  return ROUNDING_MAP[rounding as keyof typeof ROUNDING_MAP] ?? rounding;
}
