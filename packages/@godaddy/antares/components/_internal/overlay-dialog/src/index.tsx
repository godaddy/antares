import { forwardRef, useContext, type ReactNode } from 'react';
import { cx } from 'cva';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
  HeadingContext as RACHeadingContext,
  type HeadingProps as RACHeadingProps,
  Provider as RACProvider
} from 'react-aria-components';
import { surfaceClassName } from '#components/_internal/typography';
import { Grid, type GridOwnProps } from '#components/layout/grid';
import { DeclaredSize, sizeScaleClassName, useDeclaredSize, type InterfaceSize } from '#components/size-scope';
import { HeaderContext, ContentContext, FooterContext, ButtonGroupContext } from '#components/structure';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export interface OverlayDialogProps
  extends Omit<GridOwnProps, 'as' | 'areas' | 'columns' | 'rows'>,
    Omit<RACDialogProps, 'children'> {
  /** Size of the overlay's interior. Follows the declared size around the overlay when omitted. */
  size?: InterfaceSize;

  /** The regions of the overlay, in any order. */
  children?: ReactNode;
}

const padding = 'var(--_size-padding, var(--sp-md))';
const gap = 'var(--_size-gap, var(--sp-sm))';

type HeadingSlots = { slots: Record<string | symbol, RACHeadingProps> };

/**
 * Wires the regions and adds the title tier to the heading that titles the dialog. It merges into
 * the title slot React Aria's Dialog publishes, which carries the id `aria-labelledby` points at.
 */
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
 * It is a size scope. The dialog renders in a portal, outside the DOM it would inherit the size
 * scale from, so it re-applies the declared size and publishes it to overlays opened inside.
 *
 * @param props - {@link OverlayDialogProps}
 */
export const OverlayDialog = forwardRef<HTMLElement, OverlayDialogProps>(function OverlayDialog(props, ref) {
  const { className, children, size: sizeProp, ...rest } = props;
  const size = useDeclaredSize(sizeProp);

  return (
    <DeclaredSize size={size}>
      <Grid
        as={RACDialog}
        {...rest}
        ref={ref}
        className={composeClassName(className, styles.dialog, surfaceClassName, sizeScaleClassName(size))}
      >
        <OverlayRegions>{children}</OverlayRegions>
      </Grid>
    </DeclaredSize>
  );
});
