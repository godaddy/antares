/** Valid spacing scale values. Uses t-shirt size naming convention. */
const SPACINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

/** Spacing value. Supports predefined sizes or custom CSS values. */
export type Spacing = (typeof SPACINGS)[number] | (string & {});

/** Mapping of spacing values to CSS variables. */
const SPACING_MAP = {
  xs: 'var(--_box-space-xs)',
  sm: 'var(--_box-space-sm)',
  md: 'var(--_box-space-md)',
  lg: 'var(--_box-space-lg)',
  xl: 'var(--_box-space-xl)',
  '2xl': 'var(--_box-space-2xl)'
} as const satisfies Record<Spacing, string>;

/** Rounding values for border radius. */
const ROUNDINGS = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] as const;

/** Rounding value. Supports predefined values or custom CSS values. */
export type Rounding = (typeof ROUNDINGS)[number] | (string & {});

/** Mapping of rounding values to CSS variables. */
const ROUNDING_MAP = {
  xs: 'var(--_box-rounding-xs)',
  sm: 'var(--_box-rounding-sm)',
  md: 'var(--_box-rounding-md)',
  lg: 'var(--_box-rounding-lg)',
  xl: 'var(--_box-rounding-xl)',
  '2xl': 'var(--_box-rounding-2xl)',
  full: 'var(--_box-rounding-full)'
} as const satisfies Record<Rounding, string>;

/** Elevation levels for visual depth. */
export type Elevation = 'base' | 'card' | 'raised' | 'overlay';

/**
 * Converts a spacing scale value(s) to CSS variable reference(s).
 * @example toSpacingVar('xs') => 'var(--_box-space-xs)'
 * @example toSpacingVar(['sm', 'md']) => 'var(--_box-space-sm) var(--_box-space-md)'
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
 * @example toRoundingVar('xs') => 'var(--_box-rounding-xs)'
 * @example toRoundingVar('10px') => '10px'
 *
 * @param rounding - Rounding scale value or custom CSS value
 * @returns CSS variable reference or custom value, or undefined
 */
export function toRoundingVar(rounding?: Rounding): string | undefined {
  if (rounding === undefined) return undefined;
  return ROUNDING_MAP[rounding as keyof typeof ROUNDING_MAP] ?? rounding;
}
