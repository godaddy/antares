import { Text } from '@godaddy/antares';
import { createContext } from 'react';
import type { ContextValue } from 'react-aria-components';
import {
  ChartRegion,
  ChartRegionsContext,
  type ChartRegionDefinition,
  type ChartRegionPlacements,
  type ChartRegionProps
} from '../src/index.tsx';

const ExampleRegionContext = createContext<ContextValue<ChartRegionProps, HTMLDivElement>>(null);

const exampleRegion: ChartRegionDefinition = {
  name: 'summary',
  context: ExampleRegionContext,
  slots: { title: 'example-title', note: 'example-note' }
};

const placements: ChartRegionPlacements = {
  summary: { className: 'example-placement', slots: { note: { id: 'example-note-id' } } }
};

/**
 * A chart provides placement through `ChartRegionsContext`. The region keeps that placement when a consumer adds their
 * own class name, and a slot receives the chart's extra props.
 * @title Placement
 * @order 1
 */
export function PlacementExample() {
  return (
    <ChartRegionsContext.Provider value={placements}>
      <ExampleRegionContext.Provider value={{ className: 'consumer-override' }}>
        <ChartRegion region={exampleRegion} data-testid="region">
          <Text slot="title">Revenue</Text>
          <Text slot="note">Last 30 days</Text>
        </ChartRegion>
      </ExampleRegionContext.Provider>
    </ChartRegionsContext.Provider>
  );
}
