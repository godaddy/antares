import { createContext, forwardRef } from 'react';
import { cx } from 'cva';
import { useContextProps, type ContextValue } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import styles from './content.module.css';

export interface ContentProps extends Omit<FlexProps, 'as'> {}

/** Lets a parent style/space every `Content` it renders. Optional. */
export const ContentContext = createContext<ContextValue<ContentProps, HTMLElement>>(null);

/**
 * Generic content region: the primary body of a composed component.
 *
 * @param props - {@link ContentProps}
 */
export const Content = forwardRef<HTMLElement, ContentProps>(function Content(props, ref) {
  [props, ref] = useContextProps(props, ref, ContentContext);
  const { className, ...rest } = props;

  return (
    <Flex
      as="section"
      direction="column"
      gap="md"
      flexGrow={1}
      {...rest}
      ref={ref}
      className={cx(styles.content, className)}
    />
  );
});
