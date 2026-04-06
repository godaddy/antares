import { Box, DonutChart, Flex } from '@godaddy/antares';

const data = [
  { id: '1', name: 'North', value: 40 },
  { id: '2', name: 'South', value: 35 },
  { id: '3', name: 'East', value: 25 }
];

/** Fixed width so each donut shows `size` ring/typography at the same diameter. */
const DEMO_WIDTH_PX = 160;

export function SizesExample() {
  return (
    <Flex gap="xl" alignItems="flex-end" wrap="wrap">
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="sm" size="sm" aria-label="Small donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="md" size="md" aria-label="Medium donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="lg" size="lg" aria-label="Large donut" />
      </Box>
      <Box style={{ width: DEMO_WIDTH_PX }}>
        <DonutChart data={data} label="xl" size="xl" aria-label="Extra large donut" />
      </Box>
    </Flex>
  );
}
