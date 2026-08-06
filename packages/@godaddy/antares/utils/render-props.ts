import type { CSSProperties } from 'react';
import { cx, type CxOptions } from 'cva';
import { composeRenderProps } from 'react-aria-components';
import { mergeObjects } from './objects.ts';

/** A className prop that may be a static string or a RAC render-prop function. */
type ClassNameProp<T> = string | ((renderProps: T & { defaultClassName: string | undefined }) => string) | undefined;

/** A style prop that may be a static object or a RAC render-prop function. */
type StyleProp<T> =
  | CSSProperties
  | ((renderProps: T & { defaultStyle: CSSProperties }) => CSSProperties | undefined)
  | undefined;

type ClassNameRenderProps<T> = T & { defaultClassName: string | undefined };
type StyleRenderProps<T> = T & { defaultStyle: CSSProperties };

/**
 * Merges component base class names with a caller-supplied className.
 *
 * @param className - The caller className, which may be a render-prop function.
 * @param base - Component base classes.
 * @returns The merged className.
 */
export function composeClassName<T>(
  className: ClassNameProp<T>,
  ...base: CxOptions
): string | ((renderProps: ClassNameRenderProps<T>) => string) {
  if (typeof className === 'function') {
    return composeRenderProps<string | undefined, ClassNameRenderProps<T>, string>(className, (value) =>
      cx(...base, value)
    );
  }

  return cx(...base, className);
}

/**
 * Merges component computed styles with a caller-supplied style.
 *
 * @param style - The caller style, which may be a render-prop function.
 * @param computed - The component's computed style.
 * @returns The merged style.
 */
export function composeStyle<T>(
  style: StyleProp<T>,
  computed: CSSProperties
): CSSProperties | ((renderProps: StyleRenderProps<T>) => CSSProperties | undefined) {
  if (typeof style === 'function') {
    return composeRenderProps<CSSProperties | undefined, StyleRenderProps<T>, CSSProperties | undefined>(
      style,
      (value) => mergeObjects(computed, value) as CSSProperties
    );
  }

  return mergeObjects(computed, style) as CSSProperties;
}
