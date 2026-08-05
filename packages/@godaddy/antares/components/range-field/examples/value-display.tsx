import { Flex, RangeField } from '@godaddy/antares';

/**
 * Use `valueLabel` to show formatted values, static context, or output derived from the current slider state.
 * @order 5
 */
export function ValueDisplayExample() {
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
