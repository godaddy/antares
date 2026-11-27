import { createContext, forwardRef, useContext, type Context, type ReactNode, type Ref } from 'react';
import {
  DEFAULT_SLOT,
  useContextProps,
  type ContextValue,
  type TextProps as RACTextProps
} from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Grid, type GridProps } from '#components/layout/grid';
import { TextContext } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';

/** Props shared by every composed chart region. */
export interface ChartRegionProps extends Omit<GridProps<'div'>, 'as' | 'areas' | 'columns' | 'rows'> {
  /** Region content. Fill the region's named `Text` slots for the default text styles. */
  children?: ReactNode;
}

/** Extra props a chart gives one text slot, such as an `id` the chart references. */
export interface ChartRegionSlotProps extends Pick<RACTextProps, 'id'> {
  /** Ref to the slotted element, for example to know when it is mounted. */
  ref?: Ref<HTMLElement>;
}

/** What a chart tells a composed region: where it sits and what its slots need. */
export interface ChartRegionPlacement {
  /** Places the region in the chart's layout. */
  className?: string;

  /** Extra props per slot name. */
  slots?: Record<string, ChartRegionSlotProps>;
}

/** Placement for each region a chart renders, keyed by the region's name. */
export type ChartRegionPlacements = Record<string, ChartRegionPlacement>;

/** Context a chart provides so its composed regions know their placement. Not public. */
export const ChartRegionsContext: Context<ChartRegionPlacements | null> =
  /* @__PURE__ */ createContext<ChartRegionPlacements | null>(null);

/** Describes one kind of region. Define it once at module scope. */
export interface ChartRegionDefinition {
  /** Key the chart uses for this region in `ChartRegionsContext`. */
  name: string;

  /** Public context for consumer overrides. */
  context: Context<ContextValue<ChartRegionProps, HTMLDivElement>>;

  /** Default class name for each text slot the region offers. */
  slots: Record<string, string>;
}

interface ChartRegionRenderProps extends ChartRegionProps {
  /** The kind of region to render. */
  region: ChartRegionDefinition;
}

/**
 * Renders a composed chart region. Precedence is region defaults, then the public context, then props. The
 * chart's placement class and slot props always apply, so overrides cannot break the chart layout.
 *
 * @param props - {@link ChartRegionRenderProps}
 */
export const ChartRegion = /* @__PURE__ */ forwardRef<HTMLDivElement, ChartRegionRenderProps>(function ChartRegion(
  { region, ...props },
  ref
) {
  const [{ children, className, ...rest }, regionRef] = useContextProps(props, ref, region.context);
  const placement = useContext(ChartRegionsContext)?.[region.name];
  const slots: Record<string, RACTextProps & { ref?: Ref<HTMLElement> }> = { [DEFAULT_SLOT]: {} };
  for (const [slot, slotClassName] of Object.entries(region.slots)) {
    slots[slot] = {
      ...placement?.slots?.[slot],
      className: composeClassName(undefined, slotClassName, textTreatmentClassName('inherit'))
    };
  }
  return (
    <Grid {...rest} ref={regionRef} className={composeClassName(className, placement?.className)}>
      <TextContext.Provider value={{ slots }}>{children}</TextContext.Provider>
    </Grid>
  );
});
