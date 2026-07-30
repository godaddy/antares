import { Flex, RangeField } from '@godaddy/antares';

export function RangeFieldValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <RangeField
        label="Monthly budget"
        defaultValue={50}
        formatOptions={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
        valueLabel
      />
      <RangeField label="Storage quota" defaultValue={50} valueLabel={<span>Recommended</span>} />
      <RangeField
        label="Volume"
        defaultValue={50}
        valueLabel={function renderValue({ state }) {
          return `Current: ${state.values[0]}%`;
        }}
      />
    </Flex>
  );
}
