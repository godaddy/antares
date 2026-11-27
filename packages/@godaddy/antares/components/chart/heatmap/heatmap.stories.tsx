'use client';
import { HeatmapChart, HeatmapLegend, HeatmapPlot, HeatmapTooltip } from '#components/chart/heatmap';
import { getComponentDocs, getExamples, getMeta, getStory } from '@bento/storybook-addon-helpers';
import { PlaygroundExample } from './examples/heatmap-playground.tsx';

export default getMeta({
  title: 'components/Chart/HeatmapChart',
  decorators: [
    (Story: React.FC) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    )
  ]
});

export const Props = getComponentDocs(HeatmapChart);

export const HeatmapPlotProps = getComponentDocs(HeatmapPlot);

export const HeatmapLegendProps = getComponentDocs(HeatmapLegend);

export const HeatmapTooltipProps = getComponentDocs(HeatmapTooltip);

export const Examples = getExamples('./examples');

export const Playground = getStory(PlaygroundExample, {
  args: {
    colorLegend: true,
    colorLegendLabel: 'Visitors',
    closedLabel: 'No data',
    xLabels: true,
    yLabels: true,
    tooltip: true,
    minCellSize: 44,
    minCellHeight: 40,
    maxCellHeight: undefined,
    align: 'start',
    cellRounding: 6,
    height: undefined,
    width: undefined,
    'aria-label': 'Playground heatmap chart',
    desc: ''
  },
  argTypes: {
    colorLegend: { control: 'boolean', description: 'Show the discrete color swatch legend' },
    colorLegendLabel: { control: 'text', description: 'Label to the left of the legend swatches' },
    closedLabel: { control: 'text', description: 'Legend label for null / closed cells' },
    xLabels: { control: 'boolean', description: 'Show column (X-axis) tick labels' },
    yLabels: { control: 'boolean', description: 'Show row (Y-axis) tick labels' },
    tooltip: { control: 'boolean', description: 'Show the tooltip on hover or keyboard focus' },
    minCellSize: {
      control: { type: 'range', min: 44, max: 100, step: 4 },
      description:
        'Minimum column width in px (cell plus gap) before the chart scrolls horizontally. Never below 40px per cell'
    },
    minCellHeight: {
      control: { type: 'range', min: 40, max: 100, step: 4 },
      description:
        'Minimum row height in px (never below 40). Without a height the chart is as tall as its rows at this size'
    },
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'end'],
      description: 'Where the chart sits when its box is taller than it needs (e.g. with maxCellHeight)'
    },
    maxCellHeight: {
      control: { type: 'number', min: 16, max: 200, step: 4 },
      description: 'Maximum row height in px. Stops rows stretching to fill extra height (omit for no limit)'
    },
    cellRounding: {
      control: { type: 'range', min: 0, max: 16, step: 1 },
      description: 'Border radius on each cell in px'
    },
    height: {
      control: { type: 'number', min: 200, max: 900, step: 50 },
      description: 'Total height of the chart in pixels, including axis and legend (omit to size from the rows)'
    },
    width: {
      control: { type: 'number', min: 200, max: 2000, step: 50 },
      description: 'Width of the chart in pixels (omit for 100%)'
    },
    'aria-label': { control: 'text', description: 'Accessibility label for the SVG element' },
    desc: { control: 'text', description: 'Screen-reader description inside the SVG <desc> element' }
  }
});
