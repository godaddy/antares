import { Button, Flex, GaugeChart, GaugeChartCenter, GaugeChartRange, Text } from '@godaddy/antares';

/** @ignore */
export function CenterControlsExample({ onPress }: { onPress: (name: string, action: string) => void }) {
  const gauges = [
    { name: 'Compact', width: 120, rangeFirst: false, showMin: true, showMax: false },
    { name: 'Regular', width: 200, rangeFirst: true, showMin: false, showMax: true },
    { name: 'Both labels', width: 200, rangeFirst: false, showMin: true, showMax: true, dir: 'rtl' }
  ];

  return (
    <Flex wrap="wrap" alignItems="start" gap="md">
      {gauges.map(function gauge({ name, width, rangeFirst, showMin, showMax, dir }) {
        const center = (
          <GaugeChartCenter key="center">
            <Text slot="value">72%</Text>
            <Flex direction="column" alignItems="center">
              <Button size="sm" onPress={() => onPress(name, 'Edit')}>
                Edit
              </Button>
              <Button size="sm" onPress={() => onPress(name, 'Reset')}>
                Reset
              </Button>
            </Flex>
            <Text slot="description">Score</Text>
          </GaugeChartCenter>
        );
        const range = (
          <GaugeChartRange key="range">
            {showMin && (
              <Text size="xs" slot="min">
                Low
              </Text>
            )}
            {showMax && (
              <Text size="xs" slot="max">
                High
              </Text>
            )}
          </GaugeChartRange>
        );

        return (
          <div key={name} data-testid={name} dir={dir} style={{ width }}>
            <GaugeChart value={72} aria-label={name}>
              {rangeFirst ? [range, center] : [center, range]}
            </GaugeChart>
          </div>
        );
      })}
    </Flex>
  );
}
