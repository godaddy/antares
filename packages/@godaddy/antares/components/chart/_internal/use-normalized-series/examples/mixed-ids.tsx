import { Box, Text } from '@godaddy/antares';
import { useNormalizedSeries } from '../src/index.tsx';

interface SeriesItem {
  id?: string;
  name: string;
  data: number[];
}

const series: SeriesItem[] = [
  { id: 'revenue', name: 'Revenue', data: [10, 20, 30] },
  { name: 'Expenses', data: [5, 15, 25] },
  { name: 'Profit', data: [5, 5, 5] }
];

export function MixedIdsExample() {
  const normalized = useNormalizedSeries(series);

  return (
    <Box padding="md" style={{ border: '1px solid #ccc', borderRadius: 4 }}>
      <Text as="div" style={{ fontWeight: 'bolder', marginBottom: 8 }}>
        Resolved series ids
      </Text>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {normalized.map(function renderItem(item) {
          return (
            <li key={item.id} data-id={item.id}>
              <Text as="span">
                <code>{item.id}</code> &mdash; {item.name}
              </Text>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}
