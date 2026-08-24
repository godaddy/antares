import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';

export interface FooterProps extends FlexProps {}

/** Lets a parent style/space every `Footer` it renders. Optional. */
export const FooterContext = createContext<ContextValue<FooterProps, HTMLElement>>(null);

/**
 * Generic footer region: the bottom of a composed component (secondary content and/or a
 * `ButtonGroup`). Defaults to a row that spaces its contents apart.
 *
 * @param props - {@link FooterProps}
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(props, ref) {
  [props, ref] = useContextProps(props, ref, FooterContext);

  return (
    <Flex
      as="footer"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      inlinePadding="md"
      blockPadding="sm"
      gap="md"
      {...props}
      ref={ref}
    />
  );
});
