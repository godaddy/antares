'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { ArrowExample } from './examples/arrow.tsx';
import { MultipleSeriesExample } from './examples/multiple-series.tsx';
import { SingleSeriesExample } from './examples/single-series.tsx';
import { Tooltip } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/Tooltip'
});

export const Props: object = getComponentDocs(Tooltip);

export const SingleSeries = getStory(SingleSeriesExample);

export const MultipleSeries = getStory(MultipleSeriesExample);

export const Arrow = getStory(ArrowExample);
