import { forwardRef, type ReactNode } from 'react';
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

/**
 * Stacks an optional eyebrow, a title and body text as one coordinated type group.
 *
 * The lockup positions and type-sets the parts; the consumer supplies them, so the
 * eyebrow can be plain text or a `Tag`, the title can be any heading level, and anything
 * else (a call to action, a second paragraph) can sit alongside them.
 *
 * Slots resolve against the lockup, not an outer container: `slot="title"` names the
 * lockup's title. A `Modal` still wants its own `<Heading slot="title">` as a direct child.
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
            {
              slots: {
                [DEFAULT_SLOT]: { className: styles.title },
                title: { className: styles.title }
              }
            }
          ],
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: { className: styles.body },
                description: { className: styles.body },
                eyebrow: { className: styles.eyebrow }
              }
            }
          ],
          [TagContext, { slots: { [DEFAULT_SLOT]: {}, eyebrow: { size: TAG_SIZE[size] } } }]
        ]}
      >
        {children}
      </RACProvider>
    </Flex>
  );
});
