import { createContext, forwardRef, useContext, type ForwardedRef, type ReactNode } from 'react';
import {
  ButtonContext,
  Label,
  LabelContext,
  Provider as RACProvider,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  TagList as RACTagList,
  TextContext,
  type TagGroupProps as RACTagGroupProps,
  type TagListProps as RACTagListProps,
  type TagProps as RACTagProps,
  useSlottedContext
} from 'react-aria-components';
import { Icon, IconContext } from '#components/icon';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Text } from '#components/text';
import { composeClassName } from '../../../utils/render-props.ts';
import styles from './index.module.css';

/** Visual size shared by every Chip in a ChipGroup. */
export type ChipSize = 'sm' | 'md' | 'lg';

/** Presentation inherited by Chips from their owning group. */
export interface ChipContextValue {
  /** Visual size for all items in the group. */
  size: ChipSize;
}

/** Allows composed Chip regions to read group presentation. */
export const ChipContext = createContext<ChipContextValue>({ size: 'md' });

export { Label };

export interface ChipGroupProps extends RACTagGroupProps {
  /** Visual size shared by every Chip. @default 'md' */
  size?: ChipSize;
}

function ChipGroupBody({ children }: { children: ReactNode }) {
  const labelProps = useSlottedContext(LabelContext) ?? {};
  const textContext = useContext(TextContext);
  const textSlots =
    textContext && typeof textContext === 'object' && 'slots' in textContext ? textContext.slots : undefined;
  const descriptionProps = useSlottedContext(TextContext, 'description') ?? {};
  const errorMessageProps = useSlottedContext(TextContext, 'errorMessage') ?? {};

  return (
    <RACProvider
      values={[
        [LabelContext, { ...labelProps, className: composeClassName(labelProps.className, styles.label) }],
        [
          TextContext,
          {
            slots: {
              ...textSlots,
              description: {
                ...descriptionProps,
                className: composeClassName(descriptionProps.className, styles.description)
              },
              errorMessage: {
                ...errorMessageProps,
                className: composeClassName(errorMessageProps.className, styles.errorMessage)
              }
            }
          }
        ]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Provides labeling, validation, selection, and removal behavior for a Chip collection.
 *
 * Compose `Label`, `ChipList`, and optional `Text` slots as children. For menu filters,
 * use a rounded Button with `MenuTrigger` instead of Chip.
 *
 * @example
 * ```tsx
 * <ChipGroup selectionMode="multiple">
 *   <Label>Categories</Label>
 *   <ChipList>
 *     <Chip id="news">News</Chip>
 *   </ChipList>
 *   <Text slot="description">Choose at least one.</Text>
 * </ChipGroup>
 * ```
 */
export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(function ChipGroup(
  { size = 'md', className, children, ...props },
  ref
) {
  return (
    <ChipContext.Provider value={{ size }}>
      <RACTagGroup {...props} ref={ref} className={composeClassName(className, styles.group)}>
        <ChipGroupBody>{children}</ChipGroupBody>
      </RACTagGroup>
    </ChipContext.Provider>
  );
});

export interface ChipListProps<T extends object> extends RACTagListProps<T>, Omit<FlexOwnProps, 'as'> {}

/**
 * Lays out Chips horizontally and wraps them onto additional lines.
 *
 * @example
 * ```tsx
 * <ChipList items={items}>{(item) => <Chip id={item.id}>{item.name}</Chip>}</ChipList>
 * ```
 */
export const ChipList = forwardRef(function ChipList<T extends object>(
  { className, ...props }: ChipListProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <Flex
      wrap="wrap"
      gap="sm"
      alignItems="center"
      {...props}
      ref={ref}
      as={RACTagList<T>}
      className={composeClassName(className, styles.list)}
    />
  );
}) as <T extends object>(props: ChipListProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement | null;

export interface ChipProps extends RACTagProps, Omit<FlexOwnProps, 'as'> {}

function normalizeChildren(children: ReactNode): ReactNode {
  if (typeof children === 'string' || typeof children === 'number') {
    return <Text>{children}</Text>;
  }

  if (Array.isArray(children)) {
    return children.map((child, index) =>
      typeof child === 'string' || typeof child === 'number' ? <Text key={index}>{child}</Text> : child
    );
  }

  return children;
}

function ChipBody({ children }: { children: ReactNode }) {
  const removeProps = useSlottedContext(ButtonContext, 'remove');
  const removeSlotProps = {
    ...removeProps,
    variant: null,
    size: null,
    className: styles.remove,
    children: <Icon aria-hidden icon="x" />
  };

  return (
    <RACProvider
      values={[
        [IconContext, { 'aria-hidden': true, className: styles.icon }],
        [TextContext, { className: styles.text }],
        [
          ButtonContext,
          {
            slots: {
              remove: removeSlotProps
            }
          }
        ]
      ]}
    >
      {normalizeChildren(children)}
    </RACProvider>
  );
}

/**
 * A selectable or removable item inside ChipGroup.
 *
 * Place a self-closing `<Button slot="remove" />` for the default X when the group has
 * `onRemove`. Compose a selected check from the Tag render prop when you want Toggle affordance.
 * For menu filters, use a rounded Button with `MenuTrigger` instead.
 *
 * @example
 * ```tsx
 * <Chip id="austin" textValue="Austin">
 *   <Icon icon="map-pin" />
 *   <Text>Austin</Text>
 *   <Button slot="remove" />
 * </Chip>
 * ```
 */
export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(
  { className, children, textValue, ...props },
  ref
) {
  const { size } = useContext(ChipContext);
  const resolvedTextValue =
    textValue ?? (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined);

  return (
    <Flex
      display="inline-flex"
      alignItems="center"
      gap="sm"
      {...props}
      ref={ref}
      as={RACTag}
      data-size={size}
      textValue={resolvedTextValue}
      className={composeClassName(className, styles.chip)}
    >
      {(values) => <ChipBody>{typeof children === 'function' ? children(values) : children}</ChipBody>}
    </Flex>
  );
});
