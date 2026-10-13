import { Card, DonutChart, Flex, Heading } from '@godaddy/antares';
import { salesChannelData } from '../../constants/config';
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
  return (
    <Card elevation="card" className={styles.salesCardMeasure}>
      <Flex direction="column" gap="lg">
        <Heading level={3}>Sales by Sales Channels</Heading>
        <DonutChart
          data={salesChannelData}
          label="$1,000"
          subLabel="Sub Label"
          legend="bottom"
          formatValue={formatCurrency}
          aria-label="Sales by sales channels donut chart"
        />
      </Flex>
    </Card>
  );
}
