/** Shared viewport thresholds. Base styles apply below the first threshold. */
export const viewportBreakpoints = {
  sm: '40rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem'
} as const;

/** A named viewport threshold, independent of a component's size. */
export type ViewportBreakpoint = keyof typeof viewportBreakpoints;

/** Inclusive, mobile-first queries for CSS-equivalent behavior in JavaScript. */
export const viewportQueries = {
  sm: `(min-width: ${viewportBreakpoints.sm})`,
  md: `(min-width: ${viewportBreakpoints.md})`,
  lg: `(min-width: ${viewportBreakpoints.lg})`,
  xl: `(min-width: ${viewportBreakpoints.xl})`
} as const satisfies Record<ViewportBreakpoint, string>;
