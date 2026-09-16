import { forwardRef, useContext, type ForwardedRef, type ReactNode } from 'react';
import { Flex, type FlexProps } from '#components/layout/flex';
import { Link } from '#components/link';
import { composeClassName } from '#utils/render-props.ts';
import { CardContext } from './card-context.ts';
import styles from './index.module.css';

export interface CardContentProps extends Omit<FlexProps<typeof Link>, 'as' | 'children' | 'onClick'> {
  /** Non-interactive content that receives the Card's primary link. */
  children?: ReactNode;
}

/** The explicit primary content region for a Card link. */
export const CardContent = forwardRef<HTMLElement, CardContentProps>(function CardContent(props, ref) {
  const { children, className, direction, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...rest } = props;
  const card = useContext(CardContext);

  if (card?.href == null) {
    const staticProps = rest as unknown as Omit<FlexProps<'div'>, 'as' | 'children'>;
    return (
      <Flex
        {...staticProps}
        as="div"
        ref={ref as ForwardedRef<HTMLDivElement>}
        direction={direction ?? 'column'}
        className={composeClassName(className as string | undefined, styles.content)}
      >
        {children}
      </Flex>
    );
  }

  return (
    <Flex
      {...({ ...rest, draggable: false } as FlexProps<typeof Link>)}
      as={Link}
      direction={direction ?? 'column'}
      href={card.href}
      onPress={card?.onPress}
      aria-label={ariaLabel ?? card?.ariaLabel}
      aria-labelledby={ariaLabelledBy ?? card?.ariaLabelledBy}
      isDisabled={card?.isDisabled}
      ref={ref as ForwardedRef<HTMLAnchorElement>}
      className={composeClassName(className, styles.content)}
    >
      {children}
    </Flex>
  );
});
