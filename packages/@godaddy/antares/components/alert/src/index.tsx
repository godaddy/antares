import { forwardRef, useContext, type ComponentPropsWithoutRef, type RefAttributes } from 'react';
import { cx } from 'cva';
import { mergeProps } from 'react-aria';
import { DEFAULT_SLOT, Provider as RACProvider } from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { ButtonContext, type ButtonProps } from '#components/button';
import { HeadingContext } from '#components/heading';
import { IconContext, type IconProps } from '#components/icon';
import { Box } from '#components/layout/box';
import { Grid } from '#components/layout/grid';
import { ButtonGroupContext, ContentContext } from '#components/structure';
import { TextContext } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

/** Controls the visual accent of the alert. */
export type AlertEmphasis = 'critical' | 'warning' | 'success' | 'info' | 'highlight' | 'premium' | 'internal';

export interface AlertProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  /** Visual intent of the alert. @default 'info' */
  emphasis?: AlertEmphasis;
}

/**
 * An in-page notification with consumer-owned content, actions, and dismissal.
 * Native props, className, style, and ref apply to the outer alert surface.
 *
 * @param props - Alert intent and composed regions.
 * @example
 * <Alert emphasis="warning">
 *   <Icon slot="indicator" icon="alert" />
 *   <Content>
 *     <Heading slot="title">Payment method expiring</Heading>
 *     <Text>Please update your payment method.</Text>
 *   </Content>
 *   <CloseButton onPress={dismiss} />
 * </Alert>
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const { emphasis = 'info', role = 'alert', className, children, ...rest } = props;
  const inheritedIcons = useContext(IconContext);
  const iconSlots: Record<string | symbol, Partial<IconProps> & RefAttributes<SVGSVGElement>> =
    inheritedIcons && 'slots' in inheritedIcons
      ? (inheritedIcons.slots ?? {})
      : { [DEFAULT_SLOT]: inheritedIcons ?? {} };
  const close = {
    variant: 'minimal',
    size: 'sm',
    className: styles.close,
    // Inline style beats the minimal icon button's negative margin; local style still overrides via merge.
    style: { marginInlineStart: 'var(--alert-gap)' }
  } satisfies ButtonProps;
  const inherit = textTreatmentClassName('inherit');
  const title = { className: cx(inherit, styles.title) };

  return (
    <Box {...rest} ref={ref} role={role} data-emphasis={emphasis} className={composeClassName(className, styles.alert)}>
      <RACProvider
        values={[
          [HeadingContext, { slots: { [DEFAULT_SLOT]: {}, title } }],
          [
            TextContext,
            {
              slots: {
                [DEFAULT_SLOT]: { className: inherit },
                title: { elementType: 'div', ...title }
              }
            }
          ],
          [
            ContentContext,
            {
              as: 'div',
              inlinePadding: '0',
              blockPadding: '0',
              gap: 'var(--alert-gap)',
              // Defeat Content's scroll-region defaults; Alert's surface owns padding.
              style: { minBlockSize: 'auto', overflow: 'visible' },
              className: styles.textRegion
            }
          ],
          [ButtonGroupContext, { alignItems: 'center', className: styles.actions }],
          [
            IconContext,
            {
              slots: {
                ...iconSlots,
                [DEFAULT_SLOT]: iconSlots[DEFAULT_SLOT] ?? {},
                indicator: mergeProps(iconSlots.indicator ?? {}, {
                  'aria-hidden': true,
                  className: styles.emphasisIcon
                })
              }
            }
          ],
          // Own the close slot without changing the close icon's inherited context.
          [ButtonContext, { slots: { [DEFAULT_SLOT]: {}, close } }]
        ]}
      >
        <Grid className={styles.layout}>{children}</Grid>
      </RACProvider>
    </Box>
  );
});
