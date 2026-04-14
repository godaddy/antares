'use client';
import { getMeta, getStory, getComponentDocs } from '@bento/storybook-addon-helpers';
import { RtlI18nProvider } from '../../../utils/rtl-locale-provider.tsx';
import { RTLDirectionExample } from './examples/rtl-direction.tsx';
import { XAxisExample } from './examples/x-axis.tsx';
import { YAxisExample } from './examples/y-axis.tsx';
import { AxisTitle } from './src/index.tsx';

export default getMeta({
  title: 'Antares/Components/Chart/AxisTitle'
});

export const Props = getComponentDocs(AxisTitle);

export const XAxis = getStory(XAxisExample);

export const YAxis = getStory(YAxisExample);

function AxisTitleRTLDirectionStory() {
  return (
    <RtlI18nProvider>
      <RTLDirectionExample />
    </RtlI18nProvider>
  );
}

export const RTLDirection = getStory(AxisTitleRTLDirectionStory);
