import { Button, GaugeChart, GaugeChartCenter, GaugeChartRange, Text } from '@godaddy/antares';
import { useState } from 'react';

const descriptionIds = ['score-description', 'renamed-description', undefined, null] as const;

/** @ignore */
export function DynamicDescriptionExample({ rangeFirst }: { rangeFirst: boolean }) {
  const [step, setStep] = useState(0);
  const descriptionId = descriptionIds[step];

  function changeDescription() {
    setStep((current) => (current + 1) % descriptionIds.length);
  }

  const center = (
    <GaugeChartCenter key="center">
      <Button onPress={changeDescription}>Change description</Button>
      {descriptionId !== null && (
        <Text id={descriptionId} slot="description">
          Site health score. <Button onPress={changeDescription}>Change from description</Button>
        </Text>
      )}
    </GaugeChartCenter>
  );
  const range = (
    <GaugeChartRange key="range">
      <Text slot="min">Low</Text>
      <Text slot="max">High</Text>
    </GaugeChartRange>
  );

  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      {step === 2 && <Text id="renamed-description">Previous ID reused elsewhere.</Text>}
      <GaugeChart value={72} aria-label="Site health" aria-describedby="external-description" style={{ maxWidth: 360 }}>
        {rangeFirst ? [range, center] : [center, range]}
      </GaugeChart>
    </>
  );
}
