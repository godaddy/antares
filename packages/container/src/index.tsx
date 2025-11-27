import { withSlots, type Slots } from '@bento/slots';
import React, { type ReactNode } from 'react';
import { useProps } from '@bento/use-props';

/**
 * Extracts the proper ref type for a polymorphic component.
 *
 * @public
 */
export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

/**
 * Props for a polymorphic component without ref.
 *
 * @public
 */
export type PolymorphicProps<T extends React.ElementType, Props = {}> = Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props> & {
    as?: T;
  };

/**
 * Props for a polymorphic component with ref support.
 *
 * @public
 */
export type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = PolymorphicProps<T, Props> & {
  ref?: PolymorphicRef<T>;
};

/**
 * Base props for the Container component.
 *
 * @public
 */
export interface ContainerBaseProps extends Slots {
  /**
   * The content to render inside the container.
   */
  children?: ReactNode;
}

/**
 * Props for the Container component with proper polymorphic typing.
 *
 * @public
 */
export type ContainerProps<T extends React.ElementType = 'div'> = PolymorphicComponentProps<T, ContainerBaseProps>;

/**
 * Container is the atomic building block for polymorphic rendering + slot composition + prop spreading.
 * Zero styling, zero layout logic - just the infrastructure that other Bento components build upon.
 *
 * @component
 * @param args - The properties {@link ContainerProps} passed to the Container component.
 *
 * @example
 * ```tsx
 * // Basic polymorphic rendering
 * <Container as="article">
 *   <h1>Article Title</h1>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * // Building design system components
 * function Box({ padding, elevation, children, ...props }) {
 *   return (
 *     <Container
 *       {...props}
 *       className={cn(styles.box, styles[elevation])}
 *       style={{ padding: tokens.spacing[padding], ...props.style }}
 *     >
 *       {children}
 *     </Container>
 *   );
 * }
 * ```
 *
 * @public
 */
export const Container = withSlots(
  'BentoContainer',
  function Container(
    ...args: [PolymorphicProps<React.ElementType, ContainerBaseProps>, PolymorphicRef<React.ElementType>?]
  ) {
    const { props, apply } = useProps(args);
    const { children, as = 'div' } = props;

    return React.createElement(as, { ...apply({}, ['as']) }, children);
  }
) as <T extends React.ElementType = 'div'>(props: ContainerProps<T>) => React.ReactElement;
