/**
 * Checks whether a type declaration file contains standard DOM/HTML/SVG/CSS
 * attribute definitions that should be excluded from props documentation.
 *
 * Keep exclusion paths in sync with `apps/site/lib/filtered-generator.ts`.
 *
 * Excludes:
 * - `@types/react` -- HTMLAttributes, SVGAttributes, DOMAttributes, AriaAttributes
 * - `csstype` -- CSS property types
 * - `@react-types/shared/src/dom` -- RAC re-declarations of id, role, tabIndex,
 *   style, className, dir, lang, hidden, inert, translate
 *
 * Everything else passes through: antares own props, Bento props, RAC interaction
 * and state props (isDisabled, onPress, etc.) from @react-types/shared/src/events
 * and @react-types/shared/src/collections.
 *
 * @param fileName - Absolute path to the type declaration file
 * @returns true if props from this file should be excluded from documentation
 */
export function isExcludedParent(fileName: string): boolean {
  return (
    fileName.includes('@types/react') ||
    fileName.includes('csstype') ||
    fileName.includes('@react-types/shared/src/dom')
  );
}
