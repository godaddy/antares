/**
 * Typed extension schemas for `$extensions` in DTCG token files.
 *
 * Each extension key (`com.godaddy.*`) identifies a CSS function type.
 * Platforms dispatch on the key: if they can handle the expression they
 * use the structured data; otherwise they fall back to `$value`.
 *
 * `$type` always describes `$value` — the extension elevates it for
 * capable platforms.
 *
 * String fields may contain DTCG aliases using `{token-name}` syntax.
 */

/**
 * `com.godaddy.clamp` — fluid responsive values.
 *
 * Attaches to tokens with `$type: "dimension"`.
 * `$value` is the authored static fallback (e.g., the max or a midpoint).
 *
 * CSS outputs `clamp(min, preferred, max)`.
 * Native platforms can extract `min` or `max` as a static dimension.
 */
export interface ClampExtension {
  /** Minimum value — alias or static dimension (e.g., `"{font-size-040}"` or `"1rem"`). */
  min: string;
  /** Static base of the preferred value — alias or static dimension (e.g., `"1rem"`). */
  base: string;
  /** Viewport-relative scale component of the preferred value (e.g., `"1.5vw"`). */
  scale: string;
  /** Maximum value — alias or static dimension (e.g., `"{font-size-070}"` or `"2rem"`). */
  max: string;
}

/**
 * `com.godaddy.gradient` — gradient definitions.
 *
 * Attaches to tokens with `$type: "color"`.
 * `$value` is a flat color fallback for platforms that cannot render gradients.
 *
 * CSS outputs the full gradient function (e.g., `linear-gradient(135deg, ...)`).
 * Native platforms can map stops and direction to platform-specific gradient configs.
 */
export interface GradientStop {
  /** Color value — alias or static color (e.g., `"{color-brand-primary}"` or `"#ff6b6b"`). */
  color: string;
  /** Position as a number between 0 and 1. */
  position: number;
}

export interface LinearGradientExtension {
  function: 'linear-gradient';
  /** Direction angle (e.g., `"135deg"`, `"to right"`). */
  angle: string;
  stops: GradientStop[];
}

export interface RadialGradientExtension {
  function: 'radial-gradient';
  /** Shape of the gradient (e.g., `"circle"`, `"ellipse"`). */
  shape?: string;
  /** Center position (e.g., `"center"`, `"50% 50%"`). */
  position?: string;
  stops: GradientStop[];
}

export interface ConicGradientExtension {
  function: 'conic-gradient';
  /** Starting angle (e.g., `"90deg"`). */
  from?: string;
  /** Center position (e.g., `"center"`, `"50% 50%"`). */
  position?: string;
  stops: GradientStop[];
}

export type GradientExtension = LinearGradientExtension | RadialGradientExtension | ConicGradientExtension;

/**
 * `com.godaddy.scale` — mathematical scale membership.
 *
 * Attaches to tokens with `$type: "dimension"`.
 * `$value` is author-provided best-effort; the build computes
 * `base × ratio^step` and overwrites the output value.
 *
 * CSS may output `calc(base * pow(ratio, step))` or the static result.
 * Non-CSS platforms receive the computed static value.
 */
export interface ScaleExtension {
  /** Base value of the scale — alias or static dimension (e.g., `"{font-size-050}"` or `"1rem"`). */
  base: string;
  /** Scale ratio (e.g., `1.25` for a major third scale). */
  ratio: number;
  /** Step in the progression (0 = base, positive = larger, negative = smaller). */
  step: number;
}

/**
 * `com.godaddy.color-mix` — programmatic color blending.
 *
 * Attaches to tokens with `$type: "color"`.
 * `$value` is author-provided best-effort; the build computes
 * the blended color and overwrites the output value.
 *
 * CSS outputs `color-mix(in <colorSpace>, <color1> <pct>, <color2> <pct>)`.
 * Non-CSS platforms receive the computed static color.
 */
export interface ColorMixColor {
  /** Color value — alias or static color (e.g., `"{color-brand-primary}"` or `"white"`). */
  value: string;
  /** Percentage of this color in the mix (0–100). */
  percentage: number;
}

export interface ColorMixExtension {
  /** CSS color space for interpolation (e.g., `"oklch"`, `"srgb"`, `"display-p3"`). */
  colorSpace: string;
  color1: ColorMixColor;
  color2: ColorMixColor;
}

/**
 * Combined map of all `com.godaddy.*` extensions that carry CSS expressions.
 * Use with `token.$extensions` to type-check extension access.
 */
export interface GodaddyExtensions {
  'com.godaddy.clamp'?: ClampExtension;
  'com.godaddy.gradient'?: GradientExtension;
  'com.godaddy.scale'?: ScaleExtension;
  'com.godaddy.color-mix'?: ColorMixExtension;
}
