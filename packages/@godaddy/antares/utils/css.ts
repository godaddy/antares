/**
 * Converts a size value to a CSS length string. Numbers are treated as pixels;
 * strings pass through unchanged (e.g. `'50%'`, `'min-content'`, `'20rem'`).
 *
 * @param value - A number of pixels or a raw CSS length string
 * @returns The CSS length string
 */
export function toCssSize(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}
