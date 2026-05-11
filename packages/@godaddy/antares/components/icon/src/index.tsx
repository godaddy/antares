import { Icon as BentoIcon, ondemand, set, type IconProps as BentoIconProps } from '@bento/icon';
import { useDataAttributes } from '@bento/use-data-attributes';
import { parser } from '@bento/svg-parser';
import { forwardRef } from 'react';
import { cx } from 'cva';

//
// Our build process introduces the CDN URL as a build-time constant.
// @see tsdown.config.ts
//
const cdn = '__CDN_URL__';

/**
 * Asynchronously load an icon from the CDN and parse it for rendering
 *
 * Fetches SVG content from the configured CDN URL and processes it through
 * the Bento SVG parser for use in the icon system. This function is called
 * automatically when an icon is requested via the ondemand mechanism.
 *
 * @param icon - The name of the icon to load from the CDN
 * @returns Promise resolving to parsed SVG content object
 *
 * @example
 * ```typescript
 * // Automatically called when icon is requested
 * <Icon icon="star" />
 * ```
 *
 * @throws {Error} If the icon cannot be fetched from the CDN
 * @throws {Error} If the SVG content cannot be parsed
 */
ondemand(async function loader(icon: string) {
  const response = await fetch(`${cdn}/${icon}.svg`);
  /* v8 ignore start */
  const contents = await response.text();
  return parser(contents);
  /* v8 ignore end */
});

/**
 * Props interface for the Antares Icon component
 *
 * Extends BentoIconProps with additional color option specific to the Antares
 * design system. Use the inherited width and height props for sizing.
 */
export interface IconProps extends BentoIconProps {
  /**
   * Optional color of the icon
   *
   * If not specified, defaults to 'currentColor', allowing the icon to
   * inherit the color from its parent element. Accepts any valid CSS color.
   *
   * @example 'red', '#ff0000', 'rgb(255, 0, 0)', 'currentColor'
   */
  color?: string;
}

/**
 * Antares Icon component with color support
 *
 * Renders icons from the configured CDN with enhanced prop interface for
 * convenient styling. Use width and height props for sizing. Icons are loaded
 * on-demand from the CDN and cached automatically. Supports ref forwarding.
 *
 * @param props - Icon component props including icon name and color
 * @param props.color - Optional fill color; defaults to currentColor
 * @param props.className - Additional class names to apply to the SVG
 * @param ref - Ref forwarded to the underlying SVG element
 * @returns JSX element rendering the requested icon when loaded, otherwise, the children prop or a placeholder element
 *
 * @example
 * ```typescript
 * // Basic icon with default styling
 * <Icon icon="star" />
 *
 * // Icon with custom color
 * <Icon icon="star" color="blue" />
 *
 * // Icon with dimensions
 * <Icon icon="star" width={24} height={24} />
 *
 * // Icon with ref
 * const iconRef = useRef<SVGSVGElement>(null);
 * <Icon icon="star" ref={iconRef} />
 * ```
 *
 * @throws {Error} If the icon name is invalid or cannot be loaded
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(function AntaresIcon(
  { color, className, children = <svg data-placeholder="true" />, ...rest },
  ref
) {
  const dataAttributes = useDataAttributes({ color });

  return (
    <BentoIcon
      ref={ref}
      fill={color ?? 'currentColor'}
      // Bento's className accepts a merge function to compose with its internal class,
      // but its TypeScript typings declare string — cast required.
      className={(({ original }: { original: string }) => cx(original, className)) as unknown as string}
      {...rest}
      {...dataAttributes}
    >
      {children}
    </BentoIcon>
  );
});

/**
 * Synchronously add icons to the icon store
 *
 * Allows teams to introduce custom icons that are immediately available
 * for use with the Icon component. Icons can be provided as React SVG
 * elements or parsed SVG strings.
 *
 * @param icons - Object mapping icon names to React SVG elements
 *
 * @example
 * ```typescript
 * import { set, parser } from '@godaddy/antares';
 *
 * // Add icons from React elements
 * set({
 *   'custom-logo': (
 *     <svg viewBox="0 0 24 24">
 *       <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77..." />
 *     </svg>
 *   )
 * });
 *
 * // Add icons from SVG strings
 * const svgString = '<svg viewBox="0 0 24 24"><path d="..."/></svg>';
 * set({ 'parsed-icon': parser(svgString) });
 * ```
 */
export { set };

/**
 * Register an asynchronous icon loader function
 *
 * Allows teams to add custom icon loading logic that will be called
 * when icons are requested. Multiple loaders can be registered and
 * will be called in order until one returns content.
 *
 * @param loader - Async function that receives icon name and returns React SVG element or undefined
 * @returns Function to unregister this loader
 *
 * @example
 * ```typescript
 * import { ondemand, parser } from '@godaddy/antares';
 *
 * // Add custom loader for team icons
 * const unregister = ondemand(async function loadTeamIcons(iconName) {
 *   if (iconName.startsWith('team-')) {
 *     const response = await fetch(`/api/team-icons/${iconName}.svg`);
 *     const svgContent = await response.text();
 *     return parser(svgContent);
 *   }
 *   // Return undefined to let other loaders handle this icon
 * });
 *
 * // Later, if needed
 * unregister();
 * ```
 */
export { ondemand };

/**
 * Parse SVG string content into React SVG elements
 *
 * Utility function for converting SVG strings into React elements
 * that can be used with the set method or ondemand loaders.
 *
 * @param svgContent - SVG string content to parse
 * @returns React SVG element
 *
 * @example
 * ```typescript
 * import { parser, set } from '@godaddy/antares';
 *
 * const svgString = '<svg viewBox="0 0 24 24"><path d="..."/></svg>';
 * const reactElement = parser(svgString);
 *
 * set({ 'my-icon': reactElement });
 * ```
 */
export { parser };
