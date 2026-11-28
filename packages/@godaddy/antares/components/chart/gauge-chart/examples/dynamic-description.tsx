import { Button, Flex, GaugeChart, GaugeChartCenter, GaugeChartRange, Text } from '@godaddy/antares';
import { useState } from 'react';

const descriptionIds = ['score-description', 'renamed-description', null] as const;

function DescriptionButton({ id, onClick }: { id: string; onClick: () => void }) {
  return (
    <Text as="button" id={id} slot="description" onClick={onClick}>
      Change from description
    </Text>
  );
}

/** @ignore */
export function DynamicDescriptionExample({ rangeFirst }: { rangeFirst: boolean }) {
  const [step, setStep] = useState(0);
  const descriptionId = descriptionIds[step];

  function changeDescription() {
    setStep((current) => (current + 1) % descriptionIds.length);
  }

  const center = (
    <GaugeChartCenter key="center">
      <Flex direction="column" alignItems="center">
        <Button onPress={changeDescription}>Change description</Button>
        <Button onPress={changeDescription}>Change again</Button>
      </Flex>
      {descriptionId !== null && <DescriptionButton id={descriptionId} onClick={changeDescription} />}
    </GaugeChartCenter>
  );
  const range = (
    <GaugeChartRange key="range">
      <Text slot="min">Low</Text>
      <Text slot="max">High</Text>
      <Button onPress={changeDescription}>Change from range</Button>
    </GaugeChartRange>
  );

  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      {descriptionId === null && <Text id="renamed-description">Previous ID reused elsewhere.</Text>}
      <GaugeChart value={72} aria-label="Site health" aria-describedby="external-description" style={{ maxWidth: 360 }}>
        {rangeFirst ? [range, center] : [center, range]}
      </GaugeChart>
    </>
  );
}
