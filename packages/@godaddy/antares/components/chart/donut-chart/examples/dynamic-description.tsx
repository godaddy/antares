import { Button, DonutChart, DonutChartCenter, Text } from '@godaddy/antares';
import { useState } from 'react';

/** @ignore */
export function DynamicDescriptionExample() {
  const [descriptionId, setDescriptionId] = useState<string | undefined>('sales-description');

  return (
    <>
      <Text id="external-description">Updated daily.</Text>
      <DonutChart
        data={[{ name: 'Sales', value: 100 }]}
        aria-label="Total sales"
        aria-describedby="external-description"
      >
        <DonutChartCenter>
          <Text slot="value">
            <Button
              onPress={function changeDescription() {
                setDescriptionId(
                  descriptionId === 'sales-description'
                    ? 'renamed-description'
                    : descriptionId
                      ? undefined
                      : 'sales-description'
                );
              }}
            >
              Change description
            </Button>
          </Text>
          {descriptionId && (
            <Text id={descriptionId} slot="description">
              Online sales.
            </Text>
          )}
        </DonutChartCenter>
      </DonutChart>
    </>
  );
}
