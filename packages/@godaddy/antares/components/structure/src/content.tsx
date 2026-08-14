import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';

export interface ContentProps extends FlexProps {}

/** Lets a parent style/space every `Content` it renders. Optional. */
export const ContentContext = createContext<ContextValue<ContentProps, HTMLElement>>(null);

/**
 * Generic content region: the primary body of a composed component.
 * Defaults to a column that spaces its contents apart and allows scrolling.
 *
 * @param props - {@link ContentProps}
 */
export const Content = forwardRef<HTMLElement, ContentProps>(function Content(props, ref) {
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
      style={{ minBlockSize: 0, overflow: 'auto', ...styleProps }}
      {...rest}
      ref={ref}
    />
  );
});
