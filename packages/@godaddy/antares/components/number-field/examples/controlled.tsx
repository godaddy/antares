import { useState } from 'react';
import { NumberField, Text } from '@godaddy/antares';

export function NumberFieldControlledExample() {
  const [value, setValue] = useState(10);

  return (
    <>
      <NumberField label="Quantity" minValue={0} maxValue={100} value={value} onChange={setValue} />
      <Text>
        <strong>Value:</strong> {value ?? '(empty)'}
      </Text>
    </>
  );
}
