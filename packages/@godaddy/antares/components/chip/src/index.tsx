import { createContext, forwardRef, useContext, type ForwardedRef, type ReactNode } from 'react';
import {
  Button as RACButton,
  ButtonContext,
  Label,
  LabelContext,
  Provider as RACProvider,
  Tag as RACTag,
  TagGroup as RACTagGroup,
  TagList as RACTagList,
  TextContext,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
  type TagGroupProps as RACTagGroupProps,
  type TagListProps as RACTagListProps,
  type TagProps as RACTagProps,
  useSlottedContext
} from 'react-aria-components';
import { Icon, IconContext } from '#components/icon';
import { Flex, type FlexOwnProps } from '#components/layout/flex';
import { Text } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Visual size for Chips: `sm`, `md`, or `lg`; `md` is the default. */
export type ChipSize = 'sm' | 'md' | 'lg';

/** Presentation context inherited by Chips from their owning group. */
export interface ChipContextValue {
  /** Shared visual size. */
  size: ChipSize;
}

/** Presentation context used by `ChipGroup`, `Chip`, and `ChipButton`. */
export const ChipContext = createContext<ChipContextValue>({ size: 'md' });

/** Props for a `ChipButton`. */
export interface ChipButtonProps extends RACButtonProps, Omit<FlexOwnProps, 'as'> {
  /** Visual size. @default 'md' */
  size?: ChipSize;
}

/** Re-exported primitive for naming a `ChipGroup`. */
export { Label };

/** Props for the semantic owner of a Chip collection. */
export interface ChipGroupProps extends RACTagGroupProps {
  /** Shared visual size. @default 'md' */
  size?: ChipSize;
}

function ChipGroupBody({ children }: { children: ReactNode }) {
  const labelProps = useSlottedContext(LabelContext) ?? {};
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
 * A group of related Chips with labeling, selection, validation, and removal.
 *
 * @param props - {@link ChipGroupProps}
 *
 * @example
 * <ChipGroup selectionMode="multiple">
 *   <Label>Categories</Label>
 *   <ChipList>
 *     <Chip id="news">News</Chip>
 *   </ChipList>
 * </ChipGroup>
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

/** Props for the Chip collection and its wrapping layout. */
export interface ChipListProps<T extends object> extends RACTagListProps<T>, Omit<FlexOwnProps, 'as'> {}

/**
 * A collection of Chips that wraps onto additional lines.
 *
 * @param props - {@link ChipListProps}
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

/** Props for an individual Chip item. */
export interface ChipProps extends RACTagProps, Omit<FlexOwnProps, 'as'> {}

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
        [
          ButtonContext,
          {
            slots: {
              remove: removeSlotProps
            }
          }
        ],
        [IconContext, { 'aria-hidden': true, className: styles.icon }],
        [TextContext, { className: styles.text }]
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? <Text>{children}</Text> : children}
    </RACProvider>
  );
}

/**
 * A selectable or removable item in a `ChipGroup`.
 *
 * @param props - {@link ChipProps}
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
      {...props}
      ref={ref}
      as={RACTag}
      data-size={size}
      textValue={resolvedTextValue}
      className={composeClassName(className, styles.chip)}
    >
      {composeRenderProps(children, function renderChipContent(content) {
        return <ChipBody>{content}</ChipBody>;
      })}
    </Flex>
  );
});

/** A button with Chip presentation. */
export const ChipButton = forwardRef<HTMLButtonElement, ChipButtonProps>(function ChipButton(props, ref) {
  const { size: requestedSize, className, children, ...rest } = props;
  const { size: contextSize } = useContext(ChipContext);
  const size = requestedSize ?? contextSize;

  return (
    <Flex
      {...rest}
      display="inline-flex"
      alignItems="center"
      as={RACButton}
      data-size={size}
      ref={ref}
      className={composeClassName(className, styles.chip, styles.chipButton)}
    >
      {composeRenderProps(children, function renderChipButtonContent(content) {
        return (
          <RACProvider
            values={[
              [IconContext, { 'aria-hidden': true, className: styles.icon }],
              [TextContext, { className: styles.text }]
            ]}
          >
            {typeof content === 'string' || typeof content === 'number' ? <Text>{content}</Text> : content}
          </RACProvider>
        );
      })}
    </Flex>
  );
});
