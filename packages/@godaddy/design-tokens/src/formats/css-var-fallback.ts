import type { TransformedToken } from 'style-dictionary/types';

/** Options for {@link cssVarWithFallback}. */
type CssVarWithFallbackOptions = {
  /**
   * DTCG `original.$type` from the token. When `fontFamily` and the fallback string contains a
   * comma, the whole fallback is double-quoted so `var(--name, "A, B")` parses as a single second
   * argument (a font list). Other comma uses (`rgba()`, multi-layer `box-shadow`) are not
   * `fontFamily` and stay unquoted.
   */
  dtcgType?: string;
};

/** Read DTCG `$type` from a Style Dictionary token for var() fallback rules. */
export function tokenDtcgType(token: TransformedToken): string | undefined {
  const orig = token.original as { $type?: string } | undefined;
  return orig?.$type;
}

/**
 * Raw value to pass into {@link tokenValueToCssFallback} when building `var(--name, fallback)`.
 *
 * For most tokens, `token.$value` is already a CSS-ready string after the `css` transform group
 * (e.g. hex colors, `rem` sizes). **Shadow** is the exception: DTCG represents `offsetX`, `offsetY`,
 * `blur`, and `spread` as dimension objects `{ value, unit }`, but Style Dictionary’s built-in
 * `shadow/css/shorthand` builds its string with template interpolation (`${offsetX} …`), so those
 * objects become the literal text `[object Object]`. That broken string would be emitted as our
 * fallback. We therefore read the **untransformed** shadow from `token.original.$value` and run
 * our own serialization in {@link dtcgShadowValueToCss}.
 */
export function tokenResolvedValueForVarFallback(token: TransformedToken): unknown {
  const orig = token.original as { $type?: string; $value?: unknown } | undefined;
  if (orig?.$type === 'shadow' && orig.$value != null) {
    return orig.$value;
  }
  return token.$value;
}

/** DTCG dimension token shape `{ value, unit }` (used for shadow offsets and raw dimension fallbacks). */
function isDimensionObject(value: unknown): value is { value: number; unit: string } {
  if (typeof value !== 'object' || value === null) return false;
  const o = value as Record<string, unknown>;
  return typeof o.value === 'number' && typeof o.unit === 'string';
}

/**
 * Turn DTCG-shaped shadow data into a valid CSS `box-shadow` shorthand (one layer, or a
 * comma-separated list for multiple layers).
 *
 * **Why this exists:** Our SCSS, CSS-in-JS, and classname outputs use `var(--token, <fallback>)`.
 * The fallback must be valid CSS. Style Dictionary’s `shadow/css/shorthand` transform does not
 * correctly expand DTCG dimension objects to `px`/`rem` segments (see
 * {@link tokenResolvedValueForVarFallback}), so we cannot rely on `token.$value` for shadows.
 * This function implements the conversion the spec implies: structured layers → `box-shadow`
 * syntax, including string colors, `{ hex }` color objects, and `{ value, unit }` dimensions.
 *
 * **When it runs:** Callers pass `original.$value` for shadow tokens (after the guard in
 * `tokenResolvedValueForVarFallback`). `tokenValueToCssFallback` also invokes this for any value
 * that matches a shadow layer shape, so ad-hoc structures are still serialized consistently.
 *
 * @returns A `box-shadow`-compatible string, or `null` if `value` is not a shadow layer or array of layers.
 */
function dtcgShadowValueToCss(value: unknown): string | null {
  const dimensionOrStringToCss = (v: unknown): string => {
    if (typeof v === 'string') return v;
    if (isDimensionObject(v)) return `${v.value}${v.unit}`;
    return String(v);
  };

  const colorToCss = (c: unknown): string => {
    if (typeof c === 'string') return c;
    if (typeof c === 'object' && c !== null && 'hex' in c && typeof (c as { hex: unknown }).hex === 'string') {
      return (c as { hex: string }).hex;
    }
    return String(c);
  };

  const isShadowLayer = (v: unknown): v is Record<string, unknown> => {
    if (typeof v !== 'object' || v === null) return false;
    const o = v as Record<string, unknown>;
    return 'color' in o && 'offsetX' in o && 'offsetY' in o && 'blur' in o && 'spread' in o;
  };

  const layerToCss = (layer: Record<string, unknown>): string => {
    const inset = layer.inset === true ? 'inset ' : '';
    const x = dimensionOrStringToCss(layer.offsetX);
    const y = dimensionOrStringToCss(layer.offsetY);
    const blur = dimensionOrStringToCss(layer.blur);
    const spread = dimensionOrStringToCss(layer.spread);
    const color = colorToCss(layer.color);
    return `${inset}${x} ${y} ${blur} ${spread} ${color}`.trim();
  };

  if (Array.isArray(value)) {
    const parts = value.filter(isShadowLayer).map(layerToCss);
    return parts.length > 0 ? parts.join(', ') : null;
  }
  if (isShadowLayer(value)) return layerToCss(value);
  return null;
}

/**
 * Format a CSS var() with optional fallback.
 *
 * **Quoting:** We double-quote the fallback when:
 * - It contains `"` or `\` (escaped inside the string), or leading/trailing whitespace; or
 * - `options.dtcgType === 'fontFamily'` and the fallback contains `,` (comma-separated font list
 *   must be one `var()` argument, e.g. `var(--x, "Arial, sans-serif")`).
 *
 * We do **not** quote comma-containing fallbacks for other types: e.g. `color` (`rgba(...)`),
 * `shadow` (multi-layer `box-shadow`), or untyped string values that are already valid CSS.
 *
 * @param name - Custom property name (without --)
 * @param value - Resolved token value to use as fallback
 * @param options - Pass `{ dtcgType: tokenDtcgType(token) }` from formatters so `fontFamily` lists quote correctly.
 */
export function cssVarWithFallback(name: string, value?: unknown, options?: CssVarWithFallbackOptions): string {
  const str = tokenValueToCssFallback(value);
  if (str == null || str === '') return `var(--${name})`;
  const dtcgType = options?.dtcgType;
  const needsQuotes = /["\\]/.test(str) || /^\s|\s$/.test(str) || (dtcgType === 'fontFamily' && str.includes(','));
  const fallback = needsQuotes ? `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : str;
  return `var(--${name}, ${fallback})`;
}

/**
 * Convert a Style Dictionary / DTCG token value to a CSS fallback string when possible.
 *
 * Unknown objects (e.g. future composite types like `typography` or `border` passed through as
 * plain objects) return `undefined` so {@link cssVarWithFallback} emits `var(--name)` without a
 * fallback instead of the invalid `[object Object]` string.
 */
function tokenValueToCssFallback(value: unknown): string | undefined {
  if (value == null || value === '') return undefined;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;

  const shadow = dtcgShadowValueToCss(value);
  if (shadow != null) return shadow;

  if (isDimensionObject(value)) return `${value.value}${value.unit}`;

  if (typeof value === 'object') return undefined;
  return String(value);
}
