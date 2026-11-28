import { GaugeChart, GaugeChartCenter, GaugeChartCenterContext, Text } from '@godaddy/antares';

function Description() {
  return (
    <Text id="caller-description" slot="description">
      Health from context.
    </Text>
  );
}

/** @ignore */
export function ContextDescriptionExample() {
  return (
    <GaugeChartCenterContext.Provider value={{ children: <Description /> }}>
      <GaugeChart value={72} aria-label="Site health">
        <GaugeChartCenter />
      </GaugeChart>
    </GaugeChartCenterContext.Provider>
  );
}
