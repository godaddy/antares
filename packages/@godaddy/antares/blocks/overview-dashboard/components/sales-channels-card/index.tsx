import { Card, DonutChart, Flex, Heading } from '@godaddy/antares';
import { salesChannelData } from '../../constants/config';
import styles from './index.module.css';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

const totalSales = salesChannelData.reduce(function sumSales(total, channel) {
  return total + channel.value;
}, 0);

const salesChannelAriaLabel = [
  'Sales by sales channels donut chart',
  ...salesChannelData.map(function describeChannel(channel) {
    return `${channel.name}: ${formatCurrency(channel.value)}`;
  })
].join('. ');

/** Demonstrates sales-channel performance with a responsive donut chart. */
export function SalesChannelsCard() {
  return (
    <Card elevation="card" className={styles.salesCardMeasure}>
      <Flex direction="column" gap="lg">
        <Heading level={3}>Sales by Sales Channels</Heading>
        <DonutChart
          data={salesChannelData}
          label={formatNumber(totalSales)}
          subLabel="USD"
          legend="bottom"
          formatValue={formatCurrency}
          aria-label={salesChannelAriaLabel}
        />
      </Flex>
    </Card>
  );
}
