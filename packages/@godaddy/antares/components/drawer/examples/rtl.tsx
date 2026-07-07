import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';
import { PlacementsExample } from './placements.tsx';

export function RTLExample() {
  return (
    <RTLProvider>
      <PlacementsExample />
    </RTLProvider>
  );
}
