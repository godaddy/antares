import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, ReactNode } from 'react';

/**
 * Creates polymorphic props by combining own props with element-specific props.
 * Own props take priority over element props when there are conflicts.
 *
 * Currently, it's not possible to infer types for generic
 * components with Polymorphism in Typescript.
 * Therefore, it's recommended not to use this approach with generic custom components.
 *
 * References:
 * https://mui.com/material-ui/guides/composition/#with-typescript
 * https://chakra-ui.com/docs/components/concepts/composition
 * https://mantine.dev/guides/polymorphic/#polymorphic-components-with-generic-components
 *
 * @typeParam C - The element type (e.g., 'div', 'button', or a custom component)
 * @typeParam OwnProps - The component's own props that take priority
 */
export type PolymorphicProps<C extends ElementType, OwnProps> = OwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof OwnProps> & {
    as?: C;
  };

/**
 * Extracts the ref type for a given element type.
 *
 * @typeParam C - The element type
 */
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref'];

/**
 * Type for a polymorphic component that can render as different elements.
 * Use this as the type for the component after casting from forwardRef.
 *
 * @typeParam OwnProps - The component's own props
 *
 * @example
 * ```tsx
 * export const MyComponent: PolymorphicComponent<MyOwnProps> = forwardRef(
 *   function MyComponent(props: PolymorphicProps<ElementType, MyOwnProps>, ref: React.Ref<Element>) {
 *     // implementation
 *   }
 * ) as PolymorphicComponent<MyOwnProps>;
 * ```
 */
export type PolymorphicComponent<OwnProps> = <C extends ElementType = 'div'>(
  props: PolymorphicProps<C, OwnProps> & { ref?: PolymorphicRef<C> }
) => ReactNode;
