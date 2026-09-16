import { createContext, forwardRef, type ElementType, type ReactNode } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import type { PolymorphicRef } from '#types/polymorphic-react.ts';
import { composeStyle } from '#utils/render-props.ts';

export type ContentProps<C extends ElementType = 'section'> = FlexProps<C>;

/** Lets a parent style/space every `Content` it renders. Optional. */
export const ContentContext = createContext<ContextValue<ContentProps<ElementType>, HTMLElement>>(null);

/**
 * Generic content region: the primary body of a composed component.
 * Defaults to a column that spaces its contents apart and allows scrolling.
 *
 * @param props - {@link ContentProps}
 */
export const Content = forwardRef(function Content(props: ContentProps<ElementType>, ref: PolymorphicRef<ElementType>) {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { style: styleProps, ...rest } = props;

  return (
    <Flex
      as="section"
      direction="column"
      gap="md"
      flex="1 1 auto"
      inlinePadding="md"
      blockPadding="sm"
      style={composeStyle(styleProps, { minBlockSize: 0, overflow: 'auto' })}
      {...rest}
      ref={ref}
    />
  );
}) as <C extends ElementType = 'section'>(props: ContentProps<C> & { ref?: PolymorphicRef<C> }) => ReactNode;
