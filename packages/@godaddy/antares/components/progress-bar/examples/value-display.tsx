import { Flex, ProgressBar } from '@godaddy/antares';

/**
 * Use `valueLabel` to show formatted values, static content, or output derived from progress state.
 * @order 7
 */
export function ValueDisplayExample() {
  return (
    <Flex direction="column" gap="md">
      <ProgressBar label="Upload progress" value={60} valueLabel />
      <ProgressBar label="Files uploaded" value={60} valueLabel={<span>3 of 5 files</span>} />
      <ProgressBar
        label="Processing progress"
        value={60}
        valueLabel={function renderValue({ percentage }) {
          return `Current: ${percentage}%`;
        }}
      />
    </Flex>
  );
}
