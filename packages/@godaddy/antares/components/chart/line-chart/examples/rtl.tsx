import { RTLProvider } from '../../../../utils/rtl-locale-provider.tsx';
import { CityTemperatureExample } from './city-temperature.tsx';
import type { LineChartProps } from '@godaddy/antares';

export function RTLExample(props: Partial<LineChartProps>) {
  return (
    <RTLProvider>
      <CityTemperatureExample {...props} />
    </RTLProvider>
  );
}
