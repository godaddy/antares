import { Button, DonutChart, DonutChartCenter, Text } from '@godaddy/antares';
import { useState } from 'react';

const descriptionIds = ['sales-description', 'renamed-description', null] as const;

/** @ignore */
export function DynamicDescriptionExample() {
  const [step, setStep] = useState(0);
  const descriptionId = descriptionIds[step];

  function changeDescription() {
    setStep((current) => (current + 1) % descriptionIds.length);
  }

  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      {descriptionId === null && <Text id="renamed-description">Previous ID reused elsewhere.</Text>}
      <DonutChart
        data={[{ name: 'Sales', value: 100 }]}
        aria-label="Total sales"
        aria-describedby="external-description"
      >
        <DonutChartCenter>
          <Button onPress={changeDescription}>Change description</Button>
          {descriptionId !== null && (
            <Text id={descriptionId} slot="description">
              Online sales.
            </Text>
          )}
        </DonutChartCenter>
      </DonutChart>
    </>
  );
}
