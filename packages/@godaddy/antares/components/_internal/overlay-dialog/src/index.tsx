import { forwardRef, type ReactNode } from 'react';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  Provider as RACProvider
} from 'react-aria-components';
import type { InterfaceSize } from '#components/size-provider';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { HeaderContext, ContentContext, FooterContext, ButtonGroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface OverlayDialogProps
  extends Omit<GridOwnProps, 'as' | 'areas' | 'columns' | 'rows'>,
    Omit<RACDialogProps, 'children'> {
  /** Optional coordinated region spacing. */
  size?: InterfaceSize;

  /** The regions of the overlay, in any order. */
  children?: ReactNode;
}

/**
 * Internal shell shared by `Modal`, `Drawer`, and `Popover`: a RAC `Dialog` laid out as the
 * region grid, with the region contexts wired to it.
 *
 * The grid and the contexts are two halves of one mechanism (the CSS defines the areas, the
 * contexts hand each region its `grid-area` class), so they live together here rather than being
 * copied into each overlay, where they could drift apart.
 *
 * @param props - {@link OverlayDialogProps}
 */
export const OverlayDialog = forwardRef<HTMLElement, OverlayDialogProps>(function OverlayDialog(props, ref) {
  const { className, children, size, ...rest } = props;
  const spacing = size ? { padding: size, gap: size } : {};

  return (
    <Grid as={RACDialog} data-size={size} {...rest} ref={ref} className={composeClassName(className, styles.dialog)}>
      <RACProvider
        values={[
          [HeaderContext, { ...spacing, className: styles.header }],
          [ContentContext, { ...spacing, className: styles.content }],
          [FooterContext, { ...spacing, className: styles.footer }],
          [ButtonGroupContext, { ...spacing, className: styles.buttons }]
        ]}
      >
        {children}
      </RACProvider>
    </Grid>
  );
});
