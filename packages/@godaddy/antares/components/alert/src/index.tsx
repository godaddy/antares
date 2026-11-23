import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cx } from 'cva';
import { DEFAULT_SLOT, Provider as RACProvider } from 'react-aria-components';
import { textSlotSizeClassName, textTreatmentClassName } from '#components/_internal/typography';
import { ButtonContext } from '#components/button';
import { HeadingContext } from '#components/heading';
import { IconContext } from '#components/icon';
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
  const inherit = textTreatmentClassName('inherit');

  return (
    <Box {...rest} ref={ref} role={role} data-emphasis={emphasis} className={composeClassName(className, styles.alert)}>
      <RACProvider
        values={[
          [HeadingContext, { slots: { [DEFAULT_SLOT]: {}, title: { className: styles.title } } }],
          [TextContext, { className: cx(inherit, textSlotSizeClassName('sm')) }],
          [
            ContentContext,
            {
              as: 'div',
              inlinePadding: '0',
              blockPadding: '0',
              gap: 'var(--alert-gap)',
              style: { minBlockSize: 'auto', overflow: 'visible' },
              className: styles.content
            }
          ],
          [ButtonGroupContext, { alignItems: 'center', className: styles.actions }],
          [
            IconContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                indicator: {
                  'aria-hidden': true,
                  width: 26,
                  height: 26,
                  className: styles.indicator
                }
              }
            }
          ],
          [
            ButtonContext,
            {
              slots: {
                [DEFAULT_SLOT]: {},
                close: { variant: 'minimal', size: 'sm', className: styles.close }
              }
            }
          ]
        ]}
      >
        <Grid className={styles.layout}>{children}</Grid>
      </RACProvider>
    </Box>
  );
});
