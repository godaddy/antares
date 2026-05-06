'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { RTLDirectionExample } from './examples/rtl-direction.tsx';
import { XAxisExample } from './examples/x-axis.tsx';
import { YAxisExample } from './examples/y-axis.tsx';
import { AxisTitle } from './src/index.tsx';

export default getMeta({
  title: 'components/chart/AxisTitle'
});

export const Props = getComponentDocs(AxisTitle);

export const XAxis = getStory(XAxisExample);

export const YAxis = getStory(YAxisExample);

export const RTLDirection = getStory(RTLDirectionExample);
