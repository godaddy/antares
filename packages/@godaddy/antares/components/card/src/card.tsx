import { forwardRef, type Ref } from 'react';
import {
  GridListItem as RACGridListItem,
  type GridListItemProps as RACGridListItemProps,
  Link as RACLink
} from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import { composeClassName } from '#utils/render-props.ts';
import { OutsideCardGroup, useIsInCardGroup } from './card-group.tsx';
import { OutsideCardSelection, SelectionProvider } from './card-selection-indicator.tsx';
import styles from './index.module.css';

/**
 * Props for Card. Standalone, a Card is a static surface, or a link when `href` is set. Inside a
 * `CardGroup` it is a row that the group selects, and `onAction` and `href` act on the row.
 */
export interface CardProps
  extends Omit<FlexProps, 'as' | 'onClick' | 'id'>,
    Pick<RACGridListItemProps, 'id' | 'target' | 'rel' | 'download' | 'ping' | 'referrerPolicy' | 'routerOptions'> {
  /** Disable the link or row and fade the Card. */
  isDisabled?: boolean;

  /**
   * Navigation destination. A standalone Card renders as the native link and must not contain
   * controls. Inside a `CardGroup`, the row navigates.
   */
  href?: RACGridListItemProps['href'];

  /** Row action inside a `CardGroup`. Ignored on a standalone Card. */
  onAction?: RACGridListItemProps['onAction'];

  /**
   * Accessible name and typeahead text inside a `CardGroup`. Defaults to plain-text children, so set
   * it when the content is composed.
   */
  textValue?: string;
}

/**
 * A composed surface. Selection and row actions come from `CardGroup`.
 *
 * @param props - {@link CardProps}
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card(props, ref) {
  const {
    className,
    children,
    href,
    target,
    rel,
    download,
    ping,
    referrerPolicy,
    routerOptions,
    onAction,
    isDisabled,
    id,
    textValue,
    ...surfaceProps
  } = props;

  const isInGroup = useIsInCardGroup();
  const navigationProps = { href, target, rel, download, ping, referrerPolicy, routerOptions };
  const surface = {
    padding: 'lg',
    gap: 'lg',
    direction: 'column',
    ...surfaceProps,
    className: composeClassName(className, styles.card)
  } satisfies FlexProps;

  if (isInGroup) {
    return (
      <Flex
        {...(surface as FlexProps<typeof RACGridListItem>)}
        as={RACGridListItem}
        ref={ref as Ref<HTMLDivElement>}
        id={id}
        textValue={
          textValue ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined)
        }
        {...navigationProps}
        isDisabled={isDisabled}
        onAction={onAction}
        data-card="interactive"
      >
        {(state) => (
          <SelectionProvider
            isSelected={state.isSelected}
            isDisabled={state.isDisabled}
            isFocusVisible={state.isFocusVisible}
            isHovered={state.isHovered}
            isPressed={state.isPressed}
          >
            <OutsideCardGroup>{children}</OutsideCardGroup>
          </SelectionProvider>
        )}
      </Flex>
    );
  }

  const content = <OutsideCardSelection>{children}</OutsideCardSelection>;

  if (href != null) {
    return (
      <Flex
        {...(surface as FlexProps<typeof RACLink>)}
        as={RACLink}
        ref={ref as Ref<HTMLAnchorElement>}
        id={id?.toString()}
        {...navigationProps}
        isDisabled={isDisabled}
        data-card={isDisabled ? 'static' : 'interactive'}
      >
        {content}
      </Flex>
    );
  }

  return (
    <Flex
      {...surface}
      ref={ref as Ref<HTMLDivElement>}
      id={id?.toString()}
      data-disabled={isDisabled || undefined}
      data-card="static"
    >
      {content}
    </Flex>
  );
});
