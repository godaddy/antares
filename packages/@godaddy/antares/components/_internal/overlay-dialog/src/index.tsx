import { forwardRef, useContext, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  HeadingContext as RACHeadingContext,
  type HeadingProps as RACHeadingProps,
  Provider as RACProvider
} from 'react-aria-components';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { SizeProvider, sizeScaleClassName, useDeclaredSize, type ScaleSize } from '#components/size-provider';
import { HeaderContext, ContentContext, FooterContext, ButtonGroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface OverlayDialogProps
  extends Omit<GridOwnProps, 'as' | 'areas' | 'columns' | 'rows'>,
    Omit<RACDialogProps, 'children'> {
  /** Size of the overlay's interior. Follows the size around the overlay when omitted. */
  size?: ScaleSize;

  /** The regions of the overlay, in any order. */
  children?: ReactNode;
}

const padding = 'var(--_size-padding, var(--sp-md))';
const gap = 'var(--_size-gap, var(--sp-sm))';

type HeadingSlots = { slots: Record<string | symbol, RACHeadingProps> };

/** Wires the regions, and merges the title tier into React Aria's title slot so its id survives. */
function OverlayRegions({ children }: { children?: ReactNode }) {
  const { slots } = useContext(RACHeadingContext) as HeadingSlots;
  const title = { ...slots.title, className: cx(slots.title.className, styles.titleTier) };

  return (
    <RACProvider
      values={[
        [RACHeadingContext, { slots: { ...slots, title } }],
        [HeaderContext, { padding, gap, className: styles.header }],
        [ContentContext, { gap: padding, inlinePadding: padding, blockPadding: gap, className: styles.content }],
        [FooterContext, { gap: padding, inlinePadding: padding, blockPadding: gap, className: styles.footer }],
        [ButtonGroupContext, { gap, className: styles.buttons }]
      ]}
    >
      {children}
    </RACProvider>
  );
}

/**
 * Internal shell shared by `Modal`, `Drawer`, and `Popover`: a RAC `Dialog` laid out as the
 * region grid, with the region contexts wired to it.
 *
 * The grid and the contexts are two halves of one mechanism (the CSS defines the areas, the
 * contexts hand each region its `grid-area` class), so they live together here rather than being
 * copied into each overlay, where they could drift apart.
 *
 * It is a size scope, and re-applies the declared size across the portal.
 *
 * @param props - {@link OverlayDialogProps}
 */
export const OverlayDialog = forwardRef<HTMLElement, OverlayDialogProps>(function OverlayDialog(props, ref) {
  const { className, children, size: sizeProp, ...rest } = props;
  const size = useDeclaredSize(sizeProp);

  return (
    <SizeProvider size={size}>
      <Grid
        as={RACDialog}
        {...rest}
        ref={ref}
        className={composeClassName(className, styles.dialog, sizeScaleClassName(size))}
      >
        <OverlayRegions>{children}</OverlayRegions>
      </Grid>
    </SizeProvider>
  );
});
