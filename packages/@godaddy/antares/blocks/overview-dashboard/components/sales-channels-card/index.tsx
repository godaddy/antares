import { Box, DonutChart, Flex, Heading } from '@godaddy/antares';
import { salesChannelData } from '../../constants/config';
import { DashboardCard } from '../dashboard-card';
import { useSalesChannelsLegendPlacement } from './use-sales-channels-legend-placement';
import styles from './index.module.css';

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

/** Demonstrates sales-channel performance with a responsive donut chart. */
export function SalesChannelsCard() {
  const { cardRef, legendPlacement } = useSalesChannelsLegendPlacement();

  return (
    <Box ref={cardRef} className={styles.salesCardMeasure}>
      <DashboardCard>
        <Flex direction="column" gap="lg">
          <Heading level={4}>Sales by Sales Channels</Heading>
          <DonutChart
            data={salesChannelData}
            label="$1,000"
            subLabel="Sub Label"
            legend={legendPlacement}
            formatValue={formatCurrency}
            aria-label="Sales by sales channels donut chart"
          />
        </Flex>
      </DashboardCard>
    </Box>
  );
}
