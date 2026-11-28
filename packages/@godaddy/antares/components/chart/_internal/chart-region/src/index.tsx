import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type Context,
  type ReactNode,
  type Ref
} from 'react';
import {
  DEFAULT_SLOT,
  useContextProps,
  type ContextValue,
  type TextProps as RACTextProps
} from 'react-aria-components';
import { textTreatmentClassName } from '#components/_internal/typography';
import { Flex } from '#components/layout/flex';
import { Grid, type GridProps } from '#components/layout/grid';
import { TextContext } from '#components/text';
import { composeClassName } from '#utils/render-props.ts';
import styles from './index.module.css';

export { useChartDescription } from './use-chart-description.ts';

export interface ChartRootProps
  extends Omit<GridProps<'div'>, 'as' | 'areas' | 'columns' | 'rows' | 'justifyContent' | 'justifyItems'> {
  /** Accessible name for the chart. */
  'aria-label'?: string;
}

/** Props shared by every composed chart region. */
export interface ChartRegionProps
  extends Omit<
    GridProps<'div'>,
    | 'as'
    | 'display'
    | 'areas'
    | 'columns'
    | 'rows'
    | 'autoColumns'
    | 'autoRows'
    | 'autoFlow'
    | 'gridArea'
    | 'gridColumnStart'
    | 'gridColumnEnd'
    | 'gridRowStart'
    | 'gridRowEnd'
    | 'justifySelf'
    | 'alignSelf'
    | 'justifyItems'
    | 'alignItems'
    | 'justifyContent'
    | 'alignContent'
  > {
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

  /** Groups unslotted children in the chart's layout. */
  contentClassName?: string;

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
 * Renders a composed chart region. Region props take precedence over the public context and defaults.
 * The chart supplies the placement class and slot props.
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
  let content = children;
  if (placement?.contentClassName) {
    const named: ReactNode[] = [];
    const defaults: ReactNode[] = [];
    for (const child of Children.toArray(children)) {
      if (isValidElement<{ slot?: string }>(child) && child.props.slot && child.props.slot in region.slots) {
        named.push(child);
      } else {
        defaults.push(child);
      }
    }
    content = (
      <>
        {defaults.length > 0 && (
          <Flex direction="column" alignItems="center" className={placement.contentClassName}>
            {defaults}
          </Flex>
        )}
        {named}
      </>
    );
  }
  return (
    <Grid {...rest} ref={regionRef} className={composeClassName(className, placement?.className, styles.region)}>
      <TextContext.Provider value={{ slots }}>{content}</TextContext.Provider>
    </Grid>
  );
});
