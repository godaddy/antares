import { forwardRef, useContext, type ReactNode } from 'react';
import { cx } from 'cva';
import { DEFAULT_SLOT, HeadingContext, Provider as RACProvider, TextContext } from 'react-aria-components';
import { Flex, type FlexProps } from '#components/layout/flex';
import { TagContext, type TagSize } from '#components/tag';
import { composeClassName } from '../../../utils/render-props.ts';
import styles from './index.module.css';

/** Controls the coordinated type size of every part of the lockup. */
export type TextLockupSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

/** Tag sizes paired with each lockup size, per the design spec. */
const TAG_SIZE: Record<TextLockupSize, TagSize> = {
  '2xl': 'lg',
  xl: 'lg',
  lg: 'md',
  md: 'md',
  sm: 'md',
  xs: 'sm'
};

/**
 * Props for the {@link TextLockup} component.
 */
export interface TextLockupProps extends Omit<FlexProps, 'as' | 'direction' | 'alignItems'> {
  /**
   * The coordinated type size of the lockup. Each part reads this tier on its own role
   * ramp: the eyebrow on `detail`, the title on `heading`, the body on `body`.
   * @default 'md'
   */
  size?: TextLockupSize;

  /** How the parts are aligned within the lockup. @default 'start' */
  align?: 'start' | 'center';

  /**
   * Constrains the text parts to a comfortable line length for reading.
   * @default true
   */
  legibleLines?: boolean;

  /** The parts of the lockup, in any order. */
  children?: ReactNode;
}

/** A per-slot defaults map, keyed the way RAC's slotted contexts are. */
type SlotMap = Record<string | symbol, { className?: string }>;

/** Narrow an inherited context value to its per-slot map. */
function toSlotMap(inherited: unknown): SlotMap {
  if (!inherited || typeof inherited !== 'object') return {};
  if ('slots' in inherited && inherited.slots) return inherited.slots as SlotMap;

  return { [DEFAULT_SLOT]: inherited as SlotMap[string] };
}

/**
 * Merges per-slot defaults onto whatever context a parent already provides, rather than
 * replacing it.
 *
 * Replacing matters: RAC's `Dialog` puts the id that wires `aria-labelledby` into the same
 * `HeadingContext` this styles, so a fresh value would drop the dialog's accessible name
 * with no error. A parent's props are kept and class names are concatenated, so the
 * dialog's `id` and `level` survive alongside the lockup's type.
 *
 * @param inherited - The context value an ancestor provides, if any.
 * @param ours - The lockup's own per-slot defaults.
 * @returns A slotted context value carrying both.
 */
function composeSlots(inherited: unknown, ours: SlotMap) {
  const parent = toSlotMap(inherited);
  const slots: SlotMap = { ...parent };

  for (const key of Reflect.ownKeys(ours)) {
    const from = parent[key as string];
    const mine = ours[key as string];

    slots[key as string] = { ...from, ...mine, className: cx(from?.className, mine.className) };
  }

  return { slots };
}

/**
 * Stacks an optional eyebrow, a title and body text as one coordinated type group.
 *
 * The lockup positions and type-sets the parts; the consumer supplies them, so the
 * eyebrow can be plain text or a `Tag`, the title can be any heading level, and anything
 * else (a call to action, a second paragraph) can sit alongside them.
 *
 * @param props - {@link TextLockupProps}
 *
 * @example
 * ```tsx
 * <TextLockup size="xl">
 *   <Tag slot="eyebrow">New</Tag>
 *   <Heading level={1}>Text Lockup</Heading>
 *   <Text>She expressed her gratitude again.</Text>
 * </TextLockup>
 * ```
 */
export const TextLockup = forwardRef<HTMLDivElement, TextLockupProps>(function TextLockup(props, ref) {
  const { size = 'md', align = 'start', legibleLines = true, className, children, ...rest } = props;

  const inheritedHeading = useContext(HeadingContext);
  const inheritedText = useContext(TextContext);

  return (
    <Flex
      gap="sm"
      {...rest}
      ref={ref}
      direction="column"
      className={composeClassName(className, styles.lockup)}
      data-size={size}
      data-align={align}
      data-legible-lines={legibleLines ? '' : undefined}
    >
      <RACProvider
        values={[
          [
            HeadingContext,
            composeSlots(inheritedHeading, {
              [DEFAULT_SLOT]: { className: styles.title },
              title: { className: styles.title }
            })
          ],
          [
            TextContext,
            composeSlots(inheritedText, {
              [DEFAULT_SLOT]: { className: styles.body },
              description: { className: styles.body },
              eyebrow: { className: styles.eyebrow }
            })
          ],
          [TagContext, { slots: { [DEFAULT_SLOT]: {}, eyebrow: { size: TAG_SIZE[size] } } }]
        ]}
      >
        {children}
      </RACProvider>
    </Flex>
  );
});
