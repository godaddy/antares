import { useProps } from '@bento/use-props';
import { withSlots } from '@bento/slots';
import React, { createContext, ReactNode, useContext } from 'react';
import { Text, TextProps } from '@bento/text';

const Level = createContext<number | null>(null);

export interface HeadingProps extends Omit<TextProps, 'as'> {
  /** @default null */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

/**
 * A provider component that allows for the nesting of heading levels.
 *
 * @component
 * @param {HeadingProps} args - The properties passed to the HeadingProvider component.
 * @param {React.ReactNode} args.children - The children to render.
 * @param {1 | 2 | 3 | 4 | 5 | 6} [args.level] - The heading level to render.
 *
 * @example
 * ```tsx
 * <HeadingProvider>
 *   <Heading>Hello, world!</Heading>
 * </HeadingProvider>
 * ```
 *
 * @public
 */
export const HeadingProvider = withSlots('BentoHeadingProvider', function HeadingProvider(args: HeadingProps) {
  const { props } = useProps(args);
  const { children } = props;
  const level = useContext(Level);
  return <Level.Provider value={Number(level) + 1}>{children}</Level.Provider>;
});

/**
 * A complete heading component primitive.
 * Renders as a native heading element.
 *
 * @component
 * @param {HeadingProps} args - The properties passed to the Heading component.
 * @param {React.ReactNode} args.children - The children to render.
 * @param {1 | 2 | 3 | 4 | 5 | 6} [args.level] - The heading level to render.
 *
 * @example
 * ```tsx
 * <Heading level={1}>Hello, world!</Heading>
 * ```
 *
 * @public
 */
export const Heading = withSlots('BentoHeading', function Heading(args: HeadingProps) {
  const context = useContext(Level);
  const { props, apply } = useProps(args);
  const { children, level: levelProp = context } = props;
  const as = typeof levelProp === 'number' ? `h${levelProp}` : 'span';

  const applied = apply({ as }, ['level']);

  return React.createElement(Text, { ...applied }, children);
});
