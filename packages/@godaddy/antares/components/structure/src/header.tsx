import { createContext, forwardRef } from 'react';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';

export interface HeaderProps extends FlexProps {}

/** Lets a parent style/space every `Header` it renders. Optional. */
export const HeaderContext = createContext<ContextValue<HeaderProps, HTMLElement>>(null);

/**
 * Generic header region: the top of a composed component (title area, optional trailing
 * close). Defaults to a row that spaces its contents apart.
 *
 * @param props - {@link HeaderProps}
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(props, ref) {
  [props, ref] = useContextProps(props, ref, HeaderContext);

  return (
    <Flex
      as="header"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="md"
      gap="sm"
      {...props}
      ref={ref}
    />
  );
});
