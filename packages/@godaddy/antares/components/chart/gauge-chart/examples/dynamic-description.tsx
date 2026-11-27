import { Button, GaugeChart, GaugeChartCenter, Text } from '@godaddy/antares';
import { useState } from 'react';

/** @ignore */
export function DynamicDescriptionExample() {
  const [descriptionId, setDescriptionId] = useState<string | undefined>('score-description');

  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      <GaugeChart value={72} aria-label="Site health" aria-describedby="external-description">
        <GaugeChartCenter>
          <Text slot="value">
            <Button
              onPress={function changeDescription() {
                setDescriptionId(
                  descriptionId === 'score-description'
                    ? 'renamed-description'
                    : descriptionId
                      ? undefined
                      : 'score-description'
                );
              }}
            >
              Change description
            </Button>
          </Text>
          {descriptionId && (
            <Text id={descriptionId} slot="description">
              Site health score.
            </Text>
          )}
        </GaugeChartCenter>
      </GaugeChart>
    </>
  );
}
