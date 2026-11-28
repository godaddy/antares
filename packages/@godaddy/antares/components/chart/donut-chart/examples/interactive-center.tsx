import { Button, DonutChart, DonutChartCenter, Text } from '@godaddy/antares';

/** @ignore */
export function InteractiveCenterExample({ onPress }: { onPress?: () => void }) {
  return (
    <DonutChart data={[{ name: 'Total', value: 100 }]} aria-label="Donut chart with a button in the center">
      <DonutChartCenter>
        <Button onPress={onPress} style={{ inlineSize: '100%' }}>
          View details
        </Button>
        <div
          contentEditable
          role="textbox"
          aria-label="Edit center note"
          style={{ inlineSize: 96, minBlockSize: 24 }}
        />
        <Text as="button" slot="description" onClick={onPress}>
          Open center note
        </Text>
      </DonutChartCenter>
    </DonutChart>
  );
}
