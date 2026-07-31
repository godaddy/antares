import { Icon, type IconProps } from '@godaddy/antares';

/**
 * Example Icon component demonstrating basic usage with default star icon
 *
 * Renders a star icon with aria-label for accessibility and accepts additional
 * props to override defaults. Used in Storybook documentation and examples.
 *
 * @order 1
 * @param props - Partial IconProps (excluding ref) to override default icon properties
 * @returns JSX element rendering the Icon component with star icon
 *
 * @example
 * ```typescript
 * // Basic usage with defaults
 * <DefaultExample />
 *
 * // With custom dimensions and color
 * <DefaultExample width={24} height={24} color="blue" />
 * ```
 */
export function DefaultExample(props: Partial<Omit<IconProps, 'ref'>>) {
  return <Icon icon="star" aria-label="Star icon" {...props} />;
}
